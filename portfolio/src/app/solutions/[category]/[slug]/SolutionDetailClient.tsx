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

  return (
    <div className="container">
      {/* Page Header */}
      <header className="detail-header">
        <Link href="/" className="back-btn">
          &larr; Back to Dashboard
        </Link>
        <div className="detail-title-section">
          <span className="category-badge" style={{ width: "max-content" }}>
            {categoryLabel}
          </span>
          <h1 className="detail-title">{title}</h1>
        </div>
      </header>

      {/* Main content grid */}
      <main className="layout-grid">
        {/* Left column: Problem statement */}
        <section className="glass-card detail-card">
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: "700" }}>
            Problem Description
          </h2>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: readmeHtml }}
          />
        </section>

        {/* Right column: Solutions and tabs */}
        <section className="glass-card detail-card">
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: "700" }}>
            Implementation Solutions
          </h2>

          {files.length > 0 ? (
            <>
              {/* Tabs for multiple languages */}
              <div className="tabs-header">
                {files.map((file, idx) => (
                  <button
                    key={file.name}
                    className={`tab-btn ${activeTab === idx ? "active" : ""}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    {file.name} ({file.language === "cpp" ? "C++" : file.language === "csharp" ? "C#" : file.language.charAt(0).toUpperCase() + file.language.slice(1)})
                  </button>
                ))}
              </div>

              {/* Code viewer */}
              <div className="code-wrapper">
                <pre>
                  <code
                    className={`hljs language-${files[activeTab].language}`}
                    dangerouslySetInnerHTML={{ __html: files[activeTab].highlightedCode }}
                  />
                </pre>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>No implementation file available for this problem.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
