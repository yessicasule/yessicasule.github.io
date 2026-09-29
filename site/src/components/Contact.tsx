import { identity } from "../data/profile";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" kicker="Open to Work" title="Get in touch">
      <div className="contact">
        <div className="contact__actions">
          <a className="btn btn--primary" href={`mailto:${identity.email}`}>
            Email {identity.email}
          </a>
          <a className="btn" href={identity.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn" href={identity.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          {identity.resumeHref && (
            <a className="btn" href={identity.resumeHref} download>
              CV (PDF)
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
