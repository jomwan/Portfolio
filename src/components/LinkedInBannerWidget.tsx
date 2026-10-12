"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  MessageSquare,
  Share2,
  Globe,
  Sparkles,
  ArrowRight,
  Briefcase,
  GraduationCap,
  MapPin,
  Users,
  Check,
  Copy,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LINKEDIN_PROFILE, LINKEDIN_POSTS } from "@/lib/linkedin-posts";

// Custom official LinkedIn SVG
const LinkedInLogo = ({ className = "w-4 h-4", size = 16 }: { className?: string; size?: number }) => (
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

export default function LinkedInBannerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "profile" | "post">("all");

  const profile = LINKEDIN_PROFILE;
  // Display strictly the 1 real post from the account
  const singlePost = LINKEDIN_POSTS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end select-none">
      {/* Expanded Interactive LinkedIn Floating Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="mb-3 w-[94vw] sm:w-[440px] max-h-[85vh] glass bg-background/95 backdrop-blur-2xl border border-white/10 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-foreground relative ring-1 ring-[#0a66c2]/20"
          >
            {/* Window Title Bar */}
            <div className="px-4 py-3 bg-[#0a66c2]/10 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#0a66c2] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#0a66c2]/30">
                  <LinkedInLogo size={15} />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-black text-xs text-foreground tracking-tight truncate">
                      {profile.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  </div>
                  <span className="text-[10.5px] text-foreground/50 block font-mono truncate">
                    linkedin.com/in/{profile.handle}
                  </span>
                </div>
              </div>

              {/* Title Bar Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handleCopy}
                  title={copied ? "Link Copied!" : "Copy Profile URL"}
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-[#0a66c2] hover:bg-white/5 transition-all cursor-pointer relative"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open live LinkedIn account in new tab"
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-[#0a66c2] hover:bg-white/5 transition-all cursor-pointer"
                >
                  <ExternalLink size={14} />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize window"
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-white/5 transition-all cursor-pointer"
                >
                  <ChevronDown size={15} />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsDismissed(true);
                  }}
                  title="Close widget"
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* In-Window Section Navigator Tabs */}
            <div className="px-3 py-1.5 flex items-center gap-1.5 border-b border-white/5 bg-white/[0.02] shrink-0 text-[11px] font-semibold">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-[#0a66c2] text-white shadow-sm"
                    : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("post")}
                className={`px-3 py-1 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                  activeTab === "post"
                    ? "bg-[#0a66c2] text-white shadow-sm"
                    : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                }`}
              >
                <span>Latest Post</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-[#0a66c2] text-white shadow-sm"
                    : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                }`}
              >
                Profile Bio
              </button>
            </div>

            {/* Scrollable Window Body — Real LinkedIn Account Card & Real Post */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-xs">
              
              {/* SECTION: Profile Header Card */}
              {(activeTab === "all" || activeTab === "profile") && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  {/* Profile Cover Photo */}
                  <div className="h-20 w-full relative bg-gradient-to-r from-[#0a66c2]/40 via-purple-600/30 to-blue-900/40">
                    <div className="absolute inset-0 bg-pattern opacity-30" />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-md text-[9.5px] font-mono text-white/80">
                      LinkedIn Member
                    </span>
                  </div>

                  {/* Profile Info Row with Overlapping Avatar */}
                  <div className="px-4 pb-4 pt-0 relative">
                    <div className="flex justify-between items-end -mt-9 mb-3">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-3 border-background ring-2 ring-[#0a66c2]/50 shadow-xl bg-card">
                        <Image
                          src={profile.avatar}
                          alt={profile.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-background" />
                      </div>

                      {/* Connect / Open Live Button */}
                      <a
                        href={profile.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs transition-all shadow-md shadow-[#0a66c2]/30 cursor-pointer"
                      >
                        <LinkedInLogo size={13} />
                        <span>Connect / Follow</span>
                      </a>
                    </div>

                    {/* Name & Headline */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-display font-black text-sm text-foreground tracking-tight">
                          {profile.name}
                        </h3>
                        <span className="text-[11px] font-normal text-foreground/50">
                          ({profile.nickname})
                        </span>
                        <ShieldCheck size={14} className="text-[#0a66c2]" />
                      </div>
                      <p className="text-[11.5px] text-foreground/80 leading-snug font-medium">
                        {profile.headline}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[10.5px] text-foreground/50 font-mono">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} className="text-[#0a66c2]" />
                          {profile.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={11} className="text-emerald-400" />
                          {profile.connections}
                        </span>
                      </div>
                    </div>

                    {/* Experience & Education Quick Badges */}
                    <div className="mt-3 pt-3 border-t border-white/5 space-y-2 text-[11px]">
                      <div className="flex items-start gap-2 text-foreground/80">
                        <Briefcase size={13} className="text-[#0a66c2] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">{profile.experience.role}</span>
                          <span className="text-foreground/50 block text-[10px]">
                            {profile.experience.company} • {profile.experience.period}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-foreground/80">
                        <GraduationCap size={13} className="text-purple-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">{profile.education.degree}</span>
                          <span className="text-foreground/50 block text-[10px]">
                            {profile.education.school} ({profile.education.gpa})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: The Real Post from Account */}
              {(activeTab === "all" || activeTab === "post") && singlePost && (
                <div className="rounded-2xl border border-[#0a66c2]/30 bg-[#0a66c2]/[0.03] p-4 space-y-3 relative">
                  {/* Card Section Header */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/5">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-[#0a66c2] uppercase tracking-wider">
                      <Sparkles size={11} />
                      <span>Real LinkedIn Post</span>
                    </div>
                    <span className="text-[10px] text-foreground/45 font-mono">
                      {singlePost.timestamp}
                    </span>
                  </div>

                  {/* Post Title & Text */}
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-xs text-foreground leading-snug">
                      {singlePost.title}
                    </h4>

                    <div className="space-y-1.5 text-[11.5px] text-foreground/75 leading-relaxed">
                      {singlePost.content.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {singlePost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-[#0a66c2] font-semibold hover:underline cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Related Project link in portfolio */}
                    {singlePost.projectLink && (
                      <Link
                        href={singlePost.projectLink}
                        onClick={() => setIsOpen(false)}
                        className="block mt-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-all group/link"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-primary group-hover/link:underline">
                            {singlePost.projectLinkLabel || "View interactive portfolio demo"}
                          </span>
                          <ArrowRight size={12} className="text-foreground/40 group-hover/link:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    )}
                  </div>

                  {/* Engagement Reactions Bar */}
                  <div className="flex items-center justify-between text-[10px] text-foreground/45 pt-2 border-t border-white/5 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#0a66c2] text-white flex items-center justify-center text-[8px]">
                        👍
                      </span>
                      <span>{singlePost.metrics.likes + (isLiked ? 1 : 0)} reactions</span>
                    </div>
                    <span>{singlePost.metrics.comments} comments</span>
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={toggleLike}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isLiked
                          ? "bg-[#0a66c2]/20 text-[#0a66c2]"
                          : "bg-white/[0.03] text-foreground/60 hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      <ThumbsUp size={12} className={isLiked ? "fill-current" : ""} />
                      <span>{isLiked ? "Liked" : "Like"}</span>
                    </button>

                    <a
                      href={profile.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/5 text-foreground/70 hover:text-foreground text-xs font-semibold transition-all"
                    >
                      <MessageSquare size={12} />
                      <span>Comment</span>
                    </a>

                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/5 text-foreground/70 hover:text-foreground text-xs font-semibold transition-all cursor-pointer"
                      title="Share post"
                    >
                      <Share2 size={12} />
                    </button>
                  </div>
                </div>
              )}

              {/* SECTION: About Bio Details */}
              {(activeTab === "all" || activeTab === "profile") && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 block">
                    About
                  </span>
                  <p className="text-[11.5px] text-foreground/70 leading-relaxed font-normal">
                    {profile.about}
                  </p>
                </div>
              )}

            </div>

            {/* Sticky Bottom Bar — Direct Link to Real LinkedIn Account */}
            <div className="p-3 bg-background/95 border-t border-white/10 flex items-center gap-2 shrink-0">
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs transition-all shadow-lg shadow-[#0a66c2]/25 cursor-pointer group"
              >
                <LinkedInLogo size={14} />
                <span>Open {profile.name} on LinkedIn</span>
                <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Docked Floating Banner Pill (Always visible bottom-right) */}
      <motion.div
        layout
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="glass bg-background/90 backdrop-blur-xl border border-white/10 dark:border-white/20 rounded-full shadow-2xl p-1.5 sm:p-2 flex items-center gap-2.5 cursor-pointer group hover:border-[#0a66c2]/50 hover:shadow-[#0a66c2]/20 transition-all"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Minimize LinkedIn window" : "Open LinkedIn profile & real post"}
      >
        {/* LinkedIn Blue Bubble with Active Pulse Ring */}
        <div className="w-8 h-8 rounded-full bg-[#0a66c2] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#0a66c2]/30 relative">
          <LinkedInLogo size={16} />
          {/* Active online pulse dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-background animate-pulse" />
        </div>

        {/* Floating Banner Label */}
        <div className="flex flex-col text-left pr-1">
          <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-[#0a66c2] uppercase tracking-wider">
            <Sparkles size={10} />
            <span>LinkedIn Account</span>
          </div>
          <span className="text-xs font-display font-bold text-foreground/90 max-w-[170px] sm:max-w-[210px] truncate">
            {profile.name} ({profile.nickname})
          </span>
        </div>

        {/* Toggle Chevron */}
        <div className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center text-foreground/40 group-hover:text-[#0a66c2] transition-colors shrink-0">
          {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </motion.div>
    </div>
  );
}
