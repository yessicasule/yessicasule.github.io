/**
 * Single source of truth for all site content.
 * Derived from the resume in d:\Portfolio\context.md — edit here, not in components.
 */

export const identity = {
  name: "Yessica Sule",
  role: "Final-year Computer Engineering student, Sardar Patel Institute of Technology",
  tagline: "",
  location: "Mumbai, India",
  email: "yessicasule@gmail.com",
  // TODO(Yessica): confirm exact profile URLs before Stage 2 review
  linkedin: "https://www.linkedin.com/in/yessica-sule",
  github: "https://github.com/yessicasule",
  intro:
    "I work at the intersection of AI, computer vision, robotics, and efficient machine learning systems. " +
    "I build from first principles when necessary, " +
    "benchmark what I build, and keep iterating until it delivers real results — whether it's research, " +
    "engineering, experimentation, or something completely new. Learn by doing, turn ideas into results.",
  languages: ["English", "Marathi", "Hindi", "Gujarati", "German (A2)"],
  /** Swappable asset slot — replace the PDF at site/public/assets/resume.pdf */
  resumeHref: "assets/resume.pdf" as string | null,
  /** Swappable asset slot — replace the photo at site/public/assets/portrait.jpg */
  portraitSrc: "assets/portrait.jpg" as string | null,
};

export interface RoleCertificate {
  /** The PDF a visitor opens. */
  href: string;
  /** Rendered first page, shown as the expandable preview. */
  preview: string;
  label: string;
}

export const experience = [
  {
    title: "Software Engineer Research Intern",
    org: "Wired Lab, Indian Institute of Technology Bombay (IITB)",
    period: "Feb 2026 – July 2026",
    location: "Mumbai, Maharashtra",
    logo: "assets/logos/iitb.svg",
    summary:
      "Computer-vision research for rehabilitation robotics — turning a single camera " +
      "into a reliable instrument for measuring human movement.",
    bullets: [
      "Developed a monocular vision-based human motion tracking system using Python, OpenCV, and MediaPipe for real-time arm joint angle estimation.",
      "Designed a real-time Unity 3D Digital Twin driven by custom C# UDP socket listeners, animating a 4-avatar side-by-side comparative playback scene at 30+ FPS.",
      "Created an interactive calibration wizard and real-time CSV data logging/visualization suite using SciPy and Matplotlib for dynamic time-series kinematic analysis.",
    ],
  },
  {
    title: "Defence-Space Summer Intern",
    org: "Bharat Space Education Research Centre (BSERC)",
    period: "June 2026 – July 2026",
    location: "Remote",
    logo: null as string | null,
    certificate: {
      href: "assets/certificates/bserc.pdf",
      preview: "assets/certificates/bserc.jpg",
      label: "Internship certificate",
    } as RoleCertificate | undefined,
    summary:
      "A summer programme on AI and engineering for defence and aerospace ecosystems.",
    bullets: [
      "Studied Generative AI, Cyber Security & Digital Forensics, and AI-driven applications for defence and aerospace ecosystems.",
      "Received technical training in Advanced Drone Technology (Air Taxi & Defence UAVs), Aircraft Design, Rocketry Design, EV Technology & Charging Infrastructure, and Robotics Engineering.",
    ],
  },
  {
    title: "Volunteer",
    org: "Abhyudaya, S. P. Jain Institute of Management and Research",
    period: "April 2025 – Feb 2026",
    location: "Mumbai, Maharashtra",
    logo: "assets/logos/spjimr.png" as string | null,
    certificate: {
      href: "assets/certificates/abhyudaya.pdf",
      preview: "assets/certificates/abhyudaya.jpg",
      label: "Volunteering letter",
    } as RoleCertificate | undefined,
    summary:
      "Year-long teaching commitment with SPJIMR's social initiative for underprivileged students.",
    bullets: [
      "Mentored and taught underprivileged students, evaluated examination papers, and assisted in organising and conducting educational workshops tailored to different learning levels and academic needs.",
    ],
  },
];

export interface ProjectMedia {
  src: string;
  type: "image" | "video";
  /** Still shown before a video is played, so nothing downloads unasked. */
  poster?: string;
}

export interface Project {
  id: string;
  /** Flagship work — rendered first, under "Selected work" */
  featured?: boolean;
  /** Short one-line name shown in the collapsed row */
  short: string;
  domain: string;
  title: string;
  overview: string;
  stack: string[];
  /** Optional extended fields for expanded accordion panel */
  details?: string;
  /** Case-study fields. Anything left undefined simply isn't rendered. */
  problem?: string;
  approach?: string;
  challenges?: string;
  /** Measured results only — leave undefined until there is a real number. */
  outcomes?: string;
  github?: string;
  paperLink?: string;
  demoLink?: string;
  /**
   * Screenshots and demo clips, shown in order. Files live in
   * site/public/assets/shots/<project id>/ and keep their original numbering,
   * which is the order they appear in.
   */
  media?: ProjectMedia[];
}

