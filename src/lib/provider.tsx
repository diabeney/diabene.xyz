"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

const ThemeColorMeta = dynamic(() => import("../components/theme-color-meta"), {
  ssr: false,
});

export default function ThemeProviderWithMeta({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeColorMeta />
      {children}
    </ThemeProvider>
  );
}
