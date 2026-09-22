import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Web app manifest — served at /manifest.webmanifest. Next.js links it from
// <head> automatically. Improves mobile/PWA signals and install behavior.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Healthcare Workforce Solutions`,
    short_name: site.shortName,
    description:
      "Women-owned, vendor-neutral healthcare workforce MSP delivering data-informed staffing, workforce management, and consulting.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f5f3f8",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      {
        src: site.iconOutline,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
