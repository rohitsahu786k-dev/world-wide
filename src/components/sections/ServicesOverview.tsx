"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Package, Search, Ship, Sparkles } from "@/components/ui/icons";
import { services } from "@/data/services";

const serviceVisuals = [
  {
    image: "/images/services/global-distribution.jpg",
    icon: Search,
  },
  {
    image: "/images/services/logistics-management.jpg",
    icon: Sparkles,
  },
  {
    image: "/images/services/brand-entry.jpg",
    icon: Ship,
  },
  {
    image: "/images/services/sourcing-development.jpg",
    icon: Package,
  },
  {
    image: "/images/services/service-overview-5.jpg",
    icon: Package,
  },
  {
    image: "/images/services/service-overview-6.jpg",
    icon: Search,
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const visual = serviceVisuals[index % serviceVisuals.length];
  const Icon = visual.icon;

  return (
    <article className="service-image-card group flex h-[450px] w-full flex-col overflow-hidden rounded-3xl bg-white text-[#0B2239]">
      <div className="relative h-[58%] overflow-hidden">
        <img
          src={visual.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-6 top-6 rounded-full bg-white/88 px-4 py-2 font-mono text-sm text-[#0B2239]/64 backdrop-blur">
          ( {String(index + 1).padStart(3, "0")} )
        </div>
        <div className="absolute bottom-5 left-6 flex size-12 items-center justify-center rounded-full bg-white/90 text-[#0B2239] backdrop-blur">
          <Icon className="h-7 w-7" />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end bg-white p-8 text-left">
        <h3 className="mb-3 text-lg font-semibold uppercase tracking-[0.16em]">{service.title}</h3>
        <p className="text-sm leading-7 text-[#0B2239]/72">{service.summary}</p>
      </div>
    </article>
  );
}

export function ServicesOverview({ detailed = false }: { detailed?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: -Math.min(track.clientWidth, 420), behavior: "smooth" });
  };

  const scrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: Math.min(track.clientWidth, 420), behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      const nearEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 12;
      if (nearEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: Math.min(track.clientWidth * 0.72, 380), behavior: "smooth" });
      }
    }, 4600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#207B68]">Services</p>
          <h2 className="text-4xl font-bold tracking-normal text-[#0B2239] sm:text-6xl">Services.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#102033]/70">
            {detailed
              ? "Premium wholesale services for sourcing, distribution, travel retail, FMCG, logistics, and international market expansion."
              : "From sourcing to logistics coordination, every service supports long-term B2B relationships."}
          </p>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="services-scroll-track flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
            aria-label="Wholesale services carousel"
          >
            {services.map((service, index) => (
              <div key={service.title} className="min-w-0 shrink-0 grow-0 basis-[88%] snap-start sm:basis-[58%] lg:basis-[33.333%]">
                <div className="p-1 pb-8">
                  <ServiceCard service={service} index={index} />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#0B2239]/10 bg-white/85 text-[#0B2239] backdrop-blur transition hover:bg-white"
            aria-label="Previous service"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#0B2239]/10 bg-white/85 text-[#0B2239] backdrop-blur transition hover:bg-white"
            aria-label="Next service"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
