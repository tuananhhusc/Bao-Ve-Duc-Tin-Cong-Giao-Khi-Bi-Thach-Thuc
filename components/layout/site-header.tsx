"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type SiteHeaderProps = {
  onOpenSearch?: () => void;
};

export function SiteHeader({ onOpenSearch }: SiteHeaderProps) {
  return (
    <header className="border-b border-[var(--gold)]/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Báo Cáo Nghiên Cứu Chuyên Sâu
            </p>
            <p className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Bảo Vệ Đức Tin Công Giáo Khi Bị Thách Thức
            </p>
          </div>
          {onOpenSearch ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 gap-2 border-[var(--gold)]/40"
              onClick={onOpenSearch}
              aria-haspopup="dialog"
            >
              <Search className="h-4 w-4" aria-hidden />
              Tìm trong trang
            </Button>
          ) : null}
        </div>
      </div>
      <Separator />
    </header>
  );
}
