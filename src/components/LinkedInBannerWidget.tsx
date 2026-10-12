"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  X, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  ThumbsUp, 
  MessageSquare, 
  Globe, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LINKEDIN_PROFILE, LINKEDIN_POSTS, type LinkedInPost } from "@/lib/linkedin-posts";

// Custom official LinkedIn SVG Icon
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
  const [activePostIndex, setActivePostIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const posts = LINKEDIN_POSTS;
  const currentPost = posts[activePostIndex] || posts[0];

  const isLiked = !!likedPosts[currentPost.id];
  const likeCount = currentPost.metrics.likes + (isLiked ? 1 : 0);

  const toggleLike = () => {
    setLikedPosts((prev) => ({ ...prev, [currentPost.id]: !prev[currentPost.id] }));
  };

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end select-none">
      
      {/* Expanded Small Window Banner */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-3 w-[92vw] max-w-[400px] glass bg-background/95 backdrop-blur-2xl border border-white/10 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-foreground relative"
            style={{ maxHeight: "calc(100vh - 100px)" }}
          >
            {/* Window Banner Title Bar */}
            <div className="px-4 py-3 bg-[#0a66c2]/10 border-b border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#0a66c2] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#0a66c2]/30">
                  <LinkedInLogo size={14} />
                </div>
                <div>
                  <span className="font-display font-black text-xs text-foreground tracking-tight block">
                    Recent Post • {LINKEDIN_PROFILE.name}
                  </span>
                  <span className="text-[10px] text-foreground/45 block">
                    HTZKKL Technologies Co., Ltd.
                  </span>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <a
                  href={currentPost.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open real post on LinkedIn"
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-[#0a66c2] hover:bg-white/5 transition-all"
                >
                  <ExternalLink size={14} />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize"
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-white/5 transition-all cursor-pointer"
                >
                  <ChevronDown size={15} />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsDismissed(true);
                  }}
                  title="Dismiss banner"
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Post Selector Tabs if multiple posts */}
            {posts.length > 1 && (
              <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5 border-b border-white/5 overflow-x-auto text-[10.5px]">
                {posts.map((post, idx) => (
                  <button
                    key={post.id}
                    onClick={() => setActivePostIndex(idx)}
                    className={`px-2.5 py-1 rounded-xl transition-all font-semibold whitespace-nowrap cursor-pointer ${
                      activePostIndex === idx
                        ? "bg-[#0a66c2] text-white shadow-sm"
                        : "bg-white/[0.03] text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {post.categoryLabel}
                  </button>
                ))}
              </div>
            )}

            {/* Window Body: Real Post Content / Embed */}
            <div className="p-4 overflow-y-auto space-y-3.5 custom-scrollbar text-xs">
              
              {/* Author Row */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <Image
                    src={currentPost.author.avatar}
                    alt={currentPost.author.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-xs text-foreground truncate">
                    {currentPost.author.name}
                  </div>
                  <div className="text-[10px] text-foreground/45 flex items-center gap-1 font-mono">
                    <Globe size={10} className="shrink-0" />
                    <span>{currentPost.timestamp}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-[#0a66c2]/10 border border-[#0a66c2]/20 text-[#0a66c2] text-[9.5px] font-bold">
                  {currentPost.categoryLabel}
                </span>
              </div>

              {/* Post Title */}
              <h4 className="font-display font-bold text-sm text-foreground/90 leading-snug">
                {currentPost.title}
              </h4>

              {/* Post Body Snippet */}
              <div className="space-y-2 text-foreground/75 text-xs leading-relaxed">
                {currentPost.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Hashtag Chips */}
              <div className="flex flex-wrap gap-1 pt-1">
                {currentPost.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-[#0a66c2] hover:underline">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Direct Project / Report Card Attachment */}
              {currentPost.projectLink && (
                <Link
                  href={currentPost.projectLink}
                  onClick={() => setIsOpen(false)}
                  className="block p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#0a66c2]/40 transition-all group/link"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-[#0a66c2]" />
                      <span className="font-semibold text-foreground/80 group-hover/link:text-primary transition-colors">
                        {currentPost.projectLinkLabel || "View Internship Logbook"}
                      </span>
                    </div>
                    <ArrowRight size={13} className="text-foreground/40 group-hover/link:text-primary group-hover/link:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              )}

              {/* Engagement Reaction Stats */}
              <div className="flex items-center justify-between text-[10.5px] text-foreground/40 pt-2 border-t border-white/5 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#0a66c2] text-white flex items-center justify-center text-[8px]">👍</span>
                  <span>{likeCount} reactions</span>
                </div>
                <div>
                  <span>{currentPost.metrics.comments} comments</span>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={toggleLike}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isLiked
                      ? "bg-[#0a66c2]/20 text-[#0a66c2]"
                      : "bg-white/[0.03] text-foreground/60 hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <ThumbsUp size={13} className={isLiked ? "fill-current" : ""} />
                  <span>{isLiked ? "Liked" : "Like"}</span>
                </button>

                <a
                  href={currentPost.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs transition-all shadow-md shadow-[#0a66c2]/20"
                >
                  <span>Open on LinkedIn</span>
                  <ExternalLink size={12} />
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Small Banner Pill (Docked Bottom-Right) */}
      <motion.div
        layout
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="glass bg-background/90 backdrop-blur-xl border border-white/10 dark:border-white/20 rounded-full shadow-2xl p-1.5 sm:p-2 flex items-center gap-2.5 cursor-pointer group hover:border-[#0a66c2]/40 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* LinkedIn Blue Icon Bubble */}
        <div className="w-8 h-8 rounded-full bg-[#0a66c2] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#0a66c2]/30 relative">
          <LinkedInLogo size={16} />
          {/* Active pulse dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-background animate-pulse" />
        </div>

        {/* Small Banner Text */}
        <div className="flex flex-col text-left pr-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#0a66c2] uppercase tracking-wider">
            <Sparkles size={10} />
            <span>Latest LinkedIn Post</span>
          </div>
          <span className="text-xs font-display font-bold text-foreground/90 max-w-[170px] sm:max-w-[210px] truncate">
            {currentPost.title}
          </span>
        </div>

        {/* Toggle Icon */}
        <div className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center text-foreground/40 group-hover:text-[#0a66c2] transition-colors shrink-0">
          {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </motion.div>

    </div>
  );
}
