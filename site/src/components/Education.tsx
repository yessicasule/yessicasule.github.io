import { education } from "../data/profile";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" title="Education">
      <ol className="timeline">
        {education.map((e) => (
          <li key={e.school}>
            <div className="timeline__head">
              {e.logo && <img className="timeline__logo" src={e.logo} alt="" />}
              <h3>{e.school}</h3>
              {e.years && <span className="timeline__years">{e.years}</span>}
            </div>
            <p>{e.credential}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
