"use client";

import { Link2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CopySectionLinkProps = {
  id: string;
  className?: string;
};

export function CopySectionLink({ id, className }: CopySectionLinkProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "no-print -mt-0.5 h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
        className,
      )}
      aria-label="Sao chép liên kết tới mục này"
      onClick={async () => {
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        try {
          await navigator.clipboard.writeText(url);
        } catch {
          /* ignore */
        }
      }}
    >
      <Link2 className="h-4 w-4" aria-hidden />
    </Button>
  );
}
