"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Track which elements already have listeners to prevent duplicates
  const trackedElements = useRef(new WeakSet<Element>());

  // Store listener refs for cleanup
  const listenersRef = useRef<{ el: Element; enter: () => void; leave: () => void }[]>([]);

  // Position values (raw mouse coordinates)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for only the outer tracking ring to minimize layout calculations
  const outerX = useSpring(mouseX, { damping: 30, stiffness: 220 });
  const outerY = useSpring(mouseY, { damping: 30, stiffness: 220 });

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
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    // Attach hover listeners only to new elements
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

      // Clean up tracked event listeners
      listenersRef.current.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      listenersRef.current = [];
      trackedElements.current = new WeakSet();
    };
  }, [mouseX, mouseY, handleHover, handleUnhover]);

  if (!mounted || isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 1. Outer Tracking Ring (Delayed Smooth Spring, no blur repaints) */}
      <motion.div
        className="absolute w-10 h-10 border border-primary/30 rounded-full flex items-center justify-center backdrop-blur-[1px]"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 1.6 : isClicking ? 0.8 : 1,
        }}
      />

      {/* 2. Core Dot (Instant Mouse Follow, extremely cheap) */}
      <motion.div
        className="absolute w-3 h-3 bg-primary rounded-full mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isClicking ? 0.6 : 1,
        }}
      />
    </div>
  );
}
