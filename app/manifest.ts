import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Lets the website be installed with "Add to Home Screen" (opens full-screen, Idrok icon).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Idrok Business",
    short_name: "Idrok",
    description: "AI-powered business research platform",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F5F7FB",
    theme_color: "#0A6CFF",
    lang: "uz",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
