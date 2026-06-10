"use client";

import { useState, useEffect } from "react";
import { FiStar } from "react-icons/fi";
import SectionHeader from "./SectionHeader";
import type { Testimonial } from "./home-types";
import { FaQuoteLeft } from "react-icons/fa";

type TestimonialsSectionProps = {
  title: string;
  testimonials: Testimonial[];
};

export default function TestimonialsSection({
  title,
  testimonials,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const getIndex = (offset: number) => {
    return (activeIndex + offset + testimonials.length) % testimonials.length;
  };

  const visibleTestimonials = [
    testimonials[getIndex(-1)],
    testimonials[getIndex(0)],
    testimonials[getIndex(1)],
  ];

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  return (
    <section className="bg-white py-14">
      <div className="mx-auto w-full max-w-7xl px-5">
        <SectionHeader align="center" title={title} />

        <div className="grid gap-5 md:grid-cols-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {visibleTestimonials.map((testimonial, index) => {
            const isActive = index === 1;

            return (
              <article
                key={`${testimonial.name}-${index}`}
                className={`rounded-2xl border border-[#eee3f7] bg-white p-6 shadow-[0_14px_30px_rgba(35,24,55,0.08)] transition-all duration-300 ease-in-out ${isActive
                  ? "md:-translate-y-4 md:shadow-[0_22px_44px_rgba(35,24,55,0.16)] scale-100"
                  : "opacity-80 scale-95"
                  }`}
              >
                <div className="flex gap-1 text-[#ffb21a]">
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <FiStar
                      aria-hidden
                      fill="currentColor"
                      key={starIndex}
                      size={14}
                    />
                  ))}
                </div>

                <p className="mt-5 min-h-[96px] text-sm leading-6 text-[#4f465f]">
                  {testimonial.quote}
                </p>


                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#efe0ff] text-sm font-black text-[#7600c6]">
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#171326]">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#81778f]">
                        {testimonial.role}
                      </p>
                    </div>
                    <FaQuoteLeft
                      className="text-[#d9dce3]"
                      size={36}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              aria-label={`Show testimonial ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${index === activeIndex
                ? "bg-[#7600c6]"
                : "bg-[#d8cfdf]"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}