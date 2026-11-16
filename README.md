# Thomas Cook — portfolio, CV and case studies

Software engineer based in Lincoln, UK (C#/.NET, React, Azure, AWS).

- Live site: https://tomhcook.github.io/code-problems/
- CV: https://tomhcook.github.io/code-problems/cv
- Case studies: https://tomhcook.github.io/code-problems/solutions/casestudies

## What is in this repo

| Path | Contents |
| --- | --- |
| `portfolio/` | Next.js static site (CV page, case studies, solutions dashboard) |
| `Solutions/CaseStudies/` | Case study write-ups (`Readme.md` + `metadata.json`) |
| `Solutions/LeetCode`, `DailyCodingProblems`, `GreatFrontEnd` | Algorithm and interview practice solutions |
| `CV.md` | Source text of the CV |

## Run locally

```bash
cd portfolio
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to portfolio/out (also regenerates sitemap.xml and feed.xml)
```

On Windows, `start-site.cmd` in the repo root does the same.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds `portfolio/out` and publishes it to GitHub Pages.

## Tagged links (for analytics)

The site uses GoatCounter. Add `?ref=<source>` to links you share so the referrer report separates channels:

- `/cv?ref=linkedin`
- `/cv?ref=github`
- `/cv?ref=cv-pdf`
- `/cv?ref=application`

Role-specific views pre-select the experience filter: `?hat=backend`, `?hat=cloud`, `?hat=web`, `?hat=maui`, `?hat=lead`. Combine them, e.g. `/cv?hat=cloud&ref=application`.
