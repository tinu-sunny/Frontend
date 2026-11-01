import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Download, 
  FileText,
  Mail, 
  MapPin, 
  Printer 
} from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { profile } from '../data/profile';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';
export const ResumeModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('CV Document (PDF)');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handlePrint = () => {
    // If not currently on the PDF tab, switch to it first so the iframe is mounted
    if (activeTab !== 'CV Document (PDF)') {
      setActiveTab('CV Document (PDF)');
      setTimeout(() => {
        const iframe = document.getElementById('resume-pdf-frame');
        if (iframe && iframe.contentWindow) {
          try {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
            return;
          } catch {
            window.print();
          }
        }
      }, 300);
      return;
    }

    const iframe = document.getElementById('resume-pdf-frame');
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        return;
      } catch {
        window.print();
      }
    }
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: shouldReduceMotion ? 0 : 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="print-area relative w-full max-w-5xl rounded-3xl glass-card border-2 border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.3)] p-6 sm:p-8 my-auto overflow-hidden text-left bg-gradient-to-b from-slate-900 via-slate-950 to-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-all z-20 cursor-pointer"
          aria-label="Close Resume"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header (Panel 11) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20 mb-6">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
              Curriculum Vitae
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              RESUME / PROFILE
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Tinu Sunny • MERN Full-Stack Developer
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab(activeTab === 'CV Document (PDF)' ? 'Overview' : 'CV Document (PDF)')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'CV Document (PDF)'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
              title="Toggle CV PDF and interactive overview"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>{activeTab === 'CV Document (PDF)' ? 'Interactive View' : 'View PDF CV'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
              title="Print CV"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <a
              href="/assets/tinu__Sunny.pdf"
              download="Tinu_Sunny_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
              title="Download Resume PDF"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-800 pb-3">
          {['CV Document (PDF)', 'Overview', 'Experience', 'Education', 'Skills', 'Projects'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-500/50 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className={`overflow-y-auto pr-2 text-sm text-slate-300 ${activeTab === 'CV Document (PDF)' ? 'h-[65vh] min-h-[480px]' : 'max-h-[60vh] space-y-6'}`}>
          {activeTab === 'CV Document (PDF)' && (
            <div className="w-full h-full min-h-[480px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 flex flex-col relative shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              <iframe
                id="resume-pdf-frame"
                src="/assets/tinu__Sunny.pdf#toolbar=1&view=FitH"
                title="Tinu Sunny CV"
                className="w-full h-full min-h-[480px] border-0 rounded-2xl bg-slate-900"
              />
            </div>
          )}
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 flex flex-col sm:flex-row items-center gap-6">
                <img
                  src="/assets/tinu_sunny_hero.jpg"
                  alt="Tinu Sunny"
                  className="w-24 h-24 rounded-2xl object-cover object-top border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                />
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-1">
                    {profile.name}
                  </h3>
                  <p className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
                    {profile.title}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {profile.about.intro}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      {profile.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                    Current Focus
                  </span>
                  <p className="text-xs text-slate-300">
                    Full-Stack React & Node.js application architecture, REST API design, MongoDB modeling, and responsive glassmorphic UI engineering.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                    Academic Background
                  </span>
                  <p className="text-xs text-slate-300">
                    BSc Computer Science (2024 graduate) with algorithmic thinking, software lifecycle, and database administration coursework.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Experience' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-heading text-base font-bold text-white">
                    {profile.currentRole.title}
                  </h4>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                    {profile.currentRole.period}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 mb-3">
                  {profile.currentRole.company}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {profile.currentRole.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST APIs', 'Git Workflows'].map((t) => (
                    <span key={t} className="text-[10px] font-mono bg-slate-950 text-cyan-300 px-2 py-0.5 rounded border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Education' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-heading text-base font-bold text-white">
                    {profile.education.degree}
                  </h4>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                    Graduated {profile.education.graduationYear}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 mb-2">
                  {profile.education.institution}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {profile.education.description}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'Skills' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillsData.categories.map((cat) => (
                <div key={cat.id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <h5 className="font-heading text-xs font-bold text-cyan-400 mb-2 uppercase">
                    {cat.title}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span key={s.name} className="text-[11px] font-mono bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Projects' && (
            <div className="space-y-3">
              {projectsData.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-heading text-sm font-bold text-white">
                      {p.title}
                    </h5>
                    <span className="text-[10px] font-mono text-cyan-400">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    {p.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {p.technologies.map((t) => (
                      <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
