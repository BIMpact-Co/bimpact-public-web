import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type RouteEntry = {
  slug: string;
  sourceFile: string;
  status: "wip" | "shared" | "published" | "archived";
  publish: boolean;
  maturity?: "active" | "emerging" | "exploratory";
};

type ContentIndexEntry = RouteEntry & {
  route: string;
  notes?: string;
};

type ContentIndexFile = {
  version: number;
  statuses: Record<string, string>;
  entries: ContentIndexEntry[];
};

function loadContentIndex(): ContentIndexFile {
  const fullPath = path.join(websiteContentRoot(), "UC003-02-content-index.json");
  const raw = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(raw) as ContentIndexFile;
}

export const routeEntries: RouteEntry[] = loadContentIndex().entries
  .filter((entry) => entry.publish)
  .map(({ route: _route, notes: _notes, ...entry }) => entry);

function websiteContentRoot() {
  const candidates = [
    path.resolve(process.cwd(), "use-cases", "UC003-website-content"),
    path.resolve(process.cwd(), "..", "use-cases", "UC003-website-content"),
    path.resolve(
      process.cwd(),
      "..",
      "..",
      "use-cases",
      "UC003-website-content"
    )
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(candidate, "UC003-02-content-index.json"))) {
      return candidate;
    }
  }

  return candidates[0];
}

export async function renderMarkdownForSlug(slug: string) {
  const match = routeEntries.find((r) => r.slug === slug);
  if (!match) return null;

  const fullPath = path.join(websiteContentRoot(), match.sourceFile);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  const rendered = await remark().use(html).process(parsed.content);

  return {
    slug: match.slug,
    sourceFile: match.sourceFile,
    maturity: match.maturity,
    html: rendered.toString()
  };
}

export function allDynamicSlugs() {
  return routeEntries
    .filter((r) => r.slug !== "")
    .map((r) => ({ slug: r.slug.split("/") }));
}
