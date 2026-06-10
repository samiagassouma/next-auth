import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
type SectionHeaderProps = {
  title: string;
  highlight?: string;
  actionLabel?: string;
  actionHref?: string;
  align?: "left" | "center";
};

function renderTitle(title: string, highlight?: string) {
  if (!highlight || !title.includes(highlight)) {
    return title;
  }

  const [before, after] = title.split(highlight);

  return (
    <>
      {before}
      <span className="text-[#7600c6]">{highlight}</span>
      {after}
    </>
  );
}

export default function SectionHeader({
  title,
  highlight,
  actionLabel,
  actionHref,
  align = "left",
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`mb-6 flex gap-4 ${
        isCentered
          ? "flex-col items-center text-center"
          : "items-end justify-between"
      }`}
    >
      <h2 className="text-[26px] font-extrabold leading-tight text-[#171326] sm:text-3xl">
        {renderTitle(title, highlight)}
      </h2>
      {actionLabel && actionHref ? (
        <Link
          className="shrink-0 text-sm font-bold text-[#7600c6] transition hover:text-[#4f008b]"
          href={actionHref}
        >
          {actionLabel}
          <FaArrowRight className="ml-2 inline-block" size={14} />
        </Link>
      ) : null}
    </div>
  );
}
