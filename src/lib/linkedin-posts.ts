export interface LinkedInPost {
  id: string;
  author: {
    name: string;
    headline: string;
    avatar: string;
    profileUrl: string;
  };
  timestamp: string;
  category: "project" | "achievement";
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
  handle: "sai-swam-wan-hline-jom-7a72b4406",
  nickname: "Jom",
  headline: "Full-Stack Software Engineering Intern @ HTZKKL TECHNOLOGIES COMPANY LIMITED | ICT @ Rangsit University International College",
  location: "Bangkok, Thailand",
  connections: "500+",
  followers: "520 followers",
  profileUrl: "https://www.linkedin.com/in/sai-swam-wan-hline-jom-7a72b4406/",
  activityUrl: "https://www.linkedin.com/in/sai-swam-wan-hline-jom-7a72b4406/recent-activity/all/",
  avatar: "/images/profile.jpg",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
  about:
    "Information and Communication Technology (ICT) student at Rangsit University International College based in Bangkok, Thailand. Passionate about Database Design, Data Engineering, and Scalable Full-Stack Web Platforms. Currently interning as a Full-Stack Software Engineer at HTZKKL TECHNOLOGIES COMPANY LIMITED, architecting multi-tenant async backends and internationalized web systems.",
  experience: {
    role: "Full-Stack Software Engineering Intern",
    company: "HTZKKL TECHNOLOGIES COMPANY LIMITED",
    period: "June 2026 — Present • Full-time",
    location: "Bangkok, Thailand",
    type: "Internship"
  },
  education: {
    degree: "B.Sc. in Information and Communication Technology (ICT)",
    school: "Rangsit University International College",
    period: "2023 — Present",
    gpa: "3.56 Cumulative GPA (4.00 recent semester)"
  }
};

/**
 * Exactly ONE single post currently published on the real LinkedIn account.
 * (Weekly reports are not yet posted to LinkedIn).
 */
export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    id: "post-databricks",
    author: {
      name: LINKEDIN_PROFILE.name,
      headline: LINKEDIN_PROFILE.headline,
      avatar: LINKEDIN_PROFILE.avatar,
      profileUrl: LINKEDIN_PROFILE.profileUrl,
    },
    timestamp: "Recent • 🌐 Public",
    category: "project",
    categoryLabel: "Featured Post",
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
    postUrl: "https://www.linkedin.com/in/sai-swam-wan-hline-jom-7a72b4406/",
    projectLink: "/projects/databricks-fraud",
    projectLinkLabel: "Explore Case Study & Interactive Demo"
  }
];
