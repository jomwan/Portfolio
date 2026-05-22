"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code, Database, Cpu, Layers, BarChart3, Sparkles, Maximize2, Minimize2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useCallback, useState } from "react";
import type { Project } from "@/lib/types";
import GolfSimulator from "./simulators/GolfSimulator";
import TikTokSimulator from "./simulators/TikTokSimulator";
import HDFSSimulator from "./simulators/HDFSSimulator";
import FraudSimulator from "./simulators/FraudSimulator";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "sandbox">("overview");
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab("overview");
      setIsFullScreen(false);
    }
  }, [isOpen, project?.id]);

  const handleTabChange = (tab: "overview" | "sandbox") => {
    setActiveTab(tab);
    if (tab === "sandbox") {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };

  const renderSimulator = (projectId: string) => {
    switch (projectId) {
      case "golf": return <GolfSimulator />;
      case "tiktok": return <TikTokSimulator />;
      case "hdfs": return <HDFSSimulator />;
      case "fraud": return <FraudSimulator />;
      default: return null;
    }
  };

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      // Focus trap — keep Tab inside the modal
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose]
  );

  // Scroll lock + keyboard listeners + focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);

      // Focus the modal container after animation settles
      const timer = setTimeout(() => {
        modalRef.current?.focus();
      }, 100);

      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);

        // Restore focus to the element that opened the modal
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!project) return null;

  const hasLiveLink = project.live && project.live !== "#";
  const hasGithubLink = project.github && project.github !== "#";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />
          
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full overflow-hidden glass rounded-3xl shadow-2xl flex flex-col md:flex-row outline-none transition-all duration-500 ease-out ${
              isFullScreen ? "max-w-7xl h-[90vh]" : "max-w-5xl h-[80vh] md:h-[85vh]"
            }`}
          >
            {/* Control Buttons */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
              {activeTab === "sandbox" && (
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
                  className="p-2 rounded-full glass hover:bg-white/10 transition-colors text-foreground/80 hover:text-white"
                  title={isFullScreen ? "Exit Full Screen" : "Expand to Full Screen"}
                >
                  {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Close project details"
                className="p-2 rounded-full glass hover:bg-white/10 transition-colors text-foreground/80 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Left Side: Visuals */}
            {!isFullScreen && (
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-foreground/5 shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent md:bg-linear-to-r" />
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-8 left-8 right-8"
                >
                  <div className="flex gap-2 mb-4">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2
                    id="project-modal-title"
                    className="text-3xl md:text-4xl font-display font-black tracking-tight mb-2"
                  >
                    {project.title}
                  </h2>
                  <p className="text-foreground/60 text-sm line-clamp-2 md:line-clamp-none">
                    {project.desc}
                  </p>
                </motion.div>
              </div>
            )}

            {/* Right Side: Details */}
            <div className={`w-full ${isFullScreen ? "w-full" : "md:w-1/2"} p-8 md:p-12 overflow-y-auto custom-scrollbar scroll-smooth overscroll-contain flex flex-col h-full transition-all duration-500 ease-out`}>
              
              {/* Tab Selector Header */}
              <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1 mb-8 relative select-none pr-12 md:pr-1">
                <button
                  onClick={() => handleTabChange("overview")}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all relative z-10 flex items-center justify-center gap-2 ${
                    activeTab === "overview" ? "text-white" : "text-foreground/40 hover:text-foreground/80"
                  }`}
                >
                  <Cpu size={14} />
                  Architecture & Details
                  {activeTab === "overview" && (
                    <motion.div
                      layoutId="modalActiveTab"
                      className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => handleTabChange("sandbox")}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all relative z-10 flex items-center justify-center gap-2 ${
                    activeTab === "sandbox" ? "text-white" : "text-foreground/40 hover:text-foreground/80"
                  }`}
                >
                  <Sparkles size={14} className={activeTab === "sandbox" ? "text-primary animate-pulse" : ""} />
                  Interactive Sandbox
                  {activeTab === "sandbox" && (
                    <motion.div
                      layoutId="modalActiveTab"
                      className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "overview" ? (
                  <motion.div 
                    key="overview"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {project.metrics?.map((m, i) => (
                        <div 
                          key={`${m.label}-${i}`}
                          className="glass p-4 rounded-2xl"
                        >
                          <div className="text-primary font-black text-xl mb-1">{m.value}</div>
                          <div className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Technical Architecture */}
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/40 mb-4 flex items-center gap-2">
                        <Cpu size={16} className="text-primary" />
                        Technical Architecture
                      </h3>
                      <div className="space-y-4">
                        {(project.architecture || [
                          {
                            title: "Data Pipeline",
                            desc: "Integrated multi-source data ingestion with real-time preprocessing and automated feature engineering.",
                            type: "pipeline"
                          },
                          {
                            title: "Model Architecture",
                            desc: "Ensemble approach utilizing XGBoost for tabular features and LSTM for temporal sequence patterns.",
                            type: "model"
                          }
                        ]).map((arch, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className={`p-3 rounded-xl h-fit ${
                              arch.type === "database" ? "bg-blue-500/10" :
                              arch.type === "storage" ? "bg-emerald-500/10" :
                              arch.type === "model" ? "bg-purple-500/10" :
                              arch.type === "pipeline" ? "bg-sky-500/10" :
                              arch.type === "analytics" ? "bg-amber-500/10" : "bg-primary/10"
                            }`}>
                              {arch.type === "database" && <Database size={20} className="text-blue-400" />}
                              {arch.type === "storage" && <Database size={20} className="text-emerald-400" />}
                              {arch.type === "model" && <Cpu size={20} className="text-purple-500" />}
                              {arch.type === "pipeline" && <Layers size={20} className="text-sky-400" />}
                              {arch.type === "analytics" && <BarChart3 size={20} className="text-amber-400" />}
                              {!["database", "storage", "model", "pipeline", "analytics"].includes(arch.type) && <Cpu size={20} className="text-primary" />}
                            </div>
                            <div>
                              <h4 className="font-bold text-sm mb-1">{arch.title}</h4>
                              <p className="text-xs text-foreground/60 leading-relaxed">
                                {arch.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                      {hasLiveLink && (
                        <button
                          onClick={() => handleTabChange("sandbox")}
                          className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <Sparkles size={18} className="animate-pulse" />
                          Launch Live Demo
                        </button>
                      )}
                      {hasGithubLink && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 glass glass-hover px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <Code size={18} />
                          Source Code
                        </a>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sandbox"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    {renderSimulator(project.id)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
