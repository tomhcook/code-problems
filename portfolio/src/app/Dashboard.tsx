"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Solution } from "../lib/solutions";

interface CVSkill {
  name: string;
  level: string;
  percentage: number;
}

interface DashboardProps {
  solutions: Solution[];
  cvSkills: CVSkill[];
}

export default function Dashboard({ solutions, cvSkills }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "dcp" | "leetcode">("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");

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

  // Filter solutions
  const filteredSolutions = useMemo(() => {
    return solutions.filter((sol) => {
      const matchesSearch =
        sol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sol.readme.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory =
        activeTab === "overview" ||
        (activeTab === "dcp" && sol.category === "dailycodingproblems") ||
        (activeTab === "leetcode" && sol.category === "leetcode");

      const matchesLanguage =
        languageFilter === "all" ||
        sol.files.some((file) => file.language === languageFilter);

      return matchesSearch && matchesCategory && matchesLanguage;
    });
  }, [solutions, searchTerm, languageFilter, activeTab]);

  // Dynamically compute the top 4 skills for the radar graph
  const radarSkills = useMemo(() => {
    const defaultRadar = [
      { name: "Backend Dev", percentage: 95 },
      { name: "Full Stack Web", percentage: 90 },
      { name: "Databases", percentage: 90 },
      { name: "Mobile Dev", percentage: 80 }
    ];

    if (!cvSkills || cvSkills.length < 4) return defaultRadar;

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

    solutions.forEach((sol) => {
      if (sol.category === "dailycodingproblems") {
        sol.files.forEach((file) => dcpLangs.add(formatLanguage(file.language)));
      } else if (sol.category === "leetcode") {
        sol.files.forEach((file) => leetLangs.add(formatLanguage(file.language)));
      }
    });

    return {
      dcp: Array.from(dcpLangs).join(" / ") || "C# / C++ / Python",
      leetcode: Array.from(leetLangs).join(" / ") || "Python / C# / C++"
    };
  }, [solutions]);

  const [filterType, setFilterType] = useState<"all" | "solutions" | "casestudies">("all");

  const getComplexityInfo = (category: string, slug: string) => {
    const s = slug.toLowerCase();
    const c = category.toLowerCase();
    if (c === "leetcode" && s.includes("twosum")) {
      return { time: "O(N) Time", space: "O(N) Space", label: "Optimal Approach" };
    }
    if (c === "dailycodingproblems" && s.includes("1288")) {
      return { time: "O(N) Time", space: "O(1) Space", label: "Optimal Traversal" };
    }
    if (c === "casestudies" && s.includes("internal-product-suite")) {
      return { time: "Lead Architect", space: "Revenue-Generating", label: "System Design Showcase" };
    }
    return null;
  };

  const finalSolutions = useMemo(() => {
    return solutions.filter((sol) => {
      const matchesSearch =
        sol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sol.readme.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter =
        filterType === "all" ||
        (filterType === "solutions" && sol.category !== "casestudies") ||
        (filterType === "casestudies" && sol.category === "casestudies");

      return matchesSearch && matchesFilter;
    });
  }, [solutions, searchTerm, filterType]);

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
          <span className="repo-name">code-problems</span>
          <span className="repo-badge">Public</span>
        </div>

        {/* Tab Selection */}
        <div className="github-tabs">
          <button className="github-tab-btn active">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.64.01 1.13.01 1.3 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"></path>
            </svg>
            <span>Overview</span>
          </button>

          <Link href="/cv" className="github-tab-btn" style={{ textDecoration: "none" }}>
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="var(--text-secondary)">
              <path d="M2 3h6a4 4 0 0 1 8 0h6v18H2V3z"></path>
              <path d="M6 8h12"></path>
              <path d="M6 12h12"></path>
              <path d="M6 16h12"></path>
            </svg>
            <span>Interactive Resume / CV</span>
          </Link>
        </div>
      </section>

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
            <h2 style={{ marginTop: 0, fontSize: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              Hi, I'm Thomas Cook <span className="wave-emoji">👋</span>
            </h2>
            <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-primary)", margin: "8px 0 16px 0" }}>
              A highly accomplished, fast-track Software Engineer &amp; Full Stack Developer. I build core backend service architectures in <strong>C# / .NET Core</strong>, cross-platform mobile systems with <strong>.NET MAUI</strong>, and interactive responsive web applications using <strong>React, TypeScript, Angular, and Node.js</strong>.
            </p>
          </div>

          <div>
            <Link href="/cv" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "var(--color-success)",
              color: "#ffffff",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              border: "1px solid rgba(240, 246, 252, 0.1)",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2ea043"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "var(--color-success)"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              View Professional CV / Career Resume &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Two-Column Grid: Pinned Repos (Left) and Radar Chart (Right) */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px" }} className="layout-grid">
        
        {/* Pinned Repos / Spotlight info */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "600" }}>Featured Commercial Focus</h2>
          
          <Link href="/solutions/casestudies/internal-product-suite" className="pinned-card" style={{ cursor: "pointer", textDecoration: "none" }}>
            <div>
              <div className="pinned-card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--accent-secondary)", fontWeight: "600" }}>internal-product-development</span>
                <span className="repo-badge" style={{ margin: 0, padding: "1px 6px" }}>Spotlight</span>
              </div>
              <p className="pinned-card-desc">
                Designed, architected, and built a custom internal product from the ground up. This software solution successfully streamlined key operations and is actively generating new revenue streams for the business.
              </p>
            </div>
            <div className="pinned-card-meta">
              <span className="language-indicator">
                <span className="language-color-circle lang-color-ruby"></span>
                Ruby / SQL / Docker / Azure MSSQL
              </span>
            </div>
          </Link>

          <div className="pinned-card" style={{ cursor: "default" }}>
            <div>
              <div className="pinned-card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--accent-secondary)", fontWeight: "600" }}>systems-integration-optimization</span>
              </div>
              <p className="pinned-card-desc">
                Reduced API response times by 60% through targeted MSSQL query path and caching optimizations. Integrated carrier endpoints (UPS, DHL) and generative AI content routing.
              </p>
            </div>
            <div className="pinned-card-meta">
              <span className="language-indicator">
                <span className="language-color-circle lang-color-default"></span>
                Backend Systems
              </span>
            </div>
          </div>
        </section>

        {/* SVG Skills Radar Graph */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: "600" }}>Technical Focus</h2>
          <div className="gh-card" style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "260px" }}>
            <svg width="220" height="220" viewBox="0 0 220 220" style={{ overflow: "visible" }}>
              <line x1="110" y1="20" x2="110" y2="200" stroke="#30363d" strokeWidth="1" />
              <line x1="20" y1="110" x2="200" y2="110" stroke="#30363d" strokeWidth="1" />
              
              <polygon points="110,20 200,110 110,200 20,110" fill="none" stroke="#21262d" strokeWidth="1" />
              <polygon points="110,65 155,110 110,155 65,110" fill="none" stroke="#21262d" strokeWidth="1" />
              
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

              <text x="110" y="10" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">{radarSkills[0].percentage}% {radarSkills[0].name}</text>
              <text x="200" y="113" textAnchor="start" fill="var(--text-primary)" fontSize="10" fontWeight="600">{radarSkills[1].percentage}% {radarSkills[1].name}</text>
              <text x="110" y="212" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600">{radarSkills[2].percentage}% {radarSkills[2].name}</text>
              <text x="25" y="113" textAnchor="end" fill="var(--text-primary)" fontSize="10" fontWeight="600">{radarSkills[3].percentage}% {radarSkills[3].name}</text>
            </svg>
          </div>
        </section>

      </div>

      {/* Unified Solutions Gallery & Case Studies */}
      <section style={{ display: "flex", flexDirection: "column", gap: "16px", borderTop: "1px solid var(--border-color)", paddingTop: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "600", color: "var(--text-primary)" }}>Technical Case Studies &amp; Problem Solving</h2>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>Deep-dives into commercial projects and algorithm implementations.</p>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button 
              onClick={() => setFilterType("all")} 
              className="gh-filter-select"
              style={{
                backgroundColor: filterType === "all" ? "var(--bg-tertiary)" : "transparent",
                borderColor: "var(--border-color)",
                color: filterType === "all" ? "var(--text-primary)" : "var(--text-secondary)",
                padding: "4px 10px",
                cursor: "pointer"
              }}
            >
              All ({solutions.length})
            </button>
            <button 
              onClick={() => setFilterType("casestudies")} 
              className="gh-filter-select"
              style={{
                backgroundColor: filterType === "casestudies" ? "var(--bg-tertiary)" : "transparent",
                borderColor: "var(--border-color)",
                color: filterType === "casestudies" ? "var(--text-primary)" : "var(--text-secondary)",
                padding: "4px 10px",
                cursor: "pointer"
              }}
            >
              Case Studies ({solutions.filter(s => s.category === "casestudies").length})
            </button>
            <button 
              onClick={() => setFilterType("solutions")} 
              className="gh-filter-select"
              style={{
                backgroundColor: filterType === "solutions" ? "var(--bg-tertiary)" : "transparent",
                borderColor: "var(--border-color)",
                color: filterType === "solutions" ? "var(--text-primary)" : "var(--text-secondary)",
                padding: "4px 10px",
                cursor: "pointer"
              }}
            >
              Coding Challenges ({solutions.filter(s => s.category !== "casestudies").length})
            </button>
          </div>
        </div>

        <div className="solutions-list">
          {finalSolutions.length > 0 ? (
            finalSolutions.map((sol) => {
              const comp = getComplexityInfo(sol.category, sol.slug);
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
                      <h3 className="solution-item-title" style={{ margin: 0 }}>
                        <Link href={`/solutions/${sol.category}/${sol.slug}`} style={{ textDecoration: "none", color: "var(--accent-secondary)", fontWeight: "600" }}>
                          {sol.title}
                        </Link>
                      </h3>
                    </div>
                    <p className="solution-item-desc" style={{ margin: "6px 0 8px 0", color: "var(--text-secondary)", fontSize: "13px" }}>
                      {sol.summary}
                    </p>
                    <div className="solution-item-meta" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      {sol.files.map((file) => (
                        <span key={file.name} className="language-indicator" style={{ fontSize: "12px" }}>
                          <span className={`language-color-circle ${getLanguageColorClass(file.language)}`}></span>
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
          )}
        </div>
      </section>

    </div>
  );
}
