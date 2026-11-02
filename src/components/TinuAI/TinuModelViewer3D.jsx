import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * TinuModelViewer3D: Three.js WebGL Character Renderer
 * 
 * Supports both:
 * 1. Rigged Humanoid GLBs (Skeletal Animation Clips + IK Head Tracking)
 * 2. Static / Photogrammetry Character Meshes (Smooth Interactive Breathing,
 *    Cursor Gaze Parallax, and Hover/Thinking Dynamics)
 * 
 * Safety & Performance:
 * - Lazy-loads `modelPath` asynchronously with automatic centering & scaling.
 * - Pauses WebGL rendering loop when document is hidden.
 * - Caps pixel ratio to prevent mobile GPU battery drain.
 * - Graceful fallback to static 2D avatar on error or WebGL context loss.
 */
export const TinuModelViewer3D = ({
  modelPath = '/assets/tinu_avatar.glb',
  isWalking = false,
  isGreeting = false,
  isThinking = false,
  isInteracting = false,
  facingLeft = false,
  onLoadSuccess,
  onLoadError
}) => {
  const containerRef = useRef(null);
  const [loadError, setLoadError] = useState(false);
  const [availableClips, setAvailableClips] = useState([]);

  // Active animation state hierarchy
  const activeState = useMemo(() => {
    if (isWalking) return 'walking';
    if (isGreeting) return 'greeting';
    if (isThinking) return 'thinking';
    if (isInteracting) return 'interacting';
    return 'idle';
  }, [isWalking, isGreeting, isThinking, isInteracting]);

  const activeStateRef = useRef(activeState);
  useEffect(() => {
    activeStateRef.current = activeState;
  }, [activeState]);

  const isWalkingRef = useRef(isWalking);
  useEffect(() => {
    isWalkingRef.current = isWalking;
  }, [isWalking]);

  useEffect(() => {
    let renderer, scene, camera, mixer, clock, animationFrameId;
    let characterRoot = null;
    let headBone = null;
    let neckBone = null;
    let hipsBone = null;
    let currentAction = null;
    let isDisposed = false;
    let hasSkeletalClips = false;
    const actions = {};

    // 1. Mouse move tracker for cursor gaze / head look
    let targetMouseX = 0;
    let targetMouseY = 0;
    const handlePointerMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 2. Initialize Three.js Scene
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 96;
    const height = container.clientHeight || 155;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 1.05, 2.65);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      // 3. Cyberpunk Portfolio Lighting Palette
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
      keyLight.position.set(1.5, 3.5, 3.0);
      scene.add(keyLight);

      // Cyan accent rim light matching portfolio theme (#00f0ff)
      const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 3.8);
      cyanRimLight.position.set(-2.5, 2.0, -1.8);
      scene.add(cyanRimLight);

      // Blue fill light from front-bottom
      const fillLight = new THREE.DirectionalLight(0x3b82f6, 1.2);
      fillLight.position.set(0, -1.2, 2.0);
      scene.add(fillLight);

      clock = new THREE.Clock();

      // 4. Load Character GLB Model
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          if (isDisposed) return;
          const model = gltf.scene;
          characterRoot = model;

          // Normalize and center model geometry inside frame
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          // Scale so the character's full torso and silhouette fit the frame
          const targetHeight = 1.9;
          const scale = targetHeight / (size.y || 1);
          model.scale.setScalar(scale);

          // Center horizontally and align feet/base with the hologram ground ring
          model.position.x = -center.x * scale;
          model.position.y = -box.min.y * scale + 0.05;
          model.position.z = -center.z * scale;

          scene.add(model);

          // Locate bones if model contains skeletal armature
          model.traverse((child) => {
            if (child.isBone) {
              const bName = child.name.toLowerCase();
              if (/head/i.test(bName)) headBone = child;
              if (/neck/i.test(bName) && !neckBone) neckBone = child;
              if (/hips|pelvis|root/i.test(bName) && !hipsBone) hipsBone = child;
            }
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              // Ensure materials respond well to ambient lighting
              if (child.material) {
                child.material.needsUpdate = true;
              }
            }
          });

          // 5. Setup Animation Mixer if Skeletal Clips are present
          if (gltf.animations && gltf.animations.length > 0) {
            hasSkeletalClips = true;
            mixer = new THREE.AnimationMixer(model);
            const clipNames = gltf.animations.map((c) => c.name);
            setAvailableClips(clipNames);

            gltf.animations.forEach((clip) => {
              const lowerName = clip.name.toLowerCase();
              const action = mixer.clipAction(clip);
              actions[clip.name] = action;

              if (/idle|breath|wait|stance/i.test(lowerName)) actions['idle'] = action;
              if (/walk|run|move|locomotion/i.test(lowerName)) actions['walking'] = action;
              if (/wave|greet|hello|salute/i.test(lowerName)) actions['greeting'] = action;
              if (/talk|speak|interact|gesture/i.test(lowerName)) actions['interacting'] = action;
              if (/think|ponder|contemplate/i.test(lowerName)) actions['thinking'] = action;
            });

            const playState = (targetState) => {
              const nextAction = actions[targetState] || actions['idle'] || Object.values(actions)[0];
              if (!nextAction) return;

              if (currentAction !== nextAction) {
                nextAction.reset();
                nextAction.enabled = true;
                nextAction.setEffectiveTimeScale(1);
                nextAction.setEffectiveWeight(1);

                if (currentAction) {
                  nextAction.crossFadeFrom(currentAction, 0.25, true);
                }
                nextAction.play();
                currentAction = nextAction;
              }
            };

            playState(activeStateRef.current);
            container._playThreeAction = playState;
          }

          onLoadSuccess?.(gltf);
        },
        undefined,
        (error) => {
          console.warn(`[TinuAI 3D] Could not load GLB at "${modelPath}". Using static avatar fallback.`, error);
          setLoadError(true);
          onLoadError?.(error);
        }
      );

      // 6. Animation & Interaction Render Loop
      const animate = () => {
        if (isDisposed) return;
        animationFrameId = requestAnimationFrame(animate);

        // Save GPU battery when tab is hidden
        if (document.hidden) return;

        const delta = clock ? clock.getDelta() : 0.016;
        const elapsedTime = clock ? clock.getElapsedTime() : 0;

        // Path A: Skeletal Rig Animation
        if (hasSkeletalClips && mixer) {
          mixer.update(delta);

          // Root Motion Lock: prevent walk clips from drifting
          if (hipsBone) {
            hipsBone.position.x = 0;
            hipsBone.position.z = 0;
          }

          // Skeletal Head Tracking
          if (headBone) {
            if (!isWalkingRef.current) {
              const maxAngle = 0.38;
              const targetRotY = targetMouseX * maxAngle;
              const targetRotX = -targetMouseY * maxAngle * 0.55;

              headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, targetRotY, 0.07);
              headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, targetRotX, 0.07);
            } else {
              headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, 0, 0.1);
              headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, 0, 0.1);
            }
          }
        } 
        // Path B: High-Fidelity Photogrammetry / Character Mesh Animation (Smooth Life Dynamics)
        else if (characterRoot) {
          const currentState = activeStateRef.current;

          // 1. Interactive Cursor Gaze Parallax (Follows visitor)
          const maxTurn = 0.35; // ~20 degrees
          const targetYaw = targetMouseX * maxTurn;
          const targetPitch = -targetMouseY * maxTurn * 0.45;

          characterRoot.rotation.y = THREE.MathUtils.lerp(characterRoot.rotation.y, targetYaw, 0.06);
          characterRoot.rotation.x = THREE.MathUtils.lerp(characterRoot.rotation.x, targetPitch, 0.06);

          // 2. State-Based Micro Dynamics:
          if (currentState === 'walking') {
            // Subtle rhythmic locomotion sway during waypoint traversal
            const strideSway = Math.sin(elapsedTime * 9) * 0.04;
            const strideBob = Math.abs(Math.sin(elapsedTime * 9)) * 0.03;
            characterRoot.rotation.z = THREE.MathUtils.lerp(characterRoot.rotation.z, strideSway, 0.1);
            characterRoot.position.y = THREE.MathUtils.lerp(characterRoot.position.y, strideBob + 0.05, 0.1);
          } else if (currentState === 'thinking') {
            // Inquisitive slight head tilt
            characterRoot.rotation.z = THREE.MathUtils.lerp(characterRoot.rotation.z, -0.06, 0.05);
          } else if (currentState === 'greeting' || currentState === 'interacting') {
            // Welcoming forward lean
            const waveNod = Math.sin(elapsedTime * 5) * 0.03;
            characterRoot.rotation.x = THREE.MathUtils.lerp(characterRoot.rotation.x, targetPitch + waveNod + 0.04, 0.08);
            characterRoot.rotation.z = THREE.MathUtils.lerp(characterRoot.rotation.z, 0, 0.05);
          } else {
            // Natural idle breathing & thoracic respiration cycle
            const breathCycle = Math.sin(elapsedTime * 2.2) * 0.015;
            characterRoot.position.y = THREE.MathUtils.lerp(characterRoot.position.y, breathCycle + 0.05, 0.05);
            characterRoot.rotation.z = THREE.MathUtils.lerp(characterRoot.rotation.z, 0, 0.05);
          }
        }

        renderer.render(scene, camera);
      };

      animate();
    } catch (err) {
      console.warn('[TinuAI 3D] WebGL Initialization Error:', err);
      setLoadError(true);
      onLoadError?.(err);
    }

    // 7. Teardown & Resource Disposal
    return () => {
      isDisposed = true;
      window.removeEventListener('pointermove', handlePointerMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, [modelPath]);

  // Reactive animation transition handler
  useEffect(() => {
    const container = containerRef.current;
    if (container && container._playThreeAction) {
      container._playThreeAction(activeState);
    }
  }, [activeState]);

  if (loadError) return null;

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
        transition: 'transform 0.4s cubic-bezier(0.34, 1.4, 0.64, 1)'
      }}
    />
  );
};
