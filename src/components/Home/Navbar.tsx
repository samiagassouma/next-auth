import Image from "next/image";
import Link from "next/link";

export type NavbarItem = {
  label: string;
  href: string;
};

export type NavbarAction = NavbarItem & {
  variant?: "link" | "primary";
  icon?: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
};

type NavbarProps = {
  logoSrc: string;
  logoAlt: string;
  items: NavbarItem[];
  actions: NavbarAction[];
};

export default function Navbar({
  logoSrc,
  logoAlt,
  items,
  actions,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#efe7f7] bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full items-center justify-between gap-5 px-5 py-4"
      >
        <div className="flex items-center gap-8">
          <Link className="inline-flex items-center" href="/">
            <Image alt={logoAlt} height={32} priority src={logoSrc} width={92} />
          </Link>

          <div className="hidden items-center gap-7 text-sm text-[#364153] md:flex">
            {items.map((item) => (
              <Link
                className="transition hover:text-[#7600c6]"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm font-bold">
          {actions.map((action) => (
            <Link
              className={
                action.variant === "primary"
                  ? "flex gap-2 rounded-full bg-[#7600c6] px-4 py-2.5 text-white shadow-[0_10px_24px_rgba(118,0,198,0.22)] transition hover:bg-[#5e009f]"
                  : "px-2 py-2 text-[#7600c6] transition hover:text-[#4e0088]"
              }
              href={action.href}
              key={action.label}
            >
              {action.icon && (
                <action.icon aria-hidden size={19}/>
              )}
              {action.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
