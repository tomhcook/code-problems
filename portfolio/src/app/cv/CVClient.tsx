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

export default function CVClient({ solutions, cvSkills }: CVClientProps) {
  const [activeHat, setActiveHat] = useState("all");
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null);

  const getLanguageColorClass = (lang: string) => {
    if (lang === "csharp") return "lang-color-csharp";
    if (lang === "typescript") return "lang-color-typescript";
    return "lang-color-default";
  };

  const triggerHighlight = (category: string) => {
    setHighlightedCategory(category);
    
    // Find the first target element and scroll it into view
    const element = document.querySelector(`.skill-target-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Reset highlight after 3 seconds
    setTimeout(() => {
      setHighlightedCategory((current) => current === category ? null : current);
    }, 3000);
  };

  return (
    <div className="container">
      {/* Action Buttons Header */}
      <div className="cv-actions" style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginBottom: "16px" }}>
        <a 
          href="/Thomas_Cook_CV.pdf"
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
          href="/Thomas_Cook_CV.pdf"
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
            <div className="profile-avatar">
              TC
            </div>
          </div>
          <h1 className="profile-name" style={{ fontSize: "22px" }}>Thomas Cook</h1>
          <div className="profile-username" style={{ fontSize: "16px", marginBottom: "8px" }}>tomhcook</div>
          <div className="profile-bio" style={{ fontSize: "13px", marginBottom: "16px" }}>
            Fast-track Software Engineer &amp; Full Stack Developer. Building scalable .NET backend architectures, mobile Android products, and interactive web applications.
          </div>
          
          <button className="profile-edit-btn" onClick={() => window.open("https://github.com/tomhcook", "_blank")}>
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
              <a href="https://linkedin.com/in/thomas-cook-dev" target="_blank" rel="noopener noreferrer">linkedin.com/in/thomas-cook-dev</a>
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
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
            <div className="timeline-item active">
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
                  {(activeHat === "all" || activeHat === "backend") && (
                    <li className={`skill-target-backend skill-target-databases ${highlightedCategory === "backend" || highlightedCategory === "databases" ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Built backend services and web APIs using ASP.NET Core and MSSQL, supporting production systems and data-driven workflows.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "maui" || activeHat === "web") && (
                    <li className={`skill-target-mobile skill-target-web ${highlightedCategory === "mobile" || highlightedCategory === "web" ? "highlight-glow" : ""}`}>
                      <strong>[Mobile &amp; Web]</strong> Delivered front end and back end work across React web applications and Android app development using <strong>.NET MAUI</strong>, working end to end.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "backend") && (
                    <li className={`skill-target-backend ${highlightedCategory === "backend" ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Made technical decisions on languages and technologies used across the platform, helping shape implementation choices and delivery.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "backend") && (
                    <li className={`skill-target-backend ${highlightedCategory === "backend" ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Reduced API response times by 60% through targeted optimization work, improving performance.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "backend") && (
                    <li className={`skill-target-backend ${highlightedCategory === "backend" ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Developed and expanded AI and LLM-driven backend features to improve automated data processing.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "cloud") && (
                    <li><strong>[Cloud &amp; DevOps]</strong> Managed code integration, deployment environments, and automated pipelines using Azure DevOps.</li>
                  )}
                  {(activeHat === "all" || activeHat === "cloud") && (
                    <li><strong>[Cloud &amp; DevOps]</strong> Integrated Microsoft Clarity across web platforms to diagnose usability issues.</li>
                  )}
                  {(activeHat === "all" || activeHat === "lead") && (
                    <li><strong>[Team Lead]</strong> Stepped in as temporary Team Lead to coordinate the engineering backlog and keep sprints on schedule.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Digital Genius */}
            <div className="timeline-item">
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
                    <li className={`skill-target-web ${highlightedCategory === "web" ? "highlight-glow" : ""}`}>
                      <strong>[Web &amp; Full Stack]</strong> Built customer integrations and interactive frontends using Node.js, Angular 17, TypeScript, and JavaScript.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "backend" || activeHat === "web" || activeHat === "cloud") && (
                    <li className={`skill-target-backend skill-target-web ${highlightedCategory === "backend" || highlightedCategory === "web" ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; Web]</strong> Connected customer support platforms (Dixa, Zendesk) with AWS cloud services via REST APIs to trigger automated tasks.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "backend") && (
                    <li className={`skill-target-web ${highlightedCategory === "web" ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Contributed to backend generative AI content routing and customer-facing support tools.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "cloud") && (
                    <li>
                      <strong>[Cloud &amp; DevOps]</strong> Utilized AWS services and Postman to test, monitor, and deploy features into active production.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Ingenta */}
            <div className="timeline-item">
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
                  {(activeHat === "all" || activeHat === "backend") && (
                    <li className={`skill-target-backend ${highlightedCategory === "backend" ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Worked on modernizing legacy C# .NET platforms and integrating serverless workflows using AWS Lambda.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "backend" || activeHat === "cloud") && (
                    <li className={`skill-target-backend ${highlightedCategory === "backend" ? "highlight-glow" : ""}`}>
                      <strong>[Backend &amp; DB]</strong> Connected system databases with global shipping carrier APIs including UPS, DPD, and Royal Mail.
                    </li>
                  )}
                  {(activeHat === "all" || activeHat === "lead" || activeHat === "backend") && (
                    <li>
                      <strong>[Team Lead]</strong> Collaborated in an Agile structure using Jira for task estimates, tracking, and peer reviews.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* University of Lincoln */}
            <div className="timeline-item">
              <div className="timeline-item-header">
                <div>
                  <span className="timeline-title">Education: BSc Games Computing Science (2:1)</span>
                  <span> at </span>
                  <span className="timeline-org">University of Lincoln</span>
                </div>
                <span className="timeline-date">2019 — 2022</span>
              </div>
              <div className="timeline-desc">
                <p>Dissertation used machine learning models to optimize engine power outputs and reduce physical test costs.</p>
              </div>
            </div>

          </section>

        </main>
      </div>
    </div>
  );
}
