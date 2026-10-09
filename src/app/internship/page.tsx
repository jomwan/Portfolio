"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Building, 
  MapPin, 
  Lock, 
  BookOpen, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Flame, 
  Info,
  Check,
  AlertCircle,
  Hash
} from "lucide-react";

export default function InternshipPage() {
  const router = useRouter();
  const { t } = useLanguage();
  
  // State management
  const [expandedWeek, setExpandedWeek] = useState<string | null>("week-5");
  const [filter, setFilter] = useState<"all" | "completed" | "upcoming">("all");
  const [showAccreditationModal, setShowAccreditationModal] = useState(false);

  const techStack = [
    "FastAPI", 
    "Async SQLAlchemy 2.0", 
    "asyncpg", 
    "PostgreSQL", 
    "Next.js", 
    "Astral uv", 
    "Alembic", 
    "Telegram Bot API", 
    "Viber Bot API", 
    "Docker", 
    "Pytest", 
    "Tailwind CSS"
  ];

  const weeksList = t.internship.weeks || [];

  const filteredWeeks = weeksList.filter((week) => {
    if (filter === "completed") return week.status === "Completed" || week.status === "In Progress";
    if (filter === "upcoming") return week.status === "Upcoming";
    return true;
  });

  const toggleWeek = (id: string) => {
    setExpandedWeek((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-128 h-128 bg-primary/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-128 h-128 bg-secondary/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Main Container */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-16 flex-grow flex flex-col justify-center relative z-10">
        
        {/* Navigation & Back Action */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/50 hover:text-primary transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t.internship.back}
          </button>

          <button
            onClick={() => setShowAccreditationModal(true)}
            className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-foreground/50 hover:text-foreground/80 glass px-3.5 py-1.5 rounded-full border border-white/5 transition-all hover:border-primary/20"
          >
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>RSU ICTCE04 Accredited</span>
          </button>
        </motion.div>

        {/* Title & Active Placement Banner */}
        <div className="mb-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-10 h-[1.5px] bg-primary" />
            <span className="text-primary font-display font-bold tracking-[0.25em] uppercase text-xs">
              {t.internship.tag}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-display font-bold leading-tight mb-4"
            dangerouslySetInnerHTML={{ __html: t.internship.title }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-foreground/60 text-base md:text-lg leading-relaxed max-w-3xl mb-8"
          >
            {t.internship.subtitle}
          </motion.p>

          {/* Real Placement Progress Bar & Metric Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass bg-white/[0.015] border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl relative overflow-hidden backdrop-blur-md"
          >
            {/* Ambient glowing backdrops */}
            <div className="absolute top-0 right-0 w-64 h-32 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t.internship.statusBadge}
                </span>
                <span className="text-xs font-medium text-foreground/50 hidden sm:inline">
                  • {t.internship.university}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-foreground/70">
                  {t.internship.metrics.accumulatedHours} / {t.internship.metrics.targetHours} {t.internship.metrics.hoursLabel}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-primary/20 text-primary text-xs font-mono font-bold">
                  {t.internship.metrics.progressPercent}
                </span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5 relative mb-5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "35.7%" }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="h-full bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 rounded-full relative"
              >
                <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/60 blur-[1px] animate-pulse" />
              </motion.div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-0.5">
                  {t.internship.metrics.hoursLabel}
                </div>
                <div className="text-lg md:text-xl font-display font-black text-foreground">
                  {t.internship.metrics.accumulatedHours} <span className="text-xs font-normal text-foreground/40">hrs</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-0.5">
                  {t.internship.metrics.weeksLabel}
                </div>
                <div className="text-lg md:text-xl font-display font-black text-primary">
                  {t.internship.metrics.completedWeeks} <span className="text-xs font-normal text-foreground/40">/ {t.internship.metrics.totalWeeks}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-0.5">
                  {t.internship.metrics.targetLabel}
                </div>
                <div className="text-lg md:text-xl font-display font-black text-foreground/80">
                  {t.internship.metrics.targetHours} <span className="text-xs font-normal text-foreground/40">min</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-0.5">
                  {t.internship.metrics.paceLabel}
                </div>
                <div className="text-lg md:text-xl font-display font-black text-emerald-400">
                  40 <span className="text-xs font-normal text-foreground/40">h/wk</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Two-Column Grid: Left Assignment Details / Right Interactive Weekly Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Organization & System Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 space-y-6 lg:sticky lg:top-24"
          >
            {/* Active Company & Placement Card */}
            <div className="glass p-6 md:p-7 rounded-[2rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10 group-hover:bg-primary/20 transition-all" />
              
              <div className="space-y-5">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit border border-primary/20 shadow-lg shadow-primary/5">
                  <Briefcase size={24} />
                </div>
                
                <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                    {t.internship.curriculum}
                  </h2>
                  <h3 className="text-xl md:text-2xl font-display font-black text-foreground leading-tight">
                    {t.internship.role}
                  </h3>
                </div>

                <div className="h-[1px] bg-white/10 w-full" />

                {/* Company & Placement Parameters */}
                <div className="space-y-3.5 text-xs text-foreground/70">
                  <div className="flex items-start gap-3">
                    <Building size={16} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-foreground/90">{t.internship.company}</div>
                      <div className="text-[10px] text-foreground/40 font-mono mt-0.5">{t.internship.regNumber}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-primary shrink-0" />
                    <span>{t.internship.duration}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-primary shrink-0" />
                    <span>{t.internship.location}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-primary shrink-0" />
                    <span>Standard Schedule: Mon – Fri (40 hrs/wk)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Project Scope Card */}
            <div className="glass p-6 md:p-7 rounded-[2rem] border border-white/10 space-y-5">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-1.5 mb-2">
                  <Flame size={14} className="text-secondary" />
                  {t.internship.projectLabel}
                </h3>
                <h4 className="font-display font-bold text-sm text-foreground/90 leading-snug">
                  {t.internship.projectTitle}
                </h4>
              </div>

              <p className="text-xs text-foreground/50 leading-relaxed">
                {t.internship.overviewDesc}
              </p>
              
              {/* Placement Tech Stack */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-3 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-primary" />
                  {t.internship.techStackTitle}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-xl bg-white/[0.03] text-[10px] font-mono font-medium text-foreground/60 border border-white/5 hover:border-primary/30 hover:text-foreground transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <button
                  onClick={() => setShowAccreditationModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 text-xs font-semibold text-foreground/70 transition-all cursor-pointer"
                >
                  <Info size={14} className="text-primary" />
                  <span>RSU ICTCE04 Guidelines</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Weekly Logbook Stepper */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Header & Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                  <FileText size={14} />
                  {t.internship.weeksTitle}
                </h2>
                <p className="text-xs text-foreground/40 mt-1">
                  {t.internship.weeksSubtitle}
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-white/[0.02] p-1 rounded-2xl border border-white/5 text-[11px] font-semibold self-start sm:self-auto">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    filter === "all" 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {t.internship.filterAll}
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    filter === "completed" 
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {t.internship.filterCompleted}
                </button>
                <button
                  onClick={() => setFilter("upcoming")}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    filter === "upcoming" 
                      ? "bg-white/10 text-white border border-white/10" 
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {t.internship.filterUpcoming}
                </button>
              </div>
            </div>

            {/* Stepper Timeline List */}
            <div className="space-y-4 relative">
              {/* Stepper Timeline Axis Line */}
              <div className="absolute top-6 bottom-6 left-6 w-[1.5px] bg-gradient-to-b from-emerald-500/50 via-primary/30 to-white/5" />

              {filteredWeeks.map((week) => {
                const isExpanded = expandedWeek === week.id;
                const isCompleted = week.status === "Completed";
                const isInProgress = week.status === "In Progress";
                const isUpcoming = week.status === "Upcoming";

                return (
                  <motion.div 
                    key={week.id} 
                    layout
                    className="flex gap-4 sm:gap-6 items-start relative group"
                  >
                    {/* Step Bubble Indicator */}
                    <div 
                      onClick={() => !isUpcoming && toggleWeek(week.id)}
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-bold text-xs shrink-0 select-none backdrop-blur-md relative z-10 transition-all cursor-pointer ${
                        isCompleted
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 group-hover:border-emerald-500/50"
                          : isInProgress
                          ? "bg-amber-500/10 border-amber-500/40 text-amber-400 animate-pulse"
                          : "bg-white/[0.02] border-white/5 text-foreground/30"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={18} />
                      ) : isInProgress ? (
                        <Flame size={18} />
                      ) : (
                        <Lock size={15} />
                      )}
                    </div>

                    {/* Step Card Body */}
                    <div className={`flex-1 glass border rounded-3xl relative overflow-hidden transition-all duration-300 ${
                      isCompleted 
                        ? "bg-white/[0.015] border-white/10 hover:border-primary/30" 
                        : isInProgress
                        ? "bg-amber-500/[0.02] border-amber-500/20"
                        : "bg-white/[0.005] border-white/5 opacity-70"
                    }`}>
                      
                      {/* Card Header clickable to toggle */}
                      <div 
                        onClick={() => !isUpcoming && toggleWeek(week.id)}
                        className={`p-5 sm:p-6 ${!isUpcoming ? "cursor-pointer" : "cursor-default"}`}
                      >
                        {/* Meta row: Date + Status Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                          <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-mono font-bold flex items-center gap-1.5">
                            <Calendar size={12} className="text-primary" />
                            {week.date}
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-foreground/50 font-semibold">
                              {week.hours}
                            </span>
                            
                            {isCompleted && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/20 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                {t.internship.statusCompleted}
                              </span>
                            )}

                            {isInProgress && (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[9px] font-bold uppercase tracking-wider border border-amber-500/20 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                {t.internship.statusInProgress}
                              </span>
                            )}

                            {isUpcoming && (
                              <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-foreground/40 text-[9px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1">
                                <Lock size={9} />
                                {t.internship.statusUpcoming}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-black text-base sm:text-lg text-foreground/90 leading-snug group-hover:text-primary transition-colors flex items-center justify-between gap-2">
                          <span>{week.title}</span>
                          {!isUpcoming && (
                            <span className="text-foreground/40 group-hover:text-primary transition-transform shrink-0">
                              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </span>
                          )}
                        </h3>

                        {/* High-level summary */}
                        <p className="text-xs text-foreground/60 leading-relaxed mt-2.5">
                          {week.summary}
                        </p>

                        {/* Cumulative Hours Tag */}
                        <div className="flex items-center gap-3 mt-3.5 pt-3 border-t border-white/5 text-[10px] font-mono text-foreground/40">
                          <span className="text-primary font-bold">{week.cumulativeHours}</span>
                          <span>•</span>
                          <span>ICTCE04 Logbook</span>
                        </div>
                      </div>

                      {/* Expandable Section: Full ICTCE04 Report */}
                      <AnimatePresence>
                        {isExpanded && !isUpcoming && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/5 bg-white/[0.01] space-y-6"
                          >
                            {/* Section 1: Performed Tasks */}
                            {week.tasks && week.tasks.length > 0 && (
                              <div className="space-y-3">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                                  <Check size={14} />
                                  {t.internship.tasksTitle}
                                </div>
                                <ul className="space-y-2">
                                  {week.tasks.map((task, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/75 leading-relaxed">
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                      <span>{task}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Section 2: Concepts & Skills */}
                            {week.concepts && week.concepts.length > 0 && (
                              <div className="space-y-3">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                                  <Sparkles size={14} />
                                  {t.internship.conceptsTitle}
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {week.concepts.map((concept, idx) => (
                                    <span 
                                      key={idx}
                                      className="px-3 py-1 rounded-xl bg-secondary/10 border border-secondary/20 text-[10px] font-mono text-secondary font-medium"
                                    >
                                      {concept}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Section 3: Engineering Obstacles & Solutions */}
                            {week.problems && week.problems.length > 0 && (
                              <div className="space-y-3">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                                  <AlertCircle size={14} />
                                  {t.internship.problemsTitle}
                                </div>
                                <div className="space-y-3">
                                  {week.problems.map((prob, idx) => (
                                    <div 
                                      key={idx}
                                      className="p-3.5 rounded-2xl bg-amber-500/[0.03] border border-amber-500/20 text-xs space-y-2"
                                    >
                                      <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                                          {t.internship.problemLabel} #{idx + 1}
                                        </span>
                                        <p className="text-foreground/80 leading-relaxed font-medium">
                                          {prob.problem}
                                        </p>
                                      </div>
                                      <div className="pt-2 border-t border-white/5">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                                          {t.internship.solutionLabel}
                                        </span>
                                        <p className="text-foreground/70 leading-relaxed">
                                          {prob.solution}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Form Reference Verification Tag */}
                            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-2 text-[10px] text-foreground/40 font-mono">
                              <span>Form: ICTCE04 (RSU International College)</span>
                              <span className="text-emerald-400 font-bold">● Status: Official Verified</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Locked note for upcoming weeks */}
                      {isUpcoming && (
                        <div className="px-5 pb-5">
                          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.01] border border-white/5 text-[10px] text-foreground/35 select-none">
                            <Lock size={12} className="shrink-0" />
                            <span>{t.internship.upcomingNotice}</span>
                          </div>
                        </div>
                      )}

                      {/* Ambient highlight glow */}
                      <div className="absolute -inset-px bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10 pointer-events-none" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Accreditation & Academic Details Modal */}
      <AnimatePresence>
        {showAccreditationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="w-full max-w-lg glass bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-display font-black text-foreground">
                    {t.internship.accreditationModalTitle}
                  </h3>
                  <span className="text-xs text-primary font-bold">
                    Form ICTCE04 Guidelines
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-foreground/70 leading-relaxed">
                <p>{t.internship.accreditationModalDesc}</p>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-foreground/80 font-mono text-[11px]">
                  <div>• <strong>Student:</strong> Sai Swam Wan Hline (Jom)</div>
                  <div>• <strong>Program:</strong> B.Sc. in ICT (Information & Communication Technology)</div>
                  <div>• <strong>Employer:</strong> HTZKKL TECHNOLOGIES COMPANY LIMITED (Reg: 147399782)</div>
                  <div>• <strong>Requirement:</strong> Minimum 16 Weeks or 560 Cumulative Hours</div>
                  <div>• <strong>Progress:</strong> 5 Weeks Completed (200 / 560 Hours logged)</div>
                </div>
              </div>

              <button
                onClick={() => setShowAccreditationModal(false)}
                className="w-full py-3 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs transition-all cursor-pointer shadow-lg shadow-primary/25"
              >
                {t.internship.closeModal}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
