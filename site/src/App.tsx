import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Research } from "./components/Research";
import { Certifications } from "./components/Certifications";
import { Achievements } from "./components/Achievements";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ExplorerPage } from "./components/ExplorerPage";
import { LegoExplorers, type CrewAction } from "./components/LegoExplorers";
import { Terminal } from "./components/Terminal";
import { FortuneCookie } from "./components/FortuneCookie";
import { applyTheme } from "./lib/theme";

function isExplorerRoute() {
  return window.location.hash.startsWith("#/explorer");
}

export default function App() {
  const [explorer, setExplorer] = useState(isExplorerRoute);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [fortuneOpen, setFortuneOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      const nowExplorer = isExplorerRoute();
      setExplorer(nowExplorer);
      // Arriving from Explorer with a section anchor: scroll once rendered.
      const hash = window.location.hash;
      if (!nowExplorer && hash.length > 1 && !hash.startsWith("#/")) {
        requestAnimationFrame(() => {
          document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
        });
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (explorer) {
    return <ExplorerPage />;
  }

  const handleCrew = (action: CrewAction) => {
    switch (action) {
      case "terminal":
        setTerminalOpen(true);
        break;
      case "theme-light":
        applyTheme("light");
        break;
      case "fortune":
        setFortuneOpen(true);
        break;
    }
  };

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Research />
        <Certifications />
        <Achievements />
        <Education />
        <Contact />
      </main>
      <LegoExplorers onAction={handleCrew} />
      <Footer />

      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <FortuneCookie open={fortuneOpen} onClose={() => setFortuneOpen(false)} />
    </>
  );
}
