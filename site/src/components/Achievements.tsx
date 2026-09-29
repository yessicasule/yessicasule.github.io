import { achievements, leadership } from "../data/profile";
import { AchievementsMontage } from "./AchievementsMontage";
import { Section } from "./Section";

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements & Leadership">
      <AchievementsMontage />
      <div className="grid-2">
        {achievements.map((a) => (
          <article className="card" key={a.title}>
            {a.logo ? (
              <div className="card__head">
                <img className="card__logo" src={a.logo} alt="" />
                <div>
                  <h3>{a.title}</h3>
                  <p className="card__sub">{a.detail}</p>
                </div>
              </div>
            ) : (
              <>
                <h3>{a.title}</h3>
                <p className="card__sub">{a.detail}</p>
              </>
            )}
          </article>
        ))}
        {leadership.map((l) => (
          <article className="card" key={l.title}>
            {l.logo ? (
              <div className="card__head">
                <img className="card__logo" src={l.logo} alt="" />
                <div>
                  <h3>{l.title}</h3>
                  <p className="card__sub">{l.detail}</p>
                </div>
              </div>
            ) : (
              <>
                <h3>{l.title}</h3>
                <p className="card__sub">{l.detail}</p>
              </>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
