import { useEffect } from "react";
import { applyTheme } from "../lib/theme";
import { Starfield } from "./Starfield";
import { MusicPanel } from "./MusicPanel";
import { Photobooth } from "./Photobooth";
import { LegoStation } from "./LegoStation";
import { SWTetris } from "./SWTetris";

export function ExplorerPage() {
  useEffect(() => {
    applyTheme("dark");
    window.scrollTo({ top: 0 });
    return () => applyTheme("light");
  }, []);

  return (
    <div className="explorer">
      <Starfield />

      <header className="explorer__top">
        <div className="container explorer__top-inner">
          <a className="btn btn--small" href="#/">
            ← Return to the desk
          </a>
          <span className="explorer__badge">✦ Explorer Mode</span>
        </div>
      </header>

      <section className="explorer__intro container">
        <p className="crawl-intro">A long time ago in a portfolio far, far away…</p>
        <div className="crawl-viewport">
          <div className="crawl">
            <div className="crawl__inner">
              <p className="crawl__ep">Episode IV½ · The Explorer Station</p>
              <p>
                It is a period of civil study. Curiosity has broken through the professional
                surface of this portfolio and slipped into the hangar bay below.
              </p>
              <p>
                Inside, a minifigure foundry hums, a cantina radio loops through the classics,
                and an astromech insists it has something important to say.
              </p>
              <p>
                Build something. Play something. Decode something. Obi-Wan waits at the end of
                the corridor to take you back to the desk….
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="container fun">
        <div className="fun__main">
          <LegoStation />
          <SWTetris />

          <a className="obi-back" href="#/" aria-label="Return to the main site with Obi-Wan Kenobi">
            <img src="assets/lego/obi-wan.png" alt="" />
            <span>RETURN</span>
          </a>
        </div>

        <aside className="fun__side">
          <MusicPanel />
          <Photobooth />
        </aside>
      </main>
    </div>
  );
}
