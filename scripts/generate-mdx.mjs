import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import GithubSlugger from "github-slugger";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const rawLines = fs
  .readFileSync(path.join(root, "thanhthuc.txt"), "utf8")
  .split(/\r?\n/);

/** Loại bỏ gạch em (—) và en (–) theo yêu cầu biên tập */
function stripDashes(text) {
  if (!text) return text;
  return text
    .replace(/\u2014/g, ", ")
    .replace(/\u2013/g, " ")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,+/g, ",")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeRefs(text) {
  return stripDashes(text).replace(
    /\.(\d+)(?=\s|$)/g,
    '<sup class="citation-sup"><a class="citation-ref-link" href="#ref-$1">$1</a></sup>',
  );
}

const h2 = [
  /^Dẫn nhập:/,
  /^Nền tảng Tinh thần và Tâm lý học của Cuộc Đối thoại Tôn giáo$/,
  /^Hệ thống Hóa Bảy Quy tắc Can dự/,
  /^Cấu trúc Đối thoại và Khảo sát Tâm lý Học Socratic$/,
  /^Phân tích Thần học và Giải ảo các Thách thức Phổ biến$/,
  /^Đức Tin và Việc Làm:/,
  /^Sự Hiện Diện Đích Thực/,
  /^Bí tích Hòa Giải:/,
  /^Tôn kính Đức Maria và Các Thánh:/,
  /^Vượt qua Các Luận cứ Từ Sự Im lặng/,
  /^Xử lý Khủng hoảng Niềm tin từ Gương mù và Bê bối/,
  /^Chiều kích Cánh chung:/,
  /^Biện giáo Toàn diện/,
  /^Kết luận$/,
  /^Nguồn trích dẫn$/,
];

const h3 = [
  /^Đặc tính Chuyển hóa của Đức Ái và Sự Khiêm nhường$/,
  /^Kỹ thuật Columbo:/,
  /^Các Bước Kỹ thuật Columbo$/,
  /^Vấn đề Thẩm quyền:/,
  /^Lập luận Phủ nhận Thánh Thể$/,
];

function isHeading2(line) {
  return h2.some((re) => re.test(line));
}

function isHeading3(line) {
  return h3.some((re) => re.test(line));
}

function renderRulesTable(startIdx) {
  let i = startIdx;
  if (rawLines[i] !== "Quy tắc Can dự") return { nextIndex: i, lines: [] };
  i += 3;
  const rows = [];
  while (i < rawLines.length) {
    const a = rawLines[i];
    if (!a?.trim() || /^Cấu trúc Đối thoại/.test(a)) break;
    const b = rawLines[i + 1] ?? "";
    const c = rawLines[i + 2] ?? "";
    rows.push(
      `| ${stripDashes(a)} | ${stripDashes(b)} | ${stripDashes(c)} |`,
    );
    i += 3;
  }
  const block = [
    "### Bảng: Quy tắc Can dự",
    "",
    "| Quy tắc | Chức năng phân tích & tâm lý | Chiến lược thực thi cụ thể |",
    "| --- | --- | --- |",
    ...rows,
    "",
  ];
  return { nextIndex: i, lines: block };
}

function renderSolaTable(startIdx) {
  let i = startIdx;
  if (rawLines[i] !== "Tiêu chí") return { nextIndex: i, lines: [] };
  i += 3;
  const rows = [];
  while (i < rawLines.length) {
    const label = rawLines[i];
    if (!label?.trim() || /^Đức Tin và Việc Làm/.test(label)) break;
    const col2 = rawLines[i + 1] ?? "";
    const col3 = rawLines[i + 2] ?? "";
    rows.push(
      `| ${stripDashes(label)} | ${stripDashes(col2)} | ${stripDashes(col3)} |`,
    );
    i += 3;
  }
  const block = [
    "### Bảng: So sánh Sola Scriptura và phản biện Công giáo",
    "",
    "| Tiêu chí | Lập luận Sola Scriptura (2 Tm 3:16) | Phản biện Công giáo |",
    "| --- | --- | --- |",
    ...rows,
    "",
  ];
  return { nextIndex: i, lines: block };
}

function renderEucharistTable(startIdx) {
  let i = startIdx;
  if (rawLines[i] !== "Lập luận Phủ nhận Thánh Thể") return { nextIndex: i, lines: [] };
  i += 3;
  const rows = [];
  while (i < rawLines.length) {
    const label = rawLines[i];
    if (!label?.trim() || /^Bí tích Hòa Giải/.test(label)) break;
    const col2 = rawLines[i + 1] ?? "";
    const col3 = rawLines[i + 2] ?? "";
    rows.push(
      `| ${stripDashes(label)} | ${stripDashes(col2)} | ${stripDashes(col3)} |`,
    );
    i += 3;
  }
  const block = [
    "### Bảng: Lập luận phủ nhận Thánh Thể",
    "",
    "| Chủ đề | Căn cứ đối phương | Phản biện Công giáo |",
    "| --- | --- | --- |",
    ...rows,
    "",
  ];
  return { nextIndex: i, lines: block };
}

