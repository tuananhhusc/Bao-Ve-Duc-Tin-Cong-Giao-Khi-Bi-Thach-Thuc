import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import GithubSlugger from "github-slugger";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mdxPath = path.join(root, "content", "thanhthuc.mdx");
const outPath = path.join(root, "public", "search-index.json");

if (!fs.existsSync(mdxPath)) {
  console.warn("build-search-index: thanhthuc.mdx missing, writing empty index");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({ chunks: [] }), "utf8");
  process.exit(0);
}

const lines = fs.readFileSync(mdxPath, "utf8").split(/\r?\n/);
const slugger = new GithubSlugger();
/** @type {{ id: string; title: string; body: string[] }[]} */
const sections = [];
let current = null;

for (const line of lines) {
  if (line.startsWith("# ") && !line.startsWith("##")) {
    if (current) sections.push(current);
    current = {
      id: "article-title",
      title: line.slice(2).trim(),
      body: [],
    };
    continue;
  }
  if (line.startsWith("## ") && !line.startsWith("###")) {
    if (current) sections.push(current);
    const title = line.slice(3).trim();
    current = {
      id: slugger.slug(title),
      title,
      body: [],
    };
    continue;
  }
  if (!current) continue;
  const t = line.trim();
  if (t.startsWith("<ol") || t.startsWith("</ol>") || t.startsWith("<li")) {
    continue;
  }
  current.body.push(line);
}

if (current) sections.push(current);

function strip(s) {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/\|/g, " ")
    .replace(/[#*_()[\]`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const chunks = sections.map((s) => ({
  id: s.id,
  title: s.title,
  text: strip(s.body.join("\n")).slice(0, 12000),
}));

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify({ chunks }, null, 0), "utf8");
