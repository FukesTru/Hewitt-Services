import { BlogFilter } from "@/components/BlogFilter";
import { CTABand } from "@/components/CTABand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { IMAGES, postImage } from "@/lib/media";
import { posts } from "@/lib/posts";
import { blogSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Tax & Small Business Tips | ${site.name}`,
  description:
    "Practical tax planning, bookkeeping and IRS tips for Texas business owners and families, written by the team at Hewitt Services in Dallas, TX.",
  path: "/blog",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          blogSchema(
            posts.map((p) => ({
              title: p.title,
              slug: p.slug,
              description: p.metaDescription,
              date: p.date,
            }))
          ),
          breadcrumbSchema(crumbs),
        ]}
      />

      <PageHero
        title="Tax and Small Business Tips from Hewitt Services"
        lede="Practical guidance for Texas business owners and families, written plainly and without the scare tactics."
        eyebrow="Blog"
        crumbs={crumbs}
        image={IMAGES.blog()}
        priority
      />

      <section className="section bg-white">
        <div className="wrap">
          <Reveal>
            <BlogFilter
              items={posts.map((post) => ({
                post,
                cover: postImage(post.slug, post.imageAlt),
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* Email signup */}
      <section className="bg-mist">
        <div className="wrap py-14">
          <Reveal className="mx-auto max-w-2xl rounded-2xl border border-moss-dark/25 bg-white p-8 text-center sm:p-10">
            <h2 className="font-serif text-2xl font-bold text-forest">
              Get helpful tax tips in your inbox
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink">
              Occasional, practical and never more often than we would want to receive it ourselves.
            </p>

            {/*
              ── Newsletter webhook slot ─────────────────────────────────────
              Wire this form to the firm's email provider (the CRM or the
              mailing list tool the client chooses). Until then the button
              opens an email so nobody submits into a void.
              ────────────────────────────────────────────────────────────────
            */}
            <div className="mt-6 flex justify-center">
              <a href={`mailto:${site.email}?subject=Subscribe%20to%20tax%20tips`} className="btn-primary">
                Subscribe by email
              </a>
            </div>
            <p className="mt-4 text-xs text-ink/70">
              We will not share your address. Unsubscribe whenever you like.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand heading="Rather just talk it through?" />
    </>
  );
}
