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
    title: "Skillly",
    tagline: "Career guidance and professional networking platform connecting students, counselors, institutions, and companies.",
    category: "Full Stack",
    featured: true,
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT"],
    overview: "A scalable full-stack career guidance and professional networking platform designed to support Admin, Students, Counselors, Institutions, and Companies in a unified ecosystem.",
    problem: "Students and job seekers struggle to find centralized career guidance, counselor bookings, institutional coordination, and verified job postings across fragmented channels.",
    solution: "Designed and built an end-to-end platform featuring career exploration, counseling booking, real-time chat, AI assistance, payment integration, and robust administration dashboards.",
    contribution: [
      "Designed and developed scalable full-stack platform supporting Admin, Students, Counselors, Institutions, and Companies",
      "Implemented secure JWT-based authentication, role-based access control, and personalized dashboards",
      "Built career exploration, counseling booking, real-time chat, AI-assisted tools, and payment integration",
      "Developed admin dashboards for user management, analytics, job postings, and applications"
    ],
    github: "https://github.com/tinu-sunny",
    demo: "https://example.com",
    metrics: "Multi-role architecture supporting 5 user tiers"
  },
  {
    id: "life-drop",
    title: "Life Drop",
    tagline: "Blood donor management platform with location-based discovery and verified donor workflows.",
    category: "Full Stack",
    featured: true,
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    overview: "A comprehensive digital blood donation coordination platform enabling life-saving donor discovery, verified registrations, and rapid emergency outreach.",
    problem: "During emergency medical situations, patients and hospitals struggle to quickly locate compatible, verified, and nearby voluntary blood donors.",
    solution: "Developed a full-stack platform for donor registration, verification, and location-based discovery with administrative approval workflows, advanced filtering, and instant sharing.",
    contribution: [
      "Developed full-stack system for donor registration, verification, and location-based discovery",
      "Implemented secure authentication with admin approval workflows",
      "Built advanced donor search with filters, PDF export, and WhatsApp sharing",
      "Ensured strong form validation and data consistency across donor records"
    ],
    github: "https://github.com/tinu-sunny",
    demo: "https://example.com",
    metrics: "Rapid location-based donor search with WhatsApp sharing"
  },
  {
    id: "book-store",
    title: "Book Store",
    tagline: "Buy & sell bookstore web application with role-based access and order management.",
    category: "Full Stack",
    featured: true,
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    overview: "A full-stack e-commerce marketplace for buying and selling books with complete inventory control, order management, and secure role-based access.",
    problem: "Book enthusiasts and local sellers need an easy, accessible online platform to list, purchase, and manage book orders securely.",
    solution: "Engineered a high-performance full-stack bookstore application featuring protected shopping routes, order processing, and administrative controls.",
    contribution: [
      "Built a full-stack bookstore application with user authentication and admin management",
      "Implemented CRUD operations, order management, and protected routes",
      "Implemented Role-Based Authentication to protect sensitive administrative endpoints",
      "Created intuitive book discovery and catalogue browsing interface"
    ],
    github: "https://github.com/tinu-sunny",
    demo: "https://example.com",
    metrics: "Complete end-to-end CRUD and order tracking workflow"
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
