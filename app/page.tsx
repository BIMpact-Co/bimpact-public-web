import { notFound } from "next/navigation";
import { renderMarkdownForSlug } from "../lib/content";

export default async function HomePage() {
  const content = await renderMarkdownForSlug("");
  if (!content) return notFound();

  return (
    <article className="card markdown">
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
    </article>
  );
}
