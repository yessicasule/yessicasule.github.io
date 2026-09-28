import { nav } from "../data/profile";
import { useTheme } from "../lib/theme";

export function Header() {
  const [theme, setTheme] = useTheme();

  return (
    <header className="site-header">
      <div className="container site-header__inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a className="site-header__name" href="#about">
          Yessica <em>Sule</em>
        </a>
        <nav className="site-nav" aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
            style={{
              background: "var(--bg-wash)",
              color: "var(--ink)",
              border: "1px solid var(--line)",
              padding: "0.25rem 0.75rem",
              borderRadius: "var(--radius)",
              cursor: "pointer",
              marginLeft: "1rem",
              fontWeight: "bold"
            }}
          >
            {theme === "light" ? "𖤓" : "𖤓"}
          </button>
        </nav>
      </div>
    </header>
  );
}
