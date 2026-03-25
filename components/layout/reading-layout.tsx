import type { ReactNode } from "react";

import type { TocItem } from "@/components/mdx/table-of-contents";

import { ReadingShell } from "./reading-shell";
import { SkipLink } from "./skip-link";

type ReadingLayoutProps = {
  children: ReactNode;
  toc: readonly TocItem[];
  lastUpdated: Date;
};

export function ReadingLayout({
  children,
  toc,
  lastUpdated,
}: ReadingLayoutProps) {
  return (
    <>
      <SkipLink />
      <ReadingShell toc={toc} lastUpdated={lastUpdated}>
        {children}
      </ReadingShell>
    </>
  );
}
