# Android 16 & .NET 10 Migration across Multi-App Ecosystem (HWM)

An active engineering initiative at **HWM** focusing on migrating multiple enterprise applications from .NET 9 to .NET 10, alongside upgrading a critical cross-platform mobile application to support Android 16 (SDK 36).

## Technical Showcase
* **Role**: Mobile & Systems Developer (C# / .NET)
* **Architecture**: .NET MAUI Mobile App, ASP.NET Core Web APIs, Background Services
* **Backend & Infrastructure**: C#, .NET 10, Android SDK 36, MAUI, xUnit
* **Hosting & CI/CD**: Azure DevOps build & release pipelines
* **Deployment**: Full responsibility for managing and verifying multi-app releases

---

## 1. The Challenge
With the release of Android 16 (SDK 36) and the availability of .NET 10, HWM required a comprehensive upgrade of its mobile and backend services to maintain store compliance, ensure API compatibility, and leverage performance optimizations.

Key challenges included:
1. **Multi-App Orchestration**: Upgrading the shared libraries and dependencies from .NET 9 to .NET 10 across multiple connected applications (Mobile App, Web APIs, and worker services) without causing breaking API mismatches.
2. **Android 16 Platform Deprecations**: Targeting SDK 36, which introduced stricter background service execution limits, media permission constraints, and updated platform rendering behavior in MAUI.
3. **MAUI Compatibility**: Troubleshooting runtime rendering differences and dependency conflicts between the new .NET 10 MAUI workload and legacy custom UI handlers.
4. **Regression Prevention**: Ensuring all business-critical paths continued to function by writing comprehensive automated integration and unit test coverage.

---

## 2. Technical Implementation & Design Decisions
* **System-Wide .NET 10 Upgrade**: Led the migration of project files, packages, and build environments across multiple microservices and the MAUI app. Standardized package dependencies to eliminate version skew during build time.
* **SDK 36 Integration & Service Refactoring**: Configured MSBuild project targets to build against SDK 36, and restructured background worker lifecycle handlers in the mobile app to comply with Android 16 background restrictions.
* **Automated Testing Suite**: Implemented xUnit test suites to validate MAUI platform handlers, API serialization, and service lifecycles to detect regressions early in the upgrade cycle.
* **DevOps Pipeline Migration**: Updated Azure DevOps YAML pipelines to use the .NET 10 SDK and SDK 36 build tooling, ensuring seamless CI/CD execution.

---

## 3. Current Status & Impact
* **Upgrade PR Active**: The consolidated multi-app upgrade PR is undergoing CI/CD verification and pipeline automated testing.
* **Compliance & Future Proof**: Successfully positioned the mobile and backend ecosystem to support Android 16 devices on day one with maximum performance benefits from .NET 10.
