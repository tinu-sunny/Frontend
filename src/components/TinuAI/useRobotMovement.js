import { useState, useEffect, useRef, useCallback } from 'react';
import { SECTION_ORDER, SECTION_WAYPOINTS } from './sectionWaypoints';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const useRobotMovement = ({ isChatOpen, isModalOpen = false }) => {
  const shouldReduceMotion = useReducedMotion();

  // Active section currently visible in viewport
  const [activeSectionId, setActiveSectionId] = useState('hero');
  const [waypointIndex, setWaypointIndex] = useState(0);

  // Viewport-based position coordinates (top-left of the companion element)
  const [coords, setCoords] = useState({ x: 0, y: 0, isInitial: true });
  const [facingLeft, setFacingLeft] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [footsteps, setFootsteps] = useState([]);

  const isWalkingTimerRef = useRef(null);
  const moveCycleTimerRef = useRef(null);
  const scrollSettleTimerRef = useRef(null);
  const prevCoordsRef = useRef({ x: 0, y: 0 });

  // 1. Observe all portfolio sections with IntersectionObserver
  useEffect(() => {
    const observerCallback = (entries) => {
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topSection = visibleEntries[0].target.id;
        if (topSection && topSection !== activeSectionId) {
          setActiveSectionId(topSection);
          setWaypointIndex(0);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: [0.15, 0.4, 0.7],
      rootMargin: '-60px 0px -40px 0px'
    });

    SECTION_ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeSectionId]);

  // 2. Compute safe clamped coordinates for a section waypoint
  const computeWaypointCoords = useCallback(
    (sectionId, index) => {
      const isMobile = window.innerWidth < 640;
      const companionWidth = isMobile ? 70 : 88;
      const companionHeight = isMobile ? 106 : 138;

      const sectionEl = document.getElementById(sectionId) || document.getElementById('hero');

      // Canonical Resting Position: Bottom-Right of viewport
      const restingX = Math.max(16, window.innerWidth - companionWidth - (isMobile ? 12 : 24));
      const restingY = Math.max(90, window.innerHeight - companionHeight - (isMobile ? 16 : 24));

      // Fallback if section element is not found
      if (!sectionEl) {
        return { x: restingX, y: restingY };
      }

      const rect = sectionEl.getBoundingClientRect();
      const config = SECTION_WAYPOINTS[sectionId] || SECTION_WAYPOINTS.hero;
      const waypoints = isMobile ? config.mobile : config.desktop;
      const wp = waypoints[index % waypoints.length];

      // Derive coordinates relative to current section on screen
      const rawX = rect.left + rect.width * wp.xRatio;
      const rawY = rect.top + rect.height * wp.yRatio;

      // Safe viewport boundary clamps:
      // - Top: at least 92px (below sticky navbar)
      // - Bottom: at most innerHeight - companionHeight - 20px (above viewport bottom edge)
      // - Left: at least 20px (left gutter)
      // - Right: at most innerWidth - companionWidth - 20px (right gutter)
      const maxX = Math.max(20, window.innerWidth - companionWidth - (isMobile ? 12 : 24));
      const maxY = Math.max(92, window.innerHeight - companionHeight - (isMobile ? 16 : 24));

      const clampedX = Math.max(20, Math.min(maxX, rawX));
      const clampedY = Math.max(92, Math.min(maxY, rawY));

      return { x: clampedX, y: clampedY };
    },
    []
  );

  // 3. Move robot to new safe waypoint
  const moveToWaypoint = useCallback(
    (sectionId, index) => {
      if (isChatOpen || isModalOpen || shouldReduceMotion || document.hidden) {
        return;
      }

      const newPos = computeWaypointCoords(sectionId, index);
      const prevPos = prevCoordsRef.current;

      // Determine travel direction
      if (Math.abs(newPos.x - prevPos.x) > 12) {
        setFacingLeft(newPos.x < prevPos.x);
      }

      // Trigger walking animation and particle trail
      setIsWalking(true);
      clearTimeout(isWalkingTimerRef.current);

      if (sectionId === 'footer') {
        setIsCelebrating(true);
      } else {
        setIsCelebrating(false);
      }

      // Add footstep particle at departure position
      if (!shouldReduceMotion) {
        const stepId = `step-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        setFootsteps((prev) => [
          ...prev.slice(-4),
          { id: stepId, x: prevPos.x + 35, y: prevPos.y + 110 }
        ]);
        setTimeout(() => {
          setFootsteps((prev) => prev.filter((s) => s.id !== stepId));
        }, 700);
      }

      prevCoordsRef.current = newPos;
      setCoords({ ...newPos, isInitial: false });

      // Settle walking into idle after transition duration (1.2s)
      isWalkingTimerRef.current = setTimeout(() => {
        setIsWalking(false);
      }, 1200);
    },
    [isChatOpen, isModalOpen, shouldReduceMotion, computeWaypointCoords]
  );

  // 4. Initial load placement
  useEffect(() => {
    const initial = computeWaypointCoords('hero', 0);
    prevCoordsRef.current = initial;
    setCoords({ ...initial, isInitial: false });
  }, [computeWaypointCoords]);

  // 5. Section-change listener: When visitor scrolls into a new section, guide robot
  useEffect(() => {
    clearTimeout(scrollSettleTimerRef.current);
    scrollSettleTimerRef.current = setTimeout(() => {
      moveToWaypoint(activeSectionId, 0);
    }, 180);

    return () => clearTimeout(scrollSettleTimerRef.current);
  }, [activeSectionId, moveToWaypoint]);

  // 6. Periodic in-section exploration timer
  useEffect(() => {
    if (isChatOpen || isModalOpen || shouldReduceMotion) return;

    const intervalTime = activeSectionId === 'footer' ? 8500 : 7000;

    moveCycleTimerRef.current = setInterval(() => {
      if (document.hidden || isChatOpen || isModalOpen) return;

      setWaypointIndex((prevIdx) => {
        const config = SECTION_WAYPOINTS[activeSectionId] || SECTION_WAYPOINTS.hero;
        const totalWps = (window.innerWidth < 640 ? config.mobile : config.desktop).length;
        const nextIdx = (prevIdx + 1) % totalWps;
        moveToWaypoint(activeSectionId, nextIdx);
        return nextIdx;
      });
    }, intervalTime);

    return () => clearInterval(moveCycleTimerRef.current);
  }, [activeSectionId, isChatOpen, isModalOpen, shouldReduceMotion, moveToWaypoint]);

  // 7. Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const refreshed = computeWaypointCoords(activeSectionId, waypointIndex);
      prevCoordsRef.current = refreshed;
      setCoords({ ...refreshed, isInitial: false });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSectionId, waypointIndex, computeWaypointCoords]);

  // Compute docked canonical bottom-right position when modal or chat is active
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const companionWidth = isMobile ? 70 : 88;
  const companionHeight = isMobile ? 106 : 138;

  const dockedPosition = {
    x: typeof window !== 'undefined' ? Math.max(16, window.innerWidth - companionWidth - (isMobile ? 12 : 24)) : 0,
    y: typeof window !== 'undefined' ? Math.max(90, window.innerHeight - companionHeight - (isMobile ? 16 : 24)) : 0
  };

  const activePosition = isChatOpen || isModalOpen ? dockedPosition : coords;

  return {
    coords: activePosition,
    facingLeft,
    isWalking: isWalking && !shouldReduceMotion,
    isCelebrating,
    activeSectionId,
    activeSectionName: SECTION_WAYPOINTS[activeSectionId]?.name || 'Portfolio',
    footsteps
  };
};
