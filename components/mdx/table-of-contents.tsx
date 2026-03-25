"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export type TocItem = {
  id: string;
  depth: 2 | 3;
  title: string;
};

type TableOfContentsProps = {
  items: readonly TocItem[];
  variant?: "desktop" | "mobile";
};

export function TableOfContents({
  items,
  variant = "desktop",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  const renderItems = () => (
    <ul className={cn("text-sm", variant === "desktop" ? "space-y-0.5" : "space-y-1")}>
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <li
            key={item.id}
            className={cn("relative", item.depth === 3 && "ml-4")}
          >
            <a
              href={`#${item.id}`}
              onClick={() => variant === "mobile" && setMobileOpen(false)}
              className={cn(
                "flex items-baseline py-1.5 transition-all duration-200",
                isActive
                  ? "font-semibold text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="shrink-0 mr-2 text-[10px] opacity-40">
                {item.depth === 2 ? "§" : "•"}
              </span>
              <span className={cn(
                "leading-snug",
                isActive && "underline decoration-[var(--gold)] underline-offset-4"
              )}>
                {item.title}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  if (variant === "desktop") {
    return (
      <aside aria-label="Mục lục" className="hidden lg:block lg:w-[min(20rem,28vw)] lg:shrink-0">
        <nav className="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col" aria-label="Mục lục bài viết">
          <div className="mb-6 flex items-center justify-between border-b border-border/40 pb-2 shrink-0">
            <p className="font-serif text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Cấu trúc báo cáo
            </p>
          </div>
          <ScrollArea className="flex-1 w-full pr-4 overflow-y-auto toc-scroll-area">
            {renderItems()}
          </ScrollArea>
        </nav>
      </aside>
    );
  }

  // Mobile Floating Drawer
  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className={cn(
          "w-12 h-12 flex justify-center items-center fixed bottom-6 right-6 z-40 lg:hidden rounded-full border border-[var(--gold)]/50 bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all duration-300 active:scale-95",
          mobileOpen ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
        )}
        aria-label="Mở Mục lục"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
      </button>

      <div
        className={cn(
          "lg:hidden fixed inset-0 z-50 transition-opacity duration-300 pointer-events-none",
          mobileOpen ? "opacity-100" : "opacity-0"
        )}
      >
        <div 
          className={cn(
            "absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setMobileOpen(false)} 
        />
        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl border-t border-[var(--gold)]/50 bg-card p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pointer-events-auto transition-transform duration-300 ease-in-out flex flex-col",
            mobileOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="mb-4 flex items-center justify-between border-b border-border/40 pb-2 shrink-0">
            <p className="font-serif text-sm font-bold uppercase tracking-widest text-primary">
              Mục lục
            </p>
            <button 
              onClick={() => setMobileOpen(false)} 
              className="p-1 text-muted-foreground hover:bg-muted rounded-full transition-colors"
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 pb-8">
            {renderItems()}
          </div>
        </div>
      </div>
    </>
  );
}
