import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { CopySectionLink } from "@/components/mdx/copy-section-link";
import { ZoomableImage } from "@/components/mdx/zoomable-image";
import { CitationWrapper } from "@/components/ui/citation-tooltip";
import { cn } from "@/lib/utils";

function Table(
  props: ComponentPropsWithoutRef<"table"> & { children?: ReactNode },
) {
  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-[var(--gold)]/40 bg-card/80 shadow-sm backdrop-blur-sm">
      <table
        className="w-full border-collapse text-left text-sm leading-relaxed"
        {...props}
      />
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ className, ...props }) => (
      <h1
        {...props}
        id="article-title"
        className={cn(
          "font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
          className,
        )}
      />
    ),
    h2: ({ id, className, children, ...props }) => (
      <h2
        id={id}
        className={cn(
          "group mt-12 flex scroll-mt-28 flex-wrap items-baseline gap-2 font-serif text-2xl font-semibold text-foreground first:mt-0 sm:text-3xl",
          className,
        )}
        {...props}
      >
        {children}
        {id && id !== "article-title" ? (
          <CopySectionLink id={id} />
        ) : null}
      </h2>
    ),
    h3: ({ id, className, children, ...props }) => (
      <h3
        id={id}
        className={cn(
          "group mt-8 flex scroll-mt-28 flex-wrap items-baseline gap-2 font-serif text-xl font-semibold text-foreground sm:text-2xl",
          className,
        )}
        {...props}
      >
        {children}
        {id ? <CopySectionLink id={id} /> : null}
      </h3>
    ),
    h4: ({ id, className, children, ...props }) => (
      <h4
        id={id}
        className={cn(
          "group mt-6 flex scroll-mt-28 flex-wrap items-baseline gap-2 font-serif text-lg font-semibold text-foreground",
          className,
        )}
        {...props}
      >
        {children}
        {id ? <CopySectionLink id={id} /> : null}
      </h4>
    ),
    sup: ({ className, ...props }) => (
      <CitationWrapper className={cn("citation-sup", className)} {...props} />
    ),
    Citation: ({ className, children, ...props }: any) => (
      <CitationWrapper className={cn("citation-sup", className)} {...props}>
        {children}
      </CitationWrapper>
    ),
    table: Table,
    th: (props) => (
      <th
        className="border-b border-[var(--gold)]/50 bg-[var(--secondary)] px-3 py-2 font-serif text-base font-semibold text-foreground"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b border-border/60 px-3 py-2 align-top" {...props} />
    ),
    tr: (props) => <tr className="even:bg-muted/30" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="my-6 border-l-4 border-[var(--gold)] pl-4 italic text-muted-foreground"
        {...props}
      />
    ),
    a: (props) => (
      <a
        className="font-medium text-primary underline decoration-[var(--gold)] decoration-1 underline-offset-4 hover:text-primary/90"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
        {...props}
      />
    ),
    img: (props) => <ZoomableImage {...props} />,
  };
}
