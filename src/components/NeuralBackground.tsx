"use client";

export default function NeuralBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-background">
      {/* 
        1. Static Ambient Scanner Glow (Eco-Friendly / High Performance):
        Provides a gorgeous, high-contrast glow at the top without active repaint loops.
      */}
      <div 
        className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-primary/10 to-transparent blur-3xl pointer-events-none opacity-[0.4]"
      />

      {/* 
        2. Static Ambient Orbs (Eco-Friendly / High Performance):
        Static glowing backdrop circles to create premium depth with 0% CPU consumption.
      */}
      <div 
        className="absolute top-1/4 -left-1/4 w-[70vw] h-[70vw] bg-primary/5 rounded-full blur-[130px] mix-blend-screen pointer-events-none"
      />
      <div 
        className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-secondary/5 rounded-full blur-[130px] mix-blend-screen pointer-events-none"
      />
    </div>
  );
}
