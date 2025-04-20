import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Diabene Yaw Addo | Portfolio",
    short_name: "Diabene",
    description: "Software Engineer",
    start_url: "/",
    display: "standalone",
    background_color: "oklch(0.99 0.0164 107.04)",
    theme_color: "oklch(0.99 0.0164 107.04)",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