/**
 * TODO(Yessica): every project below still needs `challenges` and `outcomes`.
 * `outcomes` is the one recruiters and professors read hardest — write a real
 * measured result (accuracy, latency, energy saved, users, rank) or leave it
 * out entirely. Never a guess.
 */
export const projects: Project[] = [
  {
    id: "motion-tracking",
    media: [
      { src: "assets/shots/motion-tracking/1.mp4", type: "video", poster: "assets/shots/motion-tracking/2.png" },
      { src: "assets/shots/motion-tracking/2.png", type: "image" },
    ],
    github: "https://github.com/yessicasule/Monocular-Vision-Based-Estimation",
    featured: true,
    short: "Human Motion Tracking",
    domain: "Computer Vision & Perception",
    title: "Monocular Human Motion Tracking for Rehabilitation Robotics",
    overview:
      "Measuring how well a patient can move their arm normally needs an expensive " +
      "motion-capture lab. This does it with one ordinary camera: it watches the patient " +
      "move, works out how far each joint is bending, and draws a live 3D figure copying " +
      "them on screen, so the patient and the clinician can both see progress as it " +
      "happens. Built during my research internship at Wired Lab, IIT Bombay.",
    stack: ["Python", "OpenCV", "MediaPipe", "Signal Processing", "UDP", "Unity"],
    details:
      "MediaPipe Pose supplies the initial landmarks; a custom Kalman filter smooths the " +
      "jitter that makes raw single-camera pose estimation unusable for measurement. Joint " +
      "angles are derived through 3D vector math and streamed over UDP at 30 fps into a " +
      "Unity digital twin, which plays four avatars side by side so model outputs can be " +
      "compared against each other in motion. The stream carries confidence scores and " +
      "uncertainty metrics alongside the angles, and an interactive calibration wizard with " +
      "SciPy/Matplotlib CSV logging supports time-series kinematic analysis after a session.",
  },
  {
    id: "ar-indoor-navigation",
    media: [
      { src: "assets/shots/ar-indoor-navigation/1.mp4", type: "video", poster: "assets/shots/ar-indoor-navigation/2.jpg" },
      { src: "assets/shots/ar-indoor-navigation/2.jpg", type: "image" },
      { src: "assets/shots/ar-indoor-navigation/3.png", type: "image" },
      { src: "assets/shots/ar-indoor-navigation/4.png", type: "image" },
      { src: "assets/shots/ar-indoor-navigation/5.jpg", type: "image" },
      { src: "assets/shots/ar-indoor-navigation/6.jpg", type: "image" },
      { src: "assets/shots/ar-indoor-navigation/7.jpg", type: "image" },
    ],
    github: "https://github.com/yessicasule/Indoor-Navigation-System",
    featured: true,
    short: "AR Indoor Navigation",
    domain: "Spatial Computing & Navigation",
    title: "AR-Based Indoor Navigation System",
    overview:
      "GPS stops working the moment you walk indoors, which is why people get lost in " +
      "places like metro stations and hospitals. This phone app shows the way by drawing " +
      "arrows directly onto the live camera view, so you follow them through the building " +
      "the way you would follow signs — with a map, step-by-step directions and a search " +
      "for what is nearby if you prefer those instead.",
    stack: ["React Native", "ViroReact", "Node.js", "Express", "Firebase", "A* Pathfinding"],
    details:
      "The React Native client renders 3D directional overlays through ViroReact. Position " +
      "indoors comes from SLAM tracking corrected by QR anchor points, which bounds the " +
      "drift that makes pure visual-inertial tracking unreliable over a long walk. A " +
      "Node.js/Express backend models the venue as a waypoint graph and solves routes with " +
      "A*, recomputing when the user leaves the path; Firebase stores the venue and " +
      "waypoint data.",
  },
  {
    id: "green-ai",
    media: [
      { src: "assets/shots/green-ai/1.png", type: "image" },
      { src: "assets/shots/green-ai/2.png", type: "image" },
      { src: "assets/shots/green-ai/3.png", type: "image" },
      { src: "assets/shots/green-ai/4.png", type: "image" },
      { src: "assets/shots/green-ai/5.png", type: "image" },
    ],
    github: "https://github.com/yessicasule/greenAI",
    featured: true,
    short: "Green AI",
    domain: "Sustainable & Efficient AI",
    title: "Green AI — Energy-Aware Inference Framework",
    overview:
      "Running AI models burns a lot of electricity, and much of it is wasted: a simple " +
      "question gets answered by the same heavyweight model as a hard one. This works out " +
      "how difficult each question actually is, then routes it to the lightest setting that " +
      "can still answer it properly — cutting the energy a system uses without the answers " +
      "getting worse.",
    stack: ["Python", "Fuzzy Logic", "RouteLLM", "Quantization", "LLM Optimization"],
    details:
      "A fuzzy inference system scores prompt complexity from token count, vocabulary " +
      "diversity and syntactic depth — fuzzy rather than a hard threshold because the " +
      "boundary between an easy and a hard prompt is genuinely gradual. RouteLLM then " +
      "selects the cheapest model variant expected to clear the quality bar. Quantization " +
      "profiles at 4, 8, 12 and 16 bits are pre-calibrated per model, so precision can be " +
      "switched per request rather than per deployment, keeping accuracy loss minimal.",
  },
  {
    id: "multilingual-nlp",
    media: [
      { src: "assets/shots/multilingual-nlp/1.png", type: "image" },
      { src: "assets/shots/multilingual-nlp/2.png", type: "image" },
      { src: "assets/shots/multilingual-nlp/3.png", type: "image" },
      { src: "assets/shots/multilingual-nlp/4.png", type: "image" },
    ],
    github: "https://github.com/yessicasule/Communication-Analyzer",
    short: "Multilingual Text Analysis",
    domain: "NLP & Multilingual AI",
    title: "Intelligent Multilingual Text Analysis Platform",
    overview:
      "Most text-analysis tools only really work in English. This one reads writing in " +
      "several languages and reports what it finds: the mood of the text, the words that " +
      "carry the most meaning, and how the same idea gets expressed differently from one " +
      "language to the next — including languages that do not share an alphabet.",
    stack: ["Python", "NLP", "Tokenization", "Sentiment Analysis", "Data Visualization"],
    details:
      "Built to generalise NLP pipelines beyond English-centric datasets. Preprocessing, " +
      "feature extraction and analysis are separate modules, so a new language, tokenizer " +
      "or model can be swapped in without touching the rest of the pipeline — the part that " +
      "usually breaks when a monolingual tool is stretched to cover more languages. " +
      "Tokenization and lemmatization are language-aware rather than shared, since " +
      "whitespace segmentation fails outside Latin scripts. Output is statistical summaries " +
      "and interactive visualisations of vocabulary distribution, sentiment trend and " +
      "cross-document semantic relationships.",
  },
  {
    id: "medical-care",
    media: [
      { src: "assets/shots/medical-care/1.png", type: "image" },
      { src: "assets/shots/medical-care/2.png", type: "image" },
      { src: "assets/shots/medical-care/3.png", type: "image" },
      { src: "assets/shots/medical-care/4.png", type: "image" },
      { src: "assets/shots/medical-care/5.png", type: "image" },
      { src: "assets/shots/medical-care/6.png", type: "image" },
      { src: "assets/shots/medical-care/7.png", type: "image" },
      { src: "assets/shots/medical-care/8.png", type: "image" },
    ],
    github: "https://github.com/yessicasule/med",
    short: "Medical Care Management",
    domain: "Healthcare Technology & Full-Stack",
    title: "Medical Care Management System",
    overview:
      "Clinics usually run appointments, patient records and billing across separate " +
      "systems and a lot of paper. This puts all of it in one place and gives each group of " +
      "people their own view of it — patients, doctors, receptionists and administrators. " +
      "It also runs the waiting queue itself: issuing tokens, ordering patients by urgency, " +
      "and telling each one roughly how long the wait will be.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query"],
    details:
      "Role-based access separates the Patient, Doctor, Receptionist and Administrator " +
      "views over shared records. Queue management is automated through priority " +
      "scheduling, token generation and wait-time estimation. TanStack Query holds the " +
      "queue state, so the reception desk, the consulting room and the waiting patient read " +
      "the same position rather than three cached copies drifting apart.",
  },
];

