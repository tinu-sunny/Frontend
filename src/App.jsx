import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Journey } from './sections/Journey';
import { LearningLab } from './sections/LearningLab';
import { Achievements } from './sections/Achievements';
import { Blog } from './sections/Blog';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { TinuAILauncher, TinuAIChatModal } from './components/TinuAI';

export function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-400 selection:text-black">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-slate-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300 shadow-[0_0_12px_#00f0ff] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>


      {/* Sticky Header Navbar */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative">
        {/* Section 2: Hero */}
        <Hero
          onExploreWork={() => {
            const el = document.getElementById('projects');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Section 3: About Me */}
        <About onOpenResume={() => setResumeOpen(true)} />

        {/* Section 4: Skills & Technologies */}
        <Skills />

        {/* Section 5: Featured Projects */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        {/* Section 7: Career Journey */}
        <Journey />

        {/* Section 8: Learning Lab */}
        <LearningLab />

        {/* Section 9: Achievements & Certifications */}
        <Achievements />

        {/* Section 10: Tech Journal */}
        <Blog />

        {/* Section 12: Contact */}
        <Contact onOpenResume={() => setResumeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal (Section 6) */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Resume Modal (Section 11) */}
      <AnimatePresence>
        {resumeOpen && (
          <ResumeModal onClose={() => setResumeOpen(false)} />
        )}
      </AnimatePresence>

      {/* Tinu AI Standalone Assistant (Phase 1 & 1.7) */}
      <TinuAILauncher
        isOpen={aiChatOpen}
        isModalOpen={Boolean(selectedProject || resumeOpen)}
        onToggle={() => setAiChatOpen((prev) => !prev)}
      />
      <TinuAIChatModal
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
        onSelectProject={(project) => setSelectedProject(project)}
      />
    </div>
  );
}

export default App;
