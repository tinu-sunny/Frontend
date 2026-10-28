import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * RobotAvatar: A futuristic, animated SVG robot character for Tinu AI.
 * Features:
 * - Pulsing cyan antenna orb
 * - Visor with animated blinking LED eyes
 * - Cyber ear nodes with glowing cyan lights
 * - Torso with glowing arc-reactor core
 * - Thruster propulsion glow
 */
export const RobotAvatar = ({ size = 52, isWalking = false, isHappy = false, facingLeft = false }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      style={{
        width: size,
        height: size * 1.15,
        transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
        transition: shouldReduceMotion ? 'none' : 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      className="relative flex items-center justify-center select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 115"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic gradients */}
          <linearGradient id="robotHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          <linearGradient id="robotVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="100%" stopColor="#08152e" />
          </linearGradient>

          <linearGradient id="cyanCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Antenna --- */}
        {/* Antenna Stalk */}
        <line
          x1="50"
          y1="22"
          x2="50"
          y2="9"
          stroke="#00f0ff"
          strokeWidth="3"
          strokeLinecap="round"
          className="opacity-90"
        />
        {/* Pulsing Antenna Orb */}
        <circle
          cx="50"
          cy="7"
          r="5"
          fill="#00f0ff"
          filter="url(#cyanGlow)"
          className={shouldReduceMotion ? '' : 'animate-pulse'}
        />
        <circle cx="50" cy="7" r="2.5" fill="#ffffff" />

        {/* --- Side Ears / Nodes --- */}
        <rect
          x="14"
          y="35"
          width="6"
          height="14"
          rx="3"
          fill="#0e7490"
          stroke="#00f0ff"
          strokeWidth="1.5"
        />
        <rect
          x="80"
          y="35"
          width="6"
          height="14"
          rx="3"
          fill="#0e7490"
          stroke="#00f0ff"
          strokeWidth="1.5"
        />

        {/* --- Robot Head --- */}
        <rect
          x="19"
          y="22"
          width="62"
          height="42"
          rx="14"
          fill="url(#robotHeadGrad)"
          stroke="#00f0ff"
          strokeWidth="2"
        />

        {/* Head Top Highlight Sheen */}
        <path
          d="M 28 26 Q 50 23 72 26"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* --- Dark Visor Screen --- */}
        <rect
          x="26"
          y="29"
          width="48"
          height="28"
          rx="9"
          fill="url(#robotVisorGrad)"
          stroke="#06b6d4"
          strokeWidth="1.2"
        />

        {/* --- Expressive Cyan LED Eyes (Blinking via CSS) --- */}
        <g className={shouldReduceMotion ? '' : 'animate-[blink_3.8s_infinite]'}>
          {isHappy ? (
            /* Happy curved eyes */
            <>
              <path
                d="M 34 44 Q 40 37 46 44"
                stroke="#00f0ff"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#cyanGlow)"
              />
              <path
                d="M 54 44 Q 60 37 66 44"
                stroke="#00f0ff"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#cyanGlow)"
              />
            </>
          ) : (
            /* Friendly rounded LED pill eyes */
            <>
              <rect
                x="34"
                y="37"
                width="11"
                height="12"
                rx="5"
                fill="#00f0ff"
                filter="url(#cyanGlow)"
              />
              <circle cx="39.5" cy="40.5" r="2" fill="#ffffff" />

              <rect
                x="55"
                y="37"
                width="11"
                height="12"
                rx="5"
                fill="#00f0ff"
                filter="url(#cyanGlow)"
              />
              <circle cx="60.5" cy="40.5" r="2" fill="#ffffff" />
            </>
          )}
        </g>

        {/* --- Neck Joint --- */}
        <rect x="42" y="64" width="16" height="5" rx="2" fill="#0891b2" />

        {/* --- Robot Torso / Body --- */}
        <path
          d="M 28 69 L 72 69 L 66 94 L 34 94 Z"
          fill="url(#robotHeadGrad)"
          stroke="#00f0ff"
          strokeWidth="1.8"
        />

        {/* Torso Arc Reactor Core */}
        <circle
          cx="50"
          cy="80"
          r="6.5"
          fill="url(#cyanCoreGrad)"
          filter="url(#cyanGlow)"
          className={shouldReduceMotion ? '' : 'animate-pulse'}
        />
        <circle cx="50" cy="80" r="3" fill="#ffffff" />

        {/* Chest Accent Lines */}
        <line x1="36" y1="74" x2="42" y2="74" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <line x1="58" y1="74" x2="64" y2="74" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

        {/* --- Thruster Propulsion / Micro Legs --- */}
        {isWalking ? (
          /* Animated walking micro-limbs */
          <g className={shouldReduceMotion ? '' : 'animate-bounce'}>
            <rect x="38" y="94" width="7" height="11" rx="3.5" fill="#0891b2" stroke="#00f0ff" strokeWidth="1" />
            <rect x="55" y="94" width="7" height="11" rx="3.5" fill="#0891b2" stroke="#00f0ff" strokeWidth="1" />
          </g>
        ) : (
          /* Levitating thruster glow */
          <g>
            <rect x="42" y="94" width="16" height="4" rx="2" fill="#0e7490" />
            <ellipse
              cx="50"
              cy="102"
              rx="12"
              ry="3.5"
              fill="#00f0ff"
              opacity="0.75"
              filter="url(#cyanGlow)"
              className={shouldReduceMotion ? '' : 'animate-pulse'}
            />
            <ellipse cx="50" cy="102" rx="6" ry="1.8" fill="#ffffff" />
          </g>
        )}
      </svg>
    </div>
  );
};
