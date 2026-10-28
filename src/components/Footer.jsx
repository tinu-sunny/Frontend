import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from './SocialIcons';
import { profile } from '../data/profile';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Footer = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="relative bg-[#020617] border-t border-cyan-500/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 z-10 text-left overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Terminal className="w-3.5 h-3.5 text-cyan-300" />
              </div>
              <span className="font-heading text-lg font-bold tracking-wider text-white">
                {profile.name}
              </span>
            </div>
            <p className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1">
              {profile.title}
            </p>
            <p className="text-xs text-slate-400 max-w-sm">
              Engineering high-performance web applications with MERN stack & modern cloud architecture.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            <a href="#hero" className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#journey" className="hover:text-cyan-400 transition-colors">Journey</a>
            <a href="#lab" className="hover:text-cyan-400 transition-colors">Lab</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          {/* Back to top */}
          <div>
            <motion.button
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Bottom credits & social */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {currentYear} {profile.name}. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.15 }}
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              href={profile.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              aria-label="Twitter"
            >
              <TwitterIcon className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15 }}
              href={profile.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
