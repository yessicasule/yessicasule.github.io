/**
 * Single source of truth for all site content.
 * Derived from the resume in d:\Portfolio\context.md — edit here, not in components.
 */

export const identity = {
  name: "Yessica Sule",
  role: "AI & Computer Vision",
  tagline: "Final-year Computer Engineering student, Sardar Patel Institute of Technology",
  location: "Mumbai, India",
  email: "yessicasule@gmail.com",
  // TODO(Yessica): confirm exact profile URLs before Stage 2 review
  linkedin: "https://www.linkedin.com/in/yessica-sule",
  github: "https://github.com/yessicasule",
  intro:
    "I work at the intersection of AI and computer vision — from real-time human " +
    "motion tracking for rehabilitation robotics to energy-aware model inference. " +
    "I care about rigor: benchmarked pipelines, honest evaluation, and systems that " +
    "hold up outside the demo. I am willing to learn, and I will deliver results.",
  languages: ["English", "Marathi", "Hindi", "Gujarati", "German (A2)"],
  /** Swappable asset slot — replace the PDF at site/public/assets/resume.pdf */
  resumeHref: "assets/resume.pdf" as string | null,
  /** Swappable asset slot — replace the photo at site/public/assets/portrait.jpg */
  portraitSrc: "assets/portrait.jpg" as string | null,
};

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
      "Built a modular Python-to-Unity socket communication protocol streaming synchronized multi-model joint angles, confidence scores, and real-time uncertainty metrics.",
      "Created an interactive calibration wizard and real-time CSV data logging/visualization suite using SciPy and Matplotlib for dynamic time-series kinematic analysis.",
    ],
  },
  {
    title: "Defence-Space Summer Intern",
    org: "Bharat Space Education Research Centre (BSERC)",
    period: "June 2026 – July 2026",
    location: "Remote",
    logo: null as string | null,
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
    github: "https://github.com/yessicasule/Monocular-Vision-Based-Estimation",
    featured: true,
    short: "Human Motion Tracking",
    domain: "Computer Vision & Perception",
    title: "Monocular Human Motion Tracking for Rehabilitation Robotics",
    overview:
      "A single-camera system that estimates arm joint angles in real time and streams " +
      "them into a rehabilitation robotics pipeline — pose estimation, signal filtering, " +
      "UDP transport, and live Unity visualization, validated with biomechanical benchmarking. " +
      "Built during my research internship at Wired Lab, IIT Bombay.",
    stack: ["Python", "OpenCV", "MediaPipe", "Signal Processing", "UDP", "Unity"],
    details:
      "The system uses MediaPipe Pose for initial landmark detection, followed by a custom " +
      "Kalman filter for noise reduction. Joint angles are computed via 3D vector math and " +
      "streamed over UDP at 30 fps to a Unity-based rehabilitation interface that provides " +
      "real-time visual feedback to patients and clinicians.",
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
      "A full-stack indoor guidance platform: augmented-reality navigation overlaid on " +
      "the real world, an interactive map view, route planning, and nearby search — " +
      "solving wayfinding where GPS can't follow.",
    stack: ["React Native", "ViroReact", "Node.js", "Express", "Firebase", "A* Pathfinding"],
    details:
      "The React Native client renders 3D directional overlays through ViroReact, combining " +
      "SLAM tracking with QR-based positioning to stay located indoors. A Node.js/Express " +
      "backend computes optimal routes with the A* algorithm over graph-based waypoints and " +
      "handles dynamic route management, with Firebase behind the venue data.",
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
      "An inference framework that dynamically adjusts model precision (4-, 8-, 12-, and " +
      "16-bit) based on prompt complexity using fuzzy-logic decision-making, with " +
      "intelligent routing and quantization to cut computational cost and energy use " +
      "while preserving response quality.",
    stack: ["Python", "Fuzzy Logic", "RouteLLM", "Quantization", "LLM Optimization"],
    details:
      "Prompt complexity is scored by a fuzzy inference system (token count, vocabulary " +
      "diversity, syntactic depth). RouteLLM then selects the most energy-efficient model " +
      "variant capable of producing quality output. Quantization profiles (4/8/12/16-bit) " +
      "are pre-calibrated per model, allowing instant switching with minimal accuracy loss.",
  },
  {
    id: "multilingual-nlp",
    github: "https://github.com/yessicasule/Communication-Analyzer",
    short: "Multilingual Text Analysis",
    domain: "NLP & Multilingual AI",
    title: "Intelligent Multilingual Text Analysis Platform",
    overview:
      "A multilingual NLP platform that analyzes, compares, and interprets text across " +
      "multiple languages using a modular pipeline — language-aware preprocessing, " +
      "tokenization, lemmatization, sentiment analysis, keyword extraction, and linguistic " +
      "pattern discovery with comparative analysis between languages and writing systems.",
    stack: ["Python", "NLP", "Tokenization", "Sentiment Analysis", "Data Visualization"],
    details:
      "Designed to generalize NLP pipelines beyond English-centric datasets. The architecture " +
      "separates preprocessing, feature extraction, and analysis modules for rapid experimentation " +
      "with new languages, tokenizers, and ML models. Provides interactive visualizations and " +
      "statistical summaries of vocabulary distributions, sentiment trends, and semantic " +
      "relationships across documents — suitable for linguistic research and multilingual " +
      "content intelligence.",
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
      "A comprehensive healthcare management platform with dedicated portals for patients, " +
      "doctors, receptionists, and administrators — centralizing appointment scheduling, " +
      "medical records, billing, and patient management into a single secure platform.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query"],
    details:
      "Role-based access separates the Patient, Doctor, Receptionist and Administrator " +
      "views. The platform automates patient queue management with priority scheduling, " +
      "token generation and wait-time estimation, and uses TanStack Query to keep those " +
      "queues synchronised across the people watching them.",
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
    src: "assets/montage/spjimr-abhyudaya-certificate.jpg",
    alt: "Yessica receiving her SPJIMR Abhyudaya teaching-volunteer certificate.",
  },
  {
    src: "assets/montage/spjimr-campus.jpg",
    alt: "Yessica with fellow Abhyudaya volunteers at the Bharatiya Vidya Bhavan's SPJIMR campus.",
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
