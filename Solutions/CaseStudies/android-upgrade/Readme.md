# Android 16 & .NET 10 Migration across Multi-App Ecosystem (HWM)

Migrated multiple enterprise applications at **HWM** from .NET 9 to .NET 10, and upgraded a cross-platform .NET MAUI mobile application to target Android 16 (SDK 36). The upgrade has been merged and released.

## At a glance
* **Problem**: Keep store compliance and API compatibility across a mobile app, web APIs and worker services as Android 16 and .NET 10 arrived.
* **Scope**: .NET 9 to .NET 10 across several connected apps, plus the MAUI app targeting SDK 36.
* **Safety net**: xUnit test suites and updated Azure DevOps pipelines.
* **Outcome**: Released, with the mobile and backend apps supporting Android 16.

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

## What broke when the app targeted Android 16 (SDK 36)
The app is made of native .NET MAUI screens. Raising the target to SDK 36 broke three things that all had to be fixed before release.

### 1. Edge-to-edge: stretched screens that were hard to use
Apps targeting recent Android versions are drawn edge to edge by default, which means content is laid out behind the system bars. On Android 16 the opt-out is removed for apps that target SDK 36. After the upgrade the screens looked stretched, and controls were hard to tap, because layouts that used to sit inside the safe area were now drawn under the status and navigation bars.

### 2. Top bars: the top of the screen could not be tapped
The same change meant the top of the screen overlapped the system status bar, so the settings controls at the top could not be tapped. Layouts needed to take the system-bar insets into account so that the top bar sits below the status bar and stays clickable.

### 3. USB: devices refused to connect
The app connects to external devices over USB. On Android 16 those devices refused to connect. The fix was to move the USB connection code on the branch to a newer method for requesting and holding USB permission, instead of the older approach.

An example of the standard Android USB host permission flow in C# (illustrative, with placeholder names, not code from the project):

```csharp
const string UsbPermissionAction = "com.example.app.USB_PERMISSION";

var usbManager = (UsbManager)context.GetSystemService(Context.UsbService)!;

foreach (var device in usbManager.DeviceList!.Values)
{
    if (usbManager.HasPermission(device))
    {
        OpenDevice(usbManager, device);
        continue;
    }

    // Explicit intent, mutable PendingIntent: required so the system can add the result extras.
    var intent = new Intent(UsbPermissionAction).SetPackage(context.PackageName);
    var pending = PendingIntent.GetBroadcast(context, 0, intent, PendingIntentFlags.Mutable);
    usbManager.RequestPermission(device, pending);
}

// Register the receiver as not exported (required on newer Android versions).
ContextCompat.RegisterReceiver(context, usbReceiver,
    new IntentFilter(UsbPermissionAction), ContextCompat.ReceiverNotExported);
```

The receiver then checks `UsbManager.ExtraPermissionGranted` and only opens the device when permission was granted.

### Lesson
None of these problems showed up as build errors or exception messages. They appeared only on a real device running Android 16, as screens that looked wrong, controls that could not be tapped and devices that would not connect, so testing on Android 16 hardware early matters more than the build passing.

---

## 2. Technical Implementation & Design Decisions
* **System-Wide .NET 10 Upgrade**: Led the migration of project files, packages, and build environments across multiple microservices and the MAUI app. Standardized package dependencies to eliminate version skew during build time.
* **SDK 36 Integration & Service Refactoring**: Configured MSBuild project targets to build against SDK 36, and restructured background worker lifecycle handlers in the mobile app to comply with Android 16 background restrictions.
* **Automated Testing Suite**: Implemented xUnit test suites to validate MAUI platform handlers, API serialization, and service lifecycles to detect regressions early in the upgrade cycle.
* **DevOps Pipeline Migration**: Updated Azure DevOps YAML pipelines to use the .NET 10 SDK and SDK 36 build tooling, ensuring seamless CI/CD execution.

---

## 3. Results
* **Released**: The consolidated multi-app upgrade passed CI/CD verification and automated testing, and has been merged and released.
* **Compliance**: The mobile and backend ecosystem now supports Android 16 (SDK 36) devices and runs on .NET 10.
