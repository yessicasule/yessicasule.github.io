import { useState } from "react";
import { BODIES } from "../data/observatory";
import { discover } from "../lib/discoveries";
import { Section } from "./Section";

export function SolarSystem() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? BODIES[selectedId] : null;

  const select = (id: string) => {
    setSelectedId(id);
    discover("stargazer");
  };

  const body = (id: string, className: string, label?: string) => (
    <button
      type="button"
      className={`orbital__body ${className}`}
      aria-label={BODIES[id].name}
      aria-pressed={selectedId === id}
      onClick={() => select(id)}
    >
      {label && <span className="orbital__label">{label}</span>}
    </button>
  );

  return (
    <Section id="observatory" kicker="The Observatory" title="A small solar system of my work">
      <div className="orbital-wrap">
        <div className="orbital" role="group" aria-label="Interactive map of research domains">
          <div className="orbital__ring orbital__ring--inner" aria-hidden="true" />
          <div className="orbital__ring orbital__ring--outer" aria-hidden="true" />

          {body("core", "orbital__body--star")}

          <div className="orbital__spin orbital__spin--inner">
            <div className="orbital__seat">
              <div className="orbital__counter orbital__counter--inner">
                {body("vision", "orbital__body--planet orbital__body--vision", "Vision")}
                <div className="orbital__moonspin orbital__moonspin--a">
                  <div className="orbital__moonseat">
                    {body("green-ai", "orbital__body--moon")}
                  </div>
                </div>
                <div className="orbital__moonspin orbital__moonspin--b">
                  <div className="orbital__moonseat">{body("paper", "orbital__body--moon")}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="orbital__spin orbital__spin--outer">
            <div className="orbital__seat">
              <div className="orbital__counter orbital__counter--outer">
                {body("spatial", "orbital__body--planet orbital__body--spatial", "Spatial")}
              </div>
            </div>
          </div>
        </div>

        <aside className="orbital__panel" aria-live="polite">
          {selected ? (
            <>
              <p className="orbital__kind">{selected.kind}</p>
              <h3>{selected.name}</h3>
              <p>{selected.blurb}</p>
              <a className="btn" href={selected.anchor}>
                {selected.anchorLabel}
              </a>
            </>
          ) : (
            <>
              <h3>Chart the system</h3>
              <p>
                Select the star, a planet, or a moon to see what it stands for. Every body here
                is real work.
              </p>
            </>
          )}
        </aside>
      </div>
    </Section>
  );
}
