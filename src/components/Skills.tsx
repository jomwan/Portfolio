"use client";

import { motion } from "framer-motion";
import { Database, BrainCircuit, BarChart3, Cloud, Layout, Terminal } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const skillsRow1 = [
  { name: "HTML5", icon: "https://skillicons.dev/icons?i=html" },
  { name: "CSS3", icon: "https://skillicons.dev/icons?i=css" },
  { name: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
  { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
  { name: "React", icon: "https://skillicons.dev/icons?i=react" },
  { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
  { name: "Git", icon: "https://skillicons.dev/icons?i=git" },
  { name: "GitHub", icon: "https://skillicons.dev/icons?i=github" },
];

const skillsRow2 = [
  { name: "Python", icon: "https://skillicons.dev/icons?i=py" },
  { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
  { name: "MySQL", icon: "https://skillicons.dev/icons?i=mysql" },
  { name: "SQLite", icon: "https://skillicons.dev/icons?i=sqlite" },
  { name: "TailwindCSS", icon: "https://skillicons.dev/icons?i=tailwind" },
  { name: "Pandas", icon: "https://skillicons.dev/icons?i=pandas" },
  { name: "Firebase", icon: "https://skillicons.dev/icons?i=firebase" },
  { name: "Markdown", icon: "https://skillicons.dev/icons?i=markdown" },
];

const skillsRow3 = [
  { name: "Scikit-Learn", icon: "https://cdn.simpleicons.org/scikitlearn/F99923" },
  { name: "Apache Hadoop", icon: "https://cdn.simpleicons.org/apachehadoop/CC8A00" },
  { name: "Streamlit", icon: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
  { name: "Solara", icon: "https://api.iconify.design/lucide:sun.svg?color=%23FFB800" },
  { name: "Apache Spark", icon: "https://cdn.simpleicons.org/apachespark/E25A1C" },
  { name: "NetworkX", icon: "https://api.iconify.design/lucide:network.svg?color=%2342A5F5" },
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "Jupyter", icon: "https://cdn.simpleicons.org/jupyter/F37626" },
];

const MarqueeRow = ({ items, direction = 1 }: { items: typeof skillsRow1, direction?: number }) => {
  return (
    <div className="flex overflow-hidden py-4 select-none">
      <motion.div
        animate={{
          x: direction > 0 ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-nowrap gap-12"
      >
        {[...items, ...items, ...items].map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-transparent border border-foreground/[0.03] hover:border-primary/20 transition-all duration-300 group"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <img 
                src={skill.icon} 
                alt={skill.name}
                className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/40 group-hover:text-foreground/80 transition-colors whitespace-nowrap">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Skills() {
  const { t } = useLanguage();

  const expertise = [
    {
      title: t.skills.cards[0]?.label || "Data Engineering & Analytics",
      desc: t.skills.cards[0]?.desc || "Designing data pipelines, processing datasets, and modeling analytical databases.",
      icon: BarChart3,
      skills: ["Apache Spark", "SQL", "Pandas", "ETL Pipelines", "Python", "FastAPI"],
      color: "text-purple-400",
      bg: "bg-purple-500/5",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      title: t.skills.cards[1]?.label || "Languages & Frameworks",
      desc: t.skills.cards[1]?.desc || "Proficient in languages and tools for data science and web interfaces.",
      icon: Terminal,
      skills: ["Python", "SQL", "JavaScript", "TypeScript", "HTML/CSS"],
      color: "text-blue-400",
      bg: "bg-blue-500/5",
      span: "md:col-span-2",
    },
    {
      title: t.skills.cards[2]?.label || "Databases & Storage",
      desc: t.skills.cards[2]?.desc || "Robust relational databases and distributed storage solutions.",
      icon: Database,
      skills: ["MySQL", "SQLite", "Hadoop/HDFS", "ChromaDB", "Firebase"],
      color: "text-emerald-400",
      bg: "bg-emerald-500/5",
      span: "md:col-span-1",
    },
    {
      title: t.skills.cards[3]?.label || "Simulation & ML",
      desc: t.skills.cards[3]?.desc || "Complex data modeling, analysis, and network simulations.",
      icon: BrainCircuit,
      skills: ["Agent Modeling", "LlamaIndex (RAG)", "YOLOE / CV", "ML Pipelines", "NetworkX"],
      color: "text-amber-400",
      bg: "bg-amber-500/5",
      span: "md:col-span-1",
    },
  ];

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden bg-foreground/[0.01]">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-display font-bold tracking-[0.3em] uppercase text-sm block mb-6"
          >
            {t.skills.section}
          </motion.span>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block p-3 rounded-2xl bg-primary/10 text-primary mb-6"
          >
            <BrainCircuit size={32} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 italic"
            dangerouslySetInnerHTML={{ __html: t.skills.title }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-foreground/40 text-lg max-w-2xl mx-auto"
          >
            {t.skills.subtitle}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
          {expertise.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group relative p-8 rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/20",
                item.bg,
                item.span
              )}
            >
              <div className={cn("p-4 rounded-2xl bg-white/5 w-fit mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", item.color)}>
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">{item.title}</h3>
              <p className="text-foreground/50 text-sm mb-6 leading-relaxed">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((s, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    {s}
                  </span>
                ))}
              </div>
              
              {/* Decorative Background Icon */}
              <item.icon className="absolute -bottom-8 -right-8 w-32 h-32 text-foreground/[0.02] -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>

        {/* Logo Marquee */}
        <div className="relative space-y-6 pt-12 border-t border-white/5">
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-background to-transparent z-10" />

          <MarqueeRow items={skillsRow1} direction={1} />
          <MarqueeRow items={skillsRow2} direction={-1} />
          <MarqueeRow items={skillsRow3} direction={1} />
        </div>
      </div>
    </section>
  );
}
