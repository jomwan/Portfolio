import type { LucideIcon } from "lucide-react";
import { Globe, Briefcase, Mail } from "lucide-react";

export const PERSONAL = {
  name: "Sai Swam Wan Hline",
  nickname: "Jom",
  email: "saiswamwanhline@gmail.com",
} as const;

export interface SocialLink {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: Globe, label: "GitHub", href: "https://github.com/jomwan" },
  { icon: Briefcase, label: "LinkedIn", href: "https://www.linkedin.com/in/sai-swam-wan-hline-7a72b4406/" },
  { icon: Mail, label: "Email", href: "mailto:saiswamwanhline@gmail.com" },
];

export const SOCIAL_LINKS_FULL: SocialLink[] = [
  { icon: Globe, label: "GitHub", href: "https://github.com/jomwan" },
  { icon: Briefcase, label: "LinkedIn", href: "https://www.linkedin.com/in/sai-swam-wan-hline-7a72b4406/" },
  { icon: Mail, label: "Line ID", href: "https://line.me/ti/p/~saiswamwanhline" },
  { icon: Globe, label: "Facebook", href: "https://www.facebook.com/jomwan02" },
  { icon: Globe, label: "Instagram", href: "https://www.instagram.com/jom_wan02" },
];

export const STATS = [
  { labelKey: "projects" as const, value: "10", unit: "+", color: "text-blue-400" },
  { labelKey: "models" as const, value: "5", unit: "+", color: "text-purple-400" },
  { labelKey: "accuracy" as const, value: "98", unit: "%", color: "text-emerald-400" },
  { labelKey: "security" as const, value: "100", unit: "%", color: "text-amber-400" },
];
