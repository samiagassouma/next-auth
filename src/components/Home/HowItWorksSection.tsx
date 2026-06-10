import SectionHeader from "./SectionHeader";
import type { WorkStep } from "./home-types";

type HowItWorksSectionProps = {
  title: string;
  steps: WorkStep[];
};

export default function HowItWorksSection({
  title,
  steps,
}: HowItWorksSectionProps) {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto w-full max-w-7xl px-5">
        <SectionHeader align="center" title={title} />

        <div className="rounded-2xl bg-white px-5 py-9 shadow-[0_24px_54px_rgba(35,24,55,0.15)]">
          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article className="relative text-center" key={step.title}>
                  {index < steps.length - 1 ? (
                    <svg
                      className={`absolute left-[70%] hidden h-16 w-[84%] md:block ${index % 2 === 0 ? "-top-6" : "top-6"
                        }`}
                      viewBox="0 0 260 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      {index % 2 === 0 ? (
                        <>
                          {/* Curve from top */}
                          <path
                            d="M5 45 C70 0, 165 0, 230 35"
                            stroke="#cda9ed"
                            strokeWidth="2"
                            strokeDasharray="7 7"
                            strokeLinecap="round"
                            fill="none"
                          />

                          <path
                            d="M227 26 L228 36 L218 37"
                            stroke="#cda9ed"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </>
                      ) : (
                        <>
                          {/* Curve from bottom */}
                          <path
                            d="M5 35 C70 80, 165 80, 230 45"
                            stroke="#cda9ed"
                            strokeWidth="2"
                            strokeDasharray="7 7"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M225 55 L230 45 L220 43"
                            stroke="#cda9ed"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </>
                      )}
                    </svg>
                  ) : null}
                  <div
                    className={`relative z-10 mx-auto flex h-12 w-12 items-center justify-center text-[#7600c6] ${step.variant ? "rounded-full bg-[#7600c6] text-white" : ""
                      }`}
                  >
                    <Icon aria-hidden size={19} />
                  </div>
                  {/* relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f2e6ff] text-[#7600c6] */}

                  <h3 className="mt-8 text-sm font-bold text-[#171326]">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[190px] text-xs leading-5 text-[#7d748d]">
                    {step.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
