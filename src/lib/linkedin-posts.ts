export interface LinkedInPost {
  id: string;
  urn: string;
  embedUrl: string;
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
 * (Embed code provided directly from LinkedIn).
 */
export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    id: "post-7485921309042823168",
    urn: "urn:li:ugcPost:7485921309042823168",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7485921309042823168?collapsed=1",
    author: {
      name: LINKEDIN_PROFILE.name,
      headline: LINKEDIN_PROFILE.headline,
      avatar: LINKEDIN_PROFILE.avatar,
      profileUrl: LINKEDIN_PROFILE.profileUrl,
    },
    timestamp: "Recent • 🌐 Public",
    category: "project",
    categoryLabel: "Official Post",
    title: "Official Post from @sai-swam-wan-hline-jom-7a72b4406",
    content: [
      "Real official update published on LinkedIn by Sai Swam Wan Hline."
    ],
    tags: [
      "#SoftwareEngineering",
      "#DataEngineering",
      "#Internship",
      "#RSU"
    ],
    metrics: {
      likes: 85,
      comments: 18,
      reposts: 6,
    },
    postUrl: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7485921309042823168/",
    projectLink: "/internship",
    projectLinkLabel: "Explore Internship Logbook & Engineering Reports"
  }
];
