import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { RobotAvatar } from './RobotAvatar';

// Lazy-load WebGL Three.js character viewer to maintain optimal initial bundle performance
const TinuModelViewer3D = lazy(() =>
  import('./TinuModelViewer3D').then((m) => ({ default: m.TinuModelViewer3D }))
);

/**
 * TinuDigitalClone: Phase 2 Hybrid 3D / High-Fidelity Avatar Component
 * 
 * - Primary Display: Realistic 3D Humanoid Model (when `tinu_avatar.glb` is provided)
 * - Automatic Fallback: High-Fidelity Custom Avatar Image (Tinu Sunny)
 * - Ultimate Safety Fallback: Vector SVG RobotAvatar
 * 
 * Animation States:
 * - 'idle': Natural breathing, micro-sway, blinks
 * - 'walking': Synchronized humanoid leg/arm locomotion
 * - 'greeting': Friendly hand wave & head nod
 * - 'looking': Inverse kinematics / head bone tracking cursor position
 * - 'interacting': Welcoming speech & open-palm gesture
 * - 'thinking': Hand near chin / contemplative posture during AI generation
 */
export const TinuDigitalClone = ({
  size = null,
  isWalking = false,
  isHappy = false,
  isGreeting = false,
  isThinking = false,
  facingLeft = false,
  animationState: explicitState = null,
  modelUrl = '/assets/tinu_avatar.glb',
  avatarImage = '/assets/tinu_digital_avatar.jpg',
  fallbackToRobot = false
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [hasImageError, setHasImageError] = useState(false);
  const [is3DModelLoaded, setIs3DModelLoaded] = useState(false);
  const [is3DModelFailed, setIs3DModelFailed] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Derive animation state
  const currentAnimationState = explicitState || (
    isWalking
      ? 'walking'
      : isGreeting
      ? 'greeting'
      : isThinking
      ? 'thinking'
      : isHappy
      ? 'interacting'
      : 'idle'
  );

  // Preload fallback character image asset once
  useEffect(() => {
    if (!avatarImage) return;
    const img = new Image();
    img.src = avatarImage;
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => setHasImageError(true);
  }, [avatarImage]);

  // Graceful fallback to SVG RobotAvatar if requested or both 3D and image fail
  if (fallbackToRobot || (hasImageError && is3DModelFailed)) {
    return (
      <RobotAvatar
        size={50}
        isWalking={isWalking}
        isHappy={isHappy || isGreeting}
        facingLeft={facingLeft}
      />
    );
  }

  return (
    <div
      style={{
        transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
        transition: shouldReduceMotion
          ? 'none'
          : 'transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1)'
      }}
      className="relative flex flex-col items-center justify-center select-none w-[60px] h-[90px] sm:w-[80px] sm:h-[100px]"
      aria-label={`Tinu Digital Clone (${currentAnimationState})`}
      data-animation-state={currentAnimationState}
    >
      {/* 1. Subtle Holographic Grounding Pedestal */}
      <div className="absolute -bottom-1.5 inset-x-0 flex flex-col items-center pointer-events-none z-0">
        <div
          className={`w-16 sm:w-20 h-2.5 rounded-full bg-cyan-400/20 filter blur-[2px] transition-all duration-300 ${
            isWalking ? 'scale-110 opacity-90' : isGreeting ? 'scale-120 opacity-100' : 'opacity-60'
          } ${shouldReduceMotion ? '' : 'animate-pulse'}`}
        />
        <div
          className={`-mt-1.5 w-12 sm:w-16 h-1.5 rounded-full border border-cyan-400/70 bg-cyan-500/25 shadow-[0_0_12px_rgba(0,240,255,0.7)] ${
            shouldReduceMotion ? '' : 'animate-pulse'
          }`}
        />
      </div>

      {/* 2. Soft Ambient Cyan Hologram Aura (Subtle back glow around character, no box) */}
      <div
        className={`absolute -inset-2 rounded-full bg-cyan-400/10 filter blur-xl pointer-events-none transition-all duration-300 ${
          isGreeting || isHappy
            ? 'opacity-80 scale-105'
            : isWalking
            ? 'opacity-60 scale-100'
            : 'opacity-30 scale-95'
        }`}
      />

      {/* 3. Character Container (Transparent, borderless) */}
      <div
        className="relative w-full h-full bg-transparent border-0 shadow-none flex items-center justify-center"
      >
        {/* Active 3D Model Renderer (When GLB model is available) */}
        {!is3DModelFailed && modelUrl && !shouldReduceMotion && (
          <div
            className={`w-full h-full transition-opacity duration-700 ${
              is3DModelLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Suspense fallback={null}>
              <TinuModelViewer3D
                modelPath={modelUrl}
                animationState={currentAnimationState}
                isWalking={isWalking}
                isGreeting={isGreeting}
                isThinking={isThinking}
                isInteracting={isHappy}
                facingLeft={false}
                onLoadSuccess={() => setIs3DModelLoaded(true)}
                onLoadError={() => setIs3DModelFailed(true)}
              />
            </Suspense>
          </div>
        )}

        {/* Futuristic Holographic Shimmer / Silhouette Loader (Visible while 3D model is downloading) */}
        {!is3DModelLoaded && !is3DModelFailed && !shouldReduceMotion && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            {/* Holographic scanning energy beam */}
            <div className="relative w-12 sm:w-16 h-24 sm:h-32 flex flex-col items-center justify-center">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-cyan-400/40 bg-cyan-500/10 animate-pulse shadow-[0_0_15px_rgba(0,240,255,0.4)]" />
              <div className="w-10 sm:w-12 h-14 sm:h-18 mt-1.5 rounded-xl border border-cyan-400/30 bg-cyan-500/10 animate-pulse shadow-[0_0_20px_rgba(0,240,255,0.3)]" />
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-bounce opacity-80" />
            </div>
            <span className="mt-1 text-[9px] font-mono tracking-widest text-cyan-300 font-bold uppercase animate-pulse">
              INITIALIZING...
            </span>
          </div>
        )}

        {/* Fallback Static Avatar Image (Only active if 3D completely fails to load or during reduced-motion) */}
        {(is3DModelFailed || shouldReduceMotion) && (
          <img
            src={avatarImage}
            alt="Tinu Sunny Digital Clone"
            className={`w-full h-full object-contain object-bottom filter brightness-105 contrast-102 transition-all duration-300 ${
              isHappy && !shouldReduceMotion ? 'scale-103' : 'scale-100'
            }`}
            onError={() => setHasImageError(true)}
            loading="eager"
          />
        )}
      </div>
    </div>
  );
};
