import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import hljs from "highlight.js";
import { getAllSolutions, getSolutionBySlug } from "../../../../lib/solutions";
import SolutionDetailClient from "./SolutionDetailClient";
import { SITE_URL, OG_IMAGE, EMAIL, LINKEDIN_URL } from "../../../../lib/site";

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
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Thomas Cook, Software Engineer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: summary,
      images: [OG_IMAGE],
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

  const isCaseStudy = solution.categoryLabel === "Case Studies";
  const url = `${SITE_URL}/solutions/${category}/${slug}`;
  const published = solution.date ? solution.date.slice(0, 10) : undefined;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": isCaseStudy ? "TechArticle" : "Article",
      headline: solution.title,
      description: solution.summary || undefined,
      author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Thomas Cook", url: `${SITE_URL}/cv` },
      datePublished: published,
      dateModified: published,
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Thomas Cook", item: `${SITE_URL}/cv` },
        { "@type": "ListItem", position: 2, name: isCaseStudy ? "Case Studies" : "Solutions", item: isCaseStudy ? `${SITE_URL}/solutions/casestudies` : `${SITE_URL}/` },
        { "@type": "ListItem", position: 3, name: solution.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SolutionDetailClient
        title={solution.title}
        categoryLabel={solution.categoryLabel}
        readmeHtml={readmeHtml}
        files={highlightedFiles}
        slug={slug}
        caseStudyMeta={solution.caseStudyMeta}
      />
      {isCaseStudy && (
        <div className="container" style={{ paddingTop: 0 }}>
          <aside className="author-box" aria-label="About the author">
            <div className="author-avatar" aria-hidden="true">TC</div>
            <div>
              <p className="author-name">Written by Thomas Cook</p>
              <p className="author-line">
                Software engineer in Lincoln, UK, working with C#/.NET, React, Azure and AWS.
                {published ? ` Published ${published}.` : ""}
              </p>
              <p className="author-links">
                <Link href="/cv" data-goatcounter-click="casestudy-to-cv">See the full CV</Link>
                {" · "}
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" data-goatcounter-click="casestudy-linkedin">LinkedIn</a>
                {" · "}
                <a href={`mailto:${EMAIL}`} data-goatcounter-click="casestudy-email">Email</a>
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
