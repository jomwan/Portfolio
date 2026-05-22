import type { LucideIcon } from "lucide-react";
import { Mail, MessageSquare } from "lucide-react";
import React from "react";

// Custom high-fidelity brand SVGs to bypass lucide-react version exclusions
const GithubIcon = ({ size = 20, ...props }: any) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, ...props }: any) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ size = 20, ...props }: any) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 20, ...props }: any) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LineIcon = ({ size = 20, ...props }: any) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 10.5c0-4.7-4-8.5-9-8.5s-9 3.8-9 8.5c0 4.1 3.1 7.6 7.4 8.3l-.6 1.8c-.1.2.1.4.3.3l2.2-1.4c6.7 0 8.7-4.6 8.7-8.7z" />
    <path d="M7.5 8.5v4h2" />
    <path d="M11.5 8.5v4" />
    <path d="M13.5 12.5v-4l2.5 4v-4" />
    <path d="M20 8.5h-2.5v4H20 M17.5 10.5h2" />
  </svg>
);

export const PERSONAL = {
  name: "Sai Swam Wan Hline",
  nickname: "Jom",
  email: "saiswamwan.h66@rsu.ac.th",
} as const;

export interface SocialLink {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: GithubIcon as any, label: "GitHub", href: "https://github.com/jomwan" },
  { icon: LinkedinIcon as any, label: "LinkedIn", href: "https://www.linkedin.com/in/sai-swam-wan-hline-7a72b4406/" },
  { icon: Mail, label: "Email", href: "mailto:saiswamwan.h66@rsu.ac.th" },
];

export const SOCIAL_LINKS_FULL: SocialLink[] = [
  { icon: GithubIcon as any, label: "GitHub", href: "https://github.com/jomwan" },
  { icon: LinkedinIcon as any, label: "LinkedIn", href: "https://www.linkedin.com/in/sai-swam-wan-hline-7a72b4406/" },
  { icon: LineIcon as any, label: "Line ID", href: "https://line.me/ti/p/~saiswamwanhline" },
  { icon: FacebookIcon as any, label: "Facebook", href: "https://www.facebook.com/jomwan02" },
  { icon: InstagramIcon as any, label: "Instagram", href: "https://www.instagram.com/jom_wan02" },
];

export const STATS = [
  { labelKey: "projects" as const, value: "10", unit: "+", color: "text-blue-400" },
  { labelKey: "models" as const, value: "5", unit: "+", color: "text-purple-400" },
  { labelKey: "accuracy" as const, value: "98", unit: "%", color: "text-emerald-400" },
  { labelKey: "security" as const, value: "100", unit: "%", color: "text-amber-400" },
];
