import fs from "fs";
import path from "path";

export interface SolutionFile {
  name: string;
  code: string;
  language: string;
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
}

const SOLUTIONS_DIR = path.join(process.cwd(), "../Solutions");

const EXTENSION_MAP: Record<string, string> = {
  ".py": "python",
  ".cpp": "cpp",
  ".c++": "cpp",
  ".cc": "cpp",
  ".c": "c",
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
  // Fallback to formatting the slug: e.g. "001-TwoSum" -> "001: TwoSum", "DCP-1288" -> "DCP 1288"
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
  return category;
}

export function getAllSolutions(): Solution[] {
  if (!fs.existsSync(SOLUTIONS_DIR)) {
    console.warn(`Solutions directory not found at ${SOLUTIONS_DIR}`);
    return [];
  }

  const solutions: Solution[] = [];
  const categories = fs.readdirSync(SOLUTIONS_DIR);

  for (const category of categories) {
    const categoryPath = path.join(SOLUTIONS_DIR, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const folders = fs.readdirSync(categoryPath);
    for (const folder of folders) {
      const folderPath = path.join(categoryPath, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      const files = fs.readdirSync(folderPath);
      let readmeContent = "";
      const codeFiles: SolutionFile[] = [];

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);
        
        // Handle folder named Readme.md (e.g. LeetCode/001-TwoSum/Readme.md if empty)
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

      // Try to parse title from Readme
      let title = "";
      let summary = "";
      if (readmeContent) {
        const lines = readmeContent.split("\n");
        const titleLine = lines.find((l) => l.trim().startsWith("#"));
        if (titleLine) {
          title = formatTitle(folder, titleLine);
        }
        
        // Extract a brief summary: first paragraph after title
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

      solutions.push({
        id: `${category.toLowerCase()}-${folder.toLowerCase()}`,
        slug: folder.toLowerCase(),
        title,
        category: category.toLowerCase(),
        categoryLabel: getCategoryLabel(category),
        readme: readmeContent || "No description provided.",
        summary: summary || "View solutions for this challenge.",
        files: codeFiles,
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
