import createMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
    ],
  },
});

export default withMDX(nextConfig);
