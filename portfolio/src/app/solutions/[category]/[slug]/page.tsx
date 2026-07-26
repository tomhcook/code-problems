import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import hljs from "highlight.js";
import { getAllSolutions, getSolutionBySlug } from "../../../../lib/solutions";
import SolutionDetailClient from "./SolutionDetailClient";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const solution = getSolutionBySlug(category, slug);
  if (!solution) {
    return {
      title: "Solution Not Found",
    };
  }
  const fullTitle = `${solution.title} | Thomas Cook — Software Engineer`;
  const summary = solution.summary || `Technical software engineering solution and code explanation for ${solution.title} by Thomas Cook.`;
  const url = `https://tomhcook.github.io/code-problems/solutions/${category}/${slug}`;

  return {
    title: fullTitle,
    description: summary,
    keywords: [
      "Thomas Cook software",
      "Thomas Cook software engineer",
      solution.title,
      solution.categoryLabel,
      "Thomas Cook developer"
    ],
    authors: [{ name: "Thomas Cook", url: "https://tomhcook.github.io/code-problems/" }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: summary,
      url,
      siteName: "Thomas Cook — Software Engineer",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description: summary,
    },
  };
}

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const solutions = getAllSolutions();
  return solutions.map((s) => ({
    category: s.category.toLowerCase(),
    slug: s.slug.toLowerCase(),
  }));
}

export default async function Page({ params }: PageProps) {
  const { category, slug } = await params;
  const solution = getSolutionBySlug(category, slug);

  if (!solution) {
    notFound();
  }

  // Parse markdown content synchronously or asynchronously
  const readmeHtml = await marked.parse(solution.readme);

  // Pre-highlight code files
  const highlightedFiles = solution.files.map((file) => {
    let highlightedCode = file.code;
    try {
      if (file.language) {
        highlightedCode = hljs.highlight(file.code, {
          language: file.language,
        }).value;
      } else {
        highlightedCode = hljs.highlightAuto(file.code).value;
      }
    } catch (e) {
      console.error(`Failed to highlight code for ${file.name}`, e);
    }

    return {
      name: file.name,
      language: file.language,
      highlightedCode,
    };
  });

  return (
    <SolutionDetailClient
      title={solution.title}
      categoryLabel={solution.categoryLabel}
      readmeHtml={readmeHtml}
      files={highlightedFiles}
      slug={slug}
      caseStudyMeta={solution.caseStudyMeta}
    />
  );
}
