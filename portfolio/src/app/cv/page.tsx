import { Metadata } from "next";
import { getAllSolutions } from "../../lib/solutions";
import { getCVSkills } from "../../lib/cv";
import CVClient from "./CVClient";
import { SITE_URL, OG_IMAGE, EMAIL, LINKEDIN_URL, GITHUB_URL, KNOWS_ABOUT, CV_LAST_UPDATED } from "../../lib/site";

const TITLE = "Thomas Cook | Software Engineer (.NET, React, Azure, AWS)";
const DESCRIPTION =
  "Software engineer in Lincoln, UK. C#/.NET, React, Azure and AWS. Cut API response times 60% and rolled out k6 load testing. CV and case studies.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: "Thomas Cook", url: `${SITE_URL}/` }],
  creator: "Thomas Cook",
  alternates: { canonical: `${SITE_URL}/cv` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/cv`,
    siteName: "Thomas Cook — Software Engineer",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Thomas Cook, Software Engineer: 60% faster APIs, 30+ integrations" }],
    locale: "en_GB",
    type: "profile",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function CVPage() {
  const solutions = getAllSolutions();
  const skills = getCVSkills();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}/cv`,
    dateModified: CV_LAST_UPDATED,
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Thomas Cook",
      jobTitle: "Software Engineer",
      email: `mailto:${EMAIL}`,
      address: { "@type": "PostalAddress", addressLocality: "Lincoln", addressRegion: "England", addressCountry: "GB" },
      worksFor: { "@type": "Organization", name: "HWM Global" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "University of Lincoln" },
      sameAs: [LINKEDIN_URL, GITHUB_URL],
      knowsAbout: KNOWS_ABOUT,
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CVClient solutions={solutions} cvSkills={skills} />
    </>
  );
}
