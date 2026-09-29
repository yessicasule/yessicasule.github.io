import { experience } from "../data/profile";
import { CertificateCard } from "./CertificateCard";
import { Section } from "./Section";

/** A short mark for an organisation that has no logo file. */
function monogram(org: string) {
  // Prefer the organisation's own acronym when it gives one in brackets.
  const acronym = org.match(/[(]([A-Z]{2,6})[)]/);
  if (acronym) return acronym[1];
  return org
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) && !/^(the|of|and|for|at|in)$/i.test(w))
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function Experience() {
  return (
    <Section id="experience" kicker="Field Work" title="Experience">
      {experience.map((role) => (
        <article className="card" key={role.org}>
          <div className="card__head">
            <span className="card__logo-tile">
              {role.logo ? (
                <img className="card__logo card__logo--lg" src={role.logo} alt="" />
              ) : (
                <span className="card__monogram" aria-hidden="true">
                  {monogram(role.org)}
                </span>
              )}
            </span>
            <div className="card__headline">
              <h3>{role.title}</h3>
              <p className="card__sub">{role.org}</p>
            </div>
            {(role.period || role.location) && (
              <div className="card__when">
                {role.period && <span className="card__period">{role.period}</span>}
                {role.location && <span className="card__where">{role.location}</span>}
              </div>
            )}
          </div>

          <div className={role.certificate ? "card__body card__body--split" : "card__body"}>
            <div>
              <p>{role.summary}</p>
              <ul>
                {role.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            {role.certificate && (
              <CertificateCard
                href={role.certificate.href}
                preview={role.certificate.preview}
                label={role.certificate.label}
              />
            )}
          </div>
        </article>
      ))}
    </Section>
  );
}
