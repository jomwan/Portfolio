"use client";

import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { projects } from "@/components/Projects";
import dynamic from "next/dynamic";
import { ArrowLeft, Play, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dynamically import simulators to optimize bundle size and prevent issues with CSR
const AuraVisionSimulator = dynamic(() => import("@/components/simulators/AuraVisionSimulator"), {
  ssr: false,
  loading: () => <SimulatorLoader name="AuraVision Spatial Perception Simulation" />
});

const GolfSimulator = dynamic(() => import("@/components/simulators/GolfSimulator"), {
  ssr: false,
  loading: () => <SimulatorLoader name="Reservation Engine Simulation" />
});

const TikTokSimulator = dynamic(() => import("@/components/simulators/TikTokSimulator"), {
  ssr: false,
  loading: () => <SimulatorLoader name="TikTok ABM Network Simulation" />
});

const HDFSSimulator = dynamic(() => import("@/components/simulators/HDFSSimulator"), {
  ssr: false,
  loading: () => <SimulatorLoader name="Distributed HDFS Replication Simulation" />
});

const FraudSimulator = dynamic(() => import("@/components/simulators/FraudSimulator"), {
  ssr: false,
  loading: () => <SimulatorLoader name="Transaction Anomaly ML Pipeline Simulation" />
});

function SimulatorLoader({ name }: { name: string }) {
  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-background text-foreground space-y-6">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
        <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs uppercase tracking-widest text-primary font-bold">Initializing Sandbox</p>
        <h3 className="text-lg font-bold text-foreground/80">{name}</h3>
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const id = params?.id as string;
  const [hasAccepted, setHasAccepted] = useState(false);

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
  const projectTitle = t.projects.items[projectIdx]?.title || rawProject.title;

  // Render correct simulator
  const renderSimulator = () => {
    switch (id) {
      case "auravision":
        return <AuraVisionSimulator />;
      case "golf":
        return <GolfSimulator />;
      case "tiktok":
        return <TikTokSimulator />;
      case "hdfs":
        return <HDFSSimulator />;
      case "fraud":
      case "databricks-fraud":
        return <FraudSimulator />;
      default:
        return (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6 space-y-4 bg-background">
            <AlertTriangle className="text-amber-500" size={48} />
            <h2 className="text-xl font-bold">Simulator Unavailable</h2>
            <p className="text-sm text-foreground/50 max-w-md">
              No live simulator is configured for this project.
            </p>
          </div>
        );
    }
  };

  return (
    <main className="w-screen h-screen overflow-hidden flex flex-col bg-background text-foreground relative z-50">
      {/* Top Premium Glassmorphic Header */}
      <header className="h-16 px-6 border-b border-white/5 bg-background/80 backdrop-blur-md flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(`/projects/${id}`)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/50 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Exit Demo
          </button>
          <div className="w-[1px] h-6 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/80">{projectTitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
          <Play size={10} className="fill-primary" />
          Interactive Sandbox
        </div>
      </header>

      {/* Main Simulator Workspace (100% full screen minus header) */}
      <div className="flex-grow overflow-auto lg:overflow-hidden bg-black/10 relative flex flex-col lg:h-[calc(100vh-4rem)] min-h-0">
        <Suspense fallback={<SimulatorLoader name={projectTitle} />}>
          {renderSimulator()}
        </Suspense>
      </div>

      {/* Modal Popup overlay before enter */}
      <AnimatePresence>
        {!hasAccepted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
          >
            {/* Glowing blur decorations inside the modal */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10" />

            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-lg glass bg-white/[0.01] border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden space-y-6 text-center select-none"
            >
              {/* Header Icon */}
              <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shadow-lg shadow-amber-500/5 animate-pulse">
                <AlertTriangle size={32} />
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-bold tracking-widest text-primary block">
                  {t.projects.demoDisclaimer.subtitle}
                </span>
                <h2 className="text-2xl font-display font-black tracking-tight text-foreground/90">
                  {t.projects.demoDisclaimer.title}
                </h2>
              </div>

              {/* Text Description */}
              <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                {t.projects.demoDisclaimer.text}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                <button
                  onClick={() => router.push(`/projects/${id}`)}
                  className="flex-1 glass hover:bg-white/10 text-white py-3.5 px-6 rounded-2xl font-bold text-xs transition-all border border-white/10 cursor-pointer"
                >
                  {t.projects.demoDisclaimer.back}
                </button>
                <button
                  onClick={() => setHasAccepted(true)}
                  className="flex-1 bg-primary hover:bg-primary/95 text-white py-3.5 px-6 rounded-2xl font-bold text-xs transition-all cursor-pointer shadow-lg shadow-primary/25 hover:shadow-primary/45 flex items-center justify-center gap-1.5"
                >
                  {t.projects.demoDisclaimer.agree}
                </button>
              </div>

              {/* Neon edge decor */}
              <div className="absolute -inset-px bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent opacity-30 blur-md -z-10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
