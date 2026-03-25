"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ReadingChrome() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
      setShowTop(el.scrollTop > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div
        className="no-print pointer-events-none fixed left-0 right-0 top-0 z-50 h-[3px] bg-muted/50"
        aria-hidden
      >
        <div
          className="h-full origin-left bg-primary/90 transition-[transform] duration-150 ease-out shadow-[0_1px_3px_var(--primary)] text-shadow-sm"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      {showTop ? (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="no-print fixed bottom-20 right-6 z-40 h-11 w-11 lg:bottom-6 rounded-full border border-[var(--gold)]/50 bg-background/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all duration-300 hover:scale-110 active:scale-90"
          onClick={scrollTop}
          aria-label="Về đầu trang"
        >
          <ArrowUp className="h-5 w-5" aria-hidden />
        </Button>
      ) : null}
    </>
  );
}
