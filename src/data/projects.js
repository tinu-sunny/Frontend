export const projectsData = [
  {
    id: "smart-salary-tracker",
    title: "Smart Salary Tracker",
    tagline: "Track your expenses and manage salary smartly with real-time financial insights.",
    category: "Full Stack",
    featured: true,
    image: "/assets/portfolio_design_reference.jpg", // Graceful fallback / screenshot
    technologies: ["React", "Node.js", "Express", "MongoDB", "Material UI"],
    overview: "A personal finance management web application designed to help users track monthly income, categorize daily expenditures, and gain predictive savings advice through visual dashboards.",
    problem: "Most individuals struggle to visualize cash flow leaks and stay disciplined with budgets without tedious manual spreadsheet entries.",
    solution: "Engineered an automated categorization system with visual analytics, budget thresholds, and intelligent month-over-month expenditure forecasting.",
    contribution: [
      "Built responsive dashboard interfaces with React and Material UI",
      "Developed secure REST APIs with Node.js and Express",
      "Integrated MongoDB database with optimized aggregation pipelines",
      "Implemented location-based spending alerts and budget caps"
    ],
    github: "https://github.com",
    demo: "https://example.com",
    metrics: "40% faster budget review time"
  },
  {
    id: "snaphunt",
    title: "SnapHunt",
    tagline: "AI-based face recognition and rapid photo discovery system.",
    category: "AI & Security",
    featured: true,
    technologies: ["React", "Node.js", "Python", "Face Recognition API", "MongoDB"],
    overview: "An intelligent event photography management platform that allows participants to find photos of themselves from large galleries using AI facial detection.",
    problem: "Attendees at large events spend hours sifting through thousands of unorganized gallery photos to find their pictures.",
    solution: "Created an automated face-indexing pipeline where users upload a single selfie and instantly retrieve all matching event photos.",
    contribution: [
      "Designed modern glassmorphic web UI for instant photo search",
      "Architected backend photo ingestion and indexing workflows",
      "Connected client queries with Python-based face detection endpoints",
      "Optimized high-resolution image delivery and secure album storage"
    ],
    github: "https://github.com",
    demo: "https://example.com",
    metrics: "Sub-second face matching across 5,000+ photos"
  },
  {
    id: "guardian-eye",
    title: "Guardian Eye",
    tagline: "Automated image security and video anomaly surveillance system.",
    category: "AI & Security",
    featured: true,
    technologies: ["Python", "OpenCV", "Flask", "React", "Tailwind CSS"],
    overview: "A computer vision security solution that performs real-time motion detection, unauthorized perimeter intrusion alerting, and facial validation.",
    problem: "Standard surveillance cameras require active human monitoring and lack proactive instant alerts for intrusion attempts.",
    solution: "Implemented background subtraction and contour analysis using OpenCV to trigger instant email/webhook alerts with captured frames.",
    contribution: [
      "Implemented OpenCV motion tracking and frame capture algorithms",
      "Built a web-based surveillance control panel in React",
      "Configured lightweight local video stream processing",
      "Integrated timestamped intrusion logging and image export"
    ],
    github: "https://github.com",
    demo: "https://example.com",
    metrics: "Real-time 30 FPS surveillance detection"
  },
  {
    id: "skillly-platform",
    title: "Skillly Platform",
    tagline: "Interactive collaborative learning portal for university students.",
    category: "Web Apps",
    featured: true,
    technologies: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    overview: "A comprehensive e-learning hub where computer science students access curated modules, track course milestones, and collaborate on coding tasks.",
    problem: "Scattered learning materials across disparate chat groups led to missed deadlines and disorganized student progress.",
    solution: "Centralized learning roadmaps, interactive quizzes, downloadable notes, and peer study groups into a unified high-performance portal.",
    contribution: [
      "Created modular course catalog and chapter progress trackers",
      "Implemented JWT authentication with role-based access for students and mentors",
      "Built custom markdown parser for technical course notes",
      "Designed dark-mode UI optimized for late-night student study sessions"
    ],
    github: "https://github.com",
    demo: "https://example.com",
    metrics: "Over 200+ active student test sessions"
  },
  {
    id: "salem-marthoma-church",
    title: "Salem Mar Thoma Church Portal",
    tagline: "Community portal with live event streaming, parish directory, and media gallery.",
    category: "Web Apps",
    featured: true,
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    overview: "A dedicated digital hub for Salem Mar Thoma Church community members worldwide, featuring event calendars, announcements, prayer requests, and photo galleries.",
    problem: "Parish members living overseas lacked a single platform to keep up with worship timings, church events, and parish publications.",
    solution: "Developed an intuitive, mobile-friendly community website with real-time parish updates, sermon audio/video archives, and donation inquiry forms.",
    contribution: [
      "Engineered responsive layouts suitable for both elderly and youth members",
      "Built dynamic notice board and weekly lectionary calendar",
      "Implemented media galleries with image lazy-loading",
      "Developed contact and prayer request submission workflows"
    ],
    github: "https://github.com",
    demo: "https://example.com",
    metrics: "Seamless cross-device access for 500+ parish families"
  },
  {
    id: "cinematic-portfolio",
    title: "Cinematic Developer Portfolio",
    tagline: "Futuristic scroll-animated portfolio showcasing full-stack capabilities.",
    category: "Web Apps",
    featured: true,
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
    overview: "An immersive sci-fi-themed digital experience built to showcase projects, skills, and career milestones with smooth scroll interactions and glassmorphic aesthetics.",
    problem: "Standard developer portfolios often look generic and fail to capture attention or highlight technical craftsmanship.",
    solution: "Designed a dark-mode cinematic interface with cyan glowing accents, interactive tech graphs, and fluid scroll transitions.",
    contribution: [
      "Designed custom glassmorphic components and glowing cyan color scheme",
      "Integrated Framer Motion for scroll-driven reveals and micro-interactions",
      "Engineered responsive interactive project filtering and detail modal views",
      "Optimized asset loading and accessibility with prefers-reduced-motion support"
    ],
    github: "https://github.com",
    demo: "https://example.com",
    metrics: "High performance 60+ FPS smooth scroll transitions"
  }
];
