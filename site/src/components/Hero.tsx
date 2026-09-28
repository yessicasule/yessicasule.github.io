import { identity } from "../data/profile";

export function Hero() {
  return (
    <section id="about" className="hero" aria-label="About Yessica Sule">
      <div className="container hero__grid">
        <div>
          <p className="hero__kicker">
            {identity.role} · {identity.tagline}
          </p>
          <h1>{identity.name}</h1>
          <p className="hero__intro">{identity.intro}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={`mailto:${identity.email}`}>
              Email me
            </a>
            <a className="btn" href={identity.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn" href={identity.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            {identity.resumeHref ? (
              <a className="btn" href={identity.resumeHref} download>
                Resume (PDF)
              </a>
            ) : (
              <span className="btn btn--disabled" aria-disabled="true" title="Final resume coming soon">
                Resume — soon
              </span>
            )}
          </div>
          <p className="hero__meta">
            {identity.location} · {identity.languages.join(" · ")}
          </p>
        </div>
        <div className="portrait">
          {identity.portraitSrc ? (
            <img src={identity.portraitSrc} alt="Yessica Sule" />
          ) : (
            <span className="portrait__placeholder" aria-hidden="true">
              YS
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
