import { getAllSolutions } from "../lib/solutions";
import Dashboard from "./Dashboard";

export default function Home() {
  const solutions = getAllSolutions();
  return <Dashboard solutions={solutions} />;
}
