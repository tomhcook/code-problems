"use client";

import React, { useState } from "react";
import Link from "next/link";

interface HighlightedFile {
  name: string;
  language: string;
  highlightedCode: string;
}

interface SolutionDetailClientProps {
  title: string;
  categoryLabel: string;
  readmeHtml: string;
  files: HighlightedFile[];
}

export default function SolutionDetailClient({
  title,
  categoryLabel,
  readmeHtml,
  files,
}: SolutionDetailClientProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Helper to approximate line count
  const getLineCount = (code: string) => {
    return code.split(/\r\n|\r|\n/).length;
  };

  // Helper to format language name
  const formatLanguage = (lang: string) => {
    if (lang === "cpp") return "C++";
    if (lang === "csharp") return "C#";
    return lang.charAt(0).toUpperCase() + lang.slice(1);
  };

  const isCaseStudy = categoryLabel === "Case Studies";

  if (isCaseStudy) {
    return (
      <div className="container">
        {/* Breadcrumb Header */}
        <header className="repo-header" style={{ marginBottom: "24px", paddingBottom: "12px" }}>
          <div className="repo-title-row" style={{ fontSize: "16px", marginBottom: "8px" }}>
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--text-secondary)" }}>
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 16.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>
            <Link href="/cv" className="repo-owner">Thomas_Cook</Link>
            <span>/</span>
            <Link href="/" className="repo-name">code-problems</Link>
          </div>
          <div style={{ display: "flex", gap: "6px", fontSize: "14px", color: "var(--text-primary)", fontWeight: "500", alignItems: "center" }}>
            <Link href="/" style={{ color: "var(--accent-secondary)", textDecoration: "none" }}>solutions</Link>
            <span style={{ color: "var(--text-secondary)" }}>/</span>
            <span style={{ color: "var(--text-secondary)" }}>{categoryLabel.toLowerCase().replace(/\s+/g, "-")}</span>
            <span style={{ color: "var(--text-secondary)" }}>/</span>
            <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{title}</span>
          </div>
        </header>

        {/* GitHub Issue Title Header */}
        <section style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "400", color: "var(--text-primary)", margin: 0 }}>
              {title} <span style={{ color: "var(--text-secondary)", fontWeight: "300" }}>#1</span>
            </h1>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", fontSize: "14px", color: "var(--text-secondary)" }}>
            <span style={{
              backgroundColor: "#a371f7",
              color: "#ffffff",
              fontWeight: "600",
              fontSize: "12px",
              padding: "4px 12px",
              borderRadius: "2em",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Merged
            </span>
            <span><strong>Thomas Cook</strong> merged 3 commits into <code>production</code></span>
          </div>
        </section>

        {/* Issue Grid layout */}
        <div className="issue-grid">
          
          {/* Main timeline comment box */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
              overflow: "hidden",
              backgroundColor: "var(--bg-secondary)"
            }}>
              <div style={{
                backgroundColor: "var(--bg-tertiary)",
                borderBottom: "1px solid var(--border-color)",
                padding: "8px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                color: "var(--text-secondary)"
              }}>
                <div>
                  <strong style={{ color: "var(--text-primary)" }}>Thomas Cook</strong> commented
                </div>
                <div style={{
                  border: "1px solid var(--border-color)",
                  borderRadius: "2em",
                  padding: "1px 8px",
                  fontSize: "10px",
                  fontWeight: "600"
                }}>
                  Owner
                </div>
              </div>
              <div style={{ padding: "24px", backgroundColor: "var(--bg-primary)" }} className="markdown-body">
                <div dangerouslySetInnerHTML={{ __html: readmeHtml }} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "20px", fontSize: "12px", color: "var(--text-secondary)" }}>
            
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
              <div style={{ fontWeight: "600", marginBottom: "8px", color: "var(--text-primary)" }}>Assignees</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg-tertiary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: "600",
                  color: "var(--text-primary)"
                }}>TC</div>
                <span style={{ fontWeight: "500", color: "var(--text-primary)" }}>Thomas Cook</span>
              </div>
            </div>

            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
              <div style={{ fontWeight: "600", marginBottom: "8px", color: "var(--text-primary)" }}>Labels</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ backgroundColor: "rgba(163, 113, 247, 0.15)", color: "#d3b3f7", border: "1px solid rgba(163, 113, 247, 0.4)", padding: "2px 8px", borderRadius: "2em", fontSize: "11px", fontWeight: "600" }}>case-study</span>
                <span style={{ backgroundColor: "rgba(112, 21, 22, 0.15)", color: "#ff8284", border: "1px solid rgba(112, 21, 22, 0.4)", padding: "2px 8px", borderRadius: "2em", fontSize: "11px", fontWeight: "600" }}>ruby</span>
                <span style={{ backgroundColor: "rgba(56, 139, 253, 0.15)", color: "#58a6ff", border: "1px solid rgba(56, 139, 253, 0.4)", padding: "2px 8px", borderRadius: "2em", fontSize: "11px", fontWeight: "600" }}>docker</span>
                <span style={{ backgroundColor: "rgba(46, 160, 67, 0.15)", color: "#56d364", border: "1px solid rgba(46, 160, 67, 0.4)", padding: "2px 8px", borderRadius: "2em", fontSize: "11px", fontWeight: "600" }}>azure-mssql</span>
              </div>
            </div>

            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
              <div style={{ fontWeight: "600", marginBottom: "8px", color: "var(--text-primary)" }}>Company</div>
              <span style={{ fontWeight: "500", color: "var(--text-primary)" }}>HWM Global</span>
            </div>

            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
              <div style={{ fontWeight: "600", marginBottom: "8px", color: "var(--text-primary)" }}>Role</div>
              <span style={{ fontWeight: "500", color: "var(--text-primary)" }}>Software Engineer</span>
            </div>

            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
              <div style={{ fontWeight: "600", marginBottom: "8px", color: "var(--text-primary)" }}>Projects</div>
              <span style={{ fontWeight: "500", color: "var(--text-primary)" }}>Internal Products Suite</span>
            </div>

            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
              <div style={{ fontWeight: "600", marginBottom: "8px", color: "var(--text-primary)" }}>Milestone</div>
              <span style={{ fontWeight: "500", color: "var(--text-primary)" }}>Production Launch &amp; Direct Revenue Delivery</span>
            </div>

            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
              <div style={{ fontWeight: "600", marginBottom: "8px", color: "var(--text-primary)" }}>Resume Reference</div>
              <Link href="/cv?highlight=backend" style={{ fontWeight: "600", color: "var(--accent-secondary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                View in CV (Highlighted) &rarr;
              </Link>
            </div>

          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Breadcrumb Header */}
      <header className="repo-header" style={{ marginBottom: "24px", paddingBottom: "12px" }}>
        <div className="repo-title-row" style={{ fontSize: "16px", marginBottom: "8px" }}>
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" style={{ fill: "var(--text-secondary)" }}>
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 16.7a.25.25 0 0 1-.4-.2Z"></path>
          </svg>
          <Link href="/cv" className="repo-owner">Thomas_Cook</Link>
          <span>/</span>
          <Link href="/" className="repo-name">code-problems</Link>
        </div>
        <div style={{ display: "flex", gap: "6px", fontSize: "14px", color: "var(--text-primary)", fontWeight: "500", alignItems: "center" }}>
          <Link href="/" style={{ color: "var(--accent-secondary)", textDecoration: "none" }}>solutions</Link>
          <span style={{ color: "var(--text-secondary)" }}>/</span>
          <span style={{ color: "var(--text-secondary)" }}>{categoryLabel.toLowerCase().replace(/\s+/g, "-")}</span>
          <span style={{ color: "var(--text-secondary)" }}>/</span>
          <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>{title}</span>
        </div>
      </header>

      {/* Main layout (Stacking: Code viewer on top, description/README below) */}
      <main style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Solution Implementation Viewer */}
        {files.length > 0 && (
          <section className="file-card">
            <div className="file-card-header">
              <div className="file-info">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="var(--text-secondary)">
                  <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16H3.75A1.75 1.75 0 0 1 2 14.25V1.75zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9.5 4.25V1.5H3.75zM11 1.81V4h2.19L11 1.81z"></path>
                </svg>
                <span>{files[activeTab].name}</span>
                <span style={{ color: "var(--border-color)" }}>|</span>
                <span>{getLineCount(files[activeTab].highlightedCode)} lines</span>
              </div>
              
              {files.length > 1 && (
                <div className="file-tabs">
                  {files.map((file, idx) => (
                    <button
                      key={file.name}
                      className={`file-tab-btn ${activeTab === idx ? "active" : ""}`}
                      onClick={() => setActiveTab(idx)}
                    >
                      {formatLanguage(file.language)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ position: "relative" }}>
              <pre style={{ overflowX: "auto" }}>
                <code
                  className={`hljs language-${files[activeTab].language}`}
                  dangerouslySetInnerHTML={{ __html: files[activeTab].highlightedCode }}
                />
              </pre>
            </div>
          </section>
        )}

        {/* Problem Description README Card */}
        <section className="markdown-card">
          <div className="markdown-card-header">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="var(--text-secondary)">
              <path d="M0 1.75c0-.966.784-1.75 1.75-1.75h12.5c.966 0 1.75.784 1.75 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75zM4 4.5a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 4.5zm0 3a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 7.5zm0 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75z"></path>
            </svg>
            <span>README.md</span>
          </div>
          <div className="markdown-card-body">
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: readmeHtml }}
            />
          </div>
        </section>

      </main>
    </div>
  );
}
