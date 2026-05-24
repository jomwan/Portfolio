"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Globe, Database, Cpu, TrendingUp, BarChart3, ArrowRight, ShieldCheck, Eye, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

const getIconUrl = (slug: string) => {
  switch (slug) {
    case "snowflake": return "https://cdn.simpleicons.org/snowflake/29B5E8";
    case "powerbi": return "https://raw.githubusercontent.com/microsoft/PowerBI-Icons/main/SVG/Power-BI.svg";
    case "tableau": return "https://raw.githubusercontent.com/gilbarbara/logos/main/logos/tableau-icon.svg";
    case "excel": return "https://raw.githubusercontent.com/homarr-labs/dashboard-icons/main/svg/microsoft-excel.svg";
    case "matplotlib": return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg";
    case "spark": return "https://api.iconify.design/logos:apache-spark.svg";
    case "huggingface": return "https://api.iconify.design/logos:hugging-face-icon.svg";
    default: return `https://skillicons.dev/icons?i=${slug}`;
  }
};

export const projects: Project[] = [
  {
    id: "auravision",
    title: "AuraVision: Advanced Assistive Vision System (SmartAV)",
    desc: "A real-time assistive technology for visually impaired users. Leverages AI-driven Computer Vision (YOLOE-26N-seg, FaceNet) and LlamaIndex RAG over ChromaDB to provide environmental awareness, hazard tracking, and temporal spatial memory.",
    tech: ["FastAPI", "Gemini 3 Flash", "LlamaIndex", "ChromaDB", "Computer Vision", "Real-time Processing"],
    icons: ["py", "fastapi", "huggingface", "git"],
    live: "/projects/auravision/demo",
    github: "https://github.com/TayZa9/SmartAV",
    image: "/projects/auravision_preview.png",
    metric: "Spatial AI Engine",
    metrics: [
      { label: "Spatial Awareness", value: "98.4% Acc." },
      { label: "RAG Recall Speed", value: "<150ms" },
      { label: "Neural Model", value: "YOLOE + FaceNet" },
      { label: "Memory Retention", value: "Temporal Vector" }
    ],
    icon: <Eye size={20} />,
    featured: true,
    tags: ["Computer Vision", "RAG & LLMs", "Assistive AI"],
    architecture: [
      {
        title: "Environmental Perception Engine",
        desc: "Performs low-latency object detection, segmentation, and face recognition via optimized local models to track spatial hazards and landmarks.",
        type: "model"
      },
      {
        title: "Temporal-Spatial Memory (RAG)",
        desc: "Constructs a vector space representing the user's historical movements and observed surroundings, queried via LlamaIndex RAG over ChromaDB.",
        type: "pipeline"
      }
    ]
  },
  {
    id: "golf",
    title: "golf-bookr: Schema & Reservation Engine",
    desc: "An interactive reservation platform designed with a highly optimized database schema, managing real-time booking availability, relational user associations, and robust transaction concurrency.",
    tech: ["Relational DB", "SQL / State Management", "JavaScript", "Data Integrity"],
    icons: ["mysql", "sqlite", "js", "git"],
    live: "https://github.com/jomwan/golf-bookr",
    github: "https://github.com/jomwan/golf-bookr",
    image: "/projects/golf_preview.png",
    metric: "Relational Schema",
    metrics: [
      { label: "Database Design", value: "Relational" },
      { label: "Concurrency Control", value: "Transaction-safe" },
      { label: "Search Optimization", value: "Indexed Querying" },
      { label: "State Synchronization", value: "Real-time" }
    ],
    icon: <Database size={20} />,
    featured: true,
    tags: ["Database Design", "Data Systems"],
    architecture: [
      {
        title: "Relational Database Schema",
        desc: "Designed structured tables with primary/foreign key relationships and appropriate constraints to model course inventory, users, and bookings.",
        type: "database"
      },
      {
        title: "Transaction Concurrency",
        desc: "Implemented atomic slot validation logic to prevent race conditions and dual-bookings during high-traffic booking windows.",
        type: "pipeline"
      }
    ]
  },
  {
    id: "tiktok",
    title: "TikTok ABM: Agent-Based Data Simulator",
    desc: "A simulation framework built in Python to model and analyze user interactions, content recommendation algorithms, and viral network dynamics on the TikTok platform.",
    tech: ["Python", "Pandas", "NetworkX", "Matplotlib"],
    icons: ["py", "pandas", "matplotlib"],
    live: "https://github.com/jomwan/TikTok_ABM",
    github: "https://github.com/jomwan/TikTok_ABM",
    image: "/projects/llm.png",
    metric: "Network ABM Modeling",
    metrics: [
      { label: "Modeling Paradigm", value: "Agent-Based" },
      { label: "Data Structure", value: "Network Graph" },
      { label: "Data Pipeline", value: "Pandas" },
      { label: "Simulation Speed", value: "Optimized" }
    ],
    icon: <Cpu size={20} />,
    featured: false,
    tags: ["Data Modeling", "Simulation"],
    architecture: [
      {
        title: "Agent-Based Engine",
        desc: "Constructed dynamic behavioral state machines for individual user agents to simulate content consumption and sharing patterns.",
        type: "model"
      },
      {
        title: "Network Graph Analysis",
        desc: "Analyzed network clustering, information cascades, and virality thresholds using directed graph structures in NetworkX.",
        type: "analytics"
      }
    ]
  },
  {
    id: "hdfs",
    title: "HDFS: Distributed Storage Explorer",
    desc: "An interactive web framework integration designed to visualize, manage, and interact with HDFS components, simulating distributed data operations.",
    tech: ["Distributed Systems", "JSON Replication", "JavaScript", "Storage Simulation"],
    icons: ["html", "css", "js"],
    live: "https://github.com/jomwan/HDFS",
    github: "https://github.com/jomwan/HDFS",
    image: "/projects/etl.png",
    metric: "Distributed Storage Hub",
    metrics: [
      { label: "Storage Architecture", value: "Distributed" },
      { label: "Simulation State", value: "Multi-Node" },
      { label: "Replication Factor", value: "3x Simulated" },
      { label: "Data Visualizer", value: "Real-time Node" }
    ],
    icon: <Database size={20} />,
    featured: false,
    tags: ["Data Engineering", "Distributed Systems"],
    architecture: [
      {
        title: "Distributed Replication Model",
        desc: "Simulated HDFS chunk division, block replication across multiple DataNodes, and automatic failover handling mechanisms.",
        type: "storage"
      },
      {
        title: "Analytical Operations Panel",
        desc: "Created a visual simulation mapping client read/write operations to Active/Standby NameNodes and corresponding DataNode maps.",
        type: "database"
      }
    ]
  },
  {
    id: "fraud",
    title: "Fraud-Detection: Transaction Anomaly Classifier",
    desc: "A machine learning pipeline built with Python to detect anomalies and identify fraudulent financial transactions with high precision.",
    tech: ["Python", "Scikit-Learn", "Pandas", "Feature Engineering"],
    icons: ["py", "sklearn", "pandas"],
    live: "https://github.com/jomwan/Fraud-Detection",
    github: "https://github.com/jomwan/Fraud-Detection",
    image: "/projects/fraud.png",
    metric: "High-Precision Pipeline",
    metrics: [
      { label: "Target Metric", value: "F1-Score / Precision" },
      { label: "Data Pipeline", value: "Feature Scaled" },
      { label: "Classification", value: "Supervised ML" },
      { label: "Model Type", value: "Anomaly Ensemble" }
    ],
    icon: <ShieldCheck size={20} />,
    featured: false,
    tags: ["Machine Learning", "Data Science"],
    architecture: [
      {
        title: "ML Training Pipeline",
        desc: "Constructed complete data pipelines from raw financial ingestion to feature engineering, SMOTE oversampling, and scaling.",
        type: "pipeline"
      },
      {
        title: "Anomaly Ensemble",
        desc: "Developed and tuned Isolation Forest and Random Forest classifiers to maximize precision and recall under extreme class imbalance.",
        type: "model"
      }
    ]
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const projectItems = projects.map((proj, i) => ({
    ...proj,
    title: t.projects.items[i]?.title || proj.title,
    desc: t.projects.items[i]?.desc || proj.desc,
  }));

  const visibleProjects = isExpanded ? projectItems : projectItems.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden bg-background">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-primary font-display font-bold tracking-[0.3em] uppercase text-xs">
                {t.projects.section}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-display font-bold leading-tight italic"
              dangerouslySetInnerHTML={{ __html: t.projects.title }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-foreground/40 max-w-md text-lg leading-relaxed"
          >
            {t.projects.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  y: { duration: 0.5 },
                  scale: { duration: 0.4 },
                  layout: { type: "spring", stiffness: 220, damping: 28 }
                }}
                className=""
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="block h-full"
                >
                  <div className="group relative flex flex-col glass rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full">
                    {/* Image Section */}
                    <div className="relative overflow-hidden h-64 md:h-80">
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-60" />
                      
                      {/* Metric Badge */}
                      <div className="absolute top-6 left-6 px-4 py-2 glass rounded-full flex items-center gap-2 border border-white/10">
                        <span className="text-primary">{project.icon}</span>
                        <span className="text-xs font-bold tracking-wider text-foreground">{project.metric}</span>
                      </div>

                      {/* Floating Tech Icons */}
                      <div className="absolute top-6 right-6 flex -space-x-2">
                        {project.icons.map((slug, idx) => (
                          <div key={idx} className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-white/10 p-2 flex items-center justify-center hover:z-10 transition-all hover:-translate-y-1">
                            <img 
                              src={getIconUrl(slug)} 
                              alt={slug}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-10 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-6">
                        <div className="max-w-[80%]">
                          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-foreground/50 text-lg leading-relaxed line-clamp-3">
                            {project.desc}
                          </p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="w-12 h-12 glass flex items-center justify-center rounded-full text-foreground/40 hover:text-primary transition-all border border-white/5">
                            <ArrowRight size={20} className="group-hover:translate-x-1 group-hover:-rotate-45 transition-all" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, idx) => (
                            <span
                              key={tech}
                              className="px-4 py-1 rounded-full bg-foreground/[0.03] text-[10px] font-bold uppercase tracking-widest text-foreground/40 border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div 
                          className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {t.projects.deepDive} <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Liquid Highlight Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-1000 -z-10" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        <motion.div 
          layout
          className="flex justify-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.15)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative flex items-center gap-3 px-8 py-4 glass rounded-full border border-white/10 hover:border-primary/30 transition-all duration-300 text-foreground font-display font-bold uppercase tracking-widest text-xs hover:text-primary cursor-pointer"
          >
            {/* Glossy Gradient Hover Fill */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-500" />
            
            <span>{isExpanded ? t.projects.showLess : t.projects.seeMore}</span>
            <ChevronDown 
              size={18} 
              className={`text-primary transition-transform duration-500 ease-out ${isExpanded ? "rotate-180" : ""}`}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-64 w-128 h-128 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -left-64 w-128 h-128 bg-secondary/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
}
