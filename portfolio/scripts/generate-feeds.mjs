// Generates public/sitemap.xml and public/feed.xml from the repo's solutions at build time.
import fs from "fs";
import path from "path";

const SITE = "https://tomhcook.github.io/code-problems";
const root = path.resolve(process.cwd(), "../Solutions");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function newest(dir) {
  let t = 0;
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) { if (!["bin", "obj"].includes(f.name)) t = Math.max(t, newest(p)); }
    else t = Math.max(t, fs.statSync(p).mtimeMs);
  }
  return t;
}

const entries = [];
for (const cat of fs.readdirSync(root, { withFileTypes: true })) {
  if (!cat.isDirectory() || ["bin", "obj"].includes(cat.name)) continue;
  for (const sol of fs.readdirSync(path.join(root, cat.name), { withFileTypes: true })) {
    if (!sol.isDirectory()) continue;
    const dir = path.join(root, cat.name, sol.name);
    const readmePath = fs.readdirSync(dir).find((f) => f.toLowerCase() === "readme.md");
    let title = sol.name, summary = "";
    if (readmePath) {
      const lines = fs.readFileSync(path.join(dir, readmePath), "utf-8").split(/\r?\n/);
      const h1 = lines.find((l) => l.startsWith("# "));
      if (h1) title = h1.replace(/^#\s*/, "").trim();
      summary = (lines.find((l) => l.trim() && !l.startsWith("#") && !l.startsWith("*") && !l.startsWith("-")) || "").replace(/\*\*/g, "").trim();
    }
    entries.push({ cat: cat.name.toLowerCase(), slug: sol.name.toLowerCase(), title, summary, mtime: new Date(newest(dir)) });
  }
}

const day = (d) => d.toISOString().slice(0, 10);
const now = new Date();
const urls = [
  { loc: `${SITE}/`, lastmod: day(now), priority: "1.00" },
  { loc: `${SITE}/cv`, lastmod: day(now), priority: "0.90" },
  { loc: `${SITE}/solutions/casestudies`, lastmod: day(now), priority: "0.85" },
  ...entries.map((e) => ({
    loc: `${SITE}/solutions/${e.cat}/${e.slug}`,
    lastmod: day(e.mtime),
    priority: e.cat === "casestudies" ? "0.80" : "0.60",
  })),
];
fs.writeFileSync(
  path.resolve("public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n") +
    `\n</urlset>\n`
);

const cs = entries.filter((e) => e.cat === "casestudies").sort((a, b) => b.mtime - a.mtime);
fs.writeFileSync(
  path.resolve("public/feed.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>\n<title>Thomas Cook — Case Studies</title>\n<link>${SITE}/solutions/casestudies</link>\n<description>Engineering case studies by Thomas Cook, Software Engineer.</description>\n` +
    cs.map((e) => `<item><title>${esc(e.title)}</title><link>${SITE}/solutions/${e.cat}/${e.slug}</link><guid>${SITE}/solutions/${e.cat}/${e.slug}</guid><pubDate>${e.mtime.toUTCString()}</pubDate><description>${esc(e.summary)}</description></item>`).join("\n") +
    `\n</channel></rss>\n`
);
console.log(`Generated sitemap (${urls.length} urls) and feed (${cs.length} items)`);
