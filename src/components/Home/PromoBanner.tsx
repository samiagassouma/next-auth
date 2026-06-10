import Link from "next/link";

type PromoStat = {
  label: string;
  value: string;
};

type PromoBannerProps = {
  title: string;
  ctaLabel: string;
  ctaHref: string;
  stats: PromoStat[];
};

export default function PromoBanner({
  title,
  ctaLabel,
  ctaHref,
  stats,
}: PromoBannerProps) {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto w-full max-w-7xl px-5">
        <div className="relative overflow-hidden rounded-lg bg-[#efd8ff] px-7 py-10 sm:px-10 lg:px-12 h-[320px]
    w-full
    rounded-md
    bg-gradient-to-r
    from-[#f4efff]
    via-[#d6b5ff]
    to-[#D290FF]"  style={{
    clipPath:
      "polygon(6% 0%, 100% 0%, 100% 80%, 94% 100%, 0% 100%, 0% 15%)",
  }}>
          <div className="absolute bottom-0 right-0 h-32 w-52 bg-[#d09bff]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <h2 className="max-w-[330px] text-2xl font-extrabold leading-tight text-[#171326]">
                {title}
              </h2>
              <Link
                className="mt-6 inline-flex rounded-full bg-[#7600c6] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(118,0,198,0.22)] transition hover:bg-[#5e009f]"
                href={ctaHref}
              >
                {ctaLabel}
              </Link>
            </div>

            <div className="rounded-lg bg-white p-5 shadow-[0_22px_48px_rgba(74,33,113,0.18)]">
              <div className="mb-5 flex items-center justify-between border-b border-[#efe5f9] pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7600c6]">
                    Dashboard
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-[#171326]">
                    Recruiting status
                  </h3>
                </div>
                <span className="rounded-full bg-[#efe0ff] px-3 py-1 text-xs font-bold text-[#7600c6]">
                  Updated
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div className="rounded-lg bg-[#fbf8ff] p-4" key={stat.label}>
                    <p className="text-2xl font-black text-[#171326]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#81778f]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex h-24 items-end gap-3 rounded-lg bg-[#faf7ff] px-4 pb-4">
                {[42, 68, 50, 78, 88, 62].map((height, index) => (
                  <span
                    className="flex-1 rounded-t-md bg-[#7600c6]"
                    key={height + index}
                    style={{ height: `${height}%`, opacity: 0.3 + index * 0.09 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
