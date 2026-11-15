import Link from "next/link";
import { CtaBand, PageIntro } from "@/components/sections/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Arrow } from "@/components/ui/Button";
import { Container } from "@/components/ui/primitives";
import { getHub, getPosts, pages } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

const p = pages.insights;
export const metadata = pageMetadata({ ...p.seo, path: "/insights" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
];

export default async function InsightsPage() {
  const posts = await getPosts();
  return (
    <>
      <PageIntro eyebrow={p.eyebrow} heading={p.heading} body={p.body} crumbs={crumbs} />
      <section aria-label="Articles" className="border-t border-line">
        <Container>
          <ul>
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-line">
                <article className="group relative grid gap-3 py-8 md:grid-cols-12 md:gap-6">
                  <p className="label text-subtle md:col-span-3">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.hub && <span className="block md:mt-1">{getHub(post.hub)?.shortName}</span>}
                  </p>
                  <div className="md:col-span-7">
                    <h2 className="display text-h3 text-balance group-hover:text-accent">
                      <Link href={`/insights/${post.slug}`} className="after:absolute after:inset-0">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-muted">{post.description}</p>
                  </div>
                  <p aria-hidden="true" className="label flex items-start gap-2 text-accent md:col-span-2 md:justify-end">
                    {post.readingTime} <Arrow />
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
