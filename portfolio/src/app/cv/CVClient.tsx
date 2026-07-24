"use client";

import React, { useState } from "react";
import { Solution } from "../../lib/solutions";

interface CVSkill {
  name: string;
  level: string;
  percentage: number;
}

interface CVClientProps {
  solutions: Solution[];
  cvSkills: CVSkill[];
}

const allMatrixSkills = [
  // Languages & Backend
  { name: "C#", short: "C#", level: "Advanced", desc: "Core language for enterprise systems", color: "#39d353", cat: "Backend & Languages", targetCat: "backend", roles: ["hwm", "ingenta", "personal"] },
  { name: ".NET Core", short: ".NET", level: "Advanced", desc: "ASP.NET Core APIs and workers", color: "#39d353", cat: "Backend & Languages", targetCat: "backend", roles: ["hwm", "ingenta", "personal"] },
  { name: "ASP.NET Core", short: "ASP.NET", level: "Advanced", desc: "Web APIs & Microservices", color: "#39d353", cat: "Backend & Languages", targetCat: "backend", roles: ["hwm", "personal"] },
  { name: "Python", short: "Python", level: "Advanced", desc: "Data processing and scripts", color: "#26a641", cat: "Backend & Languages", targetCat: "backend", roles: ["hwm", "dg", "personal"] },
  { name: "Ruby", short: "Ruby", level: "Proficient", desc: "API services & scripting", color: "#006d21", cat: "Backend & Languages", targetCat: "backend", roles: ["hwm", "personal"] },
  { name: "C++", short: "C++", level: "Proficient", desc: "Algorithm execution & systems", color: "#006d21", cat: "Backend & Languages", targetCat: "backend", roles: ["personal"] },
  { name: "REST APIs", short: "APIs", level: "Advanced", desc: "Secure endpoints & serialization", color: "#39d353", cat: "Backend & Languages", targetCat: "backend", roles: ["hwm", "dg", "ingenta", "personal"] },

  // Frontend & Web
  { name: "React", short: "React", level: "Advanced", desc: "Interactive UI applications", color: "#26a641", cat: "Frontend & Web", targetCat: "web", roles: ["hwm", "personal"] },
  { name: "TypeScript", short: "TS", level: "Advanced", desc: "Type-safe web interfaces", color: "#26a641", cat: "Frontend & Web", targetCat: "web", roles: ["hwm", "dg", "personal"] },
  { name: "Angular 17", short: "Angular", level: "Advanced", desc: "Enterprise frontend systems", color: "#26a641", cat: "Frontend & Web", targetCat: "web", roles: ["dg", "personal"] },
  { name: "Node.js", short: "Node", level: "Advanced", desc: "Serverless functions & scripts", color: "#26a641", cat: "Frontend & Web", targetCat: "web", roles: ["hwm", "dg", "personal"] },
  { name: "JavaScript", short: "JS", level: "Advanced", desc: "Interactive client behaviors", color: "#26a641", cat: "Frontend & Web", targetCat: "web", roles: ["hwm", "dg", "personal"] },

  // Databases & Cache
  { name: "MSSQL", short: "MSSQL", level: "Advanced", desc: "Relational database models", color: "#39d353", cat: "Databases & Storage", targetCat: "databases", roles: ["hwm", "dg", "ingenta", "personal"] },
  { name: "SQL Tuning", short: "SQL", level: "Advanced", desc: "Query paths and index structures", color: "#39d353", cat: "Databases & Storage", targetCat: "databases", roles: ["hwm", "dg", "ingenta", "personal"] },
  { name: "Redis Caching", short: "Redis", level: "Proficient", desc: "High frequency state caching", color: "#006d21", cat: "Databases & Storage", targetCat: "databases", roles: ["hwm", "personal"] },
  { name: "Entity Framework", short: "EF", level: "Advanced", desc: "ORM data access and migration", color: "#39d353", cat: "Databases & Storage", targetCat: "databases", roles: ["hwm", "personal"] },

  // Mobile & AI
  { name: ".NET MAUI", short: "MAUI", level: "Proficient", desc: "Cross-platform mobile systems", color: "#006d21", cat: "Mobile & AI", targetCat: "mobile", roles: ["hwm", "personal"] },
  { name: "Android SDK", short: "Android", level: "Proficient", desc: "API migrations & store compliance", color: "#006d21", cat: "Mobile & AI", targetCat: "mobile", roles: ["hwm", "personal"] },
  { name: "Generative AI", short: "GenAI", level: "Proficient", desc: "LLM integration & content routing", color: "#006d21", cat: "Mobile & AI", targetCat: "backend", roles: ["hwm", "dg", "personal"] },
  { name: "Machine Learning", short: "ML", level: "Familiar", desc: "Dissertation predictive models", color: "#0e4429", cat: "Mobile & AI", targetCat: "backend", roles: ["hwm", "personal"] },

  // DevOps & DevOps Infrastructure
  { name: "Docker", short: "Docker", level: "Proficient", desc: "Containerized environments", color: "#006d21", cat: "DevOps & Tools", targetCat: "cloud", roles: ["hwm", "personal"] },
  { name: "Azure DevOps", short: "Azure", level: "Proficient", desc: "CI/CD build/release pipelines", color: "#006d21", cat: "DevOps & Tools", targetCat: "cloud", roles: ["hwm", "personal"] },
  { name: "AWS Lambda", short: "AWS", level: "Proficient", desc: "Serverless integration components", color: "#006d21", cat: "DevOps & Tools", targetCat: "cloud", roles: ["dg", "ingenta", "personal"] },
  { name: "CI/CD Pipelines", short: "CI/CD", level: "Proficient", desc: "Continuous integration workflows", color: "#006d21", cat: "DevOps & Tools", targetCat: "cloud", roles: ["hwm", "dg", "ingenta", "personal"] },
  { name: "Datadog", short: "Ddog", level: "Proficient", desc: "APM tracing, metrics, and dashboards", color: "#006d21", cat: "DevOps & Tools", targetCat: "cloud", roles: ["hwm", "personal"] },
  { name: "Git", short: "Git", level: "Advanced", desc: "PR flows and version control", color: "#26a641", cat: "DevOps & Tools", targetCat: "cloud", roles: ["hwm", "dg", "ingenta", "personal"] },

  // Methodologies & Testing
  { name: "Shape Up", short: "ShapeUp", level: "Advanced", desc: "Product cycle execution", color: "#39d353", cat: "Methodologies & QA", targetCat: "lead", roles: ["hwm", "personal"] },
  { name: "Agile / Scrum", short: "Agile", level: "Advanced", desc: "Sprint execution & backlogs", color: "#39d353", cat: "Methodologies & QA", targetCat: "lead", roles: ["hwm", "ingenta", "personal"] },
  { name: "xUnit Testing", short: "xUnit", level: "Proficient", desc: "Automated test suite coverage", color: "#006d21", cat: "Methodologies & QA", targetCat: "mobile", roles: ["hwm", "personal"] },
  { name: "Postman", short: "Postman", level: "Advanced", desc: "API testing & integration checks", color: "#26a641", cat: "Methodologies & QA", targetCat: "web", roles: ["hwm", "dg", "personal"] }
];

