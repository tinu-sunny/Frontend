import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, Compass } from 'lucide-react';
import { RobotAvatar } from './RobotAvatar';
import { useRobotMovement } from './useRobotMovement';
import { useProactivePrompt } from './useProactivePrompt';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * TinuAILauncher: Full Portfolio Robot Companion (Phase 1.7)
 * - Section-aware exploration across all 10 portfolio sections
 * - Fluid walking physics with direction-aware orientation
 * - Non-intrusive safe waypoint pathing
 * - Subtle footstep particle trail
 * - Contextual 30-second proactive assistance bubble
 * - Reduced motion and accessibility compliant
 */
export const TinuAILauncher = ({ isOpen, onToggle, isModalOpen = false }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Section-aware dynamic portfolio exploration hook
  const {
    coords,
    facingLeft,
    isWalking,
    isCelebrating,
    activeSectionId,
    activeSectionName,
    footsteps
  } = useRobotMovement({ isChatOpen: isOpen, isModalOpen });

  // 5s visible / 20s hidden proactive prompt cycle hook
  const { showPrompt, handleAskAI, handleDismiss } = useProactivePrompt({
    isChatOpen: isOpen,
    isModalOpen,
    onOpenChat: () => onToggle(true)
  });

  // Dynamic positioning logic for speech bubble to prevent viewport overflow
  const isRightHalf = coords.x > (typeof window !== 'undefined' ? window.innerWidth / 2 : 600);
  const isNearTop = coords.y < 220;

  return (
    <>
      {/* --- Footstep Trail Particles --- */}
      {!shouldReduceMotion &&
        footsteps.map((step) => (
          <div
            key={step.id}
            style={{ left: step.x, top: step.y }}
            className="fixed w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/40 shadow-[0_0_8px_#00f0ff] animate-ping pointer-events-none z-30"
            aria-hidden="true"
          />
        ))}

      {/* --- Robot Companion Master Container --- */}
      <div
        className="fixed inset-0 pointer-events-none select-none z-40 overflow-hidden font-sans"
        aria-live="polite"
      >
        <motion.div
          style={{ position: 'fixed', left: 0, top: 0 }}
          animate={{
            x: coords.x,
            y: coords.y
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : coords.isInitial ? 0 : 1.25,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="pointer-events-none flex flex-col items-center"
        >
          {/* --- Compact Proactive Speech Bubble (5s visible / 20s hidden loop) --- */}
          <AnimatePresence>
            {showPrompt && !isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: isNearTop ? -8 : 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: isNearTop ? -6 : 6 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: 'easeOut' }}
                className={`pointer-events-auto absolute ${
                  isNearTop ? 'top-full mt-2.5' : 'bottom-full mb-2.5'
                } ${
                  isRightHalf ? 'right-0' : 'left-0'
                } w-[240px] sm:w-[255px] max-w-[calc(100vw-36px)] rounded-xl bg-[#030914]/95 border border-cyan-400/45 p-2.5 sm:p-3 shadow-[0_0_20px_rgba(0,240,255,0.28),0_8px_20px_rgba(0,0,0,0.85)] backdrop-blur-xl z-50`}
                role="status"
                aria-live="polite"
              >
                {/* Header: AI badge and dismiss button */}
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-mono text-[10px] font-bold tracking-wider uppercase">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Tinu AI</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    aria-label="Dismiss proactive assistance"
                    className="text-slate-400 hover:text-slate-200 transition-colors p-0.5 rounded cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Concise message */}
                <p className="text-[11px] text-slate-200 leading-snug mb-2 font-sans">
                  Need help exploring my portfolio? 👋
                </p>

                {/* Compact action row */}
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={handleAskAI}
                    aria-label="Ask Tinu AI assistant"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_10px_rgba(0,240,255,0.35)] cursor-pointer"
                  >
                    <span>Ask AI</span>
                    <ArrowRight className="w-2.5 h-2.5 text-black" />
                  </button>
                </div>

                {/* Speech bubble pointer / triangle pointing to the robot */}
                <div
                  className={`absolute ${
                    isNearTop
                      ? '-top-1.5 border-l border-t'
                      : '-bottom-1.5 border-r border-b'
                  } ${
                    isRightHalf ? 'right-6' : 'left-6'
                  } w-3 h-3 bg-[#030914] border-cyan-400/45 transform rotate-45`}
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- Exploration Status Tooltip on Hover --- */}
          <AnimatePresence>
            {isHovered && !showPrompt && !isOpen && (
              <motion.div
                initial={{ opacity: 0, y: isNearTop ? -5 : 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: isNearTop ? -4 : 4 }}
                transition={{ duration: 0.15 }}
                className={`pointer-events-none absolute ${
                  isNearTop ? 'top-full mt-2' : 'bottom-full mb-2'
                } ${
                  isRightHalf ? 'right-0' : 'left-0'
                } px-3 py-1 rounded-lg bg-cyan-950/95 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono tracking-wider uppercase shadow-lg backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap z-50`}
              >
                <Compass className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>
                  {isCelebrating
                    ? '🎉 Tour Complete!'
                    : `Exploring ${activeSectionName}`}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- Interactive Robot Companion Button --- */}
          <motion.button
            type="button"
            onClick={onToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.08 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.94 }}
            aria-label={
              isOpen
                ? 'Minimize Tinu AI Assistant'
                : `Tinu AI Companion exploring ${activeSectionName}. Click to chat.`
            }
            aria-expanded={isOpen}
            className={`pointer-events-auto relative group flex items-center justify-center p-2 rounded-2xl border transition-all duration-300 shadow-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black ${
              isOpen
                ? 'bg-[#040f26]/95 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.5)]'
                : 'bg-[#030a1c]/90 hover:bg-[#061436] border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)]'
            } backdrop-blur-xl ${shouldReduceMotion ? '' : 'animate-robot-float'}`}
          >
            {/* Online green indicator badge */}
            <span className="absolute -top-1 -right-1 z-10 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-black shadow-[0_0_8px_#34d399]" />
            </span>

            {/* Animated Robot Avatar Body with Directional Orientation */}
            <RobotAvatar
              size={50}
              isWalking={isWalking}
              isHappy={isHovered || isOpen || isCelebrating}
              facingLeft={facingLeft}
            />

            {/* Micro status label below */}
            <div className="absolute -bottom-2 inset-x-0 flex justify-center">
              <span className="px-1.5 py-0.2 rounded-full bg-black/90 border border-cyan-500/40 text-[8px] font-mono text-cyan-300 font-bold tracking-widest uppercase">
                {isOpen ? 'CLOSE' : activeSectionId === 'footer' ? 'DONE' : 'AI'}
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </>
  );
};
