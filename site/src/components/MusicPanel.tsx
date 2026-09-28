import { useEffect, useRef, useState } from "react";

interface Track {
  title: string;
  term: string;
}

const TRACKS: Track[] = [
  { title: "Cantina Band", term: "Cantina Band Star Wars John Williams" },
  { title: "Darth Maul Theme", term: "Darth Maul Star Wars theme" },
  { title: "Darth Vader Theme", term: "The Imperial March John Williams" },
  { title: "Duel of the Fates", term: "Duel of the Fates John Williams" },
  { title: "Across the Stars", term: "Across the Stars John Williams" },
];

interface Loaded {
  previewUrl: string | null;
  artwork: string | null;
}

export function MusicPanel() {
  const [meta, setMeta] = useState<Loaded[]>(() =>
    TRACKS.map(() => ({ previewUrl: null, artwork: null })),
  );
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let alive = true;
    const audio = new Audio();
    audio.volume = 0.85;
    audio.addEventListener("ended", () => setPlaying(false));
    audioRef.current = audio;

    TRACKS.forEach(async (t, i) => {
      try {
        const res = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(t.term)}&media=music&entity=song&limit=1`,
        );
        const json = await res.json();
        const r = json.results?.[0];
        if (alive && r?.previewUrl) {
          setMeta((m) => {
            const next = [...m];
            next[i] = { previewUrl: r.previewUrl, artwork: r.artworkUrl100 ?? null };
            return next;
          });
        }
      } catch {
        /* stays offline */
      }
    });

    return () => {
      alive = false;
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = (i: number) => {
    const audio = audioRef.current;
    const m = meta[i];
    if (!audio || !m.previewUrl) return;
    if (current === i && playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    if (current !== i) {
      audio.src = m.previewUrl;
      setCurrent(i);
    }
    void audio.play();
    setPlaying(true);
  };

  return (
    <div className="radio" aria-label="Cantina Radio">
      <div className="radio__head">
        <span className="radio__led" aria-hidden="true" />
        CANTINA RADIO
      </div>
      <ul className="radio__list">
        {TRACKS.map((t, i) => {
          const loaded = meta[i].previewUrl !== null;
          const active = current === i && playing;
          return (
            <li key={t.title}>
              <button
                type="button"
                className={`radio__track${active ? " radio__track--on" : ""}`}
                onClick={() => toggle(i)}
                disabled={!loaded}
                aria-pressed={active}
              >
                {meta[i].artwork ? (
                  <img className="radio__art" src={meta[i].artwork!} alt="" />
                ) : (
                  <span className="radio__art radio__art--empty" aria-hidden="true">
                    ♫
                  </span>
                )}
                <span className="radio__title">{t.title}</span>
                {active ? (
                  <span className="radio__eq" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                ) : (
                  <span className="radio__play" aria-hidden="true">
                    {loaded ? "▶" : "…"}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
