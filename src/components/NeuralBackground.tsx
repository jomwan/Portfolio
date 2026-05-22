"use client";

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
        2. Static Ambient Scanner Glow (Eco-Friendly / High Performance):
        Provides a gorgeous, high-contrast glow at the top without active repaint loops.
      */}
      <div 
        className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-primary/10 to-transparent blur-3xl pointer-events-none opacity-[0.4]"
      />

      {/* 
        3. Static Ambient Orbs (Eco-Friendly / High Performance):
        Static glowing backdrop circles to create premium depth with 0% CPU consumption.
      */}
      <div 
        className="absolute top-1/4 -left-1/4 w-[70vw] h-[70vw] bg-primary/5 rounded-full blur-[130px] mix-blend-screen pointer-events-none"
      />
      <div 
        className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-secondary/5 rounded-full blur-[130px] mix-blend-screen pointer-events-none"
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
