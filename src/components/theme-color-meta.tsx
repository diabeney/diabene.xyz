"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeColorMeta() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }

    const themeColor =
      resolvedTheme === "dark" ? "oklch(0.17 0.0041 106.83)" : "oklch(0.99 0.0164 107.04)";
    metaThemeColor.setAttribute("content", themeColor);
  }, [resolvedTheme, mounted]);

  return null;
}
