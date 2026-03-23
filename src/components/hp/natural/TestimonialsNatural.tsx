"use client";

import { useState } from "react";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "../AnimateOnScroll";

export default function TestimonialsNatural() {
  const theme = getHpTheme("natural");
  const [current, setCurrent] = useState(0);
  const testimonials = hpConfig.testimonials;

  const goTo = (index: number) => {
    if (index < 0) {
      setCurrent(testimonials.length - 1);
    } else if (index >= testimonials.length) {
      setCurrent(0);
    } else {
      setCurrent(index);
    }
  };

  const t = testimonials[current];

  return (
    <section className="py-20 md:py-32 bg-emerald-50/50">
      <div className="max-w-4xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-3">
            飼い主さまの声
          </h2>
          <p className="text-stone-400 text-center mb-16 text-sm">
            ご来院いただいた皆さまからの温かいお言葉
          </p>
        </AnimateOnScroll>

        <div className="relative">
          {/* Quote marks */}
          <div className="text-center mb-8">
            <svg
              className="w-12 h-12 text-emerald-200 mx-auto"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
            </svg>
          </div>

          {/* Testimonial content */}
          <div className="text-center min-h-[180px] flex flex-col items-center justify-center">
            <p className="text-stone-700 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
              {t.text}
            </p>

            <div className="mt-8">
              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <svg
                    key={j}
                    className="w-4 h-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm font-medium text-stone-700">{t.name}</p>
              <p className="text-xs text-stone-400 mt-0.5">{t.pet}</p>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => goTo(current - 1)}
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
              aria-label="前の口コミ"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current
                      ? "bg-emerald-500 w-6"
                      : "bg-stone-300 hover:bg-stone-400"
                  }`}
                  aria-label={`口コミ ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(current + 1)}
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
              aria-label="次の口コミ"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
