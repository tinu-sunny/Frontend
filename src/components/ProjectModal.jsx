import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const ProjectModal = ({ project, onClose }) => {
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

  if (!project) return null;

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
        className="relative w-full max-w-5xl rounded-3xl glass-card border-2 border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.25)] p-6 sm:p-8 my-auto overflow-hidden text-left bg-gradient-to-b from-slate-900 via-slate-950 to-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/40 transition-all z-20 cursor-pointer"
          aria-label="Close Project Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Breadcrumb & Title */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <span>Projects</span>
          <span>/</span>
          <span className="text-slate-300">{project.category}</span>
          <span>/</span>
          <span className="text-white font-bold">{project.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Comprehensive Details (Panel 5) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-cyan-300/90 text-sm font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Overview */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Project Overview
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 block mb-1">
                  The Problem
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                  The Solution
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Contributions */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2.5 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                My Contribution
              </h4>
              <ul className="space-y-2">
                {project.contribution?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800">
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-400 transition-all cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>View Source</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Mock Dashboard Preview (Panel 5 right side) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/90 p-4 shadow-xl">
              {/* Fake Browser / Dashboard Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                </div>
                <span className="text-cyan-400">preview.system.local</span>
                <span className="w-4"></span>
              </div>

              {/* Futuristic Dashboard Mockup */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Impact Metric</span>
                    <p className="font-heading text-sm font-bold text-cyan-300">{project.metrics || 'High Performance'}</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                {/* Visual Chart / Stat Bar Graphic */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>API Performance</span>
                    <span className="text-cyan-400">99.8% Latency Target</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[95%]"></div>
                  </div>

                  <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
                    <span>Component Modularity</span>
                    <span className="text-emerald-400">100% Scalable</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[100%]"></div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-center">
                  <span className="text-[11px] font-mono text-cyan-300 block">
                    Designed & Engineered by Tinu Sunny
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Production Architecture Standard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
