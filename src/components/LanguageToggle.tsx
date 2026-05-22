"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { motion } from "framer-motion";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLanguage(language === "en" ? "th" : "en")}
      className="px-3 py-1 rounded-full glass border border-white/10 text-[11px] font-black tracking-tighter flex items-center gap-2 hover:text-primary transition-colors"
      aria-label="Toggle language"
    >
      <span className={language === "en" ? "text-primary" : "text-foreground/40"}>EN</span>
      <div className="w-[1px] h-3 bg-white/10" />
      <span className={language === "th" ? "text-primary" : "text-foreground/40"}>TH</span>
    </motion.button>
  );
}
