/**
 * Shared utility helpers used across Dashboard, SolutionDetailClient, and CVClient.
 * Single source of truth — do not duplicate these in individual components.
 */

/** Returns a human-readable language label from a raw file extension key. */
export function formatLanguage(lang: string): string {
  if (lang === "cpp") return "C++";
  if (lang === "csharp") return "C#";
  return lang.charAt(0).toUpperCase() + lang.slice(1);
}

/** Returns the CSS class name for the language colour dot indicator. */
export function getLanguageColorClass(lang: string): string {
  if (lang === "cpp") return "lang-color-cpp";
  if (lang === "csharp") return "lang-color-csharp";
  if (lang === "python") return "lang-color-python";
  if (lang === "javascript") return "lang-color-javascript";
  if (lang === "typescript") return "lang-color-typescript";
  if (lang === "ruby") return "lang-color-ruby";
  return "lang-color-default";
}

/** Returns a numeric weight for sorting by difficulty (Hard=3, Medium=2, Easy=1, unknown=0). */
export function getDifficultyWeight(diff?: string): number {
  if (diff === "Hard") return 3;
  if (diff === "Medium") return 2;
  if (diff === "Easy") return 1;
  return 0;
}
