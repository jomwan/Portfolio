import type { ReactNode } from "react";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectArchitecture {
  title: string;
  desc: string;
  type: "data" | "model" | "storage" | "pipeline" | "database" | "analytics" | "system";
}

export interface Project {
  id: string;
  title: string;
  desc: string;
  tech: string[];
  icons: string[];
  live: string;
  github: string;
  image: string;
  metric: string;
  metrics: ProjectMetric[];
  icon: ReactNode;
  featured: boolean;
  tags: string[];
  architecture?: ProjectArchitecture[];
}

export interface EducationLink {
  label: string;
  url: string;
}
