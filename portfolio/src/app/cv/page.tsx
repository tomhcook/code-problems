import { Metadata } from "next";
import { getAllSolutions } from "../../lib/solutions";
import { getCVSkills } from "../../lib/cv";
import CVClient from "./CVClient";

export const metadata: Metadata = {
  title: "Thomas Cook | Software Engineer CV & Technical Resume",
  description: "Review the professional career, technical achievements, work history, and developer skills of Thomas Cook, Software Engineer & Full Stack Developer.",
};

export default function CVPage() {
  const solutions = getAllSolutions();
  const skills = getCVSkills();
  return <CVClient solutions={solutions} cvSkills={skills} />;
}