function renderColumboSteps(startIdx) {
  let i = startIdx;
  if (rawLines[i] !== "Các Bước Kỹ thuật Columbo") return { nextIndex: i, lines: [] };
  i += 3;
  const rows = [];
  while (i < rawLines.length) {
    const step = rawLines[i];
    if (!step?.trim() || /^Phân tích Thần học/.test(step)) break;
    const quote = rawLines[i + 1] ?? "";
    const purpose = rawLines[i + 2] ?? "";
    rows.push(
      `| ${stripDashes(step)} | ${stripDashes(quote)} | ${stripDashes(purpose)} |`,
    );
    i += 3;
  }
  const block = [
    "#### Bảng: Các bước kỹ thuật Columbo",
    "",
    "| Bước | Câu hỏi mẫu | Mục đích |",
    "| --- | --- | --- |",
    ...rows,
    "",
  ];
  return { nextIndex: i, lines: block };
}

function renderReferences(startIdx) {
  let i = startIdx;
  const items = [];
  while (i < rawLines.length) {
    const line = rawLines[i];
    if (!line?.trim()) {
      i += 1;
      continue;
    }
    const cleaned = stripDashes(line);
    const titleEnd = cleaned.search(/,\s*truy cập/i);
    const urlMatch = cleaned.match(/(https?:\/\/\S+)/);
    if (titleEnd > 0 && urlMatch) {
      items.push({
        title: cleaned.slice(0, titleEnd).trim(),
        url: urlMatch[1],
      });
    } else if (/^https?:\/\//.test(cleaned)) {
      items.push({ title: cleaned, url: cleaned });
    } else {
      items.push({ title: cleaned, url: null });
    }
    i += 1;
  }
  const rows = items.map((item, idx) => {
    const n = idx + 1;
    if (item.url) {
      return `<li id="ref-${n}"><a href="${escapeAttr(item.url)}">${escapeHtml(item.title)}</a></li>`;
    }
    return `<li id="ref-${n}">${escapeHtml(item.title)}</li>`;
  });
  return ["", '<ol className="references-list">', ...rows, "</ol>", ""];
}

const out = [];
out.push(`# ${stripDashes(rawLines[0])}`);
out.push("");

let i = 1;
while (i < rawLines.length) {
  const line = rawLines[i];
  if (!line.trim()) {
    i += 1;
    continue;
  }

  if (line === "Nguồn trích dẫn") {
    out.push("## Nguồn trích dẫn");
    out.push(...renderReferences(i + 1));
    break;
  }

  if (line === "Quy tắc Can dự") {
    const { nextIndex, lines } = renderRulesTable(i);
    out.push(...lines);
    i = nextIndex;
    continue;
  }

  if (line === "Tiêu chí") {
    const { nextIndex, lines } = renderSolaTable(i);
    out.push(...lines);
    i = nextIndex;
    continue;
  }

  if (line === "Lập luận Phủ nhận Thánh Thể") {
    const { nextIndex, lines } = renderEucharistTable(i);
    out.push(...lines);
    i = nextIndex;
    continue;
  }

  if (line === "Các Bước Kỹ thuật Columbo") {
    const { nextIndex, lines } = renderColumboSteps(i);
    out.push(...lines);
    i = nextIndex;
    continue;
  }

  if (isHeading3(line)) {
    out.push(`### ${stripDashes(line)}`);
    out.push("");
    i += 1;
    continue;
  }

  if (isHeading2(line)) {
    out.push(`## ${stripDashes(line)}`);
    out.push("");
    i += 1;
    continue;
  }

  const para = [];
  while (i < rawLines.length && rawLines[i]?.trim()) {
    const l = rawLines[i];
    if (
      isHeading2(l) ||
      isHeading3(l) ||
      l === "Quy tắc Can dự" ||
      l === "Tiêu chí" ||
      l === "Lập luận Phủ nhận Thánh Thể" ||
      l === "Các Bước Kỹ thuật Columbo" ||
      l === "Nguồn trích dẫn"
    ) {
      break;
    }
    para.push(l);
    i += 1;
  }
  if (para.length) {
    out.push(escapeRefs(para.join(" ")));
    out.push("");
  }
}

const mdxBody = out.join("\n");
fs.mkdirSync(path.join(root, "content"), { recursive: true });
fs.writeFileSync(path.join(root, "content", "thanhthuc.mdx"), mdxBody, "utf8");

const slugger = new GithubSlugger();
const toc = [];
for (const line of mdxBody.split("\n")) {
  if (line.startsWith("## ")) {
    const title = line.slice(3);
    toc.push({ id: slugger.slug(title), depth: 2, title });
  } else if (line.startsWith("### ")) {
    const title = line.slice(4);
    toc.push({ id: slugger.slug(title), depth: 3, title });
  }
}

fs.writeFileSync(
  path.join(root, "content", "toc.ts"),
  `export const toc = ${JSON.stringify(toc, null, 2)} as const;\n`,
  "utf8",
);
