import { paper } from "../data/profile";
import { discover } from "../lib/discoveries";
import { CertificateCard } from "./CertificateCard";
import { Section } from "./Section";

export function Research() {
  return (
    <Section id="research" kicker="Published Work" title="Research">
      <article className="card feature">
        <h3>{paper.title}</h3>
        <p className="card__sub">
          {paper.venue} · {paper.role}
        </p>
        <div className="card__body card__body--split">
          <div>
            <p>{paper.summary}</p>
            <a
              className="btn"
              href={paper.pdfHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => discover("archivist")}
            >
              Read the paper (PDF)
            </a>
          </div>
          {paper.certificate && (
            <CertificateCard
              href={paper.certificate.href}
              preview={paper.certificate.preview}
              label={paper.certificate.label}
            />
          )}
        </div>
      </article>
    </Section>
  );
}
