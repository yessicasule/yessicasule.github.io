import { identity } from "../data/profile";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" kicker="Open to Work" title="Get in touch">
      <div className="contact">
        <p className="contact__lead">
          I am looking for research and engineering roles in AI and computer vision —
          and I am glad to talk through any of the work above.
        </p>
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
              Resume (PDF)
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
