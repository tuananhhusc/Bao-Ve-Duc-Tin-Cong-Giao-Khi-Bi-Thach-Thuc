import createMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/Bao-Ve-Duc-Tin-Cong-Giao-Khi-Bi-Thach-Thuc" : undefined,
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
