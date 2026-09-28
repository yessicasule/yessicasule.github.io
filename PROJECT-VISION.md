# Portfolio — Project Vision & Build Tracker

_Planning + decision log for Yessica Sule's "Interstellar Research Observatory" portfolio._
_Raw resume content lives in `context.md`. This file is the evolving source of truth for decisions and build stages._

---

## Status: STAGE 1 BUILT — awaiting user review (dev preview at http://localhost:5173, run `npm run dev` in site/)

---

## 1. The Person (from context.md + Q&A)

- **Name:** Yessica Sule
- **Public email:** yessicasule@gmail.com · **Location:** Mumbai, India
- **Status:** Final-year Computer Engineering student, SPIT Mumbai (minor in IoT)
- **Genuine focus:** AI & Computer Vision
- **Ethos / pitch:** "I am willing to learn and I WILL DELIVER RESULTS"
- **Assets ready:** GitHub, LinkedIn, resume PDF, professional photo
- **Theme fits authentically:** ISRO remote sensing/GIS, IIT Kanpur aircraft control systems, Astrophysics Club (Head of PR), CV research at IIT Bombay Wired Lab

## Real content on hand (from resume)
- **Experience:** Research Intern — Wired Lab, IIT Bombay (monocular vision human motion tracking; rehab robotics pipeline; pose estimation + filtering + UDP + Unity; biomechanical benchmarking)
- **Projects:** AR-Based Indoor Navigation (React Native/Expo, AR, Node/Express, React/Vite); Green AI (Python, fuzzy logic, RouteLLM, quantization, energy-aware inference)
- **Achievements:** Paper accepted @ AISIIS 2026 — "Poisoning-Resistant Federated Intrusion Detection System"; Ranked 5th, India Innovates National Hackathon
- **Certs/Training:** IIRS/ISRO Remote Sensing & GIS; Oracle OCI Data Science; IIT Kanpur MATLAB/Simulink Aircraft Control
- **Leadership:** Mentor @ Abhyudaya (SPJIMR); Head of PR, Astrophysics Club SPIT
- **Education:** SPIT — B.Comp Eng (minor IoT); Prakash College of Science & Commerce
- **Languages:** English, Marathi, Hindi, Gujarati (fluent); German (A2)

---

## 2. Purpose, Audience & Scope (decided)

- **Primary audience:** Research professors / grad-school admissions (rigor + depth first)
- **Goal:** Balanced — resume/contact, deep project exploration, AND memorability all matter (no single dominant CTA)
- **Timeline:** No hard deadline — quality-first, staged build
- **Scope ambition:** GO BIG — full immersive vision (dual modes, LEGO lab, terminal, solar system, constellations, fortune cookie) built incrementally on a strong core

---

## 3. Content Depth (decided)

