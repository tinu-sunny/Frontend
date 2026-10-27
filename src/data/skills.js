export const skillsData = {
  coreMern: [
    { name: "React", role: "Frontend UI", icon: "react", glow: "#00f0ff", angle: 0 },
    { name: "Node.js", role: "Runtime Env", icon: "node", glow: "#22c55e", angle: 90 },
    { name: "Express.js", role: "Backend API", icon: "express", glow: "#38bdf8", angle: 180 },
    { name: "MongoDB", role: "NoSQL Database", icon: "mongodb", glow: "#10b981", angle: 270 },
  ],
  categories: [
    {
      id: "frontend",
      title: "Frontend Engineering",
      skills: [
        { name: "React.js", level: "Advanced", icon: "Code" },
        { name: "JavaScript (ES6+)", level: "Advanced", icon: "Cpu" },
        { name: "Tailwind CSS", level: "Advanced", icon: "Layout" },
        { name: "HTML5 & Modern CSS3", level: "Expert", icon: "Layers" },
        { name: "Material UI", level: "Intermediate", icon: "Palette" },
        { name: "Framer Motion", level: "Intermediate", icon: "Sparkles" },
      ]
    },
    {
      id: "backend",
      title: "Backend & APIs",
      skills: [
        { name: "Node.js", level: "Advanced", icon: "Server" },
        { name: "Express.js", level: "Advanced", icon: "Terminal" },
        { name: "RESTful API Architecture", level: "Advanced", icon: "Network" },
        { name: "Authentication (JWT / Sessions)", level: "Intermediate", icon: "ShieldCheck" },
        { name: "Middleware & Error Handling", level: "Advanced", icon: "Sliders" },
      ]
    },
    {
      id: "databases",
      title: "Database Management",
      skills: [
        { name: "MongoDB (Mongoose ODM)", level: "Advanced", icon: "Database" },
        { name: "SQL (PostgreSQL / MySQL)", level: "Intermediate", icon: "HardDrive" },
        { name: "Schema Modeling & Indexing", level: "Intermediate", icon: "Grid" },
        { name: "Data Aggregation Pipelines", level: "Intermediate", icon: "GitBranch" },
      ]
    },
    {
      id: "tools",
      title: "Tools & Development",
      skills: [
        { name: "Git & GitHub", level: "Advanced", icon: "GitFork" },
        { name: "VS Code", level: "Expert", icon: "Code2" },
        { name: "Vite & Modern Bundlers", level: "Advanced", icon: "Zap" },
        { name: "npm & Package Management", level: "Advanced", icon: "Package" },
        { name: "Postman API Testing", level: "Intermediate", icon: "Send" },
      ]
    }
  ]
};
