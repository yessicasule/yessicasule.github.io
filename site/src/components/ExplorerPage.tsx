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
        </div>
      </header>

      <section className="explorer__intro container">
        <h1 className="explorer__name">Yev Skywalker</h1>
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
