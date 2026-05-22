"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { SOCIAL_LINKS_FULL, PERSONAL } from "@/lib/constants";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-display font-bold tracking-[0.3em] uppercase text-sm block mb-4"
        >
          {t.contact.section}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-display font-bold mb-8"
          dangerouslySetInnerHTML={{ __html: t.contact.title }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-foreground/60 text-lg mb-12 max-w-xl mx-auto"
        >
          {t.contact.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <a
            href={`mailto:${PERSONAL.email}`}
            className="group relative flex items-center gap-4 px-12 py-6 rounded-full bg-foreground text-background font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            {t.contact.button}
            <Mail size={24} className="group-hover:rotate-12 transition-transform" />
          </a>
        </motion.div>

        {/* Real communication & social connections */}
        <div className="flex flex-wrap justify-center gap-8 mt-20">
          {SOCIAL_LINKS_FULL.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="text-foreground/40 hover:text-primary transition-colors flex items-center gap-2 font-display font-bold uppercase tracking-widest text-xs"
            >
              <item.icon size={16} />
              {item.label}
            </motion.a>
          ))}
        </div>

        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-foreground/20 text-xs font-bold uppercase tracking-[0.2em]">
          <span>© {new Date().getFullYear()} {PERSONAL.name}</span>
          <span>{t.contact.footer}</span>
        </div>
      </div>
    </section>
  );
}
