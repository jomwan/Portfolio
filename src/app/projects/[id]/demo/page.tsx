"use client";

import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { projects } from "@/components/Projects";
import dynamic from "next/dynamic";
import { ArrowLeft, Play, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

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

export default function ProjectDemoPage() {
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
      <div className="flex-grow overflow-auto bg-black/10 relative flex flex-col">
        <Suspense fallback={<SimulatorLoader name={projectTitle} />}>
          {renderSimulator()}
        </Suspense>
      </div>
    </main>
  );
}
