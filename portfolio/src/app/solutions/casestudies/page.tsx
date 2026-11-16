import { Metadata } from "next";
import Link from "next/link";
import { getAllSolutions } from "../../../lib/solutions";
import { SITE_URL, OG_IMAGE } from "../../../lib/site";

const TITLE = "Case Studies | Thomas Cook, Software Engineer";
const DESCRIPTION =
  "Engineering case studies by Thomas Cook: API performance work, .NET 10 and Android 16 migration, and a revenue-generating internal product.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/solutions/casestudies` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/solutions/casestudies`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Thomas Cook, Software Engineer" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function CaseStudiesIndex() {
  const studies = getAllSolutions()
    .filter((s) => s.categoryLabel === "Case Studies")
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="container">
      <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Case studies</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "24px", maxWidth: "720px" }}>
        Write-ups of real engineering work: the problem, what was done and the measured result. Newest first.
        {" "}
        <a href={`${process.env.NODE_ENV === "production" ? "/code-problems" : ""}/feed.xml`} style={{ color: "var(--accent-secondary)" }}>RSS feed</a>.
      </p>
      <section className="pinned-grid">
        {studies.map((s) => (
          <Link
            key={s.slug}
            href={`/solutions/casestudies/${s.slug}`}
            className="pinned-card"
            style={{ textDecoration: "none" }}
            data-goatcounter-click={`casestudy-${s.slug}`}
          >
            <div>
              <div className="pinned-card-title">
                <span style={{ color: "var(--accent-secondary)", fontWeight: 600 }}>{s.title}</span>
              </div>
              {s.caseStudyMeta?.milestone && (
                <p className="pinned-card-desc" style={{ color: "var(--color-success-fg)", fontWeight: 600 }}>
                  {s.caseStudyMeta.milestone}
                </p>
              )}
              <p className="pinned-card-desc">{s.summary}</p>
            </div>
            <div className="pinned-card-meta">
              <span>Updated {s.date.slice(0, 10)}</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
