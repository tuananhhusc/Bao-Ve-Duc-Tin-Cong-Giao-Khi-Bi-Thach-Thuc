import fs from "node:fs";
import path from "node:path";

export function getContentLastModified(): Date {
  const root = process.cwd();
  const candidates = [
    path.join(root, "thanhthuc.txt"),
    path.join(root, "content", "thanhthuc.mdx"),
  ];
  let max = 0;
  for (const p of candidates) {
    try {
      const t = fs.statSync(p).mtimeMs;
      if (t > max) max = t;
    } catch {
      /* ignore */
    }
  }
  return max > 0 ? new Date(max) : new Date();
}
