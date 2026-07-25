"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Solution } from "../lib/solutions";
import { DEV_CHALLENGES_APPS } from "../lib/devchallenges";

interface CVSkill {
  name: string;
  level: string;
  percentage: number;
}

interface DashboardProps {
  solutions: Solution[];
  cvSkills: CVSkill[];
}

export const getComplexityInfo = (category: string, slug: string, sol?: Solution) => {
  if (sol?.complexity) {
    return sol.complexity;
  }
  const s = slug.toLowerCase();
  const c = category.toLowerCase();
  if (c === "leetcode" && s.includes("twosum")) {
    return { time: "O(N) Time", space: "O(N) Space", label: "Optimal Approach" };
  }
  if (c === "leetcode" && s.includes("addtwonumbers")) {
    return { time: "O(N) Time", space: "O(1) Aux Space", label: "Optimal Approach" };
  }
  if (c === "leetcode" && s.includes("3999")) {
    return { time: "O(N * L) Time", space: "O(N * L) Space", label: "Optimal Rotation" };
  }
  if (c === "leetcode" && s.includes("3514")) {
    return { time: "O(N^2 + N * M) Time", space: "O(M) Space", label: "Optimized XOR Pairings" };
  }
  if (c === "dailycodingproblems" && s.includes("1288")) {
    return { time: "O(N) Time", space: "O(1) Space", label: "Optimal Traversal" };
  }
  if (c === "dailycodingproblems" && s.includes("1289")) {
    return { time: "O(I * (N + E)) Time", space: "O(N + E) Space", label: "Iterative Power Method" };
  }
  if (c === "greatfrontend" && s.includes("debounce")) {
    return { time: "O(1) Time", space: "O(1) Space", label: "Closure Debounce" };
  }
  if (c === "casestudies" && s.includes("internal-product-suite")) {
    return { time: "Lead Architect", space: "Revenue-Generating", label: "System Design Showcase" };
  }
  if (c === "casestudies" && s.includes("api-optimization")) {
    return { time: "Full Stack Developer", space: "Efficiency", label: "Maintenance Showcase" };
  }
  if (c === "casestudies" && s.includes("android-upgrade")) {
    return { time: "Mobile Developer", space: "Android 16 Upgrade", label: "Active Upgrade" };
  }
  return null;
};

