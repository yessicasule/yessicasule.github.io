import { paper } from "../data/profile";
import { discover } from "../lib/discoveries";
import { Section } from "./Section";

export function Research() {
  return (
    <Section id="research" kicker="Published Work" title="Research">
      <article className="card feature">
        <h3>{paper.title}</h3>
        <p className="card__sub">
          {paper.venue} · {paper.role}
        </p>
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
      </article>
    </Section>
  );
}
