import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/wordpress";
import { getWpMedia } from "@/lib/wp-media";
import { ArrowLeft, ArrowRight, ShieldCheck, Mail, Phone } from "lucide-react";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: "Article Not Found | Worldwide Supply 28" };

  return {
    title: `${post.title} | Worldwide Supply 28 SL Insights`,
    description: post.description,
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F7FAFC] pt-24 pb-24">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#123A5A]/10 bg-white/70 backdrop-blur-md sticky top-20 z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-[#102033]/60">
            <Link href="/" className="hover:text-[#207B68] transition">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#207B68] transition">Insights</Link>
            <span>/</span>
            <span className="text-[#123A5A] font-medium truncate max-w-[200px] sm:max-w-md">
              {post.title}
            </span>
          </div>

          <Link
            href="/blog/manage"
            className="text-xs font-semibold text-[#207B68] hover:text-[#123A5A] underline decoration-[#207B68]/30 underline-offset-4"
          >
            Edit in Dashboard
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-10">
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#207B68]">
            <span className="rounded-full bg-[#207B68]/10 px-3.5 py-1 font-bold text-[#207B68]">{post.category || 'Blog'}</span>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#102033] font-serif leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-2 border-t border-[#123A5A]/10 text-sm text-[#102033]/70">
            <div className="size-9 rounded-full bg-[#123A5A] text-white flex items-center justify-center font-bold text-xs">
              WS
            </div>
            <div>
              <p className="font-semibold text-[#102033]">{post.author}</p>
              <p className="text-xs text-[#102033]/60">Valencia Headquarters • Verified Trade Desk</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-[#123A5A]/10 bg-slate-100 shadow-lg">
            <img
              src={getWpMedia(post.image)}
              alt={post.title}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Content Body */}
        <div className="mt-12 rounded-3xl border border-[#123A5A]/10 bg-white p-8 sm:p-12 shadow-sm">
          <div
            className="prose prose-lg max-w-none text-[#102033]/85 prose-headings:font-serif prose-headings:text-[#123A5A] prose-headings:tracking-tight prose-a:text-[#207B68] prose-a:font-semibold prose-strong:text-[#123A5A] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Verification Badge */}
          <div className="mt-12 rounded-2xl border border-[#207B68]/20 bg-[#207B68]/5 p-6 flex items-start gap-4">
            <ShieldCheck className="size-6 text-[#207B68] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-semibold text-[#123A5A]">Authenticated Sourcing & Verification</h4>
              <p className="mt-1 text-sm text-[#102033]/75 leading-relaxed">
                Worldwide Supply 28 SL operates directly under Spanish commercial register CIF: B26703769. All distribution channels, batch certificates, and luxury inventories are compliant with European wholesale standards.
              </p>
            </div>
          </div>
        </div>

        {/* Commercial Inquiry CTA Card */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#102033] via-[#123A5A] to-[#102033] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 rounded-full bg-[#207B68]/20 blur-3xl pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-bold font-serif">
            Discuss Distribution & Availability
          </h3>
          <p className="mt-3 text-base text-white/80 max-w-2xl leading-relaxed">
            Connect with our Valencia commercial desk for inquiries regarding luxury fragrance allocations, duty-free supply partnerships, or cross-border distribution agreements.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#207B68] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1a6656]"
            >
              Contact Sourcing Desk
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="mailto:info@worldwidesupply28.com"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <Mail className="size-4" />
              info@worldwidesupply28.com
            </a>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#123A5A] hover:text-[#207B68] transition"
          >
            <ArrowLeft className="size-4" />
            Return to all insights & market notes
          </Link>
        </div>
      </article>
    </div>
  );
}
