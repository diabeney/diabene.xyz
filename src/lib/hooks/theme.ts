"use client";
import { useState, useEffect } from "react";
import { loadItem, saveItem } from "../utils/local-storage";

function useSwitchTheme() {
  const [mode, setMode] = useState<"light" | "dark">(loadItem("theme", "light"));
  function toggleTheme() {
    const isDark = mode === "dark";
    isDark ? setMode("light") : setMode("dark");
  }

  useEffect(() => {
    const isDark = mode === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    saveItem("theme", mode);
  }, [mode]);
  return { toggleTheme, mode };
}

export default useSwitchTheme;
