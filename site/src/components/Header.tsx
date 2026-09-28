import { nav } from "../data/profile";
import { useTheme } from "../lib/theme";

export function Header() {
  const [theme, setTheme] = useTheme();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-header__name" href="#about">
          Yessica <em>Sule</em>
        </a>
        <nav className="site-nav" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
          <button
            className="site-nav__theme"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "𖤓" : "𖤓"}
          </button>
        </nav>
      </div>
    </header>
  );
}
