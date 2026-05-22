"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Use ref for angle to avoid re-renders on every mouse move
  const angleRef = useRef(0);

  // Track which elements already have listeners to prevent duplicates
  const trackedElements = useRef(new WeakSet<Element>());

  // Store listener refs for cleanup
  const listenersRef = useRef<{ el: Element; enter: () => void; leave: () => void }[]>([]);

  // Position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for different layers
  const mainX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const mainY = useSpring(mouseY, { damping: 20, stiffness: 300 });
  
  const outerX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const outerY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  // Spring for the trailing particle
  const trailX = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 100 });

  // Velocity for "liquid" stretch effect
  const velX = useVelocity(mouseX);
  const velY = useVelocity(mouseY);

  const handleHover = useCallback(() => setIsHovering(true), []);
  const handleUnhover = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    // Detect touch devices — skip custom cursor
    const hasFineCursor = window.matchMedia("(pointer: fine)").matches;
    if (!hasFineCursor) {
      setIsTouchDevice(true);
      return;
    }

    setMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      const dx = clientX - mouseX.get();
      const dy = clientY - mouseY.get();
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        angleRef.current = Math.atan2(dy, dx) * (180 / Math.PI);
      }

      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    // Attach hover listeners only to new elements (WeakSet prevents duplicates)
    const updateInteractables = () => {
      const interactables = document.querySelectorAll("a, button, .group, input, textarea");
      interactables.forEach((el) => {
        if (trackedElements.current.has(el)) return;
        trackedElements.current.add(el);

        const enter = handleHover;
        const leave = handleUnhover;
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        listenersRef.current.push({ el, enter, leave });
      });
    };

    updateInteractables();

    // Debounce MutationObserver to avoid excessive DOM queries
    let debounceTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updateInteractables, 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      observer.disconnect();
      clearTimeout(debounceTimer);

      // Clean up all tracked event listeners
      listenersRef.current.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      listenersRef.current = [];
      trackedElements.current = new WeakSet();
    };
  }, [mouseX, mouseY, handleHover, handleUnhover]);

  // Derived transforms for the "liquid" stretch
  const speed = useTransform([velX, velY], ([latestVelX, latestVelY]) => {
    const s = Math.sqrt(Number(latestVelX) ** 2 + Number(latestVelY) ** 2);
    return Math.min(s / 1000, 0.8);
  });

  const stretch = useTransform(speed, [0, 0.8], [1, 1.8]);
  const squeeze = useTransform(speed, [0, 0.8], [1, 0.6]);

  if (!mounted || isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 1. Large Ambient Glow (Slowest) */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* 2. Outer Liquid Ring (Medium delay) */}
      <motion.div
        className="absolute w-12 h-12 border border-primary/30 rounded-full flex items-center justify-center backdrop-blur-[2px]"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 2 : isClicking ? 0.8 : 1,
          rotate: angleRef.current,
          scaleX: stretch,
          scaleY: squeeze,
        }}
      >
        <div className="w-1 h-1 bg-primary/40 rounded-full" />
      </motion.div>

      {/* 3. Core Liquid Drop (Fastest) */}
      <motion.div
        className="absolute w-4 h-4 bg-primary rounded-full mix-blend-difference"
        style={{
          x: mainX,
          y: mainY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isClicking ? 0.5 : 1,
          rotate: angleRef.current,
          scaleX: stretch,
          scaleY: squeeze,
        }}
      />

      {/* 4. Trailing Particle */}
      <motion.div
        className="absolute w-1 h-1 bg-primary/20 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
