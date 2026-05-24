"use client";

import { motion } from "framer-motion";
import { Database, LineChart, BrainCircuit, ShieldCheck } from "lucide-react";
import { STATS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Image from "next/image";

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { label: t.about.stats.projects, value: `${STATS[0].value}${STATS[0].unit}`, icon: <Database className="text-primary" size={20} /> },
    { label: t.about.stats.models, value: `${STATS[1].value}${STATS[1].unit}`, icon: <BrainCircuit className="text-primary" size={20} /> },
    { label: t.about.stats.accuracy, value: `${STATS[2].value}${STATS[2].unit}`, icon: <LineChart className="text-primary" size={20} /> },
    { label: t.about.stats.security, value: `${STATS[3].value}${STATS[3].unit}`, icon: <ShieldCheck className="text-primary" size={20} /> },
  ];

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden glass p-4 aspect-square">
              <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute border border-primary/40 rounded-full"
                      style={{
                        width: `${(i + 1) * 15}%`,
                        height: `${(i + 1) * 15}%`,
                        borderStyle: i % 2 === 0 ? "solid" : "dashed"
                      }}
                    />
                  ))}
                </div>

                <div className="absolute inset-0 w-full h-full z-10 overflow-hidden rounded-[2.5rem]">
                  <Image
                    src="/images/profile.jpg"
                    alt="Profile"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10 mix-blend-multiply" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8 z-20">
                  <p className="text-sm font-bold text-foreground italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">{t.about.quote}</p>
                </div>
              </div>
            </div>
            
            {/* Research Overlay Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-8 -right-8 glass p-6 rounded-3xl shadow-2xl z-20 max-w-[200px] border border-primary/20"
            >
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">{t.about.currentFocus}</h4>
              <p className="text-xs font-medium text-foreground/80 leading-relaxed">
                {t.about.focusDesc}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-display font-bold tracking-[0.3em] uppercase text-sm block mb-4">{t.about.section}</span>
            <h2 
              className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight italic"
              dangerouslySetInnerHTML={{ __html: t.about.title }}
            />
            <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
              {t.about.desc1}
            </p>
            
            {/* Focus Pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {t.about.focusPills.map((focus: string) => (
                <span key={focus} className="px-4 py-1.5 rounded-xl bg-primary/5 border border-primary/10 text-xs font-bold text-primary/80">
                  {focus}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="glass glass-hover p-6 rounded-3xl group">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-2 rounded-xl bg-primary/10 group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <span className="text-3xl font-display font-bold">{stat.value}</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground/30">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
