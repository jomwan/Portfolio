"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { EducationLink } from "@/lib/types";

const educations = [
  {
    degree: "Bachelor in Information and Communication Technology",
    school: "Rangsit University International College",
    location: "Pathum Thani, Thailand",
    period: "2023 — Present",
    desc: "Pursuing a major in Information and Communication Technology (ICT) under the International College. Coursework covers Web Systems Programming, Big Data Analytics, Database Management Systems, and Machine Learning.",
  },
  {
    degree: "Certified Data Specialist",
    school: "Cisco Networking Academy (NetAcad)",
    location: "Online E-Learning Platform",
    period: "2024 — Present",
    desc: "Successfully earned credentials including 'Data Science Essentials with Python' and 'Data Analytics Essentials', establishing a strong foundation in modern data pipelines.",
    links: [
      { label: "Data Science Certificate", url: "/cert/Data_Science_Essentials_with_Python_certificate.pdf" },
      { label: "Data Analytics Certificate", url: "/cert/Data_Analytics_Essentials_certificate.pdf" }
    ]
  },
  {
    degree: "High School Diploma",
    school: "La Minn Eain, Private High School",
    location: "Taunggyi, South Shan State, Myanmar",
    period: "2017 — 2019",
    desc: "Graduated with a focus on Mathematics and Science, building a robust analytical foundation.",
  },
];



export default function Educations() {
  const { t } = useLanguage();

  const educationItems = [
    { ...educations[0], ...t.educations.items[0] },
    { ...educations[1], ...t.educations.items[1] },
    { ...educations[2], ...t.educations.items[2] },
  ];

  return (
    <section id="educations" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-display font-bold tracking-[0.3em] uppercase text-sm block mb-4"
          >
            {t.educations.section}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold"
            dangerouslySetInnerHTML={{ __html: t.educations.title }}
          />
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {educationItems.map((edu, i) => (
              <div key={i} className={cn(
                "relative flex items-center justify-between md:justify-normal w-full",
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              )}>
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 -translate-x-1/2 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="w-[calc(100%-3rem)] md:w-[45%] ml-auto md:ml-0"
                >
                  <div className={cn(
                    "glass glass-hover p-8 rounded-3xl group hover:-translate-y-1",
                    i % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}>
                    <div className={cn(
                      "flex items-center gap-3 mb-4 text-primary",
                      i % 2 === 0 ? "md:flex-row-reverse" : ""
                    )}>
                      <GraduationCap size={24} className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-bold uppercase tracking-widest">{edu.period}</span>
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h3>
                    
                    <div className={cn(
                      "flex flex-col gap-1 mb-4 text-foreground/40 text-sm font-medium",
                      i % 2 === 0 ? "md:items-end" : "md:items-start"
                    )}>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>{edu.school}</span>
                      </div>
                    </div>

                    <p className="text-foreground/60 text-sm leading-relaxed">
                      {edu.desc}
                    </p>

                    {edu.links && edu.links.length > 0 && (
                      <div className={cn(
                        "mt-6 flex flex-wrap gap-3",
                        i % 2 === 0 ? "md:justify-end" : "md:justify-start"
                      )}>
                        {edu.links.map((link: EducationLink, idx: number) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 hover:border-primary/30 text-xs font-bold text-primary transition-all hover:scale-105 active:scale-95"
                          >
                            <span>{link.label}</span>
                            <ExternalLink size={12} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
