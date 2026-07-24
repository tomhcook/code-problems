# Android 16 Platform Migration & MAUI Upgrade (HWM)

An active engineering task at **HWM** focusing on migrating a cross-platform mobile application from Android 15 to Android 16, incorporating platform API updates and automated test coverage.

## Technical Showcase
* **Role**: Mobile Developer (C# / .NET MAUI)
* **Architecture**: .NET MAUI Mobile App
* **Backend & Infrastructure**: C#, .NET MAUI, Android SDK 36, xUnit
* **Hosting & CI/CD**: Azure DevOps build pipelines
* **Deployment**: Full responsibility for performing and managing production deployments personally

---

## 1. The Challenge
With the release of Android 16 (SDK 36), the mobile app required upgrades to maintain store compliance and leverage platform enhancements. The objective was to:
1. Target Android SDK 36 and resolve all compiler and API deprecations.
2. Maintain application features while adapting to new Android background service constraints.
3. Write automated unit and UI integration tests to prevent regressions.
4. Prepare and merge the upgrade Pull Request within a single sprint.

---

## 2. Technical Implementation & Design Decisions
* **SDK Upgrade**: Configured MSBuild project targets to build against SDK 36, resolving MAUI platform rendering issues.
* **Automated Testing**: Wrote xUnit tests to validate critical path platform handlers and service lifecycles.
* **PR Integration**: Delivered a single clean, documented Upgrade PR outlining SDK changes and test executions.

---

## 3. Current Status & Impact
* **Ongoing Verification**: Upgrade PR is active and running through the Azure DevOps CI/CD automated pipeline.
* **Compliance Ready**: Positioned the codebase to safely support Android 16 devices on day one.