export const paper = {
  title:
    "Poisoning-Resistant Federated Intrusion Detection System: An Adaptive Multi-Layered Defense Approach",
  venue: "Accepted at IEEE AISIIS 2026",
  role: "Co-author",
  summary:
    "A federated intrusion detection system that stays trustworthy even when clients turn " +
    "malicious. The team's PR-FIDS pairs a CNN-LSTM detector (NSL-KDD) with an adaptive " +
    "honeypot defense using a dynamic relative-performance baseline — neutralizing " +
    "label-flipping and backdoor attacks at a 30% malicious-client ratio with roughly " +
    "16.5% compute overhead.",
  pdfHref: "assets/published-paper.pdf",
  certificate: {
    href: "assets/certificates/aisiis.pdf",
    preview: "assets/certificates/aisiis.jpg",
    label: "IEEE AISIIS 2026 certificate",
  },
};

export interface Certification {
  title: string;
  issuer: string;
  logo: string;
  /** Optional fields for expanded certificate view */
  certificatePdf?: string;
  completionDate?: string;
  certificateId?: string;
  skills?: string[];
  verifyLink?: string;
}

export const certifications: Certification[] = [
  {
    title: "Remote Sensing & GIS for Environmental Studies",
    issuer: "Indian Institute of Remote Sensing (IIRS), ISRO Dehradun",
    logo: "assets/logos/isro.svg",
    certificatePdf: "assets/certificates/isro-remote-sensing-gis.pdf",
    completionDate: "July 2021 · online summer school",
    certificateId: "IIRS202110154341",
    skills: ["Remote Sensing", "Geographic Information Systems", "Satellite Image Analysis", "Geospatial Data Processing"],
  },
  {
    title: "Oracle Fusion AI Agent Studio — Certified Foundations Associate (Rel 1)",
    issuer: "Oracle University",
    logo: "assets/logos/oracle.svg",
    certificatePdf: "assets/certificates/oracle-oci-data-science.pdf",
    completionDate: "31 October 2025",
    certificateId: "323492585OFAASOFA",
    skills: ["AI Agents", "Oracle Fusion", "Applied AI", "Cloud Platform"],
  },
  {
    title: "Advanced Aircraft Control Systems with MATLAB/Simulink",
    issuer: "NPTEL Online Certification · IIT Kanpur",
    logo: "assets/logos/iitk.svg",
    certificatePdf: "assets/certificates/nptel-certificate.pdf",
    completionDate: "Jan–Apr 2026 · 12-week course, Elite",
    certificateId: "NPTEL26AE09S661301013",
    skills: ["MATLAB", "Simulink", "Control Systems", "Aircraft Dynamics"],
  },
];

