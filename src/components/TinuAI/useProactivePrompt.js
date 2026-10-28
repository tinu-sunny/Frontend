import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const INITIAL_DELAY_SECONDS = 3;
const VISIBLE_DURATION_SECONDS = 5;
const HIDDEN_DURATION_SECONDS = 20;

/**
 * useProactivePrompt (Phase 1.8)
 * Implements a smart 25-second cycle:
 * - 5 seconds visible
 * - 20 seconds hidden
 * - Pauses cleanly on chat open, modal open, form input focus, background tab, or user idle
 * - When interrupted or manually dismissed, resets to a 20-second hidden interval
 */
export const useProactivePrompt = ({ isChatOpen = false, isModalOpen = false, onOpenChat }) => {
  const shouldReduceMotion = useReducedMotion();
  const [showPrompt, setShowPrompt] = useState(false);

  // Phase tracker: 'INITIAL' | 'VISIBLE' | 'HIDDEN'
  const phaseRef = useRef('INITIAL');
  const secondsLeftRef = useRef(INITIAL_DELAY_SECONDS);
  const isUserActiveRef = useRef(true);
  const idleTimerRef = useRef(null);

  // Track if user is actively using an input/textarea in the contact form or anywhere on page
  const [isFormActive, setIsFormActive] = useState(false);

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
          // Switch to VISIBLE for 5 seconds
          phaseRef.current = 'VISIBLE';
          secondsLeftRef.current = VISIBLE_DURATION_SECONDS;
          setShowPrompt(true);
        } else if (phaseRef.current === 'VISIBLE') {
          // Switch to HIDDEN for 20 seconds
          phaseRef.current = 'HIDDEN';
          secondsLeftRef.current = HIDDEN_DURATION_SECONDS;
          setShowPrompt(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isChatOpen, isModalOpen, isFormActive]);

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
    handleAskAI,
    handleDismiss
  };
};
