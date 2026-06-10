import { FiBookmark, FiBriefcase, FiClock, FiMapPin, FiDollarSign, FiFileText, FiZap, FiLayers } from "react-icons/fi";
import type { Palette, Position } from "./home-types";

const paletteStyles: Record<
  Palette,
  {
    icon: string;
    badge: string;
  }
> = {
  purple: {
    icon: "bg-[#efe0ff] text-[#7600c6]",
    badge: "bg-[#efe0ff] text-[#7600c6]",
  },
  green: {
    icon: "bg-[#ddf7eb] text-[#159b64]",
    badge: "bg-[#e6faef] text-[#13784f]",
  },
  blue: {
    icon: "bg-[#e0edff] text-[#1665d8]",
    badge: "bg-[#e8f1ff] text-[#1665d8]",
  },
  orange: {
    icon: "bg-[#fff0d8] text-[#e27612]",
    badge: "bg-[#fff0d8] text-[#bd5d0b]",
  },
  teal: {
    icon: "bg-[#dff8f5] text-[#0c8c83]",
    badge: "bg-[#e2f8f6] text-[#0c756f]",
  },
  rose: {
    icon: "bg-[#ffe4ea] text-[#d3345c]",
    badge: "bg-[#ffe8ed] text-[#b72449]",
  },
};

type JobCardProps = {
  position: Position;
};

export default function JobCard({ position }: JobCardProps) {
  const palette = paletteStyles[position.palette];

  return (
    <article
      className="group relative flex min-h-[226px] flex-col rounded-2xl border border-[#dfc7fb] bg-white p-4 shadow-[0_12px_28px_rgba(118,0,198,0.08)] ring-1 ring-transparent transition hover:-translate-y-1 hover:ring-[#d6b6f6] hover:shadow-[0_18px_38px_rgba(118,0,198,0.14)]
    hover:bg-gradient-to-r
    hover:from-[#f3e8ff]
    hover:to-white"
    >
 {position.badge && (
    <span className="absolute right-0 top-0 items-center justify-center px-3 py-1 text-xs font-medium text-white" style={{
      background: "linear-gradient(90deg, #FE9A00 0%, #FB2C36 100%)",
      boxShadow:
        "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px 15px 0px 10px",
    }}>
      {position.badge}
    </span>
  )}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${palette.icon}`}
          >
            <FiBriefcase aria-hidden size={18} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-extrabold text-[#171326]">
              {position.title}
            </h3>
            <div className="flex items-center gap-2">
              <p
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${position.type.toLowerCase() === "part time"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-sky-500"
                  }`}
              >
                {position.type.toUpperCase()}
              </p>
              <p className="mt-1 truncate text-xs font-semibold text-[#7d748d]">
                {position.company}
              </p>
            </div>
          </div>
        </div>

        <button
          aria-label={`Save ${position.title}`}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e4d6f4] text-[#877a98] transition hover:border-[#7600c6] hover:text-[#7600c6] ${position.badge ? "mt-3" : ""}`}
          type="button"
        >
          <FiBookmark aria-hidden size={15} />
        </button>
      </div>

      <div className="mt-4 grid gap-2 text-xs font-medium text-[#6f657e]">
        <p className="flex items-center gap-2">
          <FiMapPin aria-hidden className="text-[#7600c6]" size={14} />
          {position.location}
        </p>
        <p className="flex items-center gap-2">
          <FiDollarSign aria-hidden className="text-[#7600c6]" size={14} />
          {position.salary}
        </p>
        <p className="flex items-center gap-2">
          <FiFileText aria-hidden className="text-[#7600c6]" size={14} />
          Contract: {position.contractType}
        </p>
        <p className="flex items-center gap-2">
          <FiClock aria-hidden className="text-[#7600c6]" size={14} />
          Start Date: {position.startDate}
        </p>

      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 ">
        <FiZap aria-hidden className="text-[#7600c6]" size={14} />
        {position.tags.map((tag) => (
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${palette.badge}`}
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-2 flex items-center gap-2 text-xs font-medium text-[#6f657e]">
        <FiLayers aria-hidden className="text-[#7600c6]" size={14} />
        {position.domain}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-[#f1e8fb] pt-2">
        {/* <p className="text-xs font-extrabold text-[#171326]">{position.salary}</p> */}
        <p className="text-xs flex items-center gap-2">
          <FiClock aria-hidden className="text-[#7600c6]" size={14} />
          Posted {position.posted}
        </p>
        <p className="text-xs flex items-center gap-2">
          {position.applicants} applicants
        </p>
        <a
          className="rounded-full bg-[#7600c6] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#5e009f]"
          href="#"
        >
          Apply
        </a>
      </div>
    </article>
  );
}
