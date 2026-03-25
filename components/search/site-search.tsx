"use client";

import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SearchChunk = {
  id: string;
  title: string;
  text: string;
};

type SiteSearchProps = {
  onClose: () => void;
};

export function SiteSearch({ onClose }: SiteSearchProps) {
  const [query, setQuery] = useState("");
  const [chunks, setChunks] = useState<SearchChunk[]>([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => {
        if (!r.ok) throw new Error("fetch");
        return r.json();
      })
      .then((d: { chunks?: SearchChunk[] }) => {
        setChunks(Array.isArray(d.chunks) ? d.chunks : []);
      })
      .catch(() => setLoadError(true));
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(chunks, {
        keys: ["title", "text"],
        threshold: 0.38,
        ignoreLocation: true,
      }),
    [chunks],
  );

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return fuse.search(q).slice(0, 14).map((r) => r.item);
  }, [fuse, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="no-print fixed inset-0 z-[100] flex items-start justify-center bg-black/45 p-4 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Tìm trong tài liệu"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Đóng lớp phủ"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-[101] w-full max-w-lg rounded-lg border border-border bg-card text-card-foreground shadow-xl",
        )}
      >
        <div className="flex items-center gap-2 border-b border-border p-3">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tiêu đề hoặc đoạn văn…"
            className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Từ khóa tìm kiếm"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={onClose}
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="max-h-[min(60vh,28rem)] overflow-y-auto p-2">
          {loadError ? (
            <p className="px-2 py-4 text-sm text-muted-foreground">
              Không tải được chỉ mục tìm kiếm. Chạy{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                npm run generate
              </code>{" "}
              rồi build lại.
            </p>
          ) : null}
          {!loadError && query.trim() && results.length === 0 ? (
            <p className="px-2 py-4 text-sm text-muted-foreground">
              Không có kết quả phù hợp.
            </p>
          ) : null}
          {!query.trim() ? (
            <p className="px-2 py-4 text-sm text-muted-foreground">
              Gõ ít nhất một từ để tìm trong các mục của tài liệu.
            </p>
          ) : null}
          <ul className="space-y-1">
            {results.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="w-full rounded-md px-3 py-2.5 text-left text-sm leading-snug hover:bg-muted"
                  onClick={() => {
                    onClose();
                    window.location.hash = item.id;
                  }}
                >
                  <span className="font-semibold text-foreground">
                    {item.title}
                  </span>
                  {item.text ? (
                    <span className="mt-1 line-clamp-2 block text-muted-foreground">
                      {item.text.slice(0, 180)}
                      {item.text.length > 180 ? "…" : ""}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
