import Link from "next/link";
import { getPosts } from "@/lib/wordpress";
import { getWpMedia } from "@/lib/wp-media";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeader } from "./SectionHeader";
import { ArrowRight } from "@/components/ui/icons";
import { blogPosts as fallbackPosts } from "@/data/blog";

export async function BlogSection() {
  const wpPosts = await getPosts({ per_page: 3, status: "publish" });

  const posts =
    wpPosts.length > 0
      ? wpPosts.map((p) => ({
          title: p.title,
          description: p.description,
          image: getWpMedia(p.image),
          href: `/blog/${p.id}`,
        }))
      : fallbackPosts.map((p) => ({
          title: p.title,
          description: p.description,
          image: getWpMedia(p.image),
          href: "/blog",
        }));

  return (
    <section className="bg-white py-16 sm:py-24 border-t border-[#123A5A]/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Market Intelligence"
            title="Wholesale market notes & insights"
            copy="Strategic articles for B2B partners exploring luxury wholesale, travel retail, FMCG distribution, and Africa-focused market expansion."
          />
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#207B68] hover:text-[#123A5A] transition"
          >
            Explore all articles
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <ProjectCard
              key={post.title}
              title={post.title}
              description={post.description}
              imgSrc={post.image}
              link={post.href}
              linkText="Read Analysis"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
