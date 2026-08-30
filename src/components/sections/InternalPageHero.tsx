import Image from "next/image";

export function InternalPageHero({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#071321] px-4 pb-12 pt-28 text-center text-white sm:px-6 sm:pb-14 sm:pt-32 lg:px-8">
      <Image
        src="/images/client-supplied/service-global-distribution.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover opacity-35"
      />
      <div className="absolute inset-0 z-0 bg-[#071321]/78" aria-hidden="true" />
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(0, 168, 132, 0.24), transparent 42%),
            radial-gradient(circle at 78% 18%, rgba(198, 161, 40, 0.18) 0%, transparent 34%),
            linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "auto, auto, 80px 80px, 80px 80px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex min-h-[220px] max-w-5xl flex-col items-center justify-center">
        <p className="mb-5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[#8CE6D1] sm:text-sm">{eyebrow}</p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/74 sm:text-lg">{copy}</p>
      </div>
    </section>
  );
}
