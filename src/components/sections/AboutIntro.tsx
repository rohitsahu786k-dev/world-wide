import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const aboutImages = [
  {
    src: "/images/client-supplied/service-global-distribution.jpg",
    alt: "Wholesale partners reviewing international supply plans",
  },
  {
    src: "/images/client-supplied/service-logistics-management.jpg",
    alt: "Global logistics containers ready for shipment",
  },
  {
    src: "/images/client-supplied/service-sourcing-development.jpg",
    alt: "Business team discussing premium distribution",
  },
];

export function AboutIntro() {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <FadeIn className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#207B68]">Company Profile</p>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-normal text-[#090909] sm:text-5xl lg:text-6xl">
            A trusted international wholesale partner
          </h2>
          <div className="mt-6 max-w-xl space-y-5 text-base leading-8 text-[#777777] sm:text-lg">
            <p>
              With over 15 years of experience, Worldwide Supply 28 combines reliable sourcing, efficient logistics, and long-term business relationships to support global retailers, duty-free operators, distributors, wholesalers, and strategic partners.
            </p>
            <p>
              Built for B2B partnerships, the company brings premium category access, professional communication, international distribution thinking, and a clear understanding that wholesale success depends on trust over time.
            </p>
          </div>
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4 lg:justify-start">
            <Button href="/categories" className="rounded-md">
              Explore Categories
            </Button>
            <Button href="/contact" variant="ghost" className="rounded-md border border-[#E5E5E5] px-4">
              Learn more
            </Button>
          </div>
        </FadeIn>

        <FadeIn className="relative min-h-[360px] w-full sm:min-h-[520px]">
          <div className="absolute left-[18%] top-0 h-12 w-12 rounded-full bg-[#DCEBFF] sm:h-16 sm:w-16" aria-hidden="true" />
          <div className="absolute bottom-[10%] right-[18%] h-12 w-12 rounded-lg bg-[#F0E3FF]" aria-hidden="true" />
          <div className="absolute bottom-[32%] left-[6%] h-6 w-6 rounded-full bg-[#DDF5E7]" aria-hidden="true" />

          <div className="absolute left-1/2 top-5 h-48 w-48 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-[0_18px_40px_rgba(16,32,51,0.16)] sm:top-6 sm:h-64 sm:w-64">
            <Image src={aboutImages[0].src} alt={aboutImages[0].alt} fill sizes="(min-width: 640px) 256px, 224px" className="rounded-xl object-cover p-2" />
          </div>
          <div className="absolute right-0 top-[38%] h-36 w-36 rounded-2xl bg-white p-2 shadow-[0_18px_40px_rgba(16,32,51,0.16)] sm:top-[34%] sm:h-56 sm:w-56">
            <Image src={aboutImages[1].src} alt={aboutImages[1].alt} fill sizes="(min-width: 640px) 224px, 176px" className="rounded-xl object-cover p-2" />
          </div>
          <div className="absolute bottom-2 left-2 h-32 w-32 rounded-2xl bg-white p-2 shadow-[0_18px_40px_rgba(16,32,51,0.16)] sm:h-48 sm:w-48">
            <Image src={aboutImages[2].src} alt={aboutImages[2].alt} fill sizes="(min-width: 640px) 192px, 160px" className="rounded-xl object-cover p-2" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
