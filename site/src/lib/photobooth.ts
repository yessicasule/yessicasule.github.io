/**
 * Endpoint that receives photobooth strips and emails them to Yessica.
 *
 * Paste the Google Apps Script web app URL here (see apps-script/README.md
 * for the four-step setup). It looks like:
 *   https://script.google.com/macros/s/AKfyc.../exec
 *
 * While this is empty the booth falls back to save + mail-client handoff,
 * so the button always does something sensible.
 *
 * This URL ships in a public bundle — anyone who views source can POST to
 * it. The script caps payload size for that reason, and the deployment can
 * be revoked at any time from the Apps Script console.
 */
export const PHOTOBOOTH_ENDPOINT = "";

export interface StripPayload {
  /** base64 JPEG, no data: prefix */
  image: string;
  /** Whatever the visitor typed into the name box; may be empty. */
  from: string;
}

export type SendResult = "sent" | "unconfigured" | "failed";

export async function sendStrip(payload: StripPayload): Promise<SendResult> {
  if (!PHOTOBOOTH_ENDPOINT) return "unconfigured";
  try {
    // No custom headers and a plain-text content type keeps this a CORS
    // "simple request", so the browser skips the preflight that Apps Script
    // cannot answer.
    const res = await fetch(PHOTOBOOTH_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res.ok) return "failed";
    const text = await res.text();
    return text.includes("ok") ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
