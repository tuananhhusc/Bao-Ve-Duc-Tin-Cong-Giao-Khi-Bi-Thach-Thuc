"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type ThemeValue = "light" | "dark" | "sepia";
type FontScale = "sm" | "md" | "lg";
type WidthPref = "narrow" | "md" | "wide";

function applyTheme(theme: ThemeValue) {
  const root = document.documentElement;
  if (theme === "light") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* ignore */
  }
}

function syncArticleReadingPrefs() {
  const el = document.getElementById("article");
  if (!el) return;
  let font: FontScale = "md";
  let width: WidthPref = "md";
  try {
    const fs = localStorage.getItem("reading-font-scale");
    const w = localStorage.getItem("reading-width");
    if (fs === "sm" || fs === "md" || fs === "lg") font = fs;
    if (w === "narrow" || w === "md" || w === "wide") width = w;
  } catch {
    /* ignore */
  }
  el.setAttribute("data-font-scale", font);
  el.setAttribute("data-reading-width", width);
}

export function ReadingToolbar({ className }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeValue>("light");
  const [fontScale, setFontScale] = useState<FontScale>("md");
  const [widthPref, setWidthPref] = useState<WidthPref>("md");

  useEffect(() => {
    try {
      const t = localStorage.getItem("theme");
      if (t === "dark" || t === "sepia") {
        applyTheme(t);
        queueMicrotask(() => setTheme(t));
      } else {
        applyTheme("light");
        queueMicrotask(() => setTheme("light"));
      }
      const fs = localStorage.getItem("reading-font-scale");
      if (fs === "sm" || fs === "md" || fs === "lg") {
        queueMicrotask(() => setFontScale(fs));
      }
      const w = localStorage.getItem("reading-width");
      if (w === "narrow" || w === "md" || w === "wide") {
        queueMicrotask(() => setWidthPref(w));
      }
    } catch {
      /* ignore */
    }
    syncArticleReadingPrefs();
  }, []);

  const onTheme = (value: ThemeValue) => {
    setTheme(value);
    applyTheme(value);
  };

  const onFont = (value: FontScale) => {
    setFontScale(value);
    try {
      localStorage.setItem("reading-font-scale", value);
    } catch {
      /* ignore */
    }
    syncArticleReadingPrefs();
  };

  const onWidth = (value: WidthPref) => {
    setWidthPref(value);
    try {
      localStorage.setItem("reading-width", value);
    } catch {
      /* ignore */
    }
    syncArticleReadingPrefs();
  };

  return (
    <div
      className={cn(
        "no-print mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 border-b border-[var(--gold)]/20 px-4 py-3 text-sm sm:px-6 lg:px-8",
        className,
      )}
      aria-label="Tùy chọn đọc"
    >
      <label className="flex items-center gap-2 text-muted-foreground">
        <span className="whitespace-nowrap font-medium text-foreground">
          Giao diện
        </span>
        <select
          className="rounded-md border border-input bg-background px-2 py-1.5 text-foreground"
          value={theme}
          onChange={(e) => onTheme(e.target.value as ThemeValue)}
        >
          <option value="light">Sáng</option>
          <option value="sepia">Giấy sepia</option>
          <option value="dark">Tối</option>
        </select>
      </label>
      <label className="flex items-center gap-2 text-muted-foreground">
        <span className="whitespace-nowrap font-medium text-foreground">
          Chữ
        </span>
        <select
          className="rounded-md border border-input bg-background px-2 py-1.5 text-foreground"
          value={fontScale}
          onChange={(e) => onFont(e.target.value as FontScale)}
        >
          <option value="sm">Nhỏ hơn</option>
          <option value="md">Mặc định</option>
          <option value="lg">Lớn hơn</option>
        </select>
      </label>
      <label className="flex items-center gap-2 text-muted-foreground">
        <span className="whitespace-nowrap font-medium text-foreground">
          Cột
        </span>
        <select
          className="rounded-md border border-input bg-background px-2 py-1.5 text-foreground"
          value={widthPref}
          onChange={(e) => onWidth(e.target.value as WidthPref)}
        >
          <option value="narrow">Hẹp</option>
          <option value="md">Chuẩn</option>
          <option value="wide">Rộng</option>
        </select>
      </label>
    </div>
  );
}
