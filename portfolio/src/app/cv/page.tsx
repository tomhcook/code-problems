import { getAllSolutions } from "../../lib/solutions";
import { getCVSkills } from "../../lib/cv";
import CVClient from "./CVClient";

export default function CVPage() {
  const solutions = getAllSolutions();
  const skills = getCVSkills();
  return <CVClient solutions={solutions} cvSkills={skills} />;
}
