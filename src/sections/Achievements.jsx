import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';
import { certificationsData } from '../data/extras';
import { profile } from '../data/profile';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Achievements = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 cyber-grid overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Credentials</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            ACHIEVEMENTS & CERTIFICATIONS
          </h2>
          <p className="font-mono text-cyan-400 text-sm tracking-wider uppercase">
            Milestones That Matter
          </p>
        </motion.div>

        {/* Certifications Cards Grid with Staggered Viewport Reveals */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {certificationsData.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              whileHover={{
                y: shouldReduceMotion ? 0 : -4,
                borderColor: 'rgba(0, 240, 255, 0.5)',
              }}
              className="glass-card p-6 rounded-2xl border border-cyan-500/20 flex flex-col justify-between text-center items-center group transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <h4 className="font-heading text-sm font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                {cert.title}
              </h4>

              <span className="text-xs font-mono text-cyan-400/80 mb-1">
                {cert.issuer}
              </span>

              <span className="text-[11px] font-mono text-slate-500 mb-4">
                {cert.statusText || 'Curriculum Track'} • {cert.year}
              </span>

              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-xl bg-slate-900/60 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{cert.verified ? 'View Certificate' : 'Course Syllabus'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Milestone Stats Strip matching Panel 9 bottom */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {profile.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-5 rounded-2xl border border-cyan-500/20 text-center"
            >
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 block mb-1">
                {stat.value}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
