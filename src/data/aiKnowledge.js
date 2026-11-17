import { profile } from './profile.js';
import { projectsData } from './projects.js';
import { skillsData } from './skills.js';
import { journeyData } from './journey.js';
import { learningLabData, certificationsData, blogData } from './extras.js';

/**
 * Centralized, verified local knowledge base for Tinu AI.
 * Sourced directly from repo data files to ensure 100% factual accuracy.
 * Never invents qualifications, metrics, or employment history.
 */
export const aiKnowledge = {
  profile: {
    name: profile.name,
    title: profile.title,
    tagline: profile.tagline,
    location: profile.location,
    email: profile.email,
    phone: profile.phone,
    bio: profile.about.intro,
    subBio: profile.about.subIntro,
    traits: profile.about.traits,
    stats: profile.stats,
    socials: profile.socials,
    currentRole: profile.currentRole,
    education: profile.education,
    educationList: profile.educationList,
    experienceList: profile.experienceList,
    availability: "Available for full-time Full-Stack Developer roles, high-impact internships, and freelance engineering collaborations."
  },

  skills: {
    coreMern: skillsData.coreMern,
    categories: skillsData.categories,
    summary: "Tinu specializes in the MERN stack (MongoDB, Express.js, React.js, Node.js), along with modern styling (Tailwind CSS), real-time systems (Socket.IO), and scalable RESTful API architectures."
  },

  projects: projectsData,

  journey: journeyData,

  learningLab: learningLabData,

  certifications: certificationsData,

  blog: blogData
};