export default function Dashboard({ solutions, cvSkills }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "casestudies" | "challenges">("overview");
  const [platformFilter, setPlatformFilter] = useState<"all" | "leetcode" | "dcp" | "greatfrontend" | "devchallenges">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"difficulty" | "number" | "title" | "date">("difficulty");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const formatLanguage = (lang: string) => {
    if (lang === "cpp") return "C++";
    if (lang === "csharp") return "C#";
    return lang.charAt(0).toUpperCase() + lang.slice(1);
  };

  const getLanguageColorClass = (lang: string) => {
    if (lang === "cpp") return "lang-color-cpp";
    if (lang === "csharp") return "lang-color-csharp";
    if (lang === "python") return "lang-color-python";
    if (lang === "javascript") return "lang-color-javascript";
    if (lang === "typescript") return "lang-color-typescript";
    if (lang === "ruby") return "lang-color-ruby";
    return "lang-color-default";
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = solutions.length;
    const categoriesCount: Record<string, number> = {};
    const languagesCount: Record<string, number> = {};

    solutions.forEach((sol) => {
      categoriesCount[sol.categoryLabel] = (categoriesCount[sol.categoryLabel] || 0) + 1;

      sol.files.forEach((file) => {
        const lang = formatLanguage(file.language);
        languagesCount[lang] = (languagesCount[lang] || 0) + 1;
      });
    });

    return {
      total,
      categories: categoriesCount,
      languages: languagesCount,
    };
  }, [solutions]);

  // Unique languages for filter list
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    solutions.forEach((sol) => {
      sol.files.forEach((file) => {
        langs.add(file.language);
      });
    });
    return Array.from(langs);
  }, [solutions]);

  // Dynamically compute the top 4 skills for the radar graph
  const radarSkills = useMemo(() => {
    return cvSkills.slice(0, 4).map(skill => {
      let displayName = skill.name;
      if (displayName.includes("(")) {
        displayName = displayName.split("(")[0].trim();
      }
      return {
        name: displayName,
        percentage: skill.percentage
      };
    });
  }, [cvSkills]);

  // Compute SVG polygon coordinates dynamically based on percentages
  const radarPoints = useMemo(() => {
    const n = 110 - (90 * (radarSkills[0].percentage / 100));
    const e = 110 + (90 * (radarSkills[1].percentage / 100));
    const s = 110 + (90 * (radarSkills[2].percentage / 100));
    const w = 110 - (90 * (radarSkills[3].percentage / 100));
    return {
      polygon: `110,${n} ${e},110 110,${s} ${w},110`,
      n, e, s, w
    };
  }, [radarSkills]);

  // Dynamically calculate the languages solved inside each category for pinned card metadata
  const categoryLanguages = useMemo(() => {
    const dcpLangs = new Set<string>();
    const leetLangs = new Set<string>();
    const gfeLangs = new Set<string>();

    solutions.forEach((sol) => {
      if (sol.category === "dailycodingproblems") {
        sol.files.forEach((file) => dcpLangs.add(formatLanguage(file.language)));
      } else if (sol.category === "leetcode") {
        sol.files.forEach((file) => leetLangs.add(formatLanguage(file.language)));
      } else if (sol.category === "greatfrontend") {
        sol.files.forEach((file) => gfeLangs.add(formatLanguage(file.language)));
      }
    });

    return {
      dcp: Array.from(dcpLangs).join(" / ") || "C# / C++ / Python",
      leetcode: Array.from(leetLangs).join(" / ") || "Python / C# / C++",
      greatfrontend: Array.from(gfeLangs).join(" / ") || "TypeScript / JavaScript"
    };
  }, [solutions]);

  const finalSolutions = useMemo(() => {
    let filtered = solutions.filter((sol) => {
      const matchesSearch =
        sol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sol.readme.toLowerCase().includes(searchTerm.toLowerCase());

      const isCaseStudy = sol.category === "casestudies";

      if (activeTab === "overview") {
        return matchesSearch;
      }

      if (activeTab === "casestudies") {
        return isCaseStudy && matchesSearch;
      }

      if (activeTab === "challenges") {
        if (isCaseStudy) return false;

        const matchesPlatform =
          platformFilter === "all" ||
          (platformFilter === "leetcode" && sol.category === "leetcode") ||
          (platformFilter === "dcp" && sol.category === "dailycodingproblems") ||
          (platformFilter === "greatfrontend" && sol.category === "greatfrontend");

        const matchesLanguage =
          languageFilter === "all" ||
          sol.files.some((file) => file.language === languageFilter);

        return matchesSearch && matchesPlatform && matchesLanguage;
      }

      return matchesSearch;
    });

    if (activeTab === "overview" || activeTab === "casestudies") {
      // Prioritize Case Studies first, then sort remaining by difficulty (Hard first), and limit to top 5
      const caseStudies = filtered.filter((sol) => sol.category === "casestudies");
      const nonCaseStudies = filtered.filter((sol) => sol.category !== "casestudies");
      const sortedNonCase = nonCaseStudies.sort((a, b) => {
        const diffA = a.difficulty || "Medium";
        const diffB = b.difficulty || "Medium";
        const weightA = diffA === "Hard" ? 3 : diffA === "Medium" ? 2 : 1;
        const weightB = diffB === "Hard" ? 3 : diffB === "Medium" ? 2 : 1;
        if (weightA !== weightB) return weightB - weightA;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return [...caseStudies, ...sortedNonCase].slice(0, 5);
    }

    const getNumericId = (slug: string) => {
      const match = slug.match(/\d+/);
      return match ? parseInt(match[0], 10) : 999999;
    };

    const getDifficultyWeight = (diff?: string) => {
      if (diff === "Hard") return 3;
      if (diff === "Medium") return 2;
      if (diff === "Easy") return 1;
      return 0;
    };

    return filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "difficulty") {
        comparison = getDifficultyWeight(b.difficulty) - getDifficultyWeight(a.difficulty);
      } else if (sortBy === "number") {
        const numA = getNumericId(a.slug);
        const numB = getNumericId(b.slug);
        comparison = numA - numB;
      } else if (sortBy === "date") {
        comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        comparison = a.title.localeCompare(b.title);
      }

      if (comparison === 0) {
        comparison = a.title.localeCompare(b.title);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [solutions, searchTerm, activeTab, platformFilter, languageFilter, sortBy, sortOrder]);

  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Profile Header Tabs */}
      <section className="repo-header" style={{ paddingBottom: "0px", marginBottom: "0px" }}>
        <div className="repo-title-row" style={{ fontSize: "16px", marginBottom: "16px" }}>
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--text-secondary)" }}>
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 16.7a.25.25 0 0 1-.4-.2Z"></path>
          </svg>
          <Link href="/cv" className="repo-owner">Thomas_Cook</Link>
          <span>/</span>
          <span className="repo-name">Overview</span>
          <span className="repo-badge">Public</span>
        </div>

        {/* Tab Selection */}
        <div className="github-tabs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`github-tab-btn ${activeTab === "overview" ? "active" : ""}`}
          >
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.64.01 1.13.01 1.3 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"></path>
            </svg>
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("casestudies")}
            className={`github-tab-btn ${activeTab === "casestudies" ? "active" : ""}`}
          >
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 16.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>
            <span>case-studies</span>
            <span className="github-tab-count">{stats.categories["Case Studies"] || 0}</span>
          </button>

          <button
            onClick={() => setActiveTab("challenges")}
            className={`github-tab-btn ${activeTab === "challenges" ? "active" : ""}`}
          >
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 16.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>
            <span>code-challenges &amp; apps</span>
            <span className="github-tab-count">
              {(stats.categories["LeetCode"] || 0) + (stats.categories["Daily Coding Problems"] || 0) + (stats.categories["GreatFrontEnd"] || 0) + DEV_CHALLENGES_APPS.length}
            </span>
          </button>

          <Link href="/cv" className="github-tab-btn" style={{ textDecoration: "none" }}>
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="var(--text-secondary)">
              <path d="M2 3h6a4 4 0 0 1 8 0h6v18H2V3z"></path>
              <path d="M6 8h12"></path>
              <path d="M6 12h12"></path>
              <path d="M6 16h12"></path>
            </svg>
            <span>Resume</span>
          </Link>
        </div>
      </section>

      {activeTab === "overview" && (
        <>
          {/* Profile Feature README Banner */}
          <section className="markdown-card" style={{ marginBottom: "0px" }}>
            <div className="markdown-card-header">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="var(--text-secondary)">
                <path d="M0 1.75c0-.966.784-1.75 1.75-1.75h12.5c.966 0 1.75.784 1.75 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75zM4 4.5a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 4.5zm0 3a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 7.5zm0 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75z"></path>
              </svg>
              <span>README.md</span>
            </div>
            <div className="markdown-card-body markdown-body" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <h1 style={{ borderBottom: "none", margin: 0, fontSize: "24px", color: "var(--text-primary)" }}>
                  Hi there, I&#39;m Thomas Cook 👋
                </h1>
                <p style={{ margin: "8px 0 0 0", color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>
                  <strong>Software Engineer</strong> at <strong>HWM Global</strong> specializing in <strong>C#, .NET Core, ASP.NET Core, SQL Database Optimization, React, TypeScript, and Azure DevOps</strong>.
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <span className="repo-badge" style={{ backgroundColor: "rgba(56, 139, 253, 0.2)", color: "#79c0ff", borderColor: "#388bfd", fontWeight: "600" }}>
                  🏢 Software Engineer @ HWM Global
                </span>
                <span className="repo-badge" style={{ backgroundColor: "rgba(46, 160, 67, 0.2)", color: "#56d364", borderColor: "#2ea043", fontWeight: "600" }}>
                  ⚡ C# / .NET Core / SQL / React
                </span>
              </div>
            </div>
          </section>

        </>
      )}

      {/* Unified Solutions Gallery & Case Studies */}
      <section style={{ display: "flex", flexDirection: "column", gap: "16px", borderTop: activeTab === "overview" ? "1px solid var(--border-color)" : "none", paddingTop: activeTab === "overview" ? "24px" : "0px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "600", color: "var(--text-primary)" }}>
              {activeTab === "overview" && "Top 5 Highlighted Case Studies & Solutions"}
              {activeTab === "casestudies" && "Top Technical Case Studies"}
              {activeTab === "challenges" && "Code Challenges, Algorithms & Full-Stack Apps"}
            </h2>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
              {activeTab === "overview" && "Top 5 curated technical achievements, prioritizing commercial case studies."}
              {activeTab === "casestudies" && "Top 5 technical case studies and architectural implementations."}
              {activeTab === "challenges" && "Filter challenges by platform (LeetCode, Daily Coding, GreatFrontEnd, DevChallenges)."}
            </p>
          </div>

          {activeTab === "challenges" && (
            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              <div className="gh-search-input-wrapper" style={{ margin: 0, width: "180px" }}>
                <input
                  type="text"
                  className="gh-search-input"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ padding: "4px 12px", fontSize: "13px" }}
                />
              </div>
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value as any)}
                className="gh-filter-select"
                style={{ padding: "4px 10px", fontSize: "13px" }}
              >
                <option value="all">All Types &amp; Platforms</option>
                <option value="leetcode">LeetCode ({stats.categories["LeetCode"] || 0})</option>
                <option value="dcp">Daily Coding ({stats.categories["Daily Coding Problems"] || 0})</option>
                <option value="greatfrontend">GreatFrontEnd ({stats.categories["GreatFrontEnd"] || 0})</option>
                <option value="devchallenges">DevChallenges Apps ({DEV_CHALLENGES_APPS.length})</option>
              </select>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="gh-filter-select"
                style={{ padding: "4px 10px", fontSize: "13px" }}
              >
                <option value="all">All Languages</option>
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {formatLanguage(lang)}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="gh-filter-select"
                style={{ padding: "4px 10px", fontSize: "13px" }}
              >
                <option value="difficulty">Sort by Difficulty</option>
                <option value="number">Sort by Number</option>
                <option value="title">Sort by Title</option>
                <option value="date">Sort by Date</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                className="gh-filter-select"
                style={{ padding: "4px 8px", cursor: "pointer", fontSize: "13px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                title={sortOrder === "asc" ? "Sort Ascending" : "Sort Descending"}
              >
                {sortOrder === "asc" ? "▲" : "▼"}
              </button>
            </div>
          )}
        </div>

        <div className="solutions-list">
          {activeTab === "challenges" && platformFilter === "devchallenges" && DEV_CHALLENGES_APPS.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", border: "1px dashed var(--border-color)", borderRadius: "6px" }}>
              <p style={{ margin: "0 0 8px 0", fontWeight: "600", color: "var(--text-primary)", fontSize: "14px" }}>
                No DevChallenges Full-Stack Applications Added Yet
              </p>
              <p style={{ margin: 0, fontSize: "13px" }}>
                Add your project metadata to <code>src/lib/devchallenges.ts</code> when your repositories are ready.
              </p>
            </div>
          ) : (
            <>
              {activeTab === "challenges" && DEV_CHALLENGES_APPS.length > 0 && (platformFilter === "all" || platformFilter === "devchallenges") && (
                DEV_CHALLENGES_APPS.map((app) => (
                  <article key={app.id} className="solution-item" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px",
                    border: "1px solid var(--border-color)",
                    borderRadius: "6px",
                    backgroundColor: "var(--bg-secondary)",
                    marginBottom: "12px",
                    gap: "16px",
                    flexWrap: "wrap"
                  }}>
                    <div className="solution-item-main" style={{ flex: "1", minWidth: "280px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span className="repo-badge" style={{
                          backgroundColor: "rgba(56, 139, 253, 0.2)",
                          color: "#79c0ff",
                          borderColor: "#388bfd",
                          fontSize: "11px",
                          padding: "1px 6px",
                          margin: 0
                        }}>
                          DevChallenges
                        </span>
                        <span className="repo-badge" style={{ fontSize: "11px", padding: "1px 6px" }}>Full-Stack App</span>
                      </div>
                      
                      <h3 style={{ fontSize: "15px", fontWeight: "600", margin: "4px 0" }}>
                        <a href={app.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-secondary)", textDecoration: "none" }}>
                          {app.title} &rarr;
                        </a>
                      </h3>
                      
                      <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "4px 0 8px 0", lineHeight: "1.4" }}>
                        {app.description}
                      </p>

                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                        {app.tags.map((tag) => (
                          <span key={tag} className="solution-item-lang" style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <a href={app.githubUrl} target="_blank" rel="noopener noreferrer" className="profile-edit-btn" style={{ textDecoration: "none", fontSize: "12px" }}>
                        GitHub Repo
                      </a>
                      {app.demoUrl && (
                        <a href={app.demoUrl} target="_blank" rel="noopener noreferrer" className="profile-edit-btn" style={{ textDecoration: "none", fontSize: "12px", color: "var(--accent-secondary)" }}>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </article>
                ))
              )}

              {platformFilter !== "devchallenges" && (finalSolutions.length > 0 ? (
                finalSolutions.map((sol) => {
                  const comp = getComplexityInfo(sol.category, sol.slug, sol);
              const isCaseStudy = sol.category === "casestudies";
              return (
                <article key={sol.id} className="solution-item" style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  border: "1px solid var(--border-color)",
                  borderRadius: "6px",
                  backgroundColor: "var(--bg-secondary)",
                  marginBottom: "12px",
                  gap: "16px",
                  flexWrap: "wrap"
                }}>
                  <div className="solution-item-main" style={{ flex: "1", minWidth: "280px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span className="repo-badge" style={{
                        backgroundColor: isCaseStudy ? "rgba(56, 139, 253, 0.15)" : "rgba(110, 118, 129, 0.1)",
                        color: isCaseStudy ? "#58a6ff" : "var(--text-secondary)",
                        borderColor: isCaseStudy ? "rgba(56, 139, 253, 0.4)" : "var(--border-color)",
                        fontSize: "11px",
                        padding: "1px 6px",
                        margin: 0
                      }}>
                        {sol.categoryLabel}
                      </span>
                      {sol.difficulty && (
                        <span className={`difficulty-badge difficulty-${sol.difficulty.toLowerCase()}`} style={{ fontSize: "11px", padding: "1px 6px" }}>
                          {sol.difficulty}
                        </span>
                      )}
                    </div>
                    
                    <h3 style={{ fontSize: "15px", fontWeight: "600", margin: "4px 0" }}>
                      <Link href={`/solutions/${sol.category}/${sol.slug}`} style={{ color: "var(--accent-secondary)", textDecoration: "none" }}>
                        {sol.title}
                      </Link>
                    </h3>
                    
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "4px 0 8px 0", lineHeight: "1.4" }}>
                      {sol.summary}
                    </p>

                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      {sol.files.map((file) => (
                        <span key={file.name} className="solution-item-lang" style={{ fontSize: "12px", color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <span className={`lang-color-dot ${getLanguageColorClass(file.language)}`}></span>
                          {formatLanguage(file.language)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {comp && (
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "6px",
                      minWidth: "160px",
                      justifyContent: "center"
                    }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <span style={{
                          fontSize: "11px",
                          backgroundColor: "var(--bg-tertiary)",
                          color: "var(--text-primary)",
                          padding: "3px 8px",
                          borderRadius: "12px",
                          border: "1px solid var(--border-color)",
                          fontWeight: "500"
                        }}>
                          {comp.time}
                        </span>
                        <span style={{
                          fontSize: "11px",
                          backgroundColor: "var(--bg-tertiary)",
                          color: "var(--text-primary)",
                          padding: "3px 8px",
                          borderRadius: "12px",
                          border: "1px solid var(--border-color)",
                          fontWeight: "500"
                        }}>
                          {comp.space}
                        </span>
                      </div>
                      <span style={{
                        fontSize: "11px",
                        color: "var(--color-success-fg)",
                        fontWeight: "600",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                        ⚡ {comp.label}
                      </span>
                    </div>
                  )}
                </article>
              );
            })
          ) : (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)", border: "1px dashed var(--border-color)", borderRadius: "6px" }}>
              <p>No solutions match your search or filter criteria.</p>
            </div>
          ))}
            </>
          )}
        </div>
      </section>

      {/* Core Competency Matrix under the solutions list on Overview tab */}
      {activeTab === "overview" && (
        <section className="markdown-card" style={{ marginTop: "24px", marginBottom: "0px", width: "100%" }}>
          <div className="markdown-card-header">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="var(--text-secondary)">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"></path>
            </svg>
            <span>Core Competency Matrix</span>
          </div>
          <div className="markdown-card-body" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px", backgroundColor: "var(--bg-secondary)" }}>
            <svg width="220" height="220" viewBox="0 0 220 220" style={{ overflow: "visible" }}>
              <circle cx="110" cy="110" r="90" fill="none" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="110" cy="110" r="60" fill="none" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="110" cy="110" r="30" fill="none" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="3,3" />
              
              <line x1="110" y1="20" x2="110" y2="200" stroke="var(--border-color)" strokeWidth="1" />
              <line x1="20" y1="110" x2="200" y2="110" stroke="var(--border-color)" strokeWidth="1" />

              <polygon
                points={`110,${radarPoints.n} ${radarPoints.e},110 110,${radarPoints.s} ${radarPoints.w},110`}
                fill="rgba(57, 211, 83, 0.15)"
                stroke="#39d353"
                strokeWidth="2"
              />

              <line x1="110" y1={radarPoints.n} x2="110" y2={radarPoints.s} stroke="#39d353" strokeWidth="1" />
              <line x1={radarPoints.w} y1="110" x2={radarPoints.e} y2="110" stroke="#39d353" strokeWidth="1" />

              <circle cx="110" cy={radarPoints.n} r="4" fill="#ffffff" stroke="#39d353" strokeWidth="1.5" />
              <circle cx={radarPoints.e} cy="110" r="4" fill="#ffffff" stroke="#39d353" strokeWidth="1.5" />
              <circle cx="110" cy={radarPoints.s} r="4" fill="#ffffff" stroke="#39d353" strokeWidth="1.5" />
              <circle cx={radarPoints.w} cy="110" r="4" fill="#ffffff" stroke="#39d353" strokeWidth="1.5" />

              <text x="110" y="10" textAnchor="middle" fill="var(--text-primary)" fontSize="10.5" fontWeight="600">{radarSkills[0].percentage}% {radarSkills[0].name}</text>
              <text x="200" y="113" textAnchor="start" fill="var(--text-primary)" fontSize="10.5" fontWeight="600">{radarSkills[1].percentage}% {radarSkills[1].name}</text>
              <text x="110" y="212" textAnchor="middle" fill="var(--text-primary)" fontSize="10.5" fontWeight="600">{radarSkills[2].percentage}% {radarSkills[2].name}</text>
              <text x="25" y="113" textAnchor="end" fill="var(--text-primary)" fontSize="10.5" fontWeight="600">{radarSkills[3].percentage}% {radarSkills[3].name}</text>
            </svg>
          </div>
        </section>
      )}

    </div>
  );
}
