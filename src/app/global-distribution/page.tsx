import type { Metadata } from "next";
import { GlobalNetwork } from "@/components/sections/GlobalNetwork";
import { InquiryCTA } from "@/components/sections/InquiryCTA";
import { InternalPageHero } from "@/components/sections/InternalPageHero";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Global Distribution Network | Worldwide Supply 28",
  path: "/global-distribution",
});

export default function GlobalDistributionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Global Distribution", path: "/global-distribution" }])) }} />
      <InternalPageHero eyebrow="Global Distribution" title="Supply chain support from Spain to international markets" copy="From sourcing review to delivery coordination, Worldwide Supply 28 supports partners with a practical, compliance-aware, B2B distribution mindset." />
      <GlobalNetwork />
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {["Spain-based international operations", "Sourcing-to-delivery process", "Multi-continent expansion vision"].map((title) => (
            <article key={title} className="rounded-md bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#123A5A]">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#102033]/72">
                {title === "Multi-continent expansion vision"
                  ? "Worldwide Supply 28 is interested in opening and expanding markets across South America, Australia, Africa, and other strategic regions by building new collaborations with distributors, retailers, wholesalers, and business partners."
                  : "Our process focuses on partner qualification, category availability, logistics coordination, documentation awareness, and ongoing communication across markets."}
              </p>
            </article>
          ))}
        </div>
      </section>
      <InquiryCTA />
    </>
  );
}
