import { useCallback, useEffect, useRef, useState } from "react";
import { identity } from "../data/profile";
import { discover } from "../lib/discoveries";
import { PHOTOBOOTH_ENDPOINT, sendStrip } from "../lib/photobooth";

type Phase = "idle" | "live" | "shooting" | "shot" | "denied" | "unsupported";

const SHOTS = 4;
const FRAME_W = 560;
const FRAME_H = 420;
const PAD = 22;
const GAP = 14;
const CAPTION_H = 92;
const STRIP_W = FRAME_W + PAD * 2;
const STRIP_H = PAD + SHOTS * FRAME_H + (SHOTS - 1) * GAP + CAPTION_H + PAD;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * Explorer photobooth — a four-frame strip in the manner of a seaside booth,
 * graded cool instead of sepia.
 *
 * Everything happens on the visitor's machine: the webcam stream never leaves
 * the page, and the strip only becomes a file when they ask for one.
 *
 * "Send to Yessica" POSTs the strip to a Google Apps Script web app, which
 * emails it to her with the image attached. If no endpoint is configured yet
 * it degrades to a save + mail-client handoff, since mailto: alone cannot
 * carry an attachment.
 */
export function Photobooth() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const aliveRef = useRef(true);

  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(0);
  const [shotNo, setShotNo] = useState(0);
  const [flash, setFlash] = useState(false);
  const [strip, setStrip] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [from, setFrom] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<"idle" | "sent" | "failed">("idle");
  const stripCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  // The camera must not outlive the panel, and a sequence in flight must know
  // the panel went away.
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      stopCamera();
    };
  }, [stopCamera]);

  // Attach the stream once the <video> is actually committed for this phase.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamRef.current) return;
    if (phase !== "live" && phase !== "shooting") return;
    if (video.srcObject !== streamRef.current) {
      video.srcObject = streamRef.current;
      void video.play();
    }
  }, [phase]);

  const start = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setPhase("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 960 }, height: { ideal: 720 } },
        audio: false,
      });
      if (!aliveRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      streamRef.current = stream;
      setStrip(null);
      setPhase("live");
    } catch {
      setPhase("denied");
    }
  };

  /** One frame: cover-fit, mirrored, graded cool. */
  const grabFrame = (): HTMLCanvasElement | null => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return null;

    const canvas = document.createElement("canvas");
    canvas.width = FRAME_W;
    canvas.height = FRAME_H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const scale = Math.max(FRAME_W / video.videoWidth, FRAME_H / video.videoHeight);
    const dw = video.videoWidth * scale;
    const dh = video.videoHeight * scale;
    ctx.save();
    ctx.translate(FRAME_W, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, (FRAME_W - dw) / 2, (FRAME_H - dh) / 2, dw, dh);
    ctx.restore();

    // Duotone by hand rather than ctx.filter: works everywhere, and gives
    // direct control over how far the blue lifts into the shadows.
    const img = ctx.getImageData(0, 0, FRAME_W, FRAME_H);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      // Gentle S-curve, for the contrast an old booth print has.
      const c = Math.max(0, Math.min(255, (lum - 128) * 1.12 + 128));
      const grain = (Math.random() - 0.5) * 9;
      d[i] = Math.max(0, Math.min(255, c * 0.8 + grain));
      d[i + 1] = Math.max(0, Math.min(255, c * 0.92 + grain + 4));
      d[i + 2] = Math.max(0, Math.min(255, c * 1.06 + grain + 18));
    }
    ctx.putImageData(img, 0, 0);

    // Vignette, so each frame reads as a print rather than a screenshot.
    const vig = ctx.createRadialGradient(
      FRAME_W / 2,
      FRAME_H / 2,
      Math.min(FRAME_W, FRAME_H) * 0.28,
      FRAME_W / 2,
      FRAME_H / 2,
      Math.max(FRAME_W, FRAME_H) * 0.72,
    );
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(3,8,18,0.42)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, FRAME_W, FRAME_H);

    return canvas;
  };

  const compose = (frames: HTMLCanvasElement[]) => {
    const canvas = document.createElement("canvas");
    canvas.width = STRIP_W;
    canvas.height = STRIP_H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#080b14";
    ctx.fillRect(0, 0, STRIP_W, STRIP_H);

    frames.forEach((frame, i) => {
      const y = PAD + i * (FRAME_H + GAP);
      ctx.drawImage(frame, PAD, y);
      ctx.strokeStyle = "rgba(75,213,238,0.22)";
      ctx.lineWidth = 1;
      ctx.strokeRect(PAD + 0.5, y + 0.5, FRAME_W - 1, FRAME_H - 1);
    });

    const capY = PAD + frames.length * FRAME_H + (frames.length - 1) * GAP;

    const glow = ctx.createLinearGradient(PAD, capY, PAD + FRAME_W, capY);
    glow.addColorStop(0, "rgba(75,213,238,0)");
    glow.addColorStop(0.5, "rgba(75,213,238,0.9)");
    glow.addColorStop(1, "rgba(146,92,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(PAD, capY + 18, FRAME_W, 1);

    ctx.textBaseline = "middle";
    ctx.fillStyle = "#4bd5ee";
    ctx.font = "700 21px 'Source Sans 3', system-ui, sans-serif";
    ctx.fillText("YESSICA SULE", PAD, capY + 48);

    ctx.fillStyle = "#7f93a6";
    ctx.font = "400 16px 'Source Sans 3', system-ui, sans-serif";
    const date = new Date().toLocaleDateString();
    ctx.fillText(date, PAD + FRAME_W - ctx.measureText(date).width, capY + 48);

    ctx.strokeStyle = "rgba(75,213,238,0.3)";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, STRIP_W - 2, STRIP_H - 2);

    stripCanvasRef.current = canvas;
    return canvas.toDataURL("image/png");
  };

  const runSequence = async () => {
    setPhase("shooting");
    const frames: HTMLCanvasElement[] = [];

    for (let n = 0; n < SHOTS; n++) {
      if (!aliveRef.current) return;
      setShotNo(n + 1);
      for (let c = 3; c > 0; c--) {
        setCount(c);
        await sleep(650);
        if (!aliveRef.current) return;
      }
      setCount(0);
      setFlash(true);
      const frame = grabFrame();
      await sleep(160);
      setFlash(false);
      if (frame) frames.push(frame);
      if (n < SHOTS - 1) await sleep(520);
    }

    if (!aliveRef.current) return;

    if (!frames.length) {
      // No frame ever arrived — back to the live view rather than a dead end.
      setPhase("live");
      return;
    }

    const png = compose(frames);
    stopCamera();
    if (png) {
      setStrip(png);
      setPhase("shot");
      setCopied(false);
      setSent("idle");
      discover("portrait");
    } else {
      setPhase("live");
    }
  };

  const filename = `yevaverse-${new Date().toISOString().slice(0, 10)}.png`;

  const save = () => {
    if (!strip) return;
    const a = document.createElement("a");
    a.href = strip;
    a.download = filename;
    a.click();
  };

  const copy = async () => {
    if (!strip || !navigator.clipboard?.write) return;
    try {
      const blob = await (await fetch(strip)).blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  /** Falls back to the mail client when no endpoint is configured. */
  const handoffToMailClient = () => {
    save();
    const subject = "A photo strip from your site";
    const body = [
      "Hi Yessica — I stopped by your site and took a photo strip.",
      "",
      `(It saved to my downloads as ${filename} — attaching it here.)`,
      "",
      "",
    ].join("\n");
    window.location.href = `mailto:${identity.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const send = async () => {
    if (!PHOTOBOOTH_ENDPOINT) {
      handoffToMailClient();
      return;
    }
    const canvas = stripCanvasRef.current;
    if (!canvas) return;

    setSending(true);
    setSent("idle");
    // JPEG rather than PNG: visually identical for this duotone, and a
    // fraction of the payload to push over the wire.
    const image = canvas.toDataURL("image/jpeg", 0.92).split(",")[1] ?? "";
    const result = await sendStrip({ image, from: from.trim() });
    setSending(false);

    if (result === "sent") {
      setSent("sent");
    } else if (result === "unconfigured") {
      handoffToMailClient();
    } else {
      setSent("failed");
    }
  };

  const showingStrip = phase === "shot" && strip;

  return (
    <div className="booth" aria-label="Photobooth">
      <div className="booth__head">
        <span className="booth__led" aria-hidden="true" />
        PHOTOBOOTH
      </div>

      <div className={`booth__stage${showingStrip ? " booth__stage--strip" : ""}`}>
        {showingStrip ? (
          <img className="booth__strip" src={strip} alt="Your four-frame photo strip" />
        ) : phase === "live" || phase === "shooting" ? (
          <video className="booth__media booth__media--mirror" ref={videoRef} playsInline muted />
        ) : (
          <div className="booth__placeholder">
            <span aria-hidden="true">◉</span>
            <p>
              {phase === "denied"
                ? "Camera blocked. Allow access in your browser, then try again."
                : phase === "unsupported"
                  ? "This browser has no camera API."
                  : "Four frames. Pull a face."}
            </p>
          </div>
        )}

        {phase === "shooting" && (
          <>
            <span className="booth__tally" aria-live="polite">
              {shotNo} / {SHOTS}
            </span>
            {count > 0 && <div className="booth__count">{count}</div>}
          </>
        )}
        {flash && <div className="booth__flash" aria-hidden="true" />}
      </div>

      <div className="booth__actions">
        {phase === "idle" || phase === "denied" || phase === "unsupported" ? (
          <button type="button" className="booth__btn booth__btn--go" onClick={start}>
            Start camera
          </button>
        ) : phase === "live" ? (
          <button type="button" className="booth__btn booth__btn--go" onClick={runSequence}>
            Take 4 photos
          </button>
        ) : phase === "shooting" ? (
          <button type="button" className="booth__btn" disabled>
            Hold still…
          </button>
        ) : (
          <>
            <input
              className="booth__name"
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Your name (optional)"
              maxLength={60}
              disabled={sending || sent === "sent"}
            />
            <button
              type="button"
              className="booth__btn booth__btn--go"
              onClick={send}
              disabled={sending || sent === "sent"}
            >
              {sending ? "Transmitting…" : sent === "sent" ? "✓ Sent" : "✉ Send to Yessica"}
            </button>
            {sent === "failed" && (
              <p className="booth__hint booth__hint--warn">
                That didn't go through. Save the strip and email it instead — or try again.
              </p>
            )}
            <div className="booth__row">
              <button type="button" className="booth__btn" onClick={save}>
                ↓ Save
              </button>
              <button type="button" className="booth__btn" onClick={copy}>
                {copied ? "Copied" : "Copy"}
              </button>
              <button type="button" className="booth__btn" onClick={start}>
                ↺ Again
              </button>
            </div>
            <p className="booth__hint">
              {sent === "sent"
                ? "Your strip is on its way to Yessica. Save a copy for yourself below."
                : PHOTOBOOTH_ENDPOINT
                  ? "Sending delivers the strip straight to Yessica's inbox."
                  : "Sending saves the strip, then opens your mail app — attach the saved file, or paste the copied one straight into the message."}
            </p>
          </>
        )}

        {phase !== "shot" && (
          <p className="booth__hint">
            The camera runs only in your browser. Nothing is uploaded, and nothing is sent unless
            you choose to send it.
          </p>
        )}
      </div>
    </div>
  );
}
