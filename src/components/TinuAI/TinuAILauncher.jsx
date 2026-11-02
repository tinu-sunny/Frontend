import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, Compass } from 'lucide-react';
import { TinuDigitalClone } from './TinuDigitalClone';
import { useRobotMovement } from './useRobotMovement';
import { useProactivePrompt } from './useProactivePrompt';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * TypewriterMessage: Types out the character's proactive message character-by-character
 * giving the visual effect that the bot is actively speaking / asking in real-time.
 */
const TypewriterMessage = ({ text = '', onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      setDisplayedText(text.slice(0, idx));
      if (idx >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 28);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span className="relative font-mono text-[11px] sm:text-xs text-white font-medium tracking-wide leading-relaxed">
      {displayedText}
      <span className="inline-block w-1.5 h-3.5 ml-1 bg-cyan-400 animate-pulse align-middle shadow-[0_0_8px_#22d3ee]" />
    </span>
  );
};

/**
 * TinuAILauncher: Polished Digital Clone Companion
 * 
 * - Full-height prominent character (140–165px on desktop, 105–120px on mobile).
 * - Fixed canonical placement docked in the bottom-right corner.
 * - Dynamic 5s visible / 20s hidden greeting speech bubble beside the character.
 * - Gentle floating while idle with smooth hover scaling.
 * - Entire character container is interactive and opens the Tinu AI chat modal.
 */
export const TinuAILauncher = ({ isOpen, onToggle, isModalOpen = false, isThinking = false }) => {
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

  // 5s visible / 18s hidden proactive prompt cycle hook with section-aware inquiries
  const { showPrompt, promptMessage, handleAskAI, handleDismiss } = useProactivePrompt({
    activeSectionId,
    isChatOpen: isOpen,
    isModalOpen,
    onOpenChat: () => onToggle(true)
  });

  // Dynamic positioning logic for speech bubble relative to viewport
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
            className="fixed w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/40 shadow-[0_0_10px_#00f0ff] animate-ping pointer-events-none z-30"
            aria-hidden="true"
          />
        ))}

      {/* --- Digital Clone Companion Master Container --- */}
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
          {/* --- Compact Proactive Speech Bubble (Unique Holographic Glass Hologram with Animated Laser Border & Glow) --- */}
          <AnimatePresence>
            {showPrompt && !isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: isNearTop ? -10 : 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: isNearTop ? -8 : 8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleAskAI}
                className={`pointer-events-auto absolute ${
                  isNearTop ? 'top-full mt-3' : 'bottom-full mb-3'
                } ${
                  isRightHalf ? 'right-0 sm:right-1' : 'left-0 sm:left-1'
                } w-[215px] sm:w-[245px] max-w-[calc(100vw-36px)] rounded-2xl z-50 cursor-pointer group/bubble select-none`}
                role="status"
                aria-live="polite"
              >
                {/* Animated Rotating Gradient Border Halo */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 opacity-60 group-hover/bubble:opacity-100 blur-[2px] transition-all duration-300 animate-pulse pointer-events-none" />

                {/* Glassmorphic Cyber Hologram Surface */}
                <div className="relative rounded-2xl bg-[#040e24]/75 backdrop-blur-md border border-cyan-400/40 px-3.5 py-2.5 shadow-[0_0_20px_rgba(0,240,255,0.25)] group-hover/bubble:shadow-[0_0_30px_rgba(0,240,255,0.45)] group-hover/bubble:border-cyan-300 transition-all duration-300">
                  {/* Holographic Header: Pulsing Online Beacon & AI Name */}
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-mono text-[9px] font-bold tracking-widest uppercase">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[8px] bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 font-normal">
                        Hey MAX Here
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss();
                      }}
                      aria-label="Dismiss proactive assistance"
                      className="text-cyan-400/60 hover:text-white transition-colors p-0.5 rounded cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Typewriter Animated Speech Dialogue */}
                  <div className="min-h-[32px] flex items-center mb-1.5">
                    {shouldReduceMotion ? (
                      <span className="font-mono text-[11px] sm:text-xs text-white font-medium">
                        {promptMessage || "Hey! Need any help? 👋"}
                      </span>
                    ) : (
                      <TypewriterMessage text={promptMessage || "Hey! Need any help? 👋"} />
                    )}
                  </div>

              

                  {/* Cyber Holographic Pointer Beam Pointing to Character */}
                  <div
                    className={`absolute ${
                      isNearTop ? '-top-1.5 border-l border-t' : '-bottom-1.5 border-r border-b'
                    } ${
                      isRightHalf ? 'right-7' : 'left-7'
                    } w-3 h-3 bg-[#040e24] border-cyan-400/50 transform rotate-45 shadow-[0_0_8px_rgba(0,240,255,0.5)]`}
                    aria-hidden="true"
                  />
                </div>
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

          {/* --- Interactive Character Master Button (Entire container is clickable) --- */}
          <motion.button
            type="button"
            onClick={onToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            aria-label={
              isOpen
                ? 'Minimize Tinu AI Assistant'
                : `Tinu AI Digital Clone exploring ${activeSectionName}. Click to chat.`
            }
            aria-expanded={isOpen}
            className={`pointer-events-auto relative group flex items-center justify-center p-0 bg-transparent border-none shadow-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              shouldReduceMotion ? '' : 'animate-robot-float'
            }`}
          >
            {/* Online green indicator badge */}
            <span className="absolute -top-1 -right-1 z-20 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-black shadow-[0_0_8px_#34d399]" />
            </span>

            {/* Prominent Digital Clone Avatar Body */}
            <TinuDigitalClone
              isWalking={isWalking}
              isHappy={isHovered || isOpen || isCelebrating}
              isGreeting={showPrompt}
              isThinking={isThinking}
              facingLeft={facingLeft}
              avatarImage="/assets/tinu_digital_avatar.jpg"
              modelUrl="/assets/tinu_avatar.glb"
            />

            {/* Micro status label below */}
            <div className="absolute -bottom-2 inset-x-0 flex justify-center z-20">
              <span className="px-2 py-0.5 rounded-full bg-black/90 border border-cyan-500/40 text-[9px] font-mono text-cyan-300 font-bold tracking-widest uppercase shadow-md">
                {isOpen ? 'CLOSE' : activeSectionId === 'footer' ? 'DONE' : ''}
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </>
  );
};
