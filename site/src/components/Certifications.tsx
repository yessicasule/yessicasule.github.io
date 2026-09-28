import { certifications } from "../data/profile";
import { Section } from "./Section";

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications" wash>
      <div className="grid-2">
        {certifications.map((c) => (
          <article className="card" key={c.title}>
            <div className="card__head">
              <img className="card__logo" src={c.logo} alt="" />
              <div>
                <h3>{c.title}</h3>
                <p className="card__sub" style={{ margin: 0 }}>{c.issuer}</p>
              </div>
            </div>
            {c.certificatePdf && (
              <a
                className="btn btn--small"
                href={c.certificatePdf}
                target="_blank"
                rel="noreferrer"
              >
                View Certificate
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
