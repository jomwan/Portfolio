export interface LinkedInPost {
  id: string;
  author: {
    name: string;
    headline: string;
    avatar: string;
    profileUrl: string;
  };
  timestamp: string;
  category: "report" | "project" | "achievement";
  categoryLabel: string;
  title: string;
  content: string[];
  tags: string[];
  metrics: {
    likes: number;
    comments: number;
    reposts: number;
  };
  postUrl: string;
  projectLink?: string;
  projectLinkLabel?: string;
}

export const LINKEDIN_PROFILE = {
  name: "Sai Swam Wan Hline",
  headline: "Full-Stack Software Engineering Intern @ HTZKKL TECHNOLOGIES COMPANY LIMITED | ICT @ Rangsit University International College",
  location: "Bangkok, Thailand",
  connections: "500+",
  profileUrl: "https://www.linkedin.com/in/sai-swam-wan-hline-7a72b4406/",
  avatar: "/images/profile.jpg",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
};

/**
 * Recent LinkedIn updates and reports.
 * Whenever you share a new post or weekly report on LinkedIn, 
 * you can add a new entry to the top of this list!
 */
export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    id: "post-5",
    author: {
      name: LINKEDIN_PROFILE.name,
      headline: LINKEDIN_PROFILE.headline,
      avatar: LINKEDIN_PROFILE.avatar,
      profileUrl: LINKEDIN_PROFILE.profileUrl,
    },
    timestamp: "October 2026 • 🌐 Public",
    category: "report",
    categoryLabel: "Weekly Report #5",
    title: "⚡ Week 5 Milestone: Async SQLAlchemy 2.0 & Astral uv Migration",
    content: [
      "Excited to share our Week 5 technical progress at HTZKKL TECHNOLOGIES COMPANY LIMITED under Rangsit University International College Form ICTCE04! 🚀",
      "This week, we executed a major full-stack persistence migration:",
      "1️⃣ Dependency Modernization: Migrated from legacy pip to Astral's `uv` and standardized pyproject.toml with deterministic uv.lock lockfiles for 10x faster builds.",
      "2️⃣ Async Persistence Layer: Upgraded our database layer to Async SQLAlchemy 2.0 with asyncpg (PostgreSQL) across all 16 core business modules.",
      "3️⃣ Non-Blocking Performance: Resolved lazy-loading MissingGreenlet bottlenecks with explicit eager loading strategies (selectinload / joinedload) and standardized UTC timezone handling.",
      "200 cumulative engineering hours achieved toward our 16-week co-op milestone! Onward to Week 6 performance profiling. 💻📊"
    ],
    tags: [
      "#SoftwareEngineering",
      "#Python",
      "#FastAPI",
      "#PostgreSQL",
      "#Asyncpg",
      "#SQLAlchemy",
      "#AstralUV",
      "#Internship",
      "#RSU"
    ],
    metrics: {
      likes: 64,
      comments: 14,
      reposts: 5,
    },
    postUrl: "https://www.linkedin.com/in/sai-swam-wan-hline-7a72b4406/",
    projectLink: "/internship",
    projectLinkLabel: "View Official ICTCE04 Report Card"
  },
  {
    id: "post-4",
    author: {
      name: LINKEDIN_PROFILE.name,
      headline: LINKEDIN_PROFILE.headline,
      avatar: LINKEDIN_PROFILE.avatar,
      profileUrl: LINKEDIN_PROFILE.profileUrl,
    },
    timestamp: "September 2026 • 🌐 Public",
    category: "report",
    categoryLabel: "Weekly Report #4",
    title: "🌐 Full-Stack Bilingual i18n Engine & A4 Official Dossiers",
    content: [
      "Month 1 completed (160 cumulative hours)! 🎉",
      "During Week 4 of my software engineering internship at HTZKKL TECHNOLOGIES, I designed and integrated our enterprise Bilingual Internationalization (i18n) Engine:",
      "• Engineered a typed React translation context supporting English and Myanmar Unicode with zero-flicker hydration.",
      "• Database schema localization using Alembic migrations for multilingual entity attributes.",
      "• Built a 3-way official document switcher (Official Myanmar, English, and Side-by-Side Bilingual) with print-clamped CSS rules guaranteeing single-page A4 official receipts.",
      "Huge milestone achieved in internationalized systems and complex script typography!"
    ],
    tags: [
      "#FullStack",
      "#NextJS",
      "#i18n",
      "#WebDevelopment",
      "#DatabaseDesign",
      "#CoopEducation",
      "#Bangkok"
    ],
    metrics: {
      likes: 52,
      comments: 9,
      reposts: 3,
    },
    postUrl: "https://www.linkedin.com/in/sai-swam-wan-hline-7a72b4406/",
    projectLink: "/internship",
    projectLinkLabel: "Explore Week 4 Engineering Log"
  },
  {
    id: "post-databricks",
    author: {
      name: LINKEDIN_PROFILE.name,
      headline: LINKEDIN_PROFILE.headline,
      avatar: LINKEDIN_PROFILE.avatar,
      profileUrl: LINKEDIN_PROFILE.profileUrl,
    },
    timestamp: "August 2026 • 🌐 Public",
    category: "project",
    categoryLabel: "Project Highlight",
    title: "🛡️ Cloud-Native Distributed Fraud Detection on Databricks",
    content: [
      "Thrilled to share my latest distributed data engineering project: Databricks-Fraud Detection Pipeline! 📈",
      "Key architectural highlights:",
      "• Medallion Lakehouse: Ingests transaction streaming logs across Bronze (raw), Silver (cleaned & feature engineered), and Gold (fraud KPI reporting) Delta tables.",
      "• MLflow Lifecycle: Automated hyperparameter tracking, model registration, and versioned staging deployment.",
      "• Scalable PySpark Streaming: High-throughput real-time anomaly classification under extreme class imbalance.",
      "Check out the interactive case study on my portfolio website!"
    ],
    tags: [
      "#DataEngineering",
      "#Databricks",
      "#ApacheSpark",
      "#DeltaLake",
      "#MLflow",
      "#MachineLearning",
      "#PySpark"
    ],
    metrics: {
      likes: 78,
      comments: 18,
      reposts: 8,
    },
    postUrl: "https://www.linkedin.com/in/sai-swam-wan-hline-7a72b4406/",
    projectLink: "/projects/databricks-fraud",
    projectLinkLabel: "Explore Case Study & Interactive Demo"
  }
];
