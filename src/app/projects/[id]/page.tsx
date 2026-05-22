"use client";

import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { projects } from "@/components/Projects";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Cpu, Sparkles, Code, Database, Layers, BarChart3 } from "lucide-react";
import Image from "next/image";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const id = params?.id as string;

  const rawProject = projects.find((p) => p.id === id);
  if (!rawProject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <Link href="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  // Get index in projects array to match translation dictionary mapping
  const projectIdx = projects.findIndex((p) => p.id === id);
  const project = {
    ...rawProject,
    title: t.projects.items[projectIdx]?.title || rawProject.title,
    desc: t.projects.items[projectIdx]?.desc || rawProject.desc,
  };

  const hasLiveLink = project.live && project.live !== "#";
  const hasGithubLink = project.github && project.github !== "#";

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-128 h-128 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-128 h-128 bg-secondary/5 rounded-full blur-[120px] -z-10" />

      {/* Main Container */}
      <div className="container mx-auto max-w-5xl px-6 py-12 md:py-20 flex-grow flex flex-col justify-center">
        
        {/* Navigation & Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button
            onClick={() => router.push("/#projects")}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/50 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Showcase
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left Column: Visual Cover Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 w-full aspect-video md:aspect-[3/4] relative rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl group shrink-0"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex gap-2 mb-3">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full bg-primary/20 backdrop-blur-md text-[9px] font-bold uppercase tracking-wider text-primary">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl font-display font-black tracking-tight mb-2">
                {project.title}
              </h1>
            </div>
          </motion.div>

          {/* Right Column: Complete Specifications */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-7 space-y-10"
          >
            {/* Description & Intro */}
            <div className="space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Sparkles size={12} className="animate-pulse" />
                Project Narrative
              </h2>
              <p className="text-foreground/70 text-base leading-relaxed">
                {project.desc}
              </p>
            </div>

            {/* Metrics Dashboard */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Specifications & Objectives</h3>
              <div className="grid grid-cols-2 gap-4">
                {project.metrics?.map((m, i) => (
                  <div key={`${m.label}-${i}`} className="glass p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="text-primary font-black text-xl mb-0.5">{m.value}</div>
                    <div className="text-[9px] uppercase tracking-widest text-foreground/40 font-bold">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Architecture Mapping */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                <Cpu size={14} className="text-primary" />
                System Architecture
              </h3>
              <div className="space-y-4">
                {project.architecture?.map((arch, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] transition-colors">
                    <div className={`p-3 rounded-xl h-fit ${
                      arch.type === "database" ? "bg-blue-500/10 text-blue-400" :
                      arch.type === "storage" ? "bg-emerald-500/10 text-emerald-400" :
                      arch.type === "model" ? "bg-purple-500/10 text-purple-500" :
                      arch.type === "pipeline" ? "bg-sky-500/10 text-sky-400" :
                      arch.type === "analytics" ? "bg-amber-500/10 text-amber-400" : "bg-primary/10 text-primary"
                    }`}>
                      {arch.type === "database" && <Database size={18} />}
                      {arch.type === "storage" && <Database size={18} />}
                      {arch.type === "model" && <Cpu size={18} />}
                      {arch.type === "pipeline" && <Layers size={18} />}
                      {arch.type === "analytics" && <BarChart3 size={18} />}
                      {!["database", "storage", "model", "pipeline", "analytics"].includes(arch.type) && <Cpu size={18} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground/90 mb-1">{arch.title}</h4>
                      <p className="text-xs text-foreground/50 leading-relaxed">{arch.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Links */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-white/5">
              {hasLiveLink && (
                <Link
                  href={`/projects/${project.id}/demo`}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-primary/10 hover:shadow-primary/20"
                >
                  <Sparkles size={18} className="animate-pulse" />
                  Launch Live Demo
                </Link>
              )}
              {hasGithubLink && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 glass hover:bg-white/10 px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-white/10"
                >
                  <Code size={18} />
                  Source Code
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
