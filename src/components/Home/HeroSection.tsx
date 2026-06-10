import Image from "next/image";
import { FiMapPin, FiSearch } from "react-icons/fi";
import SearchBar from "./SearchBar";

export type HeroSectionProps = {
  title: string;
  highlight?: string;
  subtitle: string;
  imageSrc: string;
  imageAlt?: string;
  searchPlaceholder: string;
};

function renderHeroTitle(title: string, highlight?: string) {
  if (!highlight || !title.includes(highlight)) {
    return title;
  }

  const [before, after] = title.split(highlight);

  return (
    <>
      {before}
      <span className="relative inline-block text-[#7600c6]">{highlight}
        <svg
          className="absolute left-0 top-full w-[75%]"
          viewBox="0 0 260 20"
          fill="none"
        >
          <path
            d="M5 8 C70 18, 190 18, 255 8"
            stroke="#7600c6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {after}
    </>
  );
}

export default function HeroSection({
  title,
  highlight,
  subtitle,
  imageSrc,
  imageAlt = "",
  searchPlaceholder,
}: HeroSectionProps) {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid min-h-[560px] w-full max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
        <div>
          <h1 className="max-w-[560px] text-[44px] font-black leading-[1.05] text-[#171326] sm:text-[58px] lg:text-[66px]">
            {renderHeroTitle(title, highlight)}
          </h1>
          <p className="mt-14 max-w-[520px] text-base leading-7 text-[#6d647d] sm:text-lg">
            {subtitle}
          </p>

          <SearchBar searchPlaceholder={searchPlaceholder} />
        </div>

        <div className="relative mx-auto min-h-[340px] w-full max-w-[560px] lg:min-h-[470px]">
          <div className="absolute inset-x-8 bottom-6 top-8 rounded-[42%_58%_48%_52%/52%_44%_56%_48%] bg-[#ead6ff]" />
          <div className="absolute left-2 top-8 rounded-2xl bg-white px-4 py-3 shadow-[0_14px_36px_rgba(76,44,120,0.16)]">
            <p className="text-xs font-bold text-[#7600c6]">21,457</p>
            <p className="text-[11px] text-[#7a708b]">Positions open</p>
          </div>
          <div className="absolute bottom-8 right-2 rounded-2xl bg-white px-4 py-3 shadow-[0_14px_36px_rgba(76,44,120,0.16)]">
            <p className="text-xs font-bold text-[#159b64]">92%</p>
            <p className="text-[11px] text-[#7a708b]">Match rate</p>
          </div>
          <Image
            alt={imageAlt}
            className="object-contain"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 560px"
            src={imageSrc}
          />
        </div>
      </div>
    </section>
  );
}
