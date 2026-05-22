"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SOCIAL_LINKS, STATS, PERSONAL } from "@/lib/constants";

export default function Hero() {
  const { t } = useLanguage();
  const [nameIndex, setNameIndex] = useState(0);
  const names = [PERSONAL.name.toUpperCase(), PERSONAL.nickname];

  useEffect(() => {
    const timer = setInterval(() => {
      setNameIndex((prev) => (prev + 1) % names.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm font-medium text-accent"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {t.hero.available}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-8xl font-display font-black tracking-tight mb-4 leading-tight min-h-[1.2em] flex flex-col items-center overflow-visible"
        >
          <span className="block text-foreground/60 text-xl md:text-2xl font-medium tracking-[0.2em] uppercase mb-4">
            {t.hero.hello}
          </span>
          <div className="relative h-[1.1em] w-full flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={nameIndex}
                className="absolute flex flex-wrap justify-center whitespace-nowrap"
              >
                {names[nameIndex].split("").map((char, i) => (
                  <motion.span
                    key={`${nameIndex}-${i}`}
                    initial={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      transition: { duration: 0.6, delay: i * 0.02 }
                    }}
                    exit={{
                      opacity: 0,
                      y: -40 - Math.random() * 40,
                      x: (Math.random() - 0.5) * 100,
                      rotate: (Math.random() - 0.5) * 90,
                      filter: "blur(12px)",
                      scale: 0.1,
                      transition: { duration: 0.5, delay: i * 0.01 }
                    }}
                    className={cn(
                      "inline-block",
                      nameIndex === 0 && char !== " " && (i > 8) ? "gradient-text" : "",
                      nameIndex === 1 ? "gradient-text" : ""
                    )}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.h1>

        {/* Interests Marquee Style */}
        <div className="relative w-full overflow-hidden py-8 mb-8">
          <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background to-transparent z-10" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap w-fit px-6"
          >
            {[...t.hero.interests, ...t.hero.interests, ...t.hero.interests].map((item, i) => (
              <span
                key={i}
                className="text-xl md:text-2xl font-display font-bold uppercase tracking-[0.2em] text-foreground/20 hover:text-primary transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-foreground/60 text-lg md:text-xl mb-12 leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <a
            href="#projects"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-primary/20 group"
          >
            {t.hero.explore}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="glass glass-hover px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
          >
            {t.hero.talk}
          </a>
        </motion.div>

        {/* Live Data Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {STATS.map((stat) => (
            <div key={stat.labelKey} className="glass p-4 rounded-2xl group hover:border-primary/30 transition-colors">
              <div className={cn("text-2xl md:text-3xl font-black mb-1", stat.color)}>
                {stat.value}{stat.unit}
              </div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 group-hover:text-foreground/60 transition-colors">
                {t.about.stats[stat.labelKey]}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-6 mt-16"
        >
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="p-3 rounded-full glass glass-hover text-foreground/60 hover:text-primary transition-colors"
            >
              <social.icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.hero.scroll}</span>
        <div className="w-[1px] h-12 bg-linear-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
