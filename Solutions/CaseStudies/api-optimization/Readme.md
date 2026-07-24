# API Performance Optimization & Systems Integration (HWM)

An optimization initiative executed at **HWM** that successfully reduced core API response times by 60% across 9 cycles of Shape Up product development, supporting system-wide stability and bug reduction.

## Technical Showcase
* **Role**: Full Stack Developer (Core Systems & Integration)
* **Architecture**: C# Web API & React Services
* **Backend & Infrastructure**: C#, React, Docker, SQL, Azure MSSQL
* **Hosting & CI/CD**: Azure DevOps pipelines & cloud hosting environment
* **Deployment**: Full responsibility for performing and managing production deployments personally

---

## 1. The Challenge
High latency in core API endpoints was causing application lag and slow load times for client interfaces. The objective was to:
1. Identify bottleneck queries and refactor slower REST API endpoints under a Shape Up cycle structure.
2. Deliver key features within the 4-week building phase.
3. Manage carrier systems integrations (UPS, DHL) and async routing.
4. Clean up the codebase and resolve production issues during the 2-week cool-down/bug-fixing phase.

---

## 2. Technical Implementation & Design Decisions
* **API Latency Cut**: Refactored SQL query execution paths, added index tuning in MSSQL, and introduced a Redis-based state caching layer for high-frequency endpoints.
* **Shape Up Cycle Delivery**: Led development across 9 cycles. Merged 50+ Pull Requests for new backend features during 4-week cycles.
* **Dedicated Bug-Fixing Cycles**: Proactively resolved side-bugs and edge cases during the 2-week cool-down/fixing period of each cycle to dramatically reduce regression tickets.

---

## 3. Results & Business Impact
* **60% Performance Speedup**: Core API response times were cut by approximately 60%, drastically improving user experience.
* **High Output & Reliability**: Maintained consistent feature delivery with 50+ PRs successfully merged in 9 sprints.
* **System Stability**: Proactive bug fixing during the 2-week cool-down phases significantly lowered weekly support ticket counts.
