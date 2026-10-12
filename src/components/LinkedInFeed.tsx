"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  ThumbsUp, 
  MessageSquare, 
  Repeat2, 
  Send, 
  Globe, 
  Sparkles, 
  Briefcase, 
  MapPin, 
  Users, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LINKEDIN_PROFILE, LINKEDIN_POSTS, type LinkedInPost } from "@/lib/linkedin-posts";

// Custom LinkedIn Icon SVG
const LinkedInLogo = ({ className = "w-5 h-5", size = 20 }: { className?: string; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.5a1.63 1.63 0 0 0-1.63 1.62 1.63 1.63 0 0 0 1.63 1.63 1.63 1.63 0 0 0 1.63-1.63A1.63 1.63 0 0 0 7.86 6.5Z" />
  </svg>
);

export default function LinkedInFeed() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "report" | "project">("all");
  const [expandedPostIds, setExpandedPostIds] = useState<Record<string, boolean>>({});
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedPostIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPosts = LINKEDIN_POSTS.filter((post) => {
    if (filter === "report") return post.category === "report";
    if (filter === "project") return post.category === "project";
    return true;
  });

  return (
    <section id="activity" className="py-24 md:py-32 px-6 relative overflow-hidden bg-transparent">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0a66c2]/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-[1.5px] bg-[#0a66c2]" />
              <span className="text-[#0a66c2] font-display font-bold tracking-[0.25em] uppercase text-xs flex items-center gap-1.5">
                <LinkedInLogo size={14} className="text-[#0a66c2]" />
                {t.activity.section}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-display font-bold mb-4 leading-tight"
              dangerouslySetInnerHTML={{ __html: t.activity.title }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-foreground/60 text-base md:text-lg leading-relaxed"
            >
              {t.activity.subtitle}
            </motion.p>
          </div>

          {/* Quick Connect Header Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 self-start md:self-auto"
          >
            <a
              href={LINKEDIN_PROFILE.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs transition-all shadow-lg shadow-[#0a66c2]/20 hover:shadow-[#0a66c2]/40"
            >
              <LinkedInLogo size={16} />
              <span>{t.activity.profile.connect}</span>
              <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* LinkedIn Profile Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 glass bg-white/[0.015] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
        >
          {/* Header Cover Banner */}
          <div className="h-28 sm:h-36 w-full bg-gradient-to-r from-[#0a66c2]/30 via-primary/20 to-secondary/20 relative">
            <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:24px_24px]" />
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.activity.profile.status}</span>
            </div>
          </div>

          {/* Profile Details Bar */}
          <div className="p-6 sm:p-8 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-12 sm:-mt-14">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              {/* Profile Avatar */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-background bg-card shadow-2xl shrink-0 group">
                <Image
                  src={LINKEDIN_PROFILE.avatar}
                  alt={LINKEDIN_PROFILE.name}
                  fill
                  sizes="112px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bio & Meta */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-display font-black text-foreground">
                    {LINKEDIN_PROFILE.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#0a66c2]/10 border border-[#0a66c2]/30 text-[#0a66c2] text-[10px] font-bold">
                    in
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-foreground/75 font-medium max-w-xl leading-relaxed">
                  {t.activity.profile.headline}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-foreground/45 pt-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-primary" />
                    {t.activity.profile.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Users size={13} className="text-[#0a66c2]" />
                    {t.activity.profile.connections}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile CTAs */}
            <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
              <a
                href={LINKEDIN_PROFILE.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-bold text-foreground transition-all cursor-pointer"
              >
                <span>{t.activity.profile.viewProfile}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-3 border-b border-white/5">
          <div className="text-xs font-bold uppercase tracking-wider text-foreground/40 flex items-center gap-2">
            <Sparkles size={14} className="text-primary" />
            <span>Feed Activity</span>
          </div>

          <div className="flex items-center gap-2 bg-white/[0.02] p-1 rounded-2xl border border-white/5 text-[11px] font-semibold">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-[#0a66c2] text-white shadow-md shadow-[#0a66c2]/20 font-bold"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              {t.activity.filterAll}
            </button>
            <button
              onClick={() => setFilter("report")}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                filter === "report"
                  ? "bg-primary text-white shadow-md shadow-primary/20 font-bold"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              {t.activity.filterReports}
            </button>
            <button
              onClick={() => setFilter("project")}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                filter === "project"
                  ? "bg-secondary text-white shadow-md shadow-secondary/20 font-bold"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              {t.activity.filterProjects}
            </button>
          </div>
        </div>

        {/* Feed Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => {
              const isExpanded = !!expandedPostIds[post.id];
              const isLiked = !!likedPosts[post.id];
              const likeCount = post.metrics.likes + (isLiked ? 1 : 0);

              return (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass bg-white/[0.015] border border-white/10 hover:border-white/20 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xl relative group"
                >
                  <div>
                    {/* Post Author Header */}
                    <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/10 shrink-0">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-display font-black text-xs text-foreground">
                              {post.author.name}
                            </span>
                            <CheckCircle2 size={12} className="text-primary fill-primary/20" />
                          </div>
                          <span className="text-[10px] text-foreground/40 font-mono flex items-center gap-1">
                            {post.timestamp}
                          </span>
                        </div>
                      </div>

                      {/* Post Category Badge */}
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        post.category === "report"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-secondary/10 text-secondary border-secondary/20"
                      }`}>
                        {post.categoryLabel}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h4 className="font-display font-bold text-sm text-foreground/95 mb-3 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>

                    {/* Post Content with Expand/Collapse */}
                    <div className="space-y-2 text-xs text-foreground/70 leading-relaxed mb-4">
                      {post.content.slice(0, isExpanded ? post.content.length : 2).map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}

                      {post.content.length > 2 && (
                        <button
                          onClick={() => toggleExpand(post.id)}
                          className="text-primary font-bold text-xs hover:underline cursor-pointer block pt-1"
                        >
                          {isExpanded ? t.activity.post.showLess : t.activity.post.readMore}
                        </button>
                      )}
                    </div>

                    {/* Attached Project / Report Card Preview */}
                    {post.projectLink && (
                      <Link
                        href={post.projectLink}
                        className="block mb-4 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all group/card"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-bold text-foreground/80 group-hover/card:text-primary transition-colors flex items-center gap-1.5">
                            <Briefcase size={13} className="text-primary" />
                            {post.projectLinkLabel}
                          </span>
                          <ArrowRight size={13} className="text-foreground/40 group-hover/card:text-primary group-hover/card:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-[#0a66c2] hover:underline cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Counts Bar */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-foreground/40 pb-3 border-b border-white/5">
                      <div className="flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-[#0a66c2] flex items-center justify-center text-[8px] text-white">👍</span>
                        <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white">💡</span>
                        <span className="ml-1 font-mono font-bold text-foreground/60">{likeCount}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono">
                        <span>{post.metrics.comments} {t.activity.post.comments}</span>
                        <span>•</span>
                        <span>{post.metrics.reposts} {t.activity.post.reposts}</span>
                      </div>
                    </div>

                    {/* Interactive Action Bar */}
                    <div className="pt-3 flex items-center justify-between">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isLiked 
                            ? "bg-[#0a66c2]/20 text-[#0a66c2]" 
                            : "text-foreground/50 hover:text-foreground hover:bg-white/5"
                        }`}
                      >
                        <ThumbsUp size={14} className={isLiked ? "fill-current" : ""} />
                        <span>{isLiked ? t.activity.post.liked : t.activity.post.like}</span>
                      </button>

                      <a
                        href={post.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-[#0a66c2] hover:bg-[#0a66c2]/10 transition-all cursor-pointer"
                      >
                        <span>{t.activity.post.viewOnLinkedin}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  {/* Ambient Hover Glow */}
                  <div className="absolute -inset-px bg-gradient-to-r from-[#0a66c2]/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10 pointer-events-none" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Banner Encouraging LinkedIn Connection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 p-6 sm:p-8 rounded-3xl glass bg-[#0a66c2]/[0.03] border border-[#0a66c2]/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="space-y-1">
            <h4 className="font-display font-black text-base text-foreground flex items-center justify-center sm:justify-start gap-2">
              <LinkedInLogo size={18} className="text-[#0a66c2]" />
              <span>Looking for weekly reports and live engineering notes?</span>
            </h4>
            <p className="text-xs text-foreground/55 max-w-xl">
              Follow my LinkedIn profile for weekly engineering logs, architectural diagrams, and co-op updates from HTZKKL Technologies Company Limited.
            </p>
          </div>

          <a
            href={LINKEDIN_PROFILE.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs transition-all shadow-lg shadow-[#0a66c2]/25 hover:shadow-[#0a66c2]/45 shrink-0"
          >
            <LinkedInLogo size={15} />
            <span>{t.activity.profile.connect}</span>
            <ExternalLink size={13} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
