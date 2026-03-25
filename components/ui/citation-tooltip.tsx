"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CitationWrapper({ children, className, href: directHref, ...props }: any) {
  const [content, setContent] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [href, setHref] = useState<string | null>(directHref || null);

  useEffect(() => {
    if (!href && children?.props?.href) {
      setHref(children.props.href);
    }
  }, [children, href]);

  const handleMouseEnter = () => {
    if (!content && href) {
      try {
        const cleanHref = href.startsWith("#") ? href : "";
        if (!cleanHref) return;

        const id = cleanHref.substring(1);
        // Try direct ID, then common markdown prefixes
        const el = document.getElementById(id) || 
                   document.getElementById(`user-content-${id}`) ||
                   document.querySelector(`[id$="${id}"]`); // wildcard fallback
        
        if (el) {
          // Clone to avoid side effects, remove the back-link arrow ↩
          const text = el.cloneNode(true) as HTMLElement;
          const backLinks = text.querySelectorAll('a[href^="#fnref"], .footnote-backref');
          backLinks.forEach(link => link.remove());
          
          setContent(text.textContent?.trim() || "");
        }
      } catch (e) {
        console.warn("Tooltip extraction failed", e);
      }
    }
    setShow(true);
  };

  return (
    <sup
      className={cn("group relative inline-flex cursor-help transition-transform hover:scale-110", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
      {...props}
    >
      {children}
      {show && content && (
        <span className="absolute bottom-full left-1/2 z-[100] mb-3 w-64 -translate-x-1/2 animate-in fade-in zoom-in-95 duration-200 rounded-lg border border-[var(--gold)]/40 bg-background/98 p-4 text-left shadow-2xl backdrop-blur-md sm:w-80 pointer-events-none block">
          <span className="line-clamp-6 font-serif text-[0.9375rem] italic leading-relaxed text-foreground/90 selection:bg-[var(--gold)]/30 block">
            {content}
          </span>
          {/* Arrow */}
          <span className="absolute -bottom-2.5 left-1/2 -ml-2.5 h-0 w-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-[var(--gold)]/40 block"></span>
          <span className="absolute -bottom-2 left-1/2 -ml-2.5 h-0 w-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-background block"></span>
        </span>
      )}
    </sup>
  );
}
