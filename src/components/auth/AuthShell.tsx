import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  image?: string;
  headingIcon?: string;
  contentClassName?: string;
};

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  image,
  headingIcon,
  contentClassName = "max-w-[330px]",
  children,
}: AuthShellProps) {
  const illustration = image ?? "/signup/signup.png";

  return (
    <div className="grid min-h-screen w-full bg-white lg:grid-cols-[1.08fr_0.92fr]">
      <aside className="relative hidden min-h-screen overflow-hidden border-r border-[#e4ddec] bg-white px-10 py-7 lg:flex lg:flex-col">
        <Link className="inline-flex items-center gap-2" href="/login">
          <Image alt="Logo" height={32} src="/logo.png" width={82} />
        </Link>

        <div className="absolute left-7 top-[21%] z-10 w-32 rounded-lg bg-[#ad56f4] px-4 py-5 text-white shadow-[0_18px_30px_rgba(122,0,200,0.18)]">
          <div className="mb-4 flex h-10 items-end gap-2">
            <span className="h-4 w-1.5 rounded-full bg-white/30" />
            <span className="h-6 w-1.5 rounded-full bg-white/45" />
            <span className="h-8 w-1.5 rounded-full bg-white/70" />
            <span className="h-10 w-1.5 rounded-full bg-white" />
          </div>
          <p className="text-lg font-bold leading-none">100K+</p>
          <p className="mt-2 text-sm leading-4 text-white/90">People got hired</p>
        </div>

        <div className="relative mx-auto mt-20 flex h-[560px] w-full max-w-[510px] items-center justify-center">
          <div>
            <Image
              src={illustration}
              alt=""
              fill
              sizes="(min-width: 1024px) 510px, 100vw"
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-2 right-4 z-30 w-[215px] rounded-lg bg-[#b554f4] px-5 py-4 text-white shadow-[0_18px_28px_rgba(122,0,200,0.2)]">
            <div className="absolute -top-7 right-8 h-14 w-14 rounded-full border-[6px] border-white bg-[#f0d7ff]" />
            <p className="text-sm font-bold">Adam Sandler</p>
            <p className="mt-1 text-xs text-white/85">Lead Engineer at Canva</p>
            <p className="mt-4 text-sm font-semibold leading-5">
              &quot;Great platform for Position seekers.&quot;
            </p>
          </div>
        </div>
      </aside>

      <section className="flex min-h-screen items-center justify-center px-6 py-9 sm:px-10">
        <div className={`w-full ${contentClassName}`}>
          <div className="mb-6 text-center">
            {eyebrow ? (
              <p className="mb-2 text-sm font-semibold uppercase text-[#8f31de]">
                {eyebrow}
              </p>
            ) : null}
            {headingIcon ? (
              <Image
                alt=""
                className="mx-auto mb-4 h-auto w-auto"
                height={300}
                src={headingIcon}
                width={300}
              />
            ) : null}
            <h1 className="text-[27px] font-bold leading-[1.2] text-[#6a00c2] sm:text-[28px]">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-3 text-base leading-6 text-[#8790a0]">
                {subtitle}
              </p>
            ) : null}
          </div>

          {children}
        </div>
      </section>
    </div>
  );
}
