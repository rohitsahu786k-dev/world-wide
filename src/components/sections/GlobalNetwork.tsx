import Link from "next/link";
import { ArrowRight, MapPin, Ship, UsersRound } from "@/components/ui/icons";
import { WorldMap } from "@/components/ui/world-map";

const valencia = { lat: 39.4699, lng: -0.3763, label: "Valencia (HQ)" };

const distributionRoutes = [
  { start: valencia, end: { lat: 50.1109, lng: 8.6821, label: "Europe" } },
  { start: valencia, end: { lat: 25.2048, lng: 55.2708, label: "Middle East" } },
  { start: valencia, end: { lat: 40.7128, lng: -74.006, label: "North America" } },
  { start: valencia, end: { lat: -14.235, lng: -51.9253, label: "South America" } },
  { start: valencia, end: { lat: 34.0479, lng: 100.6197, label: "Asia" } },
  { start: valencia, end: { lat: 9.082, lng: 8.6753, label: "Africa" } },
  { start: valencia, end: { lat: -25.2744, lng: 133.7751, label: "Australia" } },
];

const markets = ["Spain HQ", "Europe", "Middle East", "North America", "South America", "Asia", "Africa", "Australia"];

const distributionPoints = [
  { label: "Base", value: "Valencia, Spain", icon: MapPin },
  { label: "Reach", value: "Europe, GCC, Americas, Asia, Africa & Australia", icon: Ship },
  { label: "Focus", value: "multi-continent expansion", icon: UsersRound },
];

const capabilities = ["Sourcing review", "Wholesale planning", "Logistics coordination", "Partner support"];

export function GlobalNetwork() {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-base font-medium text-[#102033]/56 sm:text-2xl">Spain-based</p>
        <h2 className="mx-auto mt-2 max-w-5xl text-4xl font-semibold leading-none tracking-normal text-[#0B2239] sm:text-7xl lg:text-8xl">
          Global Distribution
        </h2>
        <div className="mx-auto mt-5 h-1.5 w-32 rounded-full bg-[#C6A128] sm:w-40" />
        <p className="mx-auto mt-6 max-w-3xl text-base font-semibold leading-8 text-[#102033]/78 sm:mt-8 sm:text-xl">
          Worldwide Supply 28 supports retailers, duty-free operators, distributors, and wholesalers from a Valencia base.
        </p>
        <p className="mx-auto mt-4 max-w-4xl text-base leading-8 text-[#102033]/64 sm:text-lg">
          Our distribution conversations focus on reliable sourcing, wholesale planning, logistics coordination, and strategic market expansion across Europe, GCC markets, the Americas, Asia, Africa, and Australia.
        </p>

        <div className="relative mx-auto mt-8 max-w-6xl sm:mt-10">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(18,58,90,0.08),transparent_66%)] sm:h-56" aria-hidden="true" />
          <WorldMap dots={distributionRoutes} lineColor="#207B68" className="relative z-10 min-h-[220px] sm:min-h-0" />
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-2 sm:gap-3">
          {markets.map((market) => (
            <span key={market} className="inline-flex items-center gap-2 rounded-full border border-[#123A5A]/10 bg-white px-3 py-2 text-xs font-semibold text-[#123A5A] shadow-sm sm:px-4 sm:text-sm">
              <span>{market}</span>
            </span>
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {distributionPoints.map((point) => {
            const Icon = point.icon;

            return (
              <div key={point.label} className="rounded-md border border-[#123A5A]/10 bg-white p-5 text-left shadow-[0_18px_40px_rgba(16,32,51,0.06)]">
                <Icon className="mb-4 h-6 w-6 text-[#207B68]" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#207B68]">{point.label}</p>
                <p className="mt-2 text-lg font-semibold text-[#0B2239]">{point.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {capabilities.map((item) => (
            <span key={item} className="rounded-full border border-[#123A5A]/10 bg-[#F7FAF9] px-4 py-2 text-sm font-medium text-[#123A5A]">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/contact"
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#123A5A] px-6 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0B2239] sm:px-8"
          >
            Request Distribution Support
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
          <Link
            href="/partners"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#123A5A]/16 bg-white px-6 py-4 text-base font-semibold text-[#123A5A] transition duration-300 hover:-translate-y-0.5 hover:border-[#207B68]/35 hover:text-[#207B68] sm:px-8"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
