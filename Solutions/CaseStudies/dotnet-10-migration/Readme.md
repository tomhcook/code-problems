# Migrating Four Apps from .NET 9 to .NET 10: Package Versions, Pipelines and File Conversion

Migrated four connected applications from .NET 9 to .NET 10. The migration itself was mostly mechanical, but three things caused real work: package version conflicts that broke the release pipelines, odd behaviour changes in the backend file conversion code, and starting later than would have been ideal.

## At a glance
* **Scope**: Four applications moved from .NET 9 to .NET 10.
* **What broke**: Package versions that failed CI/CD on release builds, and unexpected backend changes around file conversion.
* **Safety net**: Automated xUnit tests and updated Azure DevOps pipelines.
* **Outcome**: All four apps migrated and released.

## Technical Showcase
* **Stack**: C#, .NET 10, ASP.NET Core, background services, xUnit
* **CI/CD**: Azure DevOps build and release pipelines
* **Role**: Led the migration across the four applications

---

## 1. The Challenge
Four applications shared libraries and depended on each other, so they had to move together. A version mismatch in one place could break the others, and the release pipelines had to keep working throughout.

---

## 2. What Went Wrong
* **Package versions broke the release pipelines**: Package version conflicts made CI/CD fail on release builds. The failures only appeared when releasing, not during normal development builds, which made them easy to miss until late.
* **Backend file conversion behaved differently**: Some backend code that converts files changed behaviour after the upgrade. These changes were odd and needed their own investigation and test coverage.

---

## 3. What Fixed It
* **Standardised package versions**: Aligned package versions across all four apps so they stopped diverging.
* **Updated the pipelines**: Moved the Azure DevOps YAML pipelines to the .NET 10 SDK so that release builds matched what ran locally.
* **Tests around the risky parts**: Added xUnit coverage for the file conversion paths and service lifecycles, so behaviour changes showed up as failing tests instead of production surprises.

---

## 4. Results
* **Four apps migrated** to .NET 10 and released.
* **Releases working again**: The pipeline failures were resolved by standardising the package versions and updating the pipelines.

---

## Lessons
1. **Test the release pipeline early**: Release builds failed in ways that normal builds did not, so run a release build as soon as the first project is upgraded.
2. **Keep package versions in one place**: Version differences between connected apps cause most of the surprises.
3. **Start sooner and keep control of the timing**: With more control over when development started, the migration could have begun earlier and left more room for the unexpected file conversion changes.
