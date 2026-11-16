import { Metadata } from "next";
import { getAllSolutions } from "../lib/solutions";
import { getCVSkills } from "../lib/cv";
import Dashboard from "./Dashboard";
import { SITE_URL, OG_IMAGE } from "../lib/site";

const TITLE = "Solutions & Case Studies | Thomas Cook, Software Engineer";
const DESCRIPTION = "Engineering case studies and algorithm solutions by Thomas Cook, a software engineer in Lincoln, UK (C#/.NET, React, Azure, AWS).";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: "Thomas Cook", url: `${SITE_URL}/` }],
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: "Thomas Cook — Software Engineer",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Thomas Cook, Software Engineer" }],
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function Home() {
  const solutions = getAllSolutions();
  const skills = getCVSkills();
  return <Dashboard solutions={solutions} cvSkills={skills} />;
}
