import Link from "next/link";

type SiteFooterProps = {
  lastUpdated: Date;
};

export function SiteFooter({ lastUpdated }: SiteFooterProps) {
  const formatted = new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "long",
  }).format(lastUpdated);

  return (
    <footer className="no-print mt-auto border-t border-[var(--gold)]/25 bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <p>
          Cập nhật nội dung gần nhất:{" "}
          <time dateTime={lastUpdated.toISOString()}>{formatted}</time>
        </p>
        <p>
          <Link
            href="/privacy"
            className="font-medium text-primary underline decoration-[var(--gold)] underline-offset-4 hover:text-primary/90"
          >
            Quyền riêng tư & phân tích
          </Link>
        </p>
      </div>
    </footer>
  );
}
