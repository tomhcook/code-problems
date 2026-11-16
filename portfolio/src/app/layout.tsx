import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, EMAIL, LINKEDIN_URL, GITHUB_URL, KNOWS_ABOUT, OG_IMAGE } from "../lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thomas Cook | Software Engineer (.NET, React, Azure, AWS)",
  description: "Portfolio, CV and engineering case studies of Thomas Cook, a software engineer in Lincoln, UK working with C#/.NET, React, Azure and AWS.",
  openGraph: {
    siteName: "Thomas Cook — Software Engineer",
    locale: "en_GB",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Thomas Cook, Software Engineer" }],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
  alternates: { types: { "application/rss+xml": `${SITE_URL}/feed.xml` } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <header className="navbar">
          <div className="navbar-container">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Link href="/cv" className="nav-logo">
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  style={{ stroke: "#f0f6fc", fill: "none" }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="2" />
                  <polyline points="9 16 5 12 9 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="15 8 19 12 15 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="14" y1="6" x2="10" y2="18" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="logo-text">Thomas_Cook</span>
              </Link>
            </div>

            <nav className="nav-links">
              <Link href="/cv" className="nav-link">
                CV
              </Link>
              <Link href="/solutions/casestudies" className="nav-link">
                Case Studies
              </Link>
              <Link href="/" className="nav-link">
                Solutions
              </Link>
            </nav>
          </div>
        </header>
        <div style={{ flex: 1 }}>{children}</div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${SITE_URL}/#person`,
              "name": "Thomas Cook",
              "jobTitle": "Software Engineer",
              "email": `mailto:${EMAIL}`,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lincoln",
                "addressRegion": "England",
                "addressCountry": "GB",
              },
              "worksFor": { "@type": "Organization", "name": "HWM Global" },
              "alumniOf": { "@type": "CollegeOrUniversity", "name": "University of Lincoln" },
              "url": `${SITE_URL}/`,
              "sameAs": [LINKEDIN_URL, GITHUB_URL],
              "knowsAbout": KNOWS_ABOUT,
            }).replace(/</g, "\\u003c"),
          }}
        />
        <Script id="goatcounter-settings" strategy="beforeInteractive">
          {`window.goatcounter = { referrer: function () { return goatcounter.get_query('ref') || goatcounter.get_query('utm_source') || document.referrer || undefined; } };`}
        </Script>
        <Script
          data-goatcounter="https://thomashcook.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
