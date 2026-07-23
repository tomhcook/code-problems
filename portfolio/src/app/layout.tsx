import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thomas Cook Portfolio",
  description: "Software Engineer & Full Stack Developer Solutions Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
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

              <div className="nav-search-mock">
                <span>Type <kbd style={{ background: "#21262d", padding: "1px 4px", borderRadius: "3px", fontSize: "10px" }}>/</kbd> to search</span>
              </div>
            </div>

            <nav className="nav-links">
              <Link href="/" className="nav-link">
                Dashboard
              </Link>
              <Link href="/cv" className="nav-link">
                My CV
              </Link>
            </nav>
          </div>
        </header>
        <div style={{ flex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
