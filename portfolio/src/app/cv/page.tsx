"use client";

import React from "react";

export default function CVPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cv-container">
      {/* Action Buttons */}
      <div className="cv-actions" style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button onClick={handlePrint} className="print-btn" style={{ marginBottom: 0 }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Print CV
        </button>

        <a
          href="/Thomas_Cook_CV.pdf"
          download="Thomas_Cook_CV.pdf"
          className="print-btn"
          style={{
            marginBottom: 0,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download PDF
        </a>
      </div>

      {/* CV Header */}
      <header className="glass-card cv-header">
        <h1 className="cv-name">Thomas Cook</h1>
        <div className="cv-title">Software Engineer | C# / .NET Developer | Full Stack Developer</div>
        <div className="cv-contacts">
          <span>📧 <a href="mailto:thomascook0404@outlook.com">thomascook0404@outlook.com</a></span>
          <span>📞 +44 7932 229819</span>
          <span>💻 <a href="https://github.com/tomhcook" target="_blank" rel="noopener noreferrer">github.com/tomhcook</a></span>
          <span>🔗 <a href="https://linkedin.com/in/thomas-cook-dev" target="_blank" rel="noopener noreferrer">linkedin.com/in/thomas-cook-dev</a></span>
          <span>📍 Lincoln, England, GB</span>
        </div>
      </header>

      {/* Profile */}
      <section className="glass-card cv-section" style={{ padding: "2rem" }}>
        <h2 className="cv-section-title">Profile</h2>
        <p className="cv-item-desc" style={{ lineHeight: "1.7", color: "var(--text-secondary)" }}>
          Software Engineer and Full Stack Developer with commercial experience across C# .NET Core, ASP.NET Core, MSSQL, React, and web APIs, delivering backend services, frontend applications, and mobile app development in production environments. Comfortable making technical decisions on languages and technologies, working end to end across front and back end, and improving platform performance, including reducing API response times by 60%.
        </p>
      </section>

      {/* Experience */}
      <section className="glass-card cv-section" style={{ padding: "2rem" }}>
        <h2 className="cv-section-title">Experience</h2>

        <div className="cv-item">
          <div className="cv-item-header">
            <div>
              <span className="cv-item-title">Software Engineer</span>
              <div className="cv-item-org">HWM Global</div>
            </div>
            <span className="cv-item-date">Jun 2025 — Present</span>
          </div>
          <ul className="cv-item-desc" style={{ paddingLeft: "1.2rem", color: "var(--text-secondary)", listStyleType: "disc" }}>
            <li>Built backend services and web APIs using ASP.NET Core and MSSQL, supporting production systems and data-driven workflows.</li>
            <li>Delivered front end and back end work across React web applications and app development, working end to end from feature design through release.</li>
            <li>Made technical decisions on languages and technologies used across the platform, helping shape implementation choices and delivery approach.</li>
            <li>Reduced API response times by 60% through targeted optimisation work, improving performance and user experience.</li>
            <li>Developed and expanded AI and LLM-driven backend features in the platform to improve automated data processing and user-facing intelligence.</li>
            <li>Managed code integration, deployment environments, and automated pipelines using Azure DevOps.</li>
            <li>Integrated Microsoft Clarity across web platforms to diagnose usability issues and improve user experience.</li>
            <li>Stepped in as temporary Team Lead to coordinate the engineering backlog and keep daily sprints on schedule.</li>
          </ul>
        </div>

        <div className="cv-item">
          <div className="cv-item-header">
            <div>
              <span className="cv-item-title">Solutions Engineer</span>
              <div className="cv-item-org">Digital Genius</div>
            </div>
            <span className="cv-item-date">Oct 2024 — Jun 2025</span>
          </div>
          <ul className="cv-item-desc" style={{ paddingLeft: "1.2rem", color: "var(--text-secondary)", listStyleType: "disc" }}>
            <li>Built customer integrations and interactive frontends using Node.js, Angular 17, TypeScript, and JavaScript.</li>
            <li>Connected customer support platforms such as Dixa and Zendesk with AWS cloud services via REST APIs to trigger automated customer service tasks.</li>
            <li>Contributed to backend generative AI content routing and customer-facing support tools.</li>
            <li>Utilized AWS services and Postman to test, monitor, and deploy features into active production environments.</li>
          </ul>
        </div>

        <div className="cv-item">
          <div className="cv-item-header">
            <div>
              <span className="cv-item-title">Software Consultant</span>
              <div className="cv-item-org">Ingenta</div>
            </div>
            <span className="cv-item-date">2022 — Oct 2024</span>
          </div>
          <ul className="cv-item-desc" style={{ paddingLeft: "1.2rem", color: "var(--text-secondary)", listStyleType: "disc" }}>
            <li>Worked on modernising legacy C# .NET platforms and integrating serverless workflows using AWS Lambda.</li>
            <li>Connected system databases with global shipping carrier APIs including UPS, DPD, and Royal Mail to improve operational reliability.</li>
            <li>Collaborated in an Agile structure using Jira for task estimates, tracking, and peer reviews.</li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section className="glass-card cv-section" style={{ padding: "2rem" }}>
        <h2 className="cv-section-title">Education</h2>
        
        <div className="cv-item" style={{ marginBottom: 0 }}>
          <div className="cv-item-header">
            <div>
              <span className="cv-item-title">BSc Games Computing Science, 2:1</span>
              <div className="cv-item-org">University of Lincoln</div>
            </div>
            <span className="cv-item-date">2019 — 2022</span>
          </div>
          <p className="cv-item-desc" style={{ color: "var(--text-secondary)" }}>
            Dissertation used machine learning models to optimise engine power outputs and reduce physical test costs.
          </p>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="glass-card cv-section" style={{ padding: "2rem" }}>
        <h2 className="cv-section-title">Technical Skills</h2>
        <div className="cv-skills-grid">
          <div className="cv-skill-card">
            <div className="cv-skill-name">C# / .NET</div>
            <div className="cv-skill-level">Advanced</div>
          </div>
          <div className="cv-skill-card">
            <div className="cv-skill-name">ASP.NET Core</div>
            <div className="cv-skill-level">Advanced</div>
          </div>
          <div className="cv-skill-card">
            <div className="cv-skill-name">MSSQL</div>
            <div className="cv-skill-level">Advanced</div>
          </div>
          <div className="cv-skill-card">
            <div className="cv-skill-name">React</div>
            <div className="cv-skill-level">Advanced</div>
          </div>
          <div className="cv-skill-card">
            <div className="cv-skill-name">TypeScript</div>
            <div className="cv-skill-level">Advanced</div>
          </div>
          <div className="cv-skill-card">
            <div className="cv-skill-name">AWS / Azure</div>
            <div className="cv-skill-level">Intermediate</div>
          </div>
          <div className="cv-skill-card">
            <div className="cv-skill-name">AI & LLMs</div>
            <div className="cv-skill-level">Intermediate</div>
          </div>
          <div className="cv-skill-card">
            <div className="cv-skill-name">Python</div>
            <div className="cv-skill-level">Advanced</div>
          </div>
        </div>
      </section>
    </div>
  );
}
