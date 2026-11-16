export interface CVSkill {
  name: string;
  level: string;
  percentage: number;
}

// One explicit list of headline skills (used by the CV sidebar, pinned cards and the dashboard).
// The full skills matrix lives in CVClient.tsx; keep the two consistent with CV.md.
const CORE_SKILLS: CVSkill[] = [
  { name: "Backend Dev (C# / .NET)", level: "Advanced", percentage: 95 },
  { name: "Full Stack Web (React / TS)", level: "Advanced", percentage: 90 },
  { name: "Databases (MSSQL)", level: "Advanced", percentage: 90 },
  { name: "Mobile Dev (.NET MAUI)", level: "Proficient", percentage: 80 },
  { name: "Cloud & DevOps (Azure / AWS)", level: "Proficient", percentage: 75 },
  { name: "Performance Testing (k6)", level: "Advanced", percentage: 85 },
];

export function getCVSkills(): CVSkill[] {
  return CORE_SKILLS;
}
