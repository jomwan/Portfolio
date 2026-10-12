"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ShieldCheck,
  MapPin,
  Users,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Loader2,
  FileText
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LINKEDIN_PROFILE, LINKEDIN_POSTS } from "@/lib/linkedin-posts";

// Custom official LinkedIn SVG
const LinkedInLogo = ({ className = "w-4 h-4", size = 18 }: { className?: string; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.5a1.63 1.63 0 0 0-1.63 1.62 1.63 1.63 0 0 0 1.63-1.63A1.63 1.63 0 0 0 7.86 6.5Z" />
  </svg>
);

export default function LinkedInSection() {
  const { t } = useLanguage();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const profile = LINKEDIN_PROFILE;
  const currentPost = LINKEDIN_POSTS[0];

  return (
    <section id="activity" className="py-24 md:py-32 px-6 relative overflow-hidden bg-transparent">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0a66c2]/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#0a66c2]/30 bg-[#0a66c2]/5 mb-4"
          >
            <div className="w-4 h-4 rounded-full bg-[#0a66c2] text-white flex items-center justify-center">
              <LinkedInLogo size={10} />
            </div>
            <span className="text-primary font-display font-bold tracking-[0.25em] uppercase text-xs">
              {t.activity.section}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground tracking-tight"
            dangerouslySetInnerHTML={{ __html: t.activity.title }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-foreground/60 text-base md:text-lg leading-relaxed"
          >
            {t.activity.subtitle}
          </motion.p>
        </div>

        {/* Content Layout: Profile Card + Embedded Real Post */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (5 cols): Profile Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass bg-background/80 backdrop-blur-xl border border-white/10 dark:border-white/15 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            {/* Cover Banner */}
            <div className="h-28 w-full relative bg-gradient-to-r from-[#0a66c2]/40 via-purple-600/30 to-blue-900/40">
              <div className="absolute inset-0 bg-pattern opacity-30" />
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-mono text-white/90">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Profile</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6 pt-0 relative">
              {/* Avatar overlapping cover */}
              <div className="flex justify-between items-end -mt-12 mb-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-background ring-2 ring-[#0a66c2]/50 shadow-2xl bg-card">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    priority
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-background" />
                </div>

                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs transition-all shadow-md shadow-[#0a66c2]/30 cursor-pointer group"
                >
                  <LinkedInLogo size={14} />
                  <span>Connect</span>
                  <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Identity & Headline */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-black text-xl text-foreground tracking-tight">
                    {profile.name}
                  </h3>
                  <span className="text-sm font-semibold text-foreground/50">
                    ({profile.nickname})
                  </span>
                  <ShieldCheck size={18} className="text-[#0a66c2]" />
                </div>

                <p className="text-xs text-foreground/80 leading-relaxed font-medium">
                  {profile.headline}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-foreground/50 font-mono">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#0a66c2]" />
                    {profile.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={13} className="text-emerald-400" />
                    {profile.connections}
                  </span>
                </div>
              </div>

              {/* Bio Summary */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-foreground/70 leading-relaxed mb-6">
                {profile.about}
              </div>

              {/* Experience & Education Badges */}
              <div className="space-y-3 mb-6 pt-4 border-t border-white/5 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <Briefcase size={16} className="text-[#0a66c2] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">
                      {profile.experience.role}
                    </span>
                    <span className="text-foreground/50 text-[11px] block">
                      {profile.experience.company} • {profile.experience.period}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                  <GraduationCap size={16} className="text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">
                      {profile.education.degree}
                    </span>
                    <span className="text-foreground/50 text-[11px] block">
                      {profile.education.school} ({profile.education.gpa})
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Link to 4-Month Internship Logbook */}
              <Link
                href="/internship"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-primary/10 hover:bg-primary/15 border border-primary/20 transition-all text-xs font-bold text-primary group"
              >
                <div className="flex items-center gap-2">
                  <FileText size={15} />
                  <span>View 4-Month Internship Logbook & Reports</span>
                </div>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column (7 cols): Real Official LinkedIn Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-4"
          >
            {/* Embed Container Card */}
            <div className="glass bg-background/80 backdrop-blur-xl border border-white/10 dark:border-white/15 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden ring-1 ring-[#0a66c2]/20">
              
              {/* Header Bar of the Embed Card */}
              <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#0a66c2] text-white flex items-center justify-center shadow-md shadow-[#0a66c2]/30">
                    <LinkedInLogo size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-foreground">
                        Recent LinkedIn Post
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9.5px] font-bold">
                        Live Embed
                      </span>
                    </div>
                    <span className="text-[11px] text-foreground/50 font-mono block">
                      Published by @{profile.handle}
                    </span>
                  </div>
                </div>

                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#0a66c2] hover:text-white glass px-3.5 py-1.5 rounded-full border border-[#0a66c2]/30 hover:bg-[#0a66c2] transition-all cursor-pointer"
                >
                  <span>Open on LinkedIn</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* The Official Iframe Embed Container */}
              <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex justify-center min-h-[580px]">
                {/* Loading state indicator */}
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/60 backdrop-blur-sm z-10 text-foreground/60">
                    <Loader2 size={28} className="animate-spin text-[#0a66c2]" />
                    <span className="text-xs font-mono">Loading real post from LinkedIn...</span>
                  </div>
                )}

                {/* Real Official Post Iframe */}
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7485921309042823168?collapsed=1"
                  height="628"
                  width="504"
                  frameBorder="0"
                  allowFullScreen
                  title="Embedded LinkedIn Post"
                  onLoad={() => setIframeLoaded(true)}
                  className="w-full max-w-[504px] rounded-2xl bg-white shadow-xl"
                  style={{ minHeight: "628px" }}
                />
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 mt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-foreground/50 font-mono">
                <div className="flex items-center gap-2">
                  <Sparkles size={13} className="text-[#0a66c2]" />
                  <span>Direct post iframe powered by LinkedIn</span>
                </div>

                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0a66c2] hover:underline flex items-center gap-1 font-bold"
                >
                  <span>View all profile updates</span>
                  <ArrowRight size={12} />
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
