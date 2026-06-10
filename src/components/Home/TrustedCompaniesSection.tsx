import SectionHeader from "./SectionHeader";
import type { BrandLogo } from "./home-types";

type TrustedCompaniesSectionProps = {
  title: string;
  subtitle: string;
  logos: BrandLogo[];
  highlight?: string;
};

export default function TrustedCompaniesSection({
  title,
  subtitle,
  logos,
  highlight,
}: TrustedCompaniesSectionProps) {
  return (
    <section className="bg-white py-14" id="companies">
      <div className="mx-auto w-full max-w-7xl px-5">
        <SectionHeader align="center" title={title} highlight={highlight} />
        <p className="mx-auto -mt-2 mb-8 max-w-xl text-center text-sm leading-6 text-[#7d748d]">
          {subtitle}
        </p>

        <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-[#eee3f7] sm:grid-cols-3 md:grid-cols-5">
          {logos.map((logo, index) => {
            const Icon = logo.icon;

            return (
              <div
                className="flex min-h-[64px] items-center justify-center gap-2 border-b border-r border-[#eee3f7] bg-white px-3 text-sm font-bold text-[#171326]"
                key={`${logo.name}-${index}`}
              >
                <Icon aria-hidden className={logo.className} size={18} />
                {/* <span>{logo.name}</span> */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
