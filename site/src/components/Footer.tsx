import { identity } from "../data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          © {new Date().getFullYear()} Yessica Sule · Mumbai, India ·{" "}
          <a href={`mailto:${identity.email}`}>{identity.email}</a>
        </p>
        <nav aria-label="Footer">
          <a href={identity.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={identity.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
