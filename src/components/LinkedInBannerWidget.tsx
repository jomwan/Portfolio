"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Check,
  Copy,
  ShieldCheck,
  Loader2
} from "lucide-react";
import Image from "next/image";
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
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.5a1.63 1.63 0 0 0-1.63 1.62 1.63 1.63 0 0 0 1.63-1.63A1.63 1.63 0 0 0 7.86 6.5Z" />
  </svg>
);

export default function LinkedInBannerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const profile = LINKEDIN_PROFILE;
  const currentPost = LINKEDIN_POSTS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            className="mb-3 w-[95vw] sm:w-[530px] max-h-[88vh] glass bg-background/95 backdrop-blur-2xl border border-white/10 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-foreground relative ring-1 ring-[#0a66c2]/25"
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
                    <ShieldCheck size={13} className="text-[#0a66c2] shrink-0" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  </div>
                  <span className="text-[10.5px] text-foreground/50 block font-mono truncate">
                    Official LinkedIn Post Embed
                  </span>
                </div>
              </div>

              {/* Title Bar Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handleCopy}
                  title={copied ? "Link Copied!" : "Copy Profile URL"}
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-[#0a66c2] hover:bg-white/5 transition-all cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open live LinkedIn profile in new tab"
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

            {/* Quick Profile Bio Banner Strip */}
            <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div className="truncate text-left">
                  <span className="font-semibold text-xs text-foreground block truncate">
                    {profile.name} ({profile.nickname})
                  </span>
                  <span className="text-[10px] text-foreground/50 block truncate">
                    {profile.experience.role} • {profile.experience.company}
                  </span>
                </div>
              </div>

              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-[11px] transition-all shadow-sm shrink-0"
              >
                Connect
              </a>
            </div>

            {/* Scrollable Window Body with Official LinkedIn Post iframe */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 custom-scrollbar text-xs">
              <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 min-h-[500px]">
                {/* Loading skeleton before iframe renders */}
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/60 backdrop-blur-sm z-10 text-foreground/60">
                    <Loader2 size={24} className="animate-spin text-[#0a66c2]" />
                    <span className="text-xs font-mono">Loading official LinkedIn post...</span>
                  </div>
                )}

                {/* Real Official LinkedIn Post Embed */}
                <iframe
                  src={currentPost.embedUrl}
                  height="628"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Embedded LinkedIn Post"
                  onLoad={() => setIframeLoaded(true)}
                  className="w-full rounded-2xl bg-white shadow-inner"
                  style={{ minHeight: "560px" }}
                />
              </div>
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
        title={isOpen ? "Minimize LinkedIn window" : "Open LinkedIn real post"}
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
            <span>LinkedIn Post</span>
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
