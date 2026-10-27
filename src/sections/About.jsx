import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  FileDown, 
  CheckCircle2, 
  Lightbulb, 
  Zap, 
  Users, 
  Cpu 
} from 'lucide-react';
import { profile } from '../data/profile';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const About = ({ onOpenResume }) => {
  const shouldReduceMotion = useReducedMotion();

  const traitIcons = {
    1: Lightbulb,
    2: Zap,
    3: Users,
    4: Cpu,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Viewport Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <span>Identity & Foundations</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            ABOUT ME
          </h2>
          <p className="font-mono text-cyan-400 text-sm tracking-wider uppercase">
            Beyond the Code
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio, Education, Internship & Traits */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <motion.p variants={itemVariants} className="text-slate-300 text-lg leading-relaxed">
              {profile.about.intro}
            </motion.p>
            <motion.p variants={itemVariants} className="text-slate-400 text-base leading-relaxed">
              {profile.about.subIntro}
            </motion.p>

            {/* Quick Info Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              {/* Education Card */}
              <motion.div
                whileHover={{ y: -3, borderColor: 'rgba(0, 240, 255, 0.45)' }}
                className="glass-card p-5 rounded-2xl border border-cyan-500/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      Education
                    </h4>
                    <p className="font-bold text-slate-100 text-sm sm:text-base">
                      {profile.education.degree}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Graduated {profile.education.graduationYear} • {profile.education.institution}
                </p>
              </motion.div>

              {/* Experience Card */}
              <motion.div
                whileHover={{ y: -3, borderColor: 'rgba(0, 240, 255, 0.45)' }}
                className="glass-card p-5 rounded-2xl border border-cyan-500/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      Experience
                    </h4>
                    <p className="font-bold text-slate-100 text-sm sm:text-base">
                      {profile.currentRole.company}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  {profile.currentRole.title} • {profile.currentRole.period}
                </p>
              </motion.div>
            </motion.div>

            {/* 4 Core Traits matching Panel 3 with Staggered Motion */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {profile.about.traits.map((trait) => {
                const IconComponent = traitIcons[trait.id] || CheckCircle2;
                return (
                  <motion.div
                    key={trait.id}
                    whileHover={{ scale: 1.02, x: 2 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-slate-200">
                        {trait.title}
                      </h5>
                      <p className="text-xs text-slate-400">
                        {trait.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Resume CTA & Location */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800"
            >
              <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{profile.location}</span>
              </div>

              <motion.button
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.04 }}
                whileTap={{ scale: shouldReduceMotion ? 1 : 0.96 }}
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading text-xs font-bold tracking-widest uppercase text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 hover:border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: Cinematic Card with Seated Silhouette / Original Portrait */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden glass-card p-4 border border-cyan-500/30">
              {/* Background mountain / vista effect matching Panel 3 */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-cyan-500/20">
                <img
                  src="/assets/tinu_sunny_original.jpg"
                  alt="Tinu Sunny"
                  className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/30">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
                      Code Philosophy
                    </span>
                    <p className="text-xs text-slate-200 italic font-mono">
                      "Building resilient, full-stack digital architectures that stand the test of real-world scale."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
