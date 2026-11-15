import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand } from "@/components/sections/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/primitives";
import { getHub, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { articleLd, breadcrumbLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({ title: `${post.title} | HTH Insights`, description: post.description, path: `/insights/${slug}`, type: "article" });
}

export default async function PostPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const { default: Body } = await import(`@/content/insights/${slug}.mdx`);
  const hub = post.hub ? getHub(post.hub) : undefined;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: post.title, path: `/insights/${slug}` },
  ];

  return (
    <>
      <article>
        <Container className="pb-12 pt-10 md:pt-14">
          <Breadcrumbs items={crumbs} />
          <header className="mt-10 max-w-[44rem] md:mt-14">
            <p className="label text-accent">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.readingTime && ` · ${post.readingTime}`}
            </p>
            <h1 className="display mt-4 text-h1 text-balance">{post.title}</h1>
            <p className="mt-6 text-lead text-muted">{post.description}</p>
          </header>
        </Container>
        <div className="border-t border-line">
          <Container className="grid gap-10 py-12 md:grid-cols-12 md:py-16">
            <aside className="md:col-span-3">
              {hub && (
                <p className="label text-subtle">
                  Filed under
                  <Link href={`/services#${hub.slug}`} className="mt-1 block text-ink normal-case tracking-normal hover:text-accent">
                    {hub.name}
                  </Link>
                </p>
              )}
            </aside>
            <div className="prose-hth text-lead md:col-span-8">
              <Body />
            </div>
          </Container>
        </div>
      </article>
      <CtaBand />
      <JsonLd data={[articleLd(post), breadcrumbLd(crumbs)]} />
    </>
  );
}
