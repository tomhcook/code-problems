"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Solution } from "../lib/solutions";

interface DashboardProps {
  solutions: Solution[];
}

export default function Dashboard({ solutions }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");

  // Terminal state
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to Tom's Interactive CLI v1.0.0",
    "Type 'help' to see available commands.",
    ""
  ]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    switch (cmd) {
      case "help":
        response = "Available commands:\n  help    - Show this message\n  cv      - View a summary of my CV/resume\n  skills  - List my top technical skills\n  clear   - Clear terminal screen\n  nerd    - Run a diagnostic check on developer status\n  stats   - Show coding challenge statistics";
        break;
      case "cv":
        response = "Name: Thomas Cook\nRole: Software Engineer | C# / .NET Developer | Full Stack Developer\nStatus: Currently Software Engineer at HWM Global\nEducation: BSc Games Computing Science (2:1) from University of Lincoln\nLinkedIn: linkedin.com/in/thomas-cook-dev\nType 'skills' or visit the 'My CV' tab for the complete resume!";
        break;
      case "skills":
        response = "Top Technical Skills:\n  - C# / .NET & ASP.NET Core (Advanced / Professional)\n  - MSSQL & Database Design (Advanced)\n  - React, TypeScript, Angular (Advanced / Professional)\n  - AWS (Lambda, cloud integrations) & Azure DevOps\n  - AI & LLM integration features";
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      case "nerd":
        response = "NERD DIAGNOSTIC CHECK:\n[+] Coffee level: 85%\n[+] Operating System: Linux / Windows\n[+] Favourite IDE theme: Dracula (obviously)\n[+] Algorithm status: Searching for O(1) space solutions\n[+] Nerd status: 100% verified nerd. Ready to code.";
        break;
      case "stats":
        response = `Portfolio Diagnostics:\n  - Total problems solved: ${solutions.length}\n  - Categories: LeetCode & Daily Coding Problems`;
        break;
      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    setTerminalHistory((prev) => [...prev, `tom-dev-env$ ${terminalInput}`, response, ""]);
    setTerminalInput("");
  };

  const formatLanguage = (lang: string) => {
    if (lang === "cpp") return "C++";
    if (lang === "csharp") return "C#";
    return lang.charAt(0).toUpperCase() + lang.slice(1);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = solutions.length;
    const categoriesCount: Record<string, number> = {};
    const languagesCount: Record<string, number> = {};

    solutions.forEach((sol) => {
      // Category count
      categoriesCount[sol.categoryLabel] = (categoriesCount[sol.categoryLabel] || 0) + 1;
      
      // Language count
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

  // Filter solutions based on search query, category, and language
  const filteredSolutions = useMemo(() => {
    return solutions.filter((sol) => {
      const matchesSearch =
        sol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sol.readme.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory =
        categoryFilter === "all" || sol.category === categoryFilter;

      const matchesLanguage =
        languageFilter === "all" ||
        sol.files.some((file) => file.language === languageFilter);

      return matchesSearch && matchesCategory && matchesLanguage;
    });
  }, [solutions, searchTerm, categoryFilter, languageFilter]);

  return (
    <div className="container">
      {/* Hero Header */}
      <header className="dashboard-hero">
        <h1>
          Coding <span className="gradient-text">Solutions</span> Portfolio
        </h1>
        <p>
          A curated collection of my algorithmic problem solutions, design patterns, and programming challenges.
        </p>
      </header>

      {/* Interactive Nerdy Terminal */}
      <section className="glass-card terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-btn term-red"></span>
            <span className="terminal-btn term-yellow"></span>
            <span className="terminal-btn term-green"></span>
          </div>
          <div className="terminal-title">tom-dev-env (~/portfolio)</div>
          <div style={{ width: "48px" }}></div>
        </div>
        <div className="terminal-body">
          <div className="terminal-output">
            {terminalHistory.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
          <form onSubmit={handleTerminalSubmit} className="terminal-prompt-row">
            <span className="terminal-prompt">tom-dev-env$</span>
            <input
              type="text"
              className="terminal-input"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="type 'help', 'cv', 'skills', 'nerd'..."
            />
          </form>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-val">{stats.total}</div>
          <div className="stat-label">Total Solved</div>
        </div>
        {Object.entries(stats.categories).map(([label, count]) => (
          <div key={label} className="glass-card stat-card">
            <div className="stat-val">{count}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </section>

      {/* Filters and Search */}
      <section className="glass-card filters-wrapper">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search problems by title, description, keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-row">
          <span className="filter-label">Category:</span>
          <div className="filter-group">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`filter-btn ${categoryFilter === "all" ? "active" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => setCategoryFilter("dailycodingproblems")}
              className={`filter-btn ${categoryFilter === "dailycodingproblems" ? "active" : ""}`}
            >
              Daily Coding Problems
            </button>
            <button
              onClick={() => setCategoryFilter("leetcode")}
              className={`filter-btn ${categoryFilter === "leetcode" ? "active" : ""}`}
            >
              LeetCode
            </button>
          </div>
        </div>

        <div className="filters-row">
          <span className="filter-label">Language:</span>
          <div className="filter-group">
            <button
              onClick={() => setLanguageFilter("all")}
              className={`filter-btn ${languageFilter === "all" ? "active" : ""}`}
            >
              All
            </button>
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguageFilter(lang)}
                className={`filter-btn ${languageFilter === lang ? "active" : ""}`}
              >
                {formatLanguage(lang)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <main className="solutions-grid">
        {filteredSolutions.length > 0 ? (
          filteredSolutions.map((sol) => (
            <article key={sol.id} className="glass-card solution-card">
              <div className="card-header">
                <span className="category-badge">{sol.categoryLabel}</span>
                <h2 className="card-title">{sol.title}</h2>
                <p className="card-summary">{sol.summary}</p>
              </div>
              <div className="card-footer">
                <div className="card-languages">
                  {sol.files.map((file) => (
                    <span
                      key={file.name}
                      className={`lang-badge lang-badge-${file.language}`}
                    >
                      {formatLanguage(file.language)}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/solutions/${sol.category}/${sol.slug}`}
                  className="view-link"
                >
                  View Solution &rarr;
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="glass-card empty-state" style={{ gridColumn: "1 / -1" }}>
            <p>No solutions match your search or filter criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}
