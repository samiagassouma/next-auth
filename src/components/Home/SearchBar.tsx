import { FiSearch } from "react-icons/fi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

type SearchBarProps = {
    searchPlaceholder: string;
};

export default function SearchBar({ searchPlaceholder }: SearchBarProps) {
    return (
        <form className="mt-8 flex max-w-[560px] flex-col gap-3 rounded-full border border-[#eadff4] bg-white p-2 shadow-[0_20px_50px_rgba(118,0,198,0.12)] sm:flex-row">
            <label className="flex min-h-10 flex-1 items-center gap-3 rounded-full bg-[#fbf8ff] px-4 text-sm text-[#7c718f]">
                <FiSearch aria-hidden className="text-[#7600c6]" size={19} />
                <span className="sr-only">Position keyword</span>
                <input
                    className="w-full bg-transparent text-[#20172f] outline-none placeholder:text-[#9288a2]"
                    placeholder={searchPlaceholder}
                    type="search"
                />
            </label>

            <button
                className="flex min-h-10 items-center gap-3 rounded-full border border-transparent bg-[#fbf8ff] px-4 text-sm text-[#7c718f] transition focus-within:border-[#7600c6] focus-within:ring-2 focus-within:ring-[#7600c6]/20 sm:max-w-[210px]">
                <HiAdjustmentsHorizontal aria-hidden className="text-[#7600c6]" size={18} />
                <span className="sr-only">Filter</span>
            </button>

            <button
                className="min-h-10 rounded-full bg-[#7600c6] px-7 text-sm font-bold text-white shadow-[0_12px_24px_rgba(118,0,198,0.22)] transition hover:bg-[#5e009f]"
                type="submit"
            >
                Search
            </button>
        </form>
    );
}