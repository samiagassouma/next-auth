import SectionHeader from "./SectionHeader";
import type { Domain } from "./home-types";

type PopularDomainsSectionProps = {
  title: string;
  highlight?: string;
  domains: Domain[];
};

export default function PopularDomainsSection({
  title,
  highlight,
  domains,
}: PopularDomainsSectionProps) {
  return (
    <section className="bg-white py-10" id="domains">
      <div className="mx-auto w-full max-w-7xl px-5">
        <SectionHeader
          actionHref="#"
          actionLabel="View all"
          highlight={highlight}
          title={title}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((domain) => {
            const Icon = domain.icon;

            return (
              <article
                className="rounded-2xl border border-[#e6d8f5] bg-white p-4 shadow-[0_10px_24px_rgba(118,0,198,0.06)] transition hover:-translate-y-1 hover:border-[#c99df1]"
                key={domain.title}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f2e6ff] text-[#7600c6]">
                    <Icon aria-hidden size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-extrabold text-[#171326]">
                      {domain.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#81778f]">
                      {domain.openPositions}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
