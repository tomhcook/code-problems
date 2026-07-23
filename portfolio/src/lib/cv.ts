import fs from "fs";
import path from "path";

export interface CVSkill {
  name: string;
  level: string;
  percentage: number;
}

export function getCVSkills(): CVSkill[] {
  const cvPath = path.join(process.cwd(), "../CV.md");
  if (!fs.existsSync(cvPath)) {
    // Return defaults if CV.md doesn't exist
    return getDefaultSkills();
  }

  try {
    const content = fs.readFileSync(cvPath, "utf-8");
    const lines = content.split(/\r?\n/);
    const skills: CVSkill[] = [];
    
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
        // Parse line: * **Backend Dev (C# / .NET)**: Advanced (95%)
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

    if (skills.length > 0) {
      return skills;
    }
  } catch (error) {
    console.error("Failed to parse CV.md skills:", error);
  }

  return getDefaultSkills();
}

function getDefaultSkills(): CVSkill[] {
  return [
    { name: "Backend Dev (C# / .NET)", level: "Advanced", percentage: 95 },
    { name: "Full Stack Web (React / TS)", level: "Advanced", percentage: 90 },
    { name: "Databases (MSSQL)", level: "Advanced", percentage: 90 },
    { name: "Mobile Dev (.NET MAUI)", level: "Intermediate", percentage: 80 },
    { name: "Cloud & DevOps (Azure / AWS)", level: "Intermediate", percentage: 75 },
    { name: "AI & LLM Integrations", level: "Intermediate", percentage: 75 },
    { name: "Python Engineering", level: "Advanced", percentage: 85 }
  ];
}
