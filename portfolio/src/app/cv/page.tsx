import { Metadata } from "next";
import { getAllSolutions } from "../../lib/solutions";
import { getCVSkills } from "../../lib/cv";
import CVClient from "./CVClient";

export const metadata: Metadata = {
  title: "Thomas Cook — Software Engineer | Official CV & Resume",
  description: "Official software engineering portfolio & CV of Thomas Cook. Specialized in C#, .NET Core, ASP.NET Core, SQL Database Optimization, React, TypeScript, and Azure DevOps at HWM Global.",
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
    canonical: "https://tomhcook.github.io/code-problems/cv",
  },
  openGraph: {
    title: "Thomas Cook — Software Engineer | Official CV & Resume",
    description: "Official software engineering portfolio & CV of Thomas Cook. Specialized in C#, .NET Core, ASP.NET Core, SQL Database Optimization, React, TypeScript, and Azure DevOps at HWM Global.",
    url: "https://tomhcook.github.io/code-problems/cv",
    siteName: "Thomas Cook — Software Engineer",
    images: [
      {
        url: "https://media.licdn.com/dms/image/v2/D4E03AQFHVzNHJljAnw/profile-displayphoto-scale_400_400/B4EZ.PYwdcGgAg-/0/1784817061315?e=1786579200&v=beta&t=CF11sK9kk0Z1RGCtwGGrmjM9xWxa-TQRaqreTJc5RU4",
        width: 400,
        height: 400,
        alt: "Thomas Cook Software Engineer",
      },
    ],
    locale: "en_GB",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Thomas Cook — Software Engineer | Official CV & Resume",
    description: "Official software engineering portfolio & CV of Thomas Cook. Specialized in C#, .NET Core, ASP.NET Core, SQL Database Optimization, React, TypeScript, and Azure DevOps.",
    images: ["https://media.licdn.com/dms/image/v2/D4E03AQFHVzNHJljAnw/profile-displayphoto-scale_400_400/B4EZ.PYwdcGgAg-/0/1784817061315?e=1786579200&v=beta&t=CF11sK9kk0Z1RGCtwGGrmjM9xWxa-TQRaqreTJc5RU4"],
  },
};

export default function CVPage() {
  const solutions = getAllSolutions();
  const skills = getCVSkills();
  return <CVClient solutions={solutions} cvSkills={skills} />;
}
