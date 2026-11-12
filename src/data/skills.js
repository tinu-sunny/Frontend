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
        { name: "React Hooks", level: "Advanced", icon: "Sparkles" },
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
        { name: "JWT & Role-Based Auth", level: "Advanced", icon: "ShieldCheck" },
        { name: "Socket.IO (Real-Time)", level: "Intermediate", icon: "Sliders" },
      ]
    },
    {
      id: "databases",
      title: "Database Management",
      skills: [
        { name: "MongoDB", level: "Advanced", icon: "Database" },
        { name: "Mongoose ODM", level: "Advanced", icon: "HardDrive" },
        { name: "Schema Modeling & Indexing", level: "Advanced", icon: "Grid" },
        { name: "Data Aggregation Pipelines", level: "Advanced", icon: "GitBranch" },
      ]
    },
    {
      id: "tools",
      title: "Tools & Deployment",
      skills: [
        { name: "Git & GitHub", level: "Advanced", icon: "GitFork" },
        { name: "Postman API Testing", level: "Advanced", icon: "Send" },
        { name: "Render & Netlify", level: "Advanced", icon: "Zap" },
        { name: "VS Code & Vite", level: "Expert", icon: "Code2" },
        { name: "MVC Architecture", level: "Advanced", icon: "Package" },
      ]
    }
  ]
};
