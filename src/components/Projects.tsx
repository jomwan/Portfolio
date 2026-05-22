"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, Database, Cpu, TrendingUp, BarChart3, ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Image from "next/image";
import ProjectModal from "./ProjectModal";
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

const projects = [
  {
    id: "golf",
    title: "golf-bookr: Reservation Platform",
    desc: "A complete interactive golf course booking and scheduling system built with JavaScript, allowing real-time slot management, user registration, and smooth reservation flows.",
    tech: ["JavaScript", "HTML5", "CSS3", "Git"],
    icons: ["js", "html", "css", "git"],
    live: "https://github.com/jomwan/golf-bookr",
    github: "https://github.com/jomwan/golf-bookr",
    image: "/projects/predictive.png",
    metric: "Real-Time Scheduling",
    metrics: [
      { label: "Language", value: "JavaScript" },
      { label: "Scope", value: "Full System" },
      { label: "Interactivity", value: "High" },
      { label: "Features", value: "Reservation Flow" }
    ],
    icon: <TrendingUp size={20} />,
    featured: true,
    tags: ["Web App", "Front-End"],
  },
  {
    id: "tiktok",
    title: "TikTok ABM: Dynamics Simulation",
    desc: "A simulation framework built in Python to model and analyze user interactions, content recommendation algorithms, and viral network dynamics on the TikTok platform.",
    tech: ["Python", "Pandas", "NetworkX", "Matplotlib"],
    icons: ["py", "pandas", "matplotlib"],
    live: "https://github.com/jomwan/TikTok_ABM",
    github: "https://github.com/jomwan/TikTok_ABM",
    image: "/projects/llm.png",
    metric: "Network ABM Modeling",
    metrics: [
      { label: "Analysis Engine", value: "Agent-Based" },
      { label: "Data Structure", value: "Graph Theory" },
      { label: "Core Libraries", value: "NetworkX, Pandas" },
      { label: "Complexity", value: "O(V + E)" }
    ],
    icon: <Cpu size={20} />,
    featured: false,
    tags: ["Simulation", "Python"],
  },
  {
    id: "hdfs",
    title: "HDFS: Distributed File Visualizer",
    desc: "An interactive web framework integration designed to visualize, manage, and interact with HDFS components, simulating distributed data operations.",
    tech: ["HTML5", "CSS3", "JavaScript", "Hadoop Concepts"],
    icons: ["html", "css", "js"],
    live: "https://github.com/jomwan/HDFS",
    github: "https://github.com/jomwan/HDFS",
    image: "/projects/etl.png",
    metric: "Distributed UI Hub",
    metrics: [
      { label: "Technology Stack", value: "HTML/CSS/JS" },
      { label: "Protocol", value: "HDFS Web UI" },
      { label: "Management", value: "Interactive" },
      { label: "Simulation", value: "Web Nodes" }
    ],
    icon: <Database size={20} />,
    featured: false,
    tags: ["Distributed Systems", "Frontend"],
  },
  {
    id: "fraud",
    title: "Fraud-Detection: Anomaly Classifier",
    desc: "A machine learning pipeline built with Python to detect anomalies and identify fraudulent financial transactions with high precision.",
    tech: ["Python", "Scikit-Learn", "Pandas", "Jupyter"],
    icons: ["py", "sklearn", "pandas"],
    live: "https://github.com/jomwan/Fraud-Detection",
    github: "https://github.com/jomwan/Fraud-Detection",
    image: "/projects/fraud.png",
    metric: "High-Precision Pipeline",
    metrics: [
      { label: "Evaluation Metric", value: "Precision/Recall" },
      { label: "Analysis Environment", value: "Jupyter" },
      { label: "Toolkit", value: "Scikit-Learn" },
      { label: "Core Model", value: "Anomaly Forest" }
    ],
    icon: <ShieldCheck size={20} />,
    featured: false,
    tags: ["Machine Learning", "Data Science"],
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectItems = projects.map((proj, i) => ({
    ...proj,
    title: t.projects.items[i]?.title || proj.title,
    desc: t.projects.items[i]?.desc || proj.desc,
  }));

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
          {projectItems.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              onClick={() => setSelectedProject(project)}
              className={`group relative flex flex-col glass rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                project.featured ? "md:col-span-2" : ""
              }`}
            >
              {/* Image Section */}
              <div className={`relative overflow-hidden ${project.featured ? "h-80 md:h-[450px]" : "h-64"}`}>
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
                  <motion.div 
                    className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {t.projects.deepDive} <ArrowRight size={16} />
                  </motion.div>
                </div>
              </div>

              {/* Liquid Highlight Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-1000 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-64 w-128 h-128 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -left-64 w-128 h-128 bg-secondary/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
}