export default function CVClient({ solutions, cvSkills }: CVClientProps) {
  const [activeHat, setActiveHat] = useState("all");
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null);
  const [highlightedSkillName, setHighlightedSkillName] = useState<string | null>(null);
  const [activeSkillHover, setActiveSkillHover] = useState<string | null>(null);
  const [highlightedTimelineId, setHighlightedTimelineId] = useState<string | null>(null);

  const triggerTimelineScroll = (id: string) => {
    setHighlightedTimelineId(id);
    const element = document.getElementById(`timeline-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => {
      setHighlightedTimelineId((current) => current === id ? null : current);
    }, 2500);
  };

  const categorizedMatrixSkills = React.useMemo(() => {
    const groups: Record<string, typeof allMatrixSkills> = {};
    allMatrixSkills.forEach((item) => {
      if (!groups[item.cat]) {
        groups[item.cat] = [];
      }
      groups[item.cat].push(item);
    });
    return groups;
  }, []);

  const getLanguageColorClass = (lang: string) => {
    if (lang === "csharp") return "lang-color-csharp";
    if (lang === "typescript") return "lang-color-typescript";
    return "lang-color-default";
  };

  const triggerHighlight = (category: string, skillName?: string) => {
    setHighlightedCategory(category);
    if (skillName) {
      setHighlightedSkillName(skillName);
    }

    // Scroll to the timeline item where the skill is used
    const skillItem = allMatrixSkills.find((s) => s.name === skillName);
    if (skillItem && skillItem.roles && skillItem.roles.length > 0) {
      const order = ["hwm", "dg", "ingenta", "personal"];
      const targetRole = order.find((roleId) => skillItem.roles.includes(roleId));
      if (targetRole) {
        const element = document.getElementById(`timeline-${targetRole}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    } else {
      const element = document.getElementById("professional-experience");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    // Reset highlight after 3.5 seconds
    setTimeout(() => {
      setHighlightedCategory((current) => current === category ? null : current);
      if (skillName) {
        setHighlightedSkillName((current) => current === skillName ? null : current);
      }
    }, 3500);
  };

  const isBulletHighlighted = (bulletSkills: string[], category: string) => {
    if (activeSkillHover) {
      return bulletSkills.includes(activeSkillHover);
    }
    if (highlightedSkillName) {
      return bulletSkills.includes(highlightedSkillName);
    }
    return highlightedCategory === category;
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const highlight = params.get("highlight");
      if (highlight) {
        setTimeout(() => {
          triggerHighlight(highlight);
        }, 300);
      }
    }
  }, []);

  const isProd = process.env.NODE_ENV === "production";
  const cvPdfPath = isProd ? "/code-problems/Thomas_Cook_CV.pdf" : "/Thomas_Cook_CV.pdf";

  return (
    <div className="container">
      {/* Action Buttons Header */}
      <div className="cv-actions" style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginBottom: "16px" }}>
        <a
          href={cvPdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-edit-btn"
          style={{
            width: "auto",
            margin: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none"
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 8 0h6v18H2V3z"></path>
            <path d="M6 8h12"></path>
            <path d="M6 12h12"></path>
            <path d="M6 16h12"></path>
          </svg>
          View PDF
        </a>

        <a
          href={cvPdfPath}
          download="Thomas_Cook_CV.pdf"
          className="profile-edit-btn"
          style={{
            width: "auto",
            margin: 0,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download PDF
        </a>
      </div>

      <div className="profile-layout">

        {/* Left Sidebar: GitHub Profile Info & Achievements */}
        <aside className="profile-sidebar">
          <div className="profile-avatar-container">
            <div className="profile-avatar" style={{ overflow: "hidden" }}>
              <img 
                src="https://media.licdn.com/dms/image/v2/D4E03AQFHVzNHJljAnw/profile-displayphoto-scale_400_400/B4EZ.PYwdcGgAg-/0/1784817061315?e=1786579200&v=beta&t=CF11sK9kk0Z1RGCtwGGrmjM9xWxa-TQRaqreTJc5RU4" 
                alt="Thomas Cook" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>
          </div>
          <h1 className="profile-name" style={{ fontSize: "22px" }}>Thomas Cook</h1>
          <div className="profile-username" style={{ fontSize: "16px", marginBottom: "8px" }}>tomhcook</div>
          <div className="profile-bio" style={{ fontSize: "13px", marginBottom: "16px" }}>
            Fast-track Software Engineer &amp; Full Stack Developer. Building scalable .NET backend architectures, mobile Android products, and interactive web applications.
          </div>

          <button className="profile-edit-btn" onClick={() => window.open("https://www.linkedin.com/in/thomas-cook-se/", "_blank")}>
            Follow
          </button>

          <ul className="profile-details-list" style={{ marginBottom: "24px" }}>
            <li className="profile-detail-item">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2zM1.5 12.25c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V6.03L8.17 9.87a.75.75 0 0 1-.84 0L1.5 6.03v6.22zM1.5 4.397v.528l6 3.843 6-3.843v-.528a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25z"></path>
              </svg>
              <a href="mailto:thomascook0404@outlook.com">thomascook0404@outlook.com</a>
            </li>
            <li className="profile-detail-item">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                <path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .75.75 0 0 0-1.06 1.06 5 5 0 0 0 7.07 0l2.5-2.5a5 5 0 0 0-7.07-7.07l-1.25 1.25zm-4.2 4.2a.75.75 0 0 0-1.06-1.06l-1.25 1.25a5 5 0 0 0 7.07 7.07l2.5-2.5a5 5 0 0 0-7.07-7.07l-1.25 1.25a.75.75 0 1 0 1.06 1.06l1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0z"></path>
              </svg>
              <a href="https://www.linkedin.com/in/thomas-cook-se/" target="_blank" rel="noopener noreferrer">linkedin.com/in/thomas-cook-se</a>
            </li>
            <li className="profile-detail-item">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                <path d="M11.536 3.464a5 5 0 0 0-7.072 0L1.646 6.282a1 1 0 0 0 0 1.436L4.464 10.54a5 5 0 0 0 7.072 0l2.818-2.818a1 1 0 0 0 0-1.436zM3.757 5.586l2.819-2.819a3.5 3.5 0 0 1 4.949 0l2.819 2.819a1 1 0 0 1 0 1.414l-2.819 2.819a3.5 3.5 0 0 1-4.949 0L3.757 7a1 1 0 0 1 0-1.414zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
              </svg>
              <span>Lincoln, GB</span>
            </li>
          </ul>

          {/* GitHub Style Achievements Widget populated from CV */}
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "var(--text-primary)" }}>Achievements</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {cvSkills.map((skill, index) => {
                const emojis = ["⚡", "🌐", "🤖", "📱", "👥", "⚙️", "🚀"];
                const emoji = emojis[index % emojis.length];
                return (
                  <div key={skill.name} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "20px" }} title={skill.name}>{emoji}</span>
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                      {skill.name.split("(")[0].trim()} ({skill.level})
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Section: GitHub Profile Repositories & Activity */}
        <main className="profile-main">

          {/* README Profile Box */}
          <section className="markdown-card" style={{ marginBottom: "24px" }}>
            <div className="markdown-card-header">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="var(--text-secondary)">
                <path d="M0 1.75c0-.966.784-1.75 1.75-1.75h12.5c.966 0 1.75.784 1.75 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75zM4 4.5a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 4.5zm0 3a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 7.5zm0 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75z"></path>
              </svg>
              <span>README.md</span>
            </div>
            <div className="markdown-card-body markdown-body">
              <h2 style={{ marginTop: 0, fontSize: "18px" }}>Thomas Cook — Full Stack Software Engineer</h2>
              <p>Highly motivated, fast-track Software Engineer specialized in backend systems architecture, Web APIs, SQL database optimization, and modern React/TypeScript/Angular applications.</p>
              <p><strong>Core Strengths:</strong></p>
              <ul>
                <li className={highlightedCategory === "backend" ? "highlight-glow" : ""} style={{ transition: "all 0.3s ease" }}>Developing high-throughput endpoints using ASP.NET Core &amp; C#.</li>
                <li className={highlightedCategory === "web" ? "highlight-glow" : ""} style={{ transition: "all 0.3s ease" }}>Designing robust web interfaces using React, TypeScript, Angular, and Node.js.</li>
                <li className={highlightedCategory === "databases" ? "highlight-glow" : ""} style={{ transition: "all 0.3s ease" }}>Designing relational databases, tuning indexes, and resolving query performance issues.</li>
                <li className={highlightedCategory === "backend" ? "highlight-glow" : ""} style={{ transition: "all 0.3s ease" }}>Integrating third-party APIs (payment processors, global carriers) and cloud services (AWS Lambda, Azure DevOps).</li>
                <li className={highlightedCategory === "backend" ? "highlight-glow" : ""} style={{ transition: "all 0.3s ease" }}>Implementing business intelligence models and automated LLM-driven automation tasks.</li>
              </ul>
            </div>
          </section>

          {/* Pinned Repositories / Technical Skills Section */}
          <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>Pinned Skills</h2>
          <section className="pinned-grid" style={{ marginBottom: "24px" }}>
            {cvSkills.slice(0, 4).map((skill) => {
              let lang = "default";
              let category = "backend";
              if (skill.name.toLowerCase().includes("c#") || skill.name.toLowerCase().includes("backend")) {
                lang = "csharp";
                category = "backend";
              }
              else if (skill.name.toLowerCase().includes("react") || skill.name.toLowerCase().includes("typescript") || skill.name.toLowerCase().includes("web")) {
                lang = "typescript";
                category = "web";
              }
              else if (skill.name.toLowerCase().includes("sql") || skill.name.toLowerCase().includes("database") || skill.name.toLowerCase().includes("databases")) {
                lang = "default";
                category = "databases";
              }
              else if (skill.name.toLowerCase().includes("mobile") || skill.name.toLowerCase().includes("maui")) {
                lang = "csharp";
                category = "mobile";
              }

              const langColorClass = getLanguageColorClass(lang);
              const displayLang = lang === "csharp" ? "C#" : lang === "typescript" ? "TypeScript" : "SQL";

              let desc = `Professional level skills in ${skill.name} rated at ${skill.percentage}%.`;
              if (skill.name.includes("Backend")) desc = "Advanced experience building REST APIs, background workers, and systems integrations using C# and .NET.";
              else if (skill.name.includes("Web")) desc = "Developing responsive frontends and customer integrations using React, TypeScript, Angular, and Node.js.";
              else if (skill.name.includes("Databases")) desc = "Relational database design, query writing, schema migration, index tuning, and performance optimizations.";
              else if (skill.name.includes("Mobile")) desc = "Shipping cross-platform mobile apps for Android devices via .NET MAUI integrated with core backends.";

              return (
                <div
                  key={skill.name}
                  className="pinned-card"
                  style={{ cursor: "pointer" }}
                  onClick={() => triggerHighlight(category)}
                >
                  <div>
                    <div className="pinned-card-title">
                      <span style={{ color: "var(--accent-secondary)", fontWeight: "600" }}>{skill.name.toLowerCase().replace(/\s+/g, "-").replace(/[\(\)\/]/g, "")}</span>
                    </div>
                    <p className="pinned-card-desc">{desc}</p>
                  </div>
                  <div className="pinned-card-meta">
                    <span className="language-indicator">
                      <span className={`language-color-circle ${langColorClass}`}></span>
                      {displayLang}
                    </span>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Professional Work Experience Timeline */}
          <div id="professional-experience" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "600" }}>Professional Experience</h2>

            {/* Hats filtering */}
            <div className="hats-toggle cv-actions" style={{ display: "flex", gap: "6px" }}>
              <select
                value={activeHat}
                onChange={(e) => setActiveHat(e.target.value)}
                className="gh-filter-select"
                style={{ padding: "2px 8px", fontSize: "12px" }}
              >
                <option value="all">All Roles</option>
                <option value="web">🌐 Web &amp; Full Stack</option>
                <option value="maui">📱 Mobile &amp; MAUI</option>
                <option value="backend">⚙️ Backend &amp; DB</option>
                <option value="cloud">☁️ Cloud &amp; DevOps</option>
                <option value="lead">👥 Team Lead</option>
              </select>
            </div>
          </div>

          <section className="timeline">

            {/* HWM Global */}
            <div id="timeline-hwm" className="timeline-item active" style={{ boxShadow: highlightedTimelineId === "hwm" ? "0 0 15px rgba(57, 211, 83, 0.4)" : undefined, transition: "box-shadow 0.3s ease" }}>
              <div className="timeline-item-header">
                <div>
                  <span className="timeline-title">Software Engineer</span>
                  <span> at </span>
                  <span className="timeline-org">HWM Global</span>
                </div>
                <span className="timeline-date">Jun 2025 — Present</span>
              </div>
              <div className="timeline-desc">
                <ul style={{ listStyleType: "disc" }}>
                  {(activeHat === "all" || activeHat === "lead" || activeHat === "backend") && (
                    <li className={`skill-target-lead skill-target-backend ${isBulletHighlighted(["C#", ".NET Core", "ASP.NET Core", "Docker", "Azure DevOps", "MSSQL", "SQL Tuning", "Entity Framework", "REST APIs", "Git", "Agile / Scrum"], "backend") ? "highlight-glow" : ""}`}>
                      <strong>[Product Development]</strong> Designed and delivered a custom proprietary internal product from the ground up, resulting in streamlined business operations and new revenue generation, by architecting the full-stack solution using C#, Docker, SQL, and Azure cloud services.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "backend") && (
                    <li className={`skill-target-backend skill-target-databases ${isBulletHighlighted(["MSSQL", "SQL Tuning", "Redis Caching", "Datadog"], "backend") ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Reduced API response times by 60% across 9 Shape Up cycles, as measured by Datadog latency monitoring, by actively refactoring internal API endpoints, resolving production bugs, tuning MSSQL query paths and database indexes, and introducing caching layers across 50+ merged PRs.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "maui" || activeHat === "web") && (
                    <li className={`skill-target-mobile skill-target-web ${isBulletHighlighted([".NET MAUI", "Android SDK", "xUnit Testing"], "mobile") ? "highlight-glow" : ""}`}>
                      <strong>[Mobile &amp; Web]</strong> Ensured continued Android store compliance and platform compatibility, as validated by passing automated test suites, by migrating a cross-platform .NET MAUI mobile application from Android 15 to Android 16 (SDK 36) and writing xUnit test coverage.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "backend") && (
                    <li className={`skill-target-backend ${isBulletHighlighted(["ASP.NET Core", "MSSQL", "SQL Tuning", "REST APIs"], "backend") ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Improved production system reliability and data-driven workflow support, as demonstrated by reduced incident rates, by building backend services and web APIs using ASP.NET Core and MSSQL.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "backend") && (
                    <li className={`skill-target-backend ${isBulletHighlighted(["C#", ".NET Core", "MSSQL", "Docker"], "backend") ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Made key technical decisions on architecture, database models, and service integration across the HWM Global platform.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "cloud") && (
                    <li className={`skill-target-cloud ${isBulletHighlighted(["Azure DevOps", "CI/CD Pipelines"], "cloud") ? "highlight-glow" : ""}`}>
                      <strong>[Cloud &amp; DevOps]</strong> Held full deployment responsibility, managing Azure DevOps CI/CD build and release pipelines for active production.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "web") && (
                    <li className={`skill-target-web ${isBulletHighlighted(["React", "TypeScript", "JavaScript", "REST APIs"], "web") ? "highlight-glow" : ""}`}>
                      <strong>[Web &amp; Full Stack]</strong> Decreased client-facing tickets by 20% and accelerated bug-fixing cycles across 6+ products by implementing custom React UI enhancements, integrating Microsoft Clarity tracking, and developing a compliant cookie consent banner across both frontend and backend architectures.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "lead") && (
                    <li className={`skill-target-lead ${isBulletHighlighted(["Shape Up", "Agile / Scrum"], "lead") ? "highlight-glow" : ""}`}>
                      <strong>[Team Lead]</strong> Kept engineering delivery on schedule during a leadership gap, as measured by sprint completion rates, by stepping in as temporary Team Lead to coordinate the backlog and run daily standups.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Digital Genius */}
            <div id="timeline-dg" className="timeline-item" style={{ boxShadow: highlightedTimelineId === "dg" ? "0 0 15px rgba(57, 211, 83, 0.4)" : undefined, transition: "box-shadow 0.3s ease" }}>
              <div className="timeline-item-header">
                <div>
                  <span className="timeline-title">Solutions Engineer</span>
                  <span> at </span>
                  <span className="timeline-org">Digital Genius</span>
                </div>
                <span className="timeline-date">Oct 2024 — Jun 2025</span>
              </div>
              <div className="timeline-desc">
                <ul style={{ listStyleType: "disc" }}>
                  {(activeHat === "all" || activeHat === "web") && (
                    <li className={`skill-target-web ${isBulletHighlighted(["Node.js", "Angular 17", "TypeScript", "JavaScript"], "web") ? "highlight-glow" : ""}`}>
                      <strong>[Web &amp; Full Stack]</strong> Delivered customer-facing integration solutions, as measured by successful client deployments, by building interactive frontends and backend connectors using Node.js, Angular 17, TypeScript, and JavaScript.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "backend" || activeHat === "web" || activeHat === "cloud") && (
                    <li className={`skill-target-backend skill-target-web ${isBulletHighlighted(["REST APIs", "AWS Lambda", "Postman", "CI/CD Pipelines", "Git"], "backend") ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; Web]</strong> Automated customer service workflows for enterprise clients, as measured by reduced manual ticket handling, by connecting support platforms (Dixa, Zendesk) with AWS cloud services via REST APIs.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "backend") && (
                    <li className={`skill-target-web ${isBulletHighlighted(["Generative AI", "Python", "Node.js", "JavaScript"], "web") ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Improved AI-driven customer support accuracy, as measured by content routing success rates, by contributing to backend generative AI content routing and support tools.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "cloud") && (
                    <li className={isBulletHighlighted(["AWS Lambda", "Postman", "Git"], "cloud") ? "highlight-glow" : ""}>
                      <strong>[Cloud &amp; DevOps]</strong> Maintained feature delivery quality in production, as measured by zero critical deployment failures, by utilizing AWS services and Postman for testing, monitoring, and deployment.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Ingenta */}
            <div id="timeline-ingenta" className="timeline-item" style={{ boxShadow: highlightedTimelineId === "ingenta" ? "0 0 15px rgba(57, 211, 83, 0.4)" : undefined, transition: "box-shadow 0.3s ease" }}>
              <div className="timeline-item-header">
                <div>
                  <span className="timeline-title">Software Consultant</span>
                  <span> at </span>
                  <span className="timeline-org">Ingenta</span>
                </div>
                <span className="timeline-date">2022 — Oct 2024</span>
              </div>
              <div className="timeline-desc">
                <ul style={{ listStyleType: "disc" }}>
                  {(activeHat === "all" || activeHat === "backend" || activeHat === "cloud") && (
                    <li className={`skill-target-backend skill-target-cloud ${isBulletHighlighted(["C#", ".NET Core", "AWS Lambda", "REST APIs"], "backend") ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Improved platform maintainability and reduced technical debt, as measured by modernised service coverage, by refactoring legacy C# .NET platforms and integrating serverless workflows using AWS Lambda.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "backend" || activeHat === "cloud") && (
                    <li className={`skill-target-backend ${isBulletHighlighted(["C#", ".NET Core", "REST APIs"], "backend") ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Increased shipping operations reliability for enterprise clients, as measured by carrier API uptime, by connecting system databases with global shipping carrier APIs including UPS, DPD, and Royal Mail.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "lead" || activeHat === "backend") && (
                    <li className={isBulletHighlighted(["Agile / Scrum", "Git"], "lead") ? "highlight-glow" : ""}>
                      <strong>[Team Lead]</strong> Contributed to consistent sprint delivery and code quality, as measured by peer review completion rates, by collaborating in an Agile structure using Jira for task estimates, tracking, and reviews.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* University of Lincoln */}
            <div id="timeline-personal" className="timeline-item" style={{ boxShadow: highlightedTimelineId === "personal" ? "0 0 15px rgba(57, 211, 83, 0.4)" : undefined, transition: "box-shadow 0.3s ease" }}>
              <div className="timeline-item-header">
                <div>
                  <span className="timeline-title">Education: BSc Games Computing Science (2:1)</span>
                  <span> at </span>
                  <span className="timeline-org">University of Lincoln</span>
                </div>
                <span className="timeline-date">2019 — 2022</span>
              </div>
              <div className="timeline-desc">
                <p className={isBulletHighlighted(["Python", "Ruby", "C++", "Machine Learning", "Git"], "personal") ? "highlight-glow" : ""} style={{ transition: "all 0.3s ease" }}>
                  Reduced physical engine testing costs, as validated by dissertation results, by applying machine learning models to optimise engine power output predictions.
                </p>
              </div>
            </div>

          </section>

          {/* Technical Contribution Matrix */}
          <section style={{ marginTop: "32px", borderTop: "1px solid var(--border-color)", paddingTop: "24px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>Technical Contribution Matrix</h2>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Color intensity represents **proficiency level / depth of experience** (hover column headers or cells, click row headers to scroll to career cards).
            </p>
            
            {/* The Grid */}
            <div style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
              padding: "16px",
              marginBottom: "24px",
              overflowX: "auto"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "580px" }}>
                {/* Header labels for columns */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: "140px" }} /> {/* spacer */}
                  <div style={{ display: "flex", gap: "5px" }}>
                    {allMatrixSkills.map((item) => (
                      <div
                        key={item.name}
                        style={{
                          width: "15px",
                          height: "50px",
                          position: "relative",
                          cursor: "pointer"
                        }}
                        onMouseOver={() => setActiveSkillHover(item.name)}
                        onMouseOut={() => setActiveSkillHover(null)}
                        onClick={() => triggerHighlight(item.targetCat, item.name)}
                      >
                        <div
                          style={{
                            position: "absolute",
                            bottom: "0",
                            left: "2px",
                            transform: "rotate(-45deg)",
                            transformOrigin: "bottom left",
                            fontSize: "9px",
                            color: "var(--text-secondary)",
                            whiteSpace: "nowrap",
                            fontWeight: activeSkillHover === item.name ? "bold" : "normal",
                            transition: "font-weight 0.15s ease",
                            pointerEvents: "none"
                          }}
                          title={item.name}
                        >
                          {item.short}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rows for Roles */}
                {[
                  { id: "hwm", name: "HWM Global", targetCat: "backend" },
                  { id: "dg", name: "Digital Genius", targetCat: "web" },
                  { id: "ingenta", name: "Ingenta", targetCat: "backend" },
                  { id: "personal", name: "Academic & Personal", targetCat: "mobile" }
                ].map((role) => (
                  <div key={role.id} style={{ display: "flex", alignItems: "center" }}>
                    {/* Role Label */}
                    <div 
                      style={{ 
                        width: "140px", 
                        fontSize: "12px", 
                        fontWeight: "600", 
                        color: "var(--text-primary)",
                        cursor: "pointer",
                        textDecoration: highlightedTimelineId === role.id ? "underline" : "none",
                        textDecorationColor: "var(--color-success)"
                      }}
                      onClick={() => triggerTimelineScroll(role.id)}
                      title={`Click to scroll to ${role.name}`}
                    >
                      {role.name}
                    </div>

                    {/* Columns (Skills) */}
                    <div style={{ display: "flex", gap: "5px" }}>
                      {allMatrixSkills.map((item) => {
                        const isUsed = item.roles.includes(role.id);
                        const cellColor = isUsed ? item.color : "#161b22";
                        const isHovered = activeSkillHover === item.name;
                        return (
                          <div
                            key={item.name}
                            style={{
                              width: "15px",
                              height: "15px",
                              backgroundColor: cellColor,
                              borderRadius: "2px",
                              cursor: isUsed ? "pointer" : "default",
                              transform: isHovered && isUsed ? "scale(1.3)" : "none",
                              boxShadow: isHovered && isUsed ? `0 0 8px ${item.color}` : "none",
                              transition: "all 0.15s ease",
                              zIndex: isHovered ? 10 : 1,
                              opacity: isHovered && !isUsed ? 0.4 : 1
                            }}
                            title={isUsed ? `${item.name} (${item.level}) - Used at ${role.name}. ${item.desc}` : `${item.name} - Not used in this role`}
                            onClick={() => isUsed && triggerHighlight(item.targetCat, item.name)}
                            onMouseOver={() => setActiveSkillHover(item.name)}
                            onMouseOut={() => setActiveSkillHover(null)}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", fontSize: "11px", color: "var(--text-secondary)" }}>
                <span>{allMatrixSkills.length} skills mapped across roles (hover column headers or cells)</span>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>Familiar</span>
                  <div style={{ width: "10px", height: "10px", backgroundColor: "#0e4429", borderRadius: "1px" }} />
                  <div style={{ width: "10px", height: "10px", backgroundColor: "#006d21", borderRadius: "1px" }} />
                  <div style={{ width: "10px", height: "10px", backgroundColor: "#26a641", borderRadius: "1px" }} />
                  <div style={{ width: "10px", height: "10px", backgroundColor: "#39d353", borderRadius: "1px" }} />
                  <span>Expert</span>
                </div>
              </div>
            </div>

            {/* Compact list of categorized skills */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
              {Object.entries(categorizedMatrixSkills).map(([category, items]) => (
                <div key={category} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <h3 style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "4px" }}>
                    {category}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {items.map((item) => {
                      const isHighlighted = highlightedSkillName === item.name || activeSkillHover === item.name;
                      return (
                        <div
                          key={item.name}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "12px",
                            backgroundColor: isHighlighted ? "rgba(57, 211, 83, 0.15)" : "transparent",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            transform: isHighlighted ? "translateX(4px)" : "none"
                          }}
                          onMouseOver={() => setActiveSkillHover(item.name)}
                          onMouseOut={() => setActiveSkillHover(null)}
                          onClick={() => triggerHighlight(item.targetCat, item.name)}
                        >
                          <div style={{ width: "8px", height: "8px", backgroundColor: item.color, borderRadius: "50%" }} />
                          <span style={{ color: "var(--text-secondary)" }}>{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
