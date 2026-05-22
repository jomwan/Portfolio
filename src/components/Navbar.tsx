"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navLinks = useMemo(() => [
    { name: t.navbar.home, href: "#home", id: "home" },
    { name: t.navbar.about, href: "#about", id: "about" },
    { name: t.navbar.projects, href: "#projects", id: "projects" },
    { name: t.navbar.skills, href: "#skills", id: "skills" },
    { name: t.navbar.educations, href: "#educations", id: "educations" },
    { name: t.navbar.contact, href: "#contact", id: "contact" },
  ], [t]);

  // Handle Hide/Show on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  // Handle Active Link on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.2, // Lower threshold for better detection
        rootMargin: "-10% 0px -60% 0px" // Focus on the top-middle of the viewport
      }
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [t, navLinks]); // Re-observe when translations or links change

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 24 : -100 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none"
      >
        <div className="flex items-center gap-4 md:gap-8 px-4 md:px-6 py-2 md:py-3 rounded-full glass border border-white/[0.05] shadow-2xl pointer-events-auto max-w-[95vw] md:max-w-none relative">
          
          {/* Logo/Name */}
          <Link 
            href="#home" 
            onClick={() => setActiveSection("home")}
            className="font-display text-lg font-black tracking-tighter group flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs group-hover:scale-110 transition-transform">J</span>
            <span className="hidden sm:block text-foreground/90">JOM</span>
          </Link>

          <div className="h-6 w-[1px] bg-white/10 hidden md:block" />

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={cn(
                  "relative text-[13px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300",
                  activeSection === link.id 
                    ? "text-white" 
                    : "text-foreground/40 hover:text-foreground/80"
                )}
              >
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">

            <LanguageToggle />
            <ThemeToggle />
            
            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-foreground/70 hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-background/60 z-[45] md:hidden flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setActiveSection(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "text-4xl font-display font-black transition-all",
                      activeSection === link.id ? "gradient-text" : "text-foreground/40"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-10 right-10 p-4 rounded-full glass"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