export const achievements = [
  {
    title: "Ranked 5th — India Innovates National Hackathon",
    detail: "National hackathon organised by the Municipal Corporation of Delhi.",
    logo: null as string | null,
  },
  {
    title: "Certified A2 German Speaker — Goethe-Institut",
    detail: "Currently pursuing B1-level certification.",
    logo: null as string | null,
  },
];

export const leadership = [
  {
    title: "Head of Public Relations — Astrophysics Club, S.P.I.T.",
    detail: "Leading outreach and communication for the institute's astrophysics community.",
    logo: "assets/logos/spit.png" as string | null,
  },
];

export interface MontageImage {
  src: string;
  alt: string;
}

/** Achievement photos — keep the list in display order. */
export const montage: MontageImage[] = [
  {
    src: "assets/montage/india-innovates-2026.jpg",
    alt: "Yessica with her team at the India Innovates 2026 national hackathon in Delhi.",
  },
  {
    src: "assets/montage/ieee-ies-conference.jpg",
    alt: "Yessica and co-presenters at the IEEE Industrial Electronics Society conference, KLH University.",
  },
  {
    src: "assets/montage/ieee-ies-stage.jpg",
    alt: "Yessica on stage at the IEEE Industrial Electronics Society conference, KLH University Aziznagar campus.",
  },
  {
    src: "assets/montage/spjimr-abhyudaya-certificate.jpg",
    alt: "Yessica receiving her SPJIMR Abhyudaya teaching-volunteer certificate.",
  },
  {
    src: "assets/montage/spjimr-campus.jpg",
    alt: "Yessica with fellow Abhyudaya volunteers at the Bharatiya Vidya Bhavan's SPJIMR campus.",
  },
  {
    src: "assets/montage/abhyudaya-classroom.jpg",
    alt: "A classroom session with students working at laptops.",
  },
  {
    src: "assets/montage/campus-event.jpg",
    alt: "Yessica with a faculty member and a fellow student at an evening campus event.",
  },
  {
    src: "assets/montage/project-team.jpg",
    alt: "Yessica with her project team in front of a lecture-hall blackboard.",
  },
];

export const education = [
  {
    school: "Sardar Patel Institute of Technology, Mumbai",
    credential: "Bachelor of Computer Engineering · Minor in IoT",
    years: "2023–2027",
    logo: null as string | null,
  },
  {
    school: "Prakash College of Commerce and Science",
    credential: "Higher secondary education · MHT-CET 99.52 percentile",
    years: "2021–2023",
    logo: null as string | null,
  },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
