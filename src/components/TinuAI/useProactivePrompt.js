import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const INITIAL_DELAY_SECONDS = 2;
const VISIBLE_DURATION_SECONDS = 5;
const HIDDEN_DURATION_SECONDS = 18;

// Section-specific proactive inquiries
export const SECTION_PROMPTS = {
  hero: [
    "Hey! Need any help? 👋",
    "Welcome to my portfolio! ✨",
    "Ask me anything about Tinu! 🚀"
  ],
  about: [
    "Curious about Tinu's background? 🎓",
    "Want to know what drives Tinu? 💡",
    "Ask about his education & journey! 👨‍💻"
  ],
  skills: [
    "Want to explore Tinu's tech stack? ⚡",
    "Ask about his React & Node expertise! 🛠️",
    "Which technologies interest you? 💻"
  ],
  projects: [
    "Want a walkthrough of his projects? 🚀",
    "Ask about architecture & live demos! 🌐",
    "Check out what Tinu has built! 📱"
  ],
  journey: [
    "Explore Tinu's milestones & timeline! 📍",
    "Ask about his Lumina Tech Lab role! 💼",
    "Curious about his career roadmap? 🗺️"
  ],
  lab: [
    "Want to check out experimental labs? 🧪",
    "Ask about his research & prototypes! 🔬"
  ],
  achievements: [
    "Curious about hackathons & awards? 🏆",
    "Ask about Tinu's certifications! 📜"
  ],
  blog: [
    "Read Tinu's tech insights & articles? 📝",
    "Ask about topics he writes about! 💡"
  ],
  contact: [
    "Ready to build something together? 🤝",
    "Want Tinu's email or direct phone? 📬",
    "Need help sending a quick message? ✉️"
  ],
  footer: [
    "Thanks for visiting! Let's connect! 🌟",
    "Want to download Tinu's resume? 📄"
  ]
};

/**
 * useProactivePrompt (Phase 1.8 + Section Awareness)
 * Implements context-aware proactive inquiries:
 * - Triggers section-relevant questions when visitor scrolls to that section
 * - 5 seconds visible / 18 seconds hidden cycle
 * - Pauses cleanly on chat open, modal open, form input focus, background tab, or user idle
 */
export const useProactivePrompt = ({
  activeSectionId = 'hero',
  isChatOpen = false,
  isModalOpen = false,
  onOpenChat
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessageIndex, setPromptMessageIndex] = useState(0);
  const prevSectionRef = useRef(activeSectionId);

  // Phase tracker: 'INITIAL' | 'VISIBLE' | 'HIDDEN'
  const phaseRef = useRef('INITIAL');
  const secondsLeftRef = useRef(INITIAL_DELAY_SECONDS);
  const isUserActiveRef = useRef(true);
  const idleTimerRef = useRef(null);

  // Track if user is actively using an input/textarea in the contact form or anywhere on page
  const [isFormActive, setIsFormActive] = useState(false);

  // Get list of messages for current section (falling back to hero)
  const currentSectionMessages =
    SECTION_PROMPTS[activeSectionId] || SECTION_PROMPTS.hero;

  // React promptly when visitor scrolls into a new section
  useEffect(() => {
    if (prevSectionRef.current !== activeSectionId) {
      prevSectionRef.current = activeSectionId;
      setPromptMessageIndex(0);

      // If not interrupted, show the section-specific prompt shortly after arriving
      if (!isChatOpen && !isModalOpen && !isFormActive && !shouldReduceMotion) {
        phaseRef.current = 'VISIBLE';
        secondsLeftRef.current = VISIBLE_DURATION_SECONDS;
        setShowPrompt(true);
      }
    }
  }, [activeSectionId, isChatOpen, isModalOpen, isFormActive, shouldReduceMotion]);

  // 1. Detect active form usage
  useEffect(() => {
    const handleFocus = () => {
      const el = document.activeElement;
      const isInput =
        el &&
        (el.tagName === 'INPUT' ||
          el.tagName === 'TEXTAREA' ||
          el.tagName === 'SELECT' ||
          el.isContentEditable);
      setIsFormActive(Boolean(isInput));
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleFocus);

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleFocus);
    };
  }, []);

  // 2. Track general user activity (pause if visitor is idle for > 45s)
  useEffect(() => {
    const markActive = () => {
      isUserActiveRef.current = true;
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        isUserActiveRef.current = false;
      }, 45000);
    };

    window.addEventListener('mousemove', markActive, { passive: true });
    window.addEventListener('keydown', markActive, { passive: true });
    window.addEventListener('scroll', markActive, { passive: true });
    window.addEventListener('touchstart', markActive, { passive: true });

    return () => {
      clearTimeout(idleTimerRef.current);
      window.removeEventListener('mousemove', markActive);
      window.removeEventListener('keydown', markActive);
      window.removeEventListener('scroll', markActive);
      window.removeEventListener('touchstart', markActive);
    };
  }, []);

  // 3. Interruption state
  const isInterrupted =
    isChatOpen || isModalOpen || isFormActive || shouldReduceMotion;

  // If interrupted while showing, hide immediately and enter 20s hidden countdown
  useEffect(() => {
    if (isInterrupted && showPrompt) {
      setShowPrompt(false);
      phaseRef.current = 'HIDDEN';
      secondsLeftRef.current = HIDDEN_DURATION_SECONDS;
    }
  }, [isInterrupted, showPrompt]);

  // 4. Main 1-second ticker loop
  useEffect(() => {
    if (shouldReduceMotion) {
      setShowPrompt(false);
      return;
    }

    const interval = setInterval(() => {
      // Pause when tab is hidden
      if (document.hidden) {
        if (phaseRef.current === 'VISIBLE') {
          setShowPrompt(false);
          phaseRef.current = 'HIDDEN';
          secondsLeftRef.current = HIDDEN_DURATION_SECONDS;
        }
        return;
      }

      // Pause while interrupted (chat open, modal open, form active) or user idle
      if (isChatOpen || isModalOpen || isFormActive || !isUserActiveRef.current) {
        return;
      }

      // Decrement countdown
      secondsLeftRef.current -= 1;

      if (secondsLeftRef.current <= 0) {
        if (phaseRef.current === 'INITIAL' || phaseRef.current === 'HIDDEN') {
          // Switch to VISIBLE for 5 seconds and rotate message within current section
          phaseRef.current = 'VISIBLE';
          secondsLeftRef.current = VISIBLE_DURATION_SECONDS;
          setPromptMessageIndex((prev) => (prev + 1) % currentSectionMessages.length);
          setShowPrompt(true);
        } else if (phaseRef.current === 'VISIBLE') {
          // Switch to HIDDEN
          phaseRef.current = 'HIDDEN';
          secondsLeftRef.current = HIDDEN_DURATION_SECONDS;
          setShowPrompt(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isChatOpen, isModalOpen, isFormActive, currentSectionMessages.length]);

  // 5. Actions
  const handleDismiss = useCallback(() => {
    setShowPrompt(false);
    phaseRef.current = 'HIDDEN';
    secondsLeftRef.current = HIDDEN_DURATION_SECONDS;
  }, []);

  const handleAskAI = useCallback(() => {
    setShowPrompt(false);
    phaseRef.current = 'HIDDEN';
    secondsLeftRef.current = HIDDEN_DURATION_SECONDS;
    onOpenChat?.();
  }, [onOpenChat]);

  return {
    showPrompt: showPrompt && !isInterrupted,
    promptMessage: currentSectionMessages[promptMessageIndex % currentSectionMessages.length],
    handleAskAI,
    handleDismiss
  };
};
