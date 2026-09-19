import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/BlogCard";
import { CTABand } from "@/components/CTABand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/Prose";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Reveal } from "@/components/Reveal";
import { postImage } from "@/lib/media";
import { CLOSING_CTA, POST_DISCLAIMER, getPost, postSlugs, posts } from "@/lib/posts";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    image: `/images/blog/${post.slug}.jpg`,
    imageAlt: post.imageAlt,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const published = new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: post.title,
            description: post.metaDescription,
            path: `/blog/${post.slug}`,
            datePublished: post.date,
            image: `/images/blog/${post.slug}.jpg`,
          }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <PageHero
        title={post.title}
        eyebrow={post.category}
        crumbs={crumbs}
        image={postImage(post.slug, post.imageAlt)}
        priority
      >
        <p className="text-sm text-chalk/80">
          Published{" "}
          <time dateTime={post.date} className="font-medium text-chalk">
            {published}
          </time>
        </p>
      </PageHero>

      <article className="section bg-white">
        <div className="wrap">
          <Reveal>
            <Prose blocks={post.body} />
          </Reveal>

          {/* Closing CTA */}
          <Reveal delay={1} className="mt-12 max-w-prose rounded-2xl border border-gold-dark/25 bg-ivory p-8">
            <p className="font-serif text-xl font-semibold text-navy">{CLOSING_CTA}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={site.links.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book a Free Discovery Call
              </a>
              <a href={site.phone.href} className="btn-secondary-light">
                Call {site.phone.display}
              </a>
            </div>
          </Reveal>

          <Reveal className="mt-8 max-w-prose">
            <p className="text-xs leading-relaxed text-ink/70">{POST_DISCLAIMER}</p>
          </Reveal>

          {/* Author box */}
          <Reveal className="mt-12 max-w-prose rounded-2xl border border-navy/10 bg-white p-7">
            <div className="flex items-start gap-5">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy font-serif text-lg font-bold text-gold"
              >
                HS
              </span>
              <div>
                <p className="font-serif text-lg font-semibold text-navy">{site.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  A Dallas tax and accounting firm led by {site.founder.name},{" "}
                  {site.founder.credential} — an Enrolled Agent federally authorized to represent
                  taxpayers before the IRS. We work with individuals and business owners across
                  Texas.
                </p>
                <Link
                  href="/about"
                  className="mt-3 inline-block text-sm font-semibold text-gold-dark hover:underline"
                >
                  About the firm <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      {/* Related services */}
      <section className="section bg-ivory">
        <div className="wrap">
          <Reveal>
            <RelatedLinks
              slugs={post.relatedServices}
              heading="Services mentioned in this article"
              extra={[
                { label: "All services", href: "/services" },
                { label: "Frequently asked questions", href: "/faq" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Related posts */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-3xl font-bold text-navy sm:text-4xl">Keep reading</h2>
            <Link href="/blog" className="text-sm font-semibold text-gold-dark hover:underline">
              All articles <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i}>
                <BlogCard post={p} cover={postImage(p.slug, p.imageAlt)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
