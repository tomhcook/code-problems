import { getAllSolutions } from "../lib/solutions";
import { getCVSkills } from "../lib/cv";
import Dashboard from "./Dashboard";

export default function Home() {
  const solutions = getAllSolutions();
  const skills = getCVSkills();
  return <Dashboard solutions={solutions} cvSkills={skills} />;
}
