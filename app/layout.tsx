import type { Metadata, Viewport } from "next";
// Fonts are bundled from npm (not downloaded from Google at build time),
// so builds are reliable and the Android app works offline.
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";

export const metadata: Metadata = {
  title: "IDROK BUSINESS",
  description: "AI-powered business research platform",
  applicationName: "Idrok Business",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Idrok", statusBarStyle: "default" },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};
export const viewport: Viewport = {
  themeColor: "#0A6CFF",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
