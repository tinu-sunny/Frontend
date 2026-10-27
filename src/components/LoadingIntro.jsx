import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, EyeOff } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const LoadingIntro = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isEntering, setIsEntering] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if user already skipped or entered in this session
    const hasSeenIntro = sessionStorage.getItem('tinu_portfolio_intro_seen');
    if (hasSeenIntro) {
      setIsVisible(false);
      onComplete?.();
    }
  }, [onComplete]);

  const handleEnter = () => {
    sessionStorage.setItem('tinu_portfolio_intro_seen', 'true');
    setIsEntering(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 800);
  };

  const handleSkip = () => {
    sessionStorage.setItem('tinu_portfolio_intro_seen', 'true');
    setIsVisible(false);
    onComplete?.();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black text-white px-6 py-8 overflow-hidden"
      >
        {/* Top Bar with Brand & Skip */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-6xl flex items-center justify-between z-20"
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff] animate-ping"></div>
            <span className="font-heading text-xs tracking-widest text-cyan-400 uppercase font-mono">
              TINU SUNNY • SYSTEM INITIALIZED
            </span>
          </div>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-cyan-300 transition-colors bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 px-3 py-1.5 rounded-full cursor-pointer"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Skip Intro</span>
          </button>
        </motion.div>

        {/* Center Cinematic Visual & Portal */}
        <div className="relative flex flex-col items-center justify-center my-auto w-full max-w-4xl text-center z-10">
          {/* Portal Frame and Silhouette Background with Portal Scale on Enter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              isEntering
                ? {
                    scale: shouldReduceMotion ? 1 : 2.5,
                    opacity: 0,
                    filter: 'brightness(2.5) contrast(1.3)',
                    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                  }
            }
            className="relative w-full max-w-lg aspect-[16/10] rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] mb-8 bg-slate-950"
          >
            <img
              src="/assets/intro_portal.jpg"
              alt="Cinematic Portal"
              className="w-full h-full object-cover object-center filter brightness-95 contrast-110"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>

            {/* Pulsating portal light frame */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      boxShadow: [
                        '0 0 20px rgba(0,240,255,0.3)',
                        '0 0 45px rgba(0,240,255,0.7)',
                        '0 0 20px rgba(0,240,255,0.3)',
                      ],
                    }
              }
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute inset-8 sm:inset-12 border border-cyan-400/50 rounded-lg pointer-events-none"
            ></motion.div>
          </motion.div>

          {/* Cinematic Headline & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Portal Access Granted</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-400 mb-3 drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
              WELCOME, EXPLORER
            </h1>

            <p className="font-mono text-sm sm:text-base text-cyan-200/80 max-w-xl mb-8 tracking-wide">
              This is not just a portfolio. It's my digital world.
            </p>

            {/* Enter Button */}
            <motion.button
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
              onClick={handleEnter}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-heading text-sm font-bold tracking-widest uppercase text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.95)] cursor-pointer"
            >
              <span>Enter Experience</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom status line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2 z-20"
        >
          <span>EST. 2024 • MERN FULL-STACK ENVIRONMENT</span>
          <span className="text-cyan-500/70">SCROLL / NAVIGATE FREELY</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
