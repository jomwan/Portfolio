"use client";

import { motion } from "framer-motion";

export default function NeuralBackground() {

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-background">
      {/* 
        1. Base Grid Layer: 
        Uses repeating linear gradients to create a high-tech data grid effect.
      */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 
        2. Animated Scanner / Data Pulse:
        Moves a glowing band down the grid. Disabled in ecoMode.
      */}
      <motion.div
        animate={{
          y: ["-50vh", "150vh"],
          opacity: [0, 0.1, 0.5, 0.1, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-1/2 left-0 w-full h-[50vh] bg-gradient-to-b from-transparent via-primary/30 to-transparent blur-3xl pointer-events-none"
      />

      {/* 
        3. Ambient Orbs:
        Slow breathing blobs in the background. Minimal GPU usage.
      */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-1/4 w-[70vw] h-[70vw] bg-primary/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.02, 0.06, 0.02],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-secondary/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
      />

      {/* 
        4. Static Vignette / Mask:
        Fades out the edges so the grid looks like it's emerging from the center.
      */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, var(--background) 80%)"
        }}
      />
    </div>
  );
}
