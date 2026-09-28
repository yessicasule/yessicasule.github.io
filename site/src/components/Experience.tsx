import { experience } from "../data/profile";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" kicker="Field Work" title="Experience">
      {experience.map((role) => (
        <article className="card" key={role.org}>
          <div className="card__head">
            {role.logo && (
              <span className="card__logo-tile">
                <img className="card__logo card__logo--lg" src={role.logo} alt="" />
              </span>
            )}
            <div>
              <h3>{role.title}</h3>
              <p className="card__sub">
                {role.org}
                {role.period && <span className="card__period"> · {role.period}</span>}
                {role.location && <span className="card__period"> · {role.location}</span>}
              </p>
            </div>
          </div>
          <p>{role.summary}</p>
          <ul>
            {role.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </Section>
  );
}
