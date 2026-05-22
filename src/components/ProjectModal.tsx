"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code, Database, Cpu, Layers } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";
import type { Project } from "@/lib/types";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

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
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden glass rounded-3xl shadow-2xl flex flex-col md:flex-row outline-none"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-6 right-6 z-10 p-2 rounded-full glass hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Side: Visuals */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-foreground/5">
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

            {/* Right Side: Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar scroll-smooth overscroll-contain">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  }
                }}
                className="space-y-8"
              >
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {project.metrics?.map((m, i) => (
                    <motion.div 
                      key={`${m.label}-${i}`}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="glass p-4 rounded-2xl"
                    >
                      <div className="text-primary font-black text-xl mb-1">{m.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">{m.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Technical Breakdown */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/40 mb-4 flex items-center gap-2">
                    <Cpu size={16} className="text-primary" />
                    Technical Architecture
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 h-fit">
                        <Database size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">Data Pipeline</h4>
                        <p className="text-xs text-foreground/60 leading-relaxed">
                          Integrated multi-source data ingestion with real-time preprocessing and automated feature engineering.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="p-3 rounded-xl bg-purple-500/10 h-fit">
                        <Layers size={20} className="text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">Model Architecture</h4>
                        <p className="text-xs text-foreground/60 leading-relaxed">
                          Ensemble approach utilizing XGBoost for tabular features and LSTM for temporal sequence patterns.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Links */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="flex flex-wrap gap-4 pt-4 border-t border-white/10"
                >
                  {hasLiveLink && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
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
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
