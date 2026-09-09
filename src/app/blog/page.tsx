import Link from "next/link";
import { getPosts } from "@/lib/wordpress";
import { getWpMedia } from "@/lib/wp-media";
import { ArrowRight, Sparkles } from "@/components/ui/icons";

export const revalidate = 60;

export const metadata = {
  title: "B2B Market Insights & Trade Analysis | Worldwide Supply 28 SL",
  description:
    "Strategic analysis, travel retail market notes, fragrance distribution trends, and B2B wholesale trade intelligence from Valencia, Spain.",
};

export default async function BlogPage() {
  const posts = await getPosts({ per_page: 30, status: "publish" });

  return (
    <div className="min-h-screen bg-[#F7FAFC] pt-24 pb-20">
      {/* Editorial Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#102033] via-[#123A5A] to-[#102033] py-20 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#207B68_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#207B68]/40 bg-[#207B68]/15 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-[#5ce0c3]">
                <Sparkles className="size-3.5" />
                Live WordPress Editorial
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl font-serif">
                Wholesale Insights & Market Intelligence
              </h1>
              <p className="mt-4 text-lg text-white/80 leading-relaxed">
                Strategic perspective on luxury perfumery, travel retail logistics, bonded trade corridors, and commercial wholesale distribution from our European headquarters in Valencia.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/blog/manage"
                className="inline-flex items-center gap-2 rounded-xl border border-[#207B68] bg-[#207B68] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#207B68]/20 transition-all duration-300 hover:bg-[#1a6656] hover:shadow-xl"
              >
                Manage Articles (CRUD)
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-[#123A5A]/10 bg-white p-12 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-[#123A5A]">No published insights found</h3>
            <p className="mt-2 text-sm text-[#102033]/70">
              Articles will appear here once published from WordPress or the management dashboard.
            </p>
            <Link
              href="/blog/manage"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#207B68] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a6656]"
            >
              Create First Article
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#123A5A]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#207B68]/40 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={getWpMedia(post.image)}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-[#207B68] px-3 py-1 text-xs font-semibold text-white shadow-md">
                      {post.category || 'Blog'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-[#102033]/60">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>

                  <h2 className="mt-3 text-xl font-bold leading-snug text-[#123A5A] transition-colors duration-200 group-hover:text-[#207B68]">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#102033]/70 line-clamp-3">
                    {post.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-[#123A5A]/10 flex items-center justify-between">
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#207B68] transition group-hover:text-[#123A5A]"
                    >
                      Read Full Analysis
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
