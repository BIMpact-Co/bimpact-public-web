import { notFound } from "next/navigation";
import { allDynamicSlugs, renderMarkdownForSlug } from "../../lib/content";

export function generateStaticParams() {
  return allDynamicSlugs();
}

function maturityLabelClass(maturity: string | undefined) {
  if (!maturity) return "";
  return `badge ${maturity}`;
}

export default async function ContentPage({
  params
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = slug.join("/");
  const content = await renderMarkdownForSlug(key);
  if (!content) return notFound();

  return (
    <article className="card markdown">
      <p>
        Source: <code>{content.sourceFile}</code>
        {content.maturity ? (
          <span className={maturityLabelClass(content.maturity)}>
            {content.maturity}
          </span>
        ) : null}
      </p>
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
    </article>
  );
}
