import { FiBriefcase, FiMapPin, FiUsers } from "react-icons/fi";
import SectionHeader from "./SectionHeader";
import type { FeaturedCompany, Palette } from "./home-types";
import CompanyCard from "./CompanyCard";

const companyPalette: Record<
  Palette,
  {
    logo: string;
    badge: string;
  }
> = {
  purple: {
    logo: "bg-[#efe0ff] text-[#7600c6]",
    badge: "bg-[#efe0ff] text-[#7600c6]",
  },
  green: {
    logo: "bg-[#ddf7eb] text-[#159b64]",
    badge: "bg-[#e6faef] text-[#13784f]",
  },
  blue: {
    logo: "bg-[#e0edff] text-[#1665d8]",
    badge: "bg-[#e8f1ff] text-[#1665d8]",
  },
  orange: {
    logo: "bg-[#fff0d8] text-[#e27612]",
    badge: "bg-[#fff0d8] text-[#bd5d0b]",
  },
  teal: {
    logo: "bg-[#dff8f5] text-[#0c8c83]",
    badge: "bg-[#e2f8f6] text-[#0c756f]",
  },
  rose: {
    logo: "bg-[#ffe4ea] text-[#d3345c]",
    badge: "bg-[#ffe8ed] text-[#b72449]",
  },
};

type FeaturedCompaniesSectionProps = {
  title: string;
  highlight?: string;
  companies: FeaturedCompany[];
};

export default function FeaturedCompaniesSection({
  title,
  highlight,
  companies,
}: FeaturedCompaniesSectionProps) {
  return (
    <section className="bg-white py-10" id="featured-companies">
      <div className="mx-auto w-full max-w-6xl px-5">
        <SectionHeader highlight={highlight} title={title} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company) => {
            

            return (
              // <article
              //   className="rounded-lg border border-[#dfc7fb] bg-[#fbf7ff] p-5 shadow-[0_12px_26px_rgba(118,0,198,0.08)] transition hover:-translate-y-1 hover:bg-white"
              //   key={company.name}
              // >
              //   <div className="mb-4 flex items-start justify-between">
              //     <div
              //       className={`flex h-14 w-14 items-center justify-center rounded-full ${palette.logo}`}
              //     >
              //       <FiBriefcase aria-hidden size={24} />
              //     </div>
              //     <span className="rounded-full border border-[#dfc7fb] px-2.5 py-1 text-xs font-bold text-[#7600c6]">
              //       {company.positions.split(" ")[0]}
              //     </span>
              //   </div>

              //   <h3 className="text-lg font-extrabold text-[#171326]">
              //     {company.name}
              //   </h3>
              //   <p className="mt-1 text-sm font-semibold text-[#7d748d]">
              //     {company.industry}
              //   </p>

              //   <div className="mt-5 grid gap-3 text-xs font-semibold text-[#6f657e]">
              //     <p className="flex items-center gap-2">
              //       <FiMapPin aria-hidden className="text-[#7600c6]" size={14} />
              //       {company.location}
              //     </p>
              //     <p className="flex items-center gap-2">
              //       <FiUsers aria-hidden className="text-[#7600c6]" size={14} />
              //       {company.employees}
              //     </p>
              //   </div>

              //   <div className="mt-5 flex items-center justify-between">
              //     <span
              //       className={`rounded-full px-3 py-1.5 text-xs font-bold ${palette.badge}`}
              //     >
              //       {company.positions}
              //     </span>
              //     <a
              //       className="rounded-full bg-[#7600c6] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#5e009f]"
              //       href="#"
              //     >
              //       View
              //     </a>
              //   </div>
                <CompanyCard key={company.name}
                  company = {company}
                />
              // </article>

            );
          })}
        </div>
      </div>
    </section>
  );
}