- **Flagship paper** (`D:\Portfolio\Published Paper.pdf`): "Poisoning-Resistant Federated Intrusion Detection System: An Adaptive Multi-Layered Defense Approach," accepted @ AISIIS 2026. **Co-authored** (9 student authors + faculty advisor Abhijeet Salunke; first author Vishwajit Sarnobat; Yessica is a co-author). Contribution: PR-FIDS + Adaptive Honeypot (dynamic relative-performance baseline), CNN-LSTM on NSL-KDD; neutralizes label-flipping + backdoor attacks at 30% malicious-client ratio, ~16.5% compute overhead. **Represent honestly as co-author; link PDF.**
- **Projects:** 3 flagship projects, each built RICHLY (Wired Lab CV, Green AI, AR Indoor Navigation). **Narratives (methodology, diagrams, challenges, lessons) to be written from scratch later** — design must leave structured space/placeholders for these. Other/smaller projects intentionally omitted to keep focus.
- **Experience:** IIT Bombay Wired Lab is the ONLY formal experience (don't pad).
- **Resume PDF & photo:** to be finalized/updated later — build with a swappable asset slot.

---

## 4. Experience Architecture (decided)

- **Default mode:** Professional Mode (dignified, fast, distraction-free). Explorer Mode = clearly-offered opt-in.
- **Navigation:** Conventional, accessible nav is primary + always works. Interactive solar system is an ALTERNATE/feature way to explore domains, not the sole nav.
- **Professional Mode keeps:** tasteful section animations ONLY.
- **Explorer-Mode-only (hidden until opted in):** dark/light theme toggle, interactive solar system, LEGO Character Laboratory, secret terminal, constellation achievements, fortune cookie, richer motion.
- **Consequence to confirm:** Professional Mode = ONE fixed theme (toggle is Explorer-only). Which fixed theme = TBD in Aesthetics topic.

---

## 5. Aesthetic Direction (decided)

- **Professional Mode fixed theme:** Light — "observatory at sunrise" (ivory, sandstone, brass, slate). Dark "deep-space" theme available via toggle in Explorer Mode.
- **Star Wars references:** Whisper-quiet. Nothing reads as fandom on the surface; lives in naming/structure/hidden discoveries only. Preserves academic credibility.
- **Typography personality:** Warm academic — literary serif for headings + clean humanist sans for body (specific fonts TBD).
- **Motion:** Rich & cinematic (starfields, celestial transitions, animated diagrams) reserved mostly for Explorer Mode; Professional Mode stays calm. ALWAYS honor `prefers-reduced-motion`.

---

## 6. Signature Interactive Features (decided + proposed)

- **Professional vs Explorer Mode** — persistent toggle; Professional default. Explorer unlocks theme toggle, solar system, LEGO lab, terminal, constellations, fortune cookie, richer motion.
- **LEGO Character Laboratory** — visitor assembles a professional (AI Researcher, Robotics Engineer, Systems Architect) or galactic (Jedi Researcher, Sith Scholar, Republic Navigator, Mandalorian Engineer, Droid Architect) character. Output = a **shareable keepsake card** (rendered image + themed title/quote) they can screenshot/download. No routing agenda — pure delight & memorability.
- **Interactive Solar System** — represents Yessica's genuine research domains. **PROPOSED (confirm):** central **star = AI/CV core identity**; two **major planets = (1) Computer Vision & Perception, (2) Spatial-AR & Aerospace Systems**; secondary real works as **moons** — Green AI project + AISIIS federated-IDS paper orbit the relevant planet. Clicking a body reveals related projects/paper. Alternate nav, not the only nav.
- **Fortune Cookie** — floating cookie that physically cracks open to reveal a quote on courage/discipline/curiosity/leadership/perseverance. Quote pool = **my curated starter set + Yessica's personal favorites** (mix). Franchises: Star Wars, Star Trek, Top Gun, Disney, Pixar, DreamWorks, Naruto, Vinland Saga. (Cadence TBD: daily vs on-demand — lean "new one each open, one 'featured' per day.")
- **Secret Observatory Terminal (accepted)** — discoverable CLI (e.g., summoned by a key/console icon). Commands surface REAL info + easter eggs: `help`, `whoami`, `ls projects`, `open <project>`, `paper`, `contact`, `theme dark`, plus hidden lore commands (`archives`, `holocron`, `hyperspace`). Keyboard-accessible.
- **Constellation Achievements (accepted)** — VISITOR-side exploration rewards (distinct from Yessica's real Achievements section). Exploring hidden spots "lights up stars" that form constellations; a quiet tracker shows discoveries. Gentle gamification, never blocks content.

## 7. Site Map / Sections (from brief)

About (photo, intro paragraph, resume download, GitHub + LinkedIn) · Experience · Projects (organized by DOMAIN, not chronology; each: overview, methodology, architecture diagram, tech stack, challenges, lessons — **narratives written later, design leaves structured placeholders**) · Certifications · Achievements (incl. paper, hackathon rank, leadership) · Education (timeline / "mission trajectory").

---

## Decisions Log

| # | Decision | Choice | Notes |
|---|----------|--------|-------|
| 1 | Vision + proposed designs | ✅ Confirmed by user | Solar system star/planets/moons OK; terminal OK; constellations OK; fortune cookie = **new quote per open** (no daily-featured mechanic) |
| 2 | Frontend stack | **React + Vite + TypeScript** | The hard-to-undo choice; ideal for heavy custom interactivity |
| 3 | Backend / database / auth | **None** | Static site; visitor state (mode, theme, constellation progress) in localStorage |
| 4 | Hosting | **GitHub Pages** | Free; repo doubles as code showcase; custom domain possible later |
| 5 | Contact | **mailto + LinkedIn/GitHub buttons** | No form service; can add a form later without rework |
| 6 | Fonts | **Fraunces (serif headings) + Source Sans 3 (body)**, self-hosted via @fontsource | Warm-academic pairing; self-hosting = fast, private, offline-safe |
| 7 | Repo layout | App lives in `d:\Portfolio\site\`; docs + paper stay at root | git init + GitHub push deferred to deploy stage (Stage 8) |
| 8 | Palette (user revision, 2026-07-11) | charcoal `#474350` · mint-cream `#F8FFF4` · ivory `#FCFFEB` · cream `#FAFAC6` · peach-glow `#FECDAA` | Peach used decoratively; derived `#A85524` for readable links/kickers (AA) |
| 9 | Copy tone (user revision) | No subcommentary/taglines; kickers only on Experience/Projects/Research | Removed hero role line, section ledes, project "in preparation" note, co-author pride line |
| 10 | Projects UI | One-line rows (short name + domain) expanding on click | Full title, overview, tech chips inside panel |
| 11 | Logos | IITB, ISRO, Oracle, IITK, SPIT downloaded; SPJIMR stands in for Abhyudaya | In `site/public/assets/logos/`; swap Abhyudaya's real logo if available |
| 12 | Achievements montage | Crossfade + Ken Burns slideshow, 4 swappable images | Placeholders in `site/public/assets/montage/` — replace with real photos, update `montage` list in profile.ts |
| 13 | ~~ARCHITECTURE PIVOT~~ superseded by #14 | — | — |
| 14 | **FINAL ARCHITECTURE (user, 2026-07-11)** | Two pages via hash routing: main desk (light, professional) at `#/` + **Explorer Mode page** at `#/explorer` | Explorer = dark deep-space default, starfield canvas, LEGO crew, solar system, terminal, fortune cookie, constellations. Supersedes section 4. |
| 15 | LEGO figurines = working buttons | Obi-Wan→light theme · Vader→dark theme · R2-D2→terminal · Maul→constellation panel · Jar Jar→fortune cookie | Assets in `site/public/assets/lego/`; component `LegoExplorers.tsx` takes `onAction` |
| 16 | Explorer features shipped | Starfield (hyperspace-capable), solar system (star+2 planets+2 moons), terminal (`help/whoami/projects/open/paper/contact/theme/clear` + hidden `archives/holocron/hyperspace`, backtick hotkey), fortune cookie (new quote per crack), 5-star constellation tracker (localStorage) | Discoveries: stargazer/surveyor/archivist/operator/fortune |
| 14 | Animation library | **Framer Motion** | Replaces CSS-only accordion/reveal; used for accordion expand, chevron rotation, certificate reveal, lightbox zoom, section scroll-reveal |
| 15 | Projects accordion (user revision, 2026-07-11) | Framer Motion `AnimatePresence` expand/collapse | Extended Project interface with `details`, `github`, `paperLink`, `demoLink`, `images` fields |
| 16 | Certifications (user revision, 2026-07-11) | Expandable cards with "View Certificate" button | Shows completion date, cert ID, skills chips, PDF download. PDFs copied to `site/public/assets/certificates/` |
| 17 | Achievements montage (user revision, 2026-07-11) | Infinite scrolling marquee + lightbox | Replaced Ken Burns crossfade; now continuous R→L scroll, hover pause, arrow nav, click-to-expand lightbox with keyboard navigation |
| 19 | **EXPLORER ARCADE (user, 2026-07-11) — CURRENT STATE** | Explorer page rebuilt as a Star Wars fun site, no commentary text | Right sticky **Cantina Radio** (Cantina Band, Maul, Vader, Duel of the Fates, Across the Stars — 30s previews streamed from the public iTunes Search API at runtime); **Minifigure Factory** (LEGO.com-style: yellow chassis, red accents, part tabs HEAD/FACE/TORSO/LEGS/GEAR with visual SVG swatches, name plate, SAVE PNG, SEND TO YESSICA via mailto+config code); **Holo-Tetris** (canvas, keyboard + touch pad, saber-colored pieces, "THE FORCE IS NOT WITH YOU"); **Droid Decoder** (Web-Audio R2 chirps, 4-choice translation quiz, score+streak); **Obi-Wan figurine = RETURN button** at page end. |
| 18 | Explorer reset (superseded by #19) | Explorer page emptied to a bare dark shell ("station under construction"); **ALL features are Explorer-only from now on** | No Explorer/LEGO-Lab/Explorers nav entries. Entry = **Vader + Maul figurine buttons** after Education (`LegoExplorers.tsx`). Feature components kept on disk for staged reintroduction: Terminal, FortuneCookie, ConstellationPanel, Starfield, HyperspaceJump, LegoLab (foundry w/ mailto transmit), SolarSystem. Supersedes #14–16 (first set) and #15 (crew actions). |
| 20 | **Portfolio-advice pass (2026-09-29)** | Hero states discipline + carries the real photo; resume PDF live; Projects split into "Selected work" (3 flagship) + "Also built" (2); case-study fields (`problem`/`challenges`/`outcomes`) added to the Project schema; `#contact` CTA section + nav entry | An affiliation logo strip was added under the hero and **removed on 2026-09-29 at the user's request**.  Applied against a hero/quality/case-study/social-proof/CTA checklist. Partially conflicts with decision #9 (no taglines): the hero kicker now leads with "AI & Computer Vision" and Contact carries a one-line lead. Still missing: testimonials, measured outcomes per project, real LinkedIn/GitHub URLs, real montage photos. |
| 21 | **CV alignment pass (2026-09-29)** | Site reconciled against `YessicaSule_CV.pdf` (newer than `context.md`) | Fixed: education dates (2023–2027 / 2021–2023), Prakash name + MHT-CET 99.52%ile, IITB title/dates + CV bullets, BSERC internship added, AR + Medical Care stacks corrected, IEEE added to paper venue, India Innovates organiser, Goethe-Institut A2, Abhyudaya dates. **Certificate files were wrong:** `iitk-aircraft-control.pdf` was an ISKCON volunteer certificate (p.2 = another person) — deleted, entry repointed at the real `nptel-certificate.pdf`; Oracle entry retitled to the credential the PDF actually shows. Invented cert IDs/dates replaced with real ones read from the PDFs. |
| 22 | **Explorer aesthetic pass (2026-09-29)** | Arrival + depth + panel chrome, no feature changes | Opening crawl ("Episode IV½ · The Explorer Station") now uses the orphaned `.crawl-*` CSS that was in the stylesheet but wired to nothing; runs with a −7s delay so it is mid-flight on arrival. Layered nebula gradient behind the starfield (`.explorer::before`); starfield density raised (160→280 stars). Shared holo chrome on `.factory`/`.tetris`/`.decoder`/`.radio`: cyan hairline ring, lit top edge, lift on hover. Wider rhythm between stations. |
| 23 | **Photobooth + Decoder removal (2026-09-29)** | `Photobooth.tsx` added to the Explorer aside, directly under Cantina Radio; Droid Decoder unmounted. **Four-frame strip** (seaside-booth format, per user reference) composed on canvas with a hand-rolled cool duotone — luminance → S-curve → blue lift in the shadows — plus grain and vignette; shutter flash and a 1/4 tally between shots | Webcam capture is 100% client-side (getUserMedia, canvas compose, camera stopped on capture/unmount). **"Send to Yessica" is a save + `mailto:` handoff, not a true upload** — `mailto:` cannot carry an attachment and decision #3 says no backend. Upgrade path for one-click send: EmailJS or Formspree (needs an account + public key, and visitor photos would then transit a third party). New discovery id `portrait`. DroidDecoder.tsx + its CSS kept on disk, unreferenced, per the #18 practice. |
| 24 | **Project panel layout (2026-09-29)** | `.acc__panel-inner` split into `.acc__col-text` + `.acc__col-media` | Screenshot frame moved to the right column with the GitHub/paper/demo links stacked beneath it, so the panel's empty right half is used; collapses to one column under 860px. |

---

## BUILD PLAN — small reviewable stages

- **Stage 1 — Professional Mode core** ⬅ CURRENT: Vite scaffold, design tokens (sunrise light theme), typography, accessible nav + layout, all 6 sections with real resume content + structured narrative placeholders, footer, responsive, reduced-motion baseline.
- **Stage 2 — Content polish:** rich project detail panels (methodology / architecture diagram / challenges / lessons placeholders), paper feature block (honest co-author framing, PDF link), education "mission trajectory" timeline, swappable resume/photo asset slots.
- **Stage 3 — Explorer Mode core:** mode toggle + persistence, dark "deep-space" theme, starfield, richer motion.
- **Stage 4 — Interactive solar system** (star = AI/CV core; planets = CV & Perception, Spatial-AR & Aerospace; moons = Green AI, AISIIS paper).
- **Stage 5 — Secret observatory terminal** (real commands + hidden lore commands).
- **Stage 6 — LEGO Character Laboratory** (builder + downloadable keepsake card).
- **Stage 7 — Constellation discoveries + fortune cookie** (curated quote set + Yessica's favorites).
- **Stage 8 — Polish & launch:** accessibility audit, performance pass, SEO/meta, git repo + GitHub Pages deploy (+ custom domain if desired).

Each stage ends with a review checkpoint before the next begins.

## Open Questions
- Custom domain (e.g., yessicasule.com) — decide at Stage 8; ~$10–15/yr, easy to add anytime.
- Exact LinkedIn + GitHub URLs, final resume PDF, professional photo — needed by Stage 2.
- Yessica's personal favorite quotes for the fortune cookie — needed by Stage 7.
