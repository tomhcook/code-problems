import fs from "fs";
import path from "path";
import { getAllSolutions } from "./solutions";

export interface CVSkill {
  name: string;
  level: string;
  percentage: number;
}

const LANGUAGE_TO_SKILL: Record<string, { name: string; level: string; percentage: number }> = {
  cpp: { name: "C++ Algorithms", level: "Proficient", percentage: 80 },
  c: { name: "C Programming", level: "Proficient", percentage: 75 },
  java: { name: "Java Development", level: "Proficient", percentage: 80 },
  go: { name: "Go Lang", level: "Proficient", percentage: 75 },
  rust: { name: "Rust Programming", level: "Proficient", percentage: 75 },
  ruby: { name: "Ruby Development", level: "Proficient", percentage: 75 },
  python: { name: "Python Engineering", level: "Advanced", percentage: 85 },
  csharp: { name: "Backend Dev (C# / .NET)", level: "Advanced", percentage: 95 },
  javascript: { name: "Full Stack Web (React / TS)", level: "Advanced", percentage: 90 },
  typescript: { name: "Full Stack Web (React / TS)", level: "Advanced", percentage: 90 },
};

export function getCVSkills(): CVSkill[] {
  const cvPath = path.join(process.cwd(), "../CV.md");
  let skills: CVSkill[] = [];
  
  if (fs.existsSync(cvPath)) {
    try {
      const content = fs.readFileSync(cvPath, "utf-8");
      const lines = content.split(/\r?\n/);
      let inSkillsSection = false;

      for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed.startsWith("##")) {
          if (trimmed.toLowerCase().includes("skills")) {
            inSkillsSection = true;
          } else {
            inSkillsSection = false;
          }
          continue;
        }

        if (inSkillsSection && trimmed.startsWith("*")) {
          const match = trimmed.match(/\*\s*\*\*(.*?)\*\*:\s*(.*?)\s*\((\d+)%\)/);
          if (match) {
            skills.push({
              name: match[1].trim(),
              level: match[2].trim(),
              percentage: parseInt(match[3], 10)
            });
          }
        }
      }
    } catch (error) {
      console.error("Failed to parse CV.md skills:", error);
    }
  }

  if (skills.length === 0) {
    skills = getDefaultSkills();
  }

  // Dynamically append any skills used in the solutions & case studies
  try {
    const solutions = getAllSolutions();
    const usedLanguages = new Set<string>();
    
    // Keyword-to-skill map for scanning readmes (especially for Case Studies)
    const KEYWORD_TO_SKILL: Record<string, { name: string; level: string; percentage: number }> = {
      docker: { name: "Containerization (Docker)", level: "Proficient", percentage: 80 },
      redis: { name: "Caching & Redis", level: "Proficient", percentage: 80 },
      azure: { name: "Cloud & DevOps (Azure / AWS)", level: "Proficient", percentage: 75 },
      aws: { name: "Cloud & DevOps (Azure / AWS)", level: "Proficient", percentage: 75 },
      ruby: { name: "Ruby Development", level: "Proficient", percentage: 75 },
      sql: { name: "Databases (MSSQL)", level: "Advanced", percentage: 90 },
      mssql: { name: "Databases (MSSQL)", level: "Advanced", percentage: 90 },
      devops: { name: "Cloud & DevOps (Azure / AWS)", level: "Proficient", percentage: 75 },
      react: { name: "Full Stack Web (React / TS)", level: "Advanced", percentage: 90 },
      typescript: { name: "Full Stack Web (React / TS)", level: "Advanced", percentage: 90 },
    };

    for (const sol of solutions) {
      // Scan languages from code files
      for (const file of sol.files) {
        if (file.language) {
          usedLanguages.add(file.language.toLowerCase());
        }
      }

      // Scan keywords from readme text (for Case Studies which don't have code files)
      if (sol.readme) {
        const readmeLower = sol.readme.toLowerCase();
        for (const [keyword, skillInfo] of Object.entries(KEYWORD_TO_SKILL)) {
          const regex = new RegExp(`\\b${keyword}\\b`, "i");
          if (regex.test(readmeLower)) {
            const exists = skills.some(s => 
              s.name.toLowerCase().includes(skillInfo.name.toLowerCase()) || 
              skillInfo.name.toLowerCase().includes(s.name.toLowerCase())
            );
            if (!exists) {
              skills.push(skillInfo);
            }
          }
        }
      }
    }
    
    for (const lang of usedLanguages) {
      const skillInfo = LANGUAGE_TO_SKILL[lang];
      if (skillInfo) {
        const exists = skills.some(s => 
          s.name.toLowerCase().includes(skillInfo.name.toLowerCase()) || 
          skillInfo.name.toLowerCase().includes(s.name.toLowerCase())
        );
        if (!exists) {
          skills.push(skillInfo);
        }
      }
    }
  } catch (err) {
    console.error("Failed to dynamically append skills from solutions:", err);
  }

  return skills;
}

function getDefaultSkills(): CVSkill[] {
  return [
    { name: "Backend Dev (C# / .NET)", level: "Advanced", percentage: 95 },
    { name: "Full Stack Web (React / TS)", level: "Advanced", percentage: 90 },
    { name: "Databases (MSSQL)", level: "Advanced", percentage: 90 },
    { name: "Mobile Dev (.NET MAUI)", level: "Proficient", percentage: 80 },
    { name: "Cloud & DevOps (Azure / AWS)", level: "Proficient", percentage: 75 },
    { name: "AI & LLM Integrations", level: "Proficient", percentage: 75 },
    { name: "Python Engineering", level: "Advanced", percentage: 85 }
  ];
}
