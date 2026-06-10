import { FiBookmark, FiBriefcase, FiLayers, FiMapPin, FiUsers, FiZap } from "react-icons/fi";
import type { Palette } from "./home-types";
import type { FeaturedCompany } from "./home-types";
import { HiMapPin } from "react-icons/hi2";

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


type CompanyCardProps = {
    company: FeaturedCompany;
};

export default function CompanyCard({ company }: CompanyCardProps) {

    const palette = companyPalette[company.palette];
    return (
        <article
            className="rounded-2xl border border-[#dfc7fb] bg-white p-5 shadow-[0_12px_26px_rgba(118,0,198,0.08)] transition hover:-translate-y-1 hover:bg-gradient-to-r
    hover:from-[#f3e8ff]
    hover:to-white"
            key={company.name}
        >
            <div className="mb-4 flex items-start justify-between">
                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${palette.logo}`}
                >
                    <FiBriefcase aria-hidden size={24} />
                </div>
                <span className="px-2.5 py-1">
                                    <button
                    aria-label={`Save ${company.name} to favorites`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e4d6f4] text-[#877a98] transition hover:border-[#7600c6] hover:text-[#7600c6]"
                    type="button"
                >
                    <FiBookmark aria-hidden size={15} />
                </button>
                </span>
            </div>

            <h3 className="text-lg font-extrabold text-[#171326]">
                {company.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-[#7d748d]">
                {company.industry}
            </p>

            <div className="mt-5 grid gap-3 text-xs font-semibold text-[#6f657e]">
                <p className="flex items-center gap-2">
                    <HiMapPin aria-hidden className="text-[#7600c6]" size={14} />
                    {company.location}
                </p>
                <p className="flex items-center gap-2">
                    <FiUsers aria-hidden className="text-[#7600c6]" size={14} />
                    {company.employees}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 ">
                    <FiZap aria-hidden className="text-[#7600c6]" size={14} />
                    {company.tags.map((tag) => (
                        <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${palette.badge}`}
                            key={tag}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <p className="mt-2 flex items-center gap-2 text-xs font-medium text-[#6f657e]">
                <FiLayers aria-hidden className="text-[#7600c6]" size={14} />
                {company.domain}
            </p>

            <div className="mt-5 flex items-center justify-between">
                <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${palette.badge}`}
                >
                    {company.positions}
                </span>
                <a
                    className="rounded-full bg-[#7600c6] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#5e009f]"
                    href="#"
                >
                    View
                </a>
            </div>
        </article>
    );
}