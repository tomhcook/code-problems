import { Metadata } from "next";
import { getAllSolutions } from "../lib/solutions";
import { getCVSkills } from "../lib/cv";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Thomas Cook — Software Engineer Portfolio & Solutions",
  description: "Official software engineering portfolio, C# & .NET projects, and code solutions of Thomas Cook, Software Engineer at HWM Global.",
  keywords: [
    "Thomas Cook software",
    "Thomas Cook software engineer",
    "Thomas Cook software developer",
    "Thomas Cook C#",
    "Thomas Cook .NET",
    "Thomas Cook HWM Global",
    "Thomas Cook developer Lincoln",
    "Thomas Cook portfolio"
  ],
  authors: [{ name: "Thomas Cook", url: "https://tomhcook.github.io/code-problems/" }],
  creator: "Thomas Cook",
  publisher: "Thomas Cook",
  alternates: {
    canonical: "https://tomhcook.github.io/code-problems/",
  },
  openGraph: {
    title: "Thomas Cook — Software Engineer Portfolio & Solutions",
    description: "Official software engineering portfolio, C# & .NET projects, and code solutions of Thomas Cook, Software Engineer at HWM Global.",
    url: "https://tomhcook.github.io/code-problems/",
    siteName: "Thomas Cook — Software Engineer",
    images: [
      {
        url: "https://tomhcook.github.io/code-problems/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thomas Cook Software Engineer Portfolio",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Thomas Cook — Software Engineer Portfolio & Solutions",
    description: "Official software engineering portfolio, C# & .NET projects, and code solutions of Thomas Cook, Software Engineer at HWM Global.",
    images: ["https://tomhcook.github.io/code-problems/og-image.jpg"],
  },
};

export default function Home() {
  const solutions = getAllSolutions();
  const skills = getCVSkills();
  return <Dashboard solutions={solutions} cvSkills={skills} />;
}
