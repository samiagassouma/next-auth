import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
const footerColumns = [
  {
    title: "Platform",
    links: ["Find Positions", "Browse Companies", "Featured Companies"],
  },
  {
    title: "For freelancers",
    links: ["Create profile", "Find work", "Browse skills", "Career advice"],
  },
  {
    title: "Support",
    links: ["Help Center", "FAQ", "Contact Us"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#eee3f7] bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-extrabold text-[#171326]">
                  {column.title}
                </h2>
                <ul className="mt-4 grid gap-3 text-sm font-semibold text-[#6f657e]">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link
                        className="transition hover:text-[#7600c6]"
                        href="#"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-[#171326]">
              Sign up for our newsletter to stay up to date
            </h2>
            <form className="mt-5 flex overflow-hidden border-b border-[#dfc7fb] bg-white">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                className="min-w-0 flex-1 bg-transparent px-0 py-3 text-sm text-[#171326] outline-none placeholder:text-[#8a8198]"
                id="newsletter-email"
                placeholder="Your email..."
                type="email"
              />

              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#7600c6] transition hover:text-[#4f008b]"
              >
                <FaArrowRight className="h-4 w-4" />
              </button>

            </form>
            <div className="flex flex-col gap-4 mt-6">
              <span className="text-center text-sm font-semibold text-[#81778f] ">OR</span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <HiOutlineMail aria-hidden className="text-[#7600c6]" size={16} />
                  <span className="text-sm font-semibold text-[#81778f]">Contact Us</span>
                </div>

                <div className="flex items-center gap-3">
                  {[
                    { label: "Facebook", icon: FaFacebookF },
                    { label: "Twitter", icon: FaXTwitter },
                    { label: "LinkedIn", icon: FaLinkedinIn },
                  ].map((social) => {
                    const Icon = social.icon;

                    return (
                      <Link
                        aria-label={social.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#7600c6] transition hover:bg-[#7600c6] hover:text-white"
                        href="#"
                        key={social.label}
                      >
                        <Icon aria-hidden size={16} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link className="inline-flex items-center" href="/">
          <Image alt="JobPilot logo" height={32} src="/logo.png" width={92} />
        </Link>
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-[#eee3f7] pt-7 text-sm font-semibold text-[#81778f] md:flex-row">
          <p>2026 JobPilot. All rights reserved.</p>
          <div className="flex gap-5">
            <Link className="transition hover:text-[#7600c6]" href="#">
              Privacy Policy
            </Link>
            <Link className="transition hover:text-[#7600c6]" href="#">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
