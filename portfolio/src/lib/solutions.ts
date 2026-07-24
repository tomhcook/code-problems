import fs from "fs";
import path from "path";

export interface SolutionFile {
  name: string;
  code: string;
  language: string;
}

export interface ComplexityInfo {
  time: string;
  space: string;
  label: string;
}

export interface Solution {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  readme: string;
  summary: string;
  files: SolutionFile[];
  date: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  complexity?: ComplexityInfo;
}

let LEETCODE_DIFFICULTY: Record<string, "Easy" | "Medium" | "Hard"> = {};
try {
  const difficultiesFile = path.join(process.cwd(), "src/lib/leetcode-difficulties.json");
  if (fs.existsSync(difficultiesFile)) {
    LEETCODE_DIFFICULTY = JSON.parse(fs.readFileSync(difficultiesFile, "utf-8"));
  }
} catch (err) {
  console.error("Failed to load leetcode-difficulties.json", err);
}

const SOLUTIONS_DIR = path.join(process.cwd(), "../Solutions");

const EXTENSION_MAP: Record<string, string> = {
  ".py": "python",
  ".cpp": "cpp",
  ".c++": "cpp",
  ".cc": "cpp",
  ".c": "c",
  ".cs": "csharp",
  ".java": "java",
  ".js": "javascript",
  ".ts": "typescript",
  ".go": "go",
  ".rs": "rust",
};

function formatTitle(slug: string, readmeTitle?: string): string {
  if (readmeTitle) {
    return readmeTitle.replace(/^#\s*/, "").trim();
  }
  return slug
    .replace("-", " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}

function getCategoryLabel(category: string): string {
  if (category.toLowerCase() === "dailycodingproblems") {
    return "Daily Coding Problems";
  }
  if (category.toLowerCase() === "leetcode") {
    return "LeetCode";
  }
  if (category.toLowerCase() === "greatfrontend") {
    return "GreatFrontEnd";
  }
  if (category.toLowerCase() === "casestudies") {
    return "Case Studies";
  }
  return category;
}

export function parseComplexityFromReadme(readmeContent: string): ComplexityInfo | null {
  if (!readmeContent) return null;

  let time: string | null = null;
  let space: string | null = null;
  let label: string = "Optimal Method";

  const lines = readmeContent.split("\n");
  for (const line of lines) {
    const l = line.trim();

    if (/\btime\b/i.test(l) && (l.includes("O(") || /complexity/i.test(l))) {
      const match = l.match(/O\([^)]+\)/i);
      if (match) {
        time = `${match[0]} Time`;
      }
    }

    if (/\bspace\b/i.test(l) && (l.includes("O(") || /complexity/i.test(l))) {
      const match = l.match(/O\([^)]+\)/i);
      if (match) {
        space = `${match[0]} Space`;
      }
    }

    if (/\boptimal\b|\bmethod\b|\bapproach\b|\brotation\b|\btraversal\b/i.test(l)) {
      const cleanLabel = l.replace(/^[-*#]+\s*/, "").replace(/\*\*/g, "").trim();
      if (cleanLabel.length >= 5 && cleanLabel.length <= 40) {
        label = cleanLabel;
      }
    }
  }

  if (time || space) {
    return {
      time: time || "O(N) Time",
      space: space || "O(1) Space",
      label: label || "Optimal Method",
    };
  }

  return null;
}

export function getAllSolutions(): Solution[] {
  if (!fs.existsSync(SOLUTIONS_DIR)) {
    console.warn(`Solutions directory not found at ${SOLUTIONS_DIR}`);
    return [];
  }

  const solutions: Solution[] = [];
  const categories = fs.readdirSync(SOLUTIONS_DIR);

  for (const category of categories) {
    if (["bin", "obj", ".vs", ".git", "node_modules", "out", ".next"].includes(category.toLowerCase())) continue;
    const categoryPath = path.join(SOLUTIONS_DIR, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const folders = fs.readdirSync(categoryPath);
    for (const folder of folders) {
      if (["bin", "obj", ".vs", ".git", "node_modules", "out", ".next"].includes(folder.toLowerCase())) continue;
      const folderPath = path.join(categoryPath, folder);
      const folderStat = fs.statSync(folderPath);
      if (!folderStat.isDirectory()) continue;

      const files = fs.readdirSync(folderPath);
      let readmeContent = "";
      const codeFiles: SolutionFile[] = [];

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) continue;

        const fileExt = path.extname(file).toLowerCase();
        const content = fs.readFileSync(filePath, "utf-8");

        if (file.toLowerCase() === "readme.md") {
          readmeContent = content;
        } else if (EXTENSION_MAP[fileExt]) {
          codeFiles.push({
            name: file,
            code: content,
            language: EXTENSION_MAP[fileExt],
          });
        }
      }

      let title = "";
      let summary = "";
      if (readmeContent) {
        const lines = readmeContent.split("\n");
        const titleLine = lines.find((l) => l.trim().startsWith("#"));
        if (titleLine) {
          title = formatTitle(folder, titleLine);
        }
        
        const bodyLines = lines
          .map((l) => l.trim())
          .filter((l) => l !== "" && !l.startsWith("#") && !l.startsWith(">"));
        if (bodyLines.length > 0) {
          summary = bodyLines[0];
          if (summary.length > 120) {
            summary = summary.substring(0, 117) + "...";
          }
        }
      }

      if (!title) {
        title = formatTitle(folder);
      }

      let difficulty: "Easy" | "Medium" | "Hard" | undefined = undefined;
      if (category.toLowerCase() === "leetcode") {
        const prefix = folder.substring(0, 4);
        difficulty = LEETCODE_DIFFICULTY[prefix] || "Medium";
      } else if (category.toLowerCase() === "dailycodingproblems") {
        difficulty = "Medium";
        if (
          readmeContent.toLowerCase().includes("difficulty: hard") ||
          readmeContent.toLowerCase().includes("difficulty: [hard]") ||
          readmeContent.includes("## Difficulty: Hard")
        ) {
          difficulty = "Hard";
        } else if (
          readmeContent.toLowerCase().includes("difficulty: easy") ||
          readmeContent.toLowerCase().includes("difficulty: [easy]") ||
          readmeContent.includes("## Difficulty: Easy")
        ) {
          difficulty = "Easy";
        }
      }

      const parsedComplexity = parseComplexityFromReadme(readmeContent);

      solutions.push({
        id: `${category.toLowerCase()}-${folder.toLowerCase()}`,
        slug: folder.toLowerCase(),
        title,
        category: category.toLowerCase(),
        categoryLabel: getCategoryLabel(category),
        readme: readmeContent || "No description provided.",
        summary: summary || "View solutions for this challenge.",
        files: codeFiles,
        date: folderStat.mtime.toISOString(),
        difficulty,
        complexity: parsedComplexity || undefined,
      });
    }
  }

  return solutions;
}

export function getSolutionBySlug(category: string, slug: string): Solution | undefined {
  const solutions = getAllSolutions();
  return solutions.find(
    (s) => s.category.toLowerCase() === category.toLowerCase() && s.slug.toLowerCase() === slug.toLowerCase()
  );
}
