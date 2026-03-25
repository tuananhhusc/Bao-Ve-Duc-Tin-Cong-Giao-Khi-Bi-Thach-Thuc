"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { SiteSearch } from "@/components/search/site-search";
import { TableOfContents, type TocItem } from "@/components/mdx/table-of-contents";

import { ReadingChrome } from "./reading-chrome";
import { ReadingToolbar } from "./reading-toolbar";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type ReadingShellProps = {
  children: ReactNode;
  toc: readonly TocItem[];
  lastUpdated: Date;
};

export function ReadingShell({ children, toc, lastUpdated }: ReadingShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 150) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true);  // scrolling up
      }
      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <div className="flex min-h-full flex-col">
      <div 
        className={cn(
          "sticky top-0 z-30 w-full transition-transform duration-300 ease-in-out bg-background/95 backdrop-blur",
          isVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <SiteHeader onOpenSearch={() => setSearchOpen(true)} />
        <ReadingToolbar />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:gap-10 lg:px-8">
        <TableOfContents items={toc} variant="mobile" />
        <TableOfContents items={toc} variant="desktop" />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <SiteFooter lastUpdated={lastUpdated} />
      <ReadingChrome />
      {searchOpen ? (
        <SiteSearch onClose={() => setSearchOpen(false)} />
      ) : null}
    </div>
  );
}
