import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles, Terminal, FileDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import { profile } from '../data/profile';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Hero = ({ onExploreWork, onOpenResume }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const floatingPills = [
    { name: 'MongoDB', delay: 0.4 },
    { name: 'Express.js', delay: 0.5 },
    { name: 'React.js', delay: 0.6, primary: true },
    { name: 'Node.js', delay: 0.7 },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid"
    >
      {/* Background ambient lighting orbs with subtle pulsing */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.15, 1],
                opacity: [0.15, 0.25, 0.15],
              }
        }
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none -z-10"
      ></motion.div>
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Staggered Headline and Introduction */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start z-10 text-left"
        >
          {/* Eyebrow badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>MERN FULL-STACK DEVELOPER</span>
            </div>
          </motion.div>

          <motion.span
            variants={itemVariants}
            className="font-mono text-slate-400 text-sm sm:text-base uppercase tracking-widest mb-1"
          >
            HELLO, I'M
          </motion.span>

          {/* Large Hero Title */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-none"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 drop-shadow-[0_0_30px_rgba(0,240,255,0.35)]">
              {profile.name}
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="font-heading text-lg sm:text-2xl text-cyan-400 font-medium tracking-wide mb-6"
          >
            MERN FULL-STACK DEVELOPER
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8"
          >
            {profile.tagline}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
          >
            <motion.a
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.04 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.96 }}
              href="#projects"
              onClick={onExploreWork}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl font-heading text-xs sm:text-sm font-bold tracking-widest uppercase text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.85)] cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </motion.a>

            <motion.a
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.04 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.96 }}
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-heading text-xs sm:text-sm font-bold tracking-widest uppercase text-cyan-300 bg-slate-900/60 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-300 transition-all duration-300 shadow-inner cursor-pointer"
            >
              <span>Contact Me</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.04 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.96 }}
              onClick={onOpenResume}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-cyan-300 bg-slate-900/40 border border-slate-700/60 hover:border-cyan-500/50 transition-all cursor-pointer"
              title="Download or View Resume"
            >
              <FileDown className="w-4 h-4 text-cyan-400" />
              <span>Resume</span>
            </motion.button>
          </motion.div>

          {/* Social Links & System Status */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 pt-4 border-t border-slate-800/80 w-full max-w-lg"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
              Connect:
            </span>
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={profile.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={`mailto:${profile.email}`}
                className="w-9 h-9 rounded-lg bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all shadow-sm hover:shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                aria-label="Email Me"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Cinematic Portrait with Cyan Rim & Subtle Floating Motion */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Main Portrait Frame with Arch Portal Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: shouldReduceMotion ? 0 : [0, -6, 0],
            }}
            transition={{
              opacity: { duration: 0.9, delay: 0.2 },
              scale: { duration: 0.9, delay: 0.2 },
              y: {
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
              },
            }}
            className="relative w-72 sm:w-84 md:w-96 aspect-[4/5] rounded-3xl overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_40px_rgba(0,240,255,0.35)] bg-gradient-to-b from-slate-900 via-slate-950 to-black group"
          >
            {/* The generated high-fidelity cinematic portrait */}
            <img
              src="/assets/tinu_sunny_hero.jpg"
              alt="Tinu Sunny - Full-Stack Developer"
              className="w-full h-full object-cover object-top filter brightness-100 contrast-105 group-hover:scale-103 transition-transform duration-700"
            />

            {/* Glowing inner edge vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 ring-1 ring-inset ring-cyan-400/30 rounded-3xl pointer-events-none"></div>

            {/* Cyan bottom badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 rounded-xl px-4 py-2.5 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs font-semibold text-slate-200">
                  Lumina Tech Lab Intern
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active
              </span>
            </div>
          </motion.div>

          {/* Floating Orbiting Tech Pills with Staggered Entrance and Hover Springs */}
          <div className="hidden sm:flex flex-col gap-2.5 absolute -right-2 sm:-right-6 top-8 z-20">
            {floatingPills.map((pill) => (
              <motion.div
                key={pill.name}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: pill.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.08, x: -4 }}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs shadow-[0_0_12px_rgba(0,240,255,0.25)] flex items-center gap-2 backdrop-blur-md cursor-default ${
                  pill.primary
                    ? 'bg-slate-900/95 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-slate-900/90 border border-cyan-500/40 text-cyan-300'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                {pill.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
