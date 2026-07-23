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
        const lang = file.language === "cpp" ? "C++" : file.language.charAt(0).toUpperCase() + file.language.slice(1);
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
                {lang === "cpp" ? "C++" : lang.charAt(0).toUpperCase() + lang.slice(1)}
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
                      {file.language === "cpp" ? "C++" : file.language.charAt(0).toUpperCase() + file.language.slice(1)}
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
