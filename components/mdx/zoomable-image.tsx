"use client";

import { DetailedHTMLProps, ImgHTMLAttributes, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ZoomableImage(
  props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Close zoom on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomed(false);
    };
    if (isZoomed) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isZoomed]);

  return (
    <>
      <img
        {...props}
        className={cn("cursor-zoom-in transition-all rounded-md shadow-sm border border-border/50 hover:shadow-md", props.className)}
        onClick={() => setIsZoomed(true)}
        loading="lazy"
      />
      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] flex animate-in fade-in duration-200 cursor-zoom-out items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
          onClick={() => setIsZoomed(false)}
        >
          <img
            {...props}
            className="max-h-[95vh] max-w-[95vw] rounded-md object-contain shadow-2xl ring-1 ring-white/20 select-none animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
