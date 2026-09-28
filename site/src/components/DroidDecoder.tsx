import { useEffect, useRef, useState } from "react";

const MESSAGES = [
  "The hyperdrive is leaking again.",
  "Obi-Wan never returned my power cables.",
  "C-3PO talks too much.",
  "I hid the plans in the trash compactor.",
  "This lab smells like a wet Wookiee.",
  "The Death Star had one job.",
  "Recalibrating… I meant to do that.",
  "Sand. Why is there always sand?",
  "I let the porgs into the cockpit.",
  "Never play sabacc with a protocol droid.",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeRound(exclude: number | null) {
  let idx = Math.floor(Math.random() * MESSAGES.length);
  while (idx === exclude) idx = Math.floor(Math.random() * MESSAGES.length);
  const decoys = shuffle(MESSAGES.filter((_, i) => i !== idx)).slice(0, 3);
  return { idx, options: shuffle([MESSAGES[idx], ...decoys]) };
}

export function DroidDecoder() {
  const [round, setRound] = useState(() => makeRound(null));
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [beeping, setBeeping] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
      void ctxRef.current?.close();
    };
  }, []);

  const playBeeps = () => {
    const ctx = (ctxRef.current ??= new AudioContext());
    void ctx.resume();
    const seed = round.idx;
    const n = 9 + (seed % 4);
    let t = ctx.currentTime + 0.05;
    for (let i = 0; i < n; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i % 2 === 0 ? "square" : "sine";
      const f = 320 + ((seed * 137 + i * 211) % 880);
      osc.frequency.setValueAtTime(f, t);
      osc.frequency.exponentialRampToValueAtTime(f * (i % 3 === 0 ? 1.6 : 0.8), t + 0.09);
      const dur = 0.07 + ((seed + i) % 3) * 0.045;
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.01);
      t += dur + 0.05 + ((seed * 7 + i * 13) % 3) * 0.03;
    }
    setBeeping(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setBeeping(false), (t - ctx.currentTime) * 1000);
  };

  const choose = (opt: string) => {
    if (picked !== null) return;
    setPicked(opt);
    if (opt === MESSAGES[round.idx]) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    setRound(makeRound(round.idx));
    setPicked(null);
  };

  const answered = picked !== null;
  const correct = picked === MESSAGES[round.idx];

  return (
    <div className="decoder" aria-label="Droid Decoder">
      <div className="decoder__head">
        <img className="decoder__droid" src="assets/lego/r2d2.png" alt="" />
        <span className="decoder__title">DROID DECODER</span>
        <span className="decoder__score">
          {score} ✦ {streak > 1 ? `×${streak}` : ""}
        </span>
      </div>

      <div className="decoder__stage">
        <button type="button" className="btn decoder__playbtn" onClick={playBeeps} disabled={beeping}>
          🔊 PLAY TRANSMISSION
        </button>
        <span className={`decoder__wave${beeping ? " decoder__wave--on" : ""}`} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="decoder__options" role="group" aria-label="Possible translations">
        {round.options.map((opt) => {
          let cls = "decoder__opt";
          if (answered && opt === MESSAGES[round.idx]) cls += " decoder__opt--right";
          else if (answered && opt === picked) cls += " decoder__opt--wrong";
          return (
            <button key={opt} type="button" className={cls} onClick={() => choose(opt)} disabled={answered}>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="decoder__result">
          <span>{correct ? "✓ TRANSMISSION DECODED" : "✗ TRANSLATION ERROR"}</span>
          <button type="button" className="btn btn--small" onClick={next}>
            NEXT ▸
          </button>
        </div>
      )}
    </div>
  );
}
