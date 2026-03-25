import type { Metadata } from "next";

import ThanhThuc from "@/content/thanhthuc.mdx";
import { ReadingLayout } from "@/components/layout/reading-layout";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { toc } from "@/content/toc";
import { getContentLastModified } from "@/lib/content-meta";

export async function generateMetadata(): Promise<Metadata> {
  const modified = getContentLastModified();
  return {
    openGraph: {
      type: "article",
      modifiedTime: modified.toISOString(),
    },
  };
}

export default function HomePage() {
  const lastUpdated = getContentLastModified();

  return (
    <>
      <ArticleJsonLd dateModified={lastUpdated.toISOString()} />
      <ReadingLayout toc={toc} lastUpdated={lastUpdated}>
        <article
          id="article"
          aria-labelledby="article-title"
          className="article-drop-cap prose prose-stone prose-lg max-w-[42rem] sm:prose-xl prose-headings:scroll-mt-28 prose-headings:font-serif prose-headings:tracking-tight prose-h2:border-b prose-h2:border-[var(--gold)]/30 prose-h2:pb-2 prose-h2:font-semibold prose-h3:font-semibold prose-p:leading-[1.8] prose-p:text-pretty prose-p:text-[1.0625rem] sm:prose-p:text-[1.125rem] prose-a:text-primary prose-a:underline-offset-4 prose-blockquote:border-[var(--gold)] prose-blockquote:text-muted-foreground prose-blockquote:leading-relaxed prose-ol:my-6 prose-li:my-1 prose-th:border prose-th:border-border prose-td:border prose-td:border-border prose-table:text-[0.95rem] prose-table:leading-relaxed"
        >
          <ThanhThuc />
        </article>
      </ReadingLayout>
    </>
  );
}
