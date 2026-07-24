import { Metadata } from "next";
import { getAllSolutions } from "../lib/solutions";
import { getCVSkills } from "../lib/cv";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Thomas Cook | Software Engineering Portfolio & Solutions",
  description: "Explore the portfolio, code challenge solutions, and technical case studies of Thomas Cook, a Full Stack Developer & Software Engineer.",
};

export default function Home() {
  const solutions = getAllSolutions();
  const skills = getCVSkills();
  return <Dashboard solutions={solutions} cvSkills={skills} />;
}
