"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Building, MapPin, Lock, BookOpen, Cpu, Layers, Briefcase, Sparkles } from "lucide-react";

export default function InternshipPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const mockTechStack = ["Next.js", "FastAPI", "LlamaIndex RAG", "ChromaDB", "YOLOE / CV", "Docker", "Git"];

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-128 h-128 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-128 h-128 bg-secondary/5 rounded-full blur-[120px] -z-10" />

      {/* Main Container */}
      <div className="container mx-auto max-w-5xl px-6 py-12 md:py-20 flex-grow flex flex-col justify-center relative z-10">
        
        {/* Navigation & Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button
            onClick={() => router.push("/#about")}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/50 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t.internship.back}
          </button>
        </motion.div>

        {/* Title Block */}
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-primary font-display font-bold tracking-[0.3em] uppercase text-xs">
              06 — Engineering Journals
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6 italic"
            dangerouslySetInnerHTML={{ __html: t.internship.title }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-foreground/50 text-lg leading-relaxed"
          >
            {t.internship.subtitle}
          </motion.p>
        </div>

        {/* Recruitment/Simulation Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-12 relative overflow-hidden rounded-[2.5rem] glass border border-amber-500/10 bg-amber-500/[0.02] p-6 md:p-8 hover:border-amber-500/20 transition-all duration-300 shadow-2xl select-none"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="space-y-0.5">
                <h3 className="text-lg font-display font-black tracking-tight text-foreground/90">
                  {t.internship.disclaimerTitle}
                </h3>
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">
                  {t.internship.disclaimerSubtitle}
                </p>
              </div>
              <p className="text-xs text-foreground/60 leading-relaxed max-w-4xl">
                {t.internship.disclaimerText}
              </p>
            </div>
          </div>
          {/* Subtle glow highlight effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/0 via-amber-500/[0.02] to-amber-500/0 opacity-100 blur-2xl transition-opacity duration-1000 -z-10" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Left Column: Role & Placement Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-5 space-y-8"
          >
            {/* Internship Profile Card */}
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10" />
              
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit">
                  <Briefcase size={28} />
                </div>
                
                <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">Active Assignment</h2>
                  <h3 className="text-2xl font-display font-black text-foreground/90 leading-tight">
                    {t.internship.role}
                  </h3>
                </div>

                <div className="h-[1px] bg-white/5 w-full" />

                {/* Placement Parameters */}
                <div className="space-y-4 text-sm text-foreground/60">
                  <div className="flex items-center gap-3">
                    <Building size={16} className="text-primary shrink-0" />
                    <span>{t.internship.company}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-primary shrink-0" />
                    <span>{t.internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-primary shrink-0" />
                    <span>{t.internship.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scope Overview Card */}
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                <BookOpen size={14} className="text-primary" />
                {t.internship.overview}
              </h3>
              <p className="text-sm text-foreground/50 leading-relaxed">
                {t.internship.overviewDesc}
              </p>
              
              {/* Placement Tools Marquee Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {mockTechStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-foreground/[0.03] text-[9.5px] font-bold uppercase tracking-widest text-foreground/40 border border-white/5 hover:border-primary/20 hover:text-foreground/75 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Weekly Progressive Stepper */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-7 space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-1.5">
                <Sparkles size={12} className="animate-pulse" />
                {t.internship.weeksTitle}
              </h2>
              <p className="text-xs text-foreground/40">
                {t.internship.weeksSubtitle}
              </p>
            </div>

            <div className="space-y-6 relative">
              {/* Stepper Timeline Axis Line */}
              <div className="absolute top-4 bottom-4 left-6 w-[1px] bg-gradient-to-b from-primary/30 via-white/5 to-transparent" />

              {t.internship.weeks.map((week, idx) => (
                <div 
                  key={week.id} 
                  className="flex gap-6 items-start relative group"
                >
                  {/* Step Bubble Indicator */}
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center font-bold text-xs shrink-0 select-none backdrop-blur-md relative z-10 transition-colors group-hover:border-primary/20 group-hover:bg-primary/5">
                    <Lock size={14} className="text-foreground/30 group-hover:text-primary transition-colors" />
                  </div>

                  {/* Step Card Body */}
                  <div className="flex-1 glass bg-white/[0.005] border border-white/5 p-6 rounded-3xl relative overflow-hidden transition-all duration-300 group-hover:border-white/10 group-hover:bg-white/[0.01]">
                    
                    {/* Header: Date + Status */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className="text-[9px] uppercase tracking-widest text-foreground/30 font-bold block flex items-center gap-1.5">
                        <Calendar size={10} />
                        {week.date}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[8px] font-black uppercase tracking-widest border border-amber-500/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        {t.internship.upcoming}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-display font-black text-base text-foreground/80 mb-3 group-hover:text-primary transition-colors">
                      {week.title}
                    </h4>

                    {/* Summary */}
                    <p className="text-xs text-foreground/40 leading-relaxed mb-4">
                      {week.summary}
                    </p>

                    {/* Info Locker Layer */}
                    <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/[0.01] border border-white/[0.03] text-[10px] text-foreground/30 select-none">
                      <Lock size={12} className="shrink-0" />
                      <span>{t.internship.upcomingDesc}</span>
                    </div>

                    {/* Glowing highlight frame */}
                    <div className="absolute -inset-px bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic visual divider accent */}
            <div className="h-0.5 w-full bg-gradient-to-r from-primary/20 via-secondary/20 to-transparent rounded-full pt-0.5 mt-8" />
          </motion.div>
        </div>

      </div>
    </main>
  );
}
