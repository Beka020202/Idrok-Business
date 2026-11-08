# IDROK BUSINESS

Step 1: project setup + design system (Idrok blue, iOS-style, glass) + Uzbek/Russian text.

## Run it
```
npm install
npm run dev
```
Open http://localhost:3000

## What is here
- `tailwind.config.ts` / `app/globals.css`: design tokens (light + dark)
- `lib/i18n.ts`: all text in Uzbek (Latin) and Russian, same keys
- `components/ui.tsx`: Card, Pill, Button, ProgressBar, Locked (blurred glass padlock)
- `app/page.tsx`: first dashboard screen. All numbers are DEMO data.

Nothing here spends money. Purchasing stays disabled.

## Android APK
The app is wrapped with Capacitor (`android/`). GitHub Actions (`.github/workflows/android-apk.yml`)
builds the APK on every push and attaches it to the **"Latest APK"** release (tag `apk-latest`).
Local build (needs Android SDK): `npm run android:sync`, then `cd android && ./gradlew assembleDebug`.
