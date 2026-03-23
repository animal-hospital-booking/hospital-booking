"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "@/components/hp/AnimateOnScroll";

export default function TestimonialsModern() {
  const theme = getHpTheme("modern");

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">
            飼い主さまの声
          </h2>
          <div className="w-12 h-[2px] bg-blue-600 mx-auto mb-3" />
          <p className="text-slate-400 text-center mb-12 text-sm">
            ご来院いただいた皆さまからのお言葉
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {hpConfig.testimonials.map((t, i) => (
            <AnimateOnScroll key={i} delay={i * 150}>
              <div className="bg-white border-t-[3px] border-t-blue-600 border border-slate-100 p-6 md:p-8 hover:shadow-md transition-all duration-300 relative">
                {/* Large quote mark */}
                <div className="absolute top-4 left-6 text-6xl text-blue-100 font-serif leading-none select-none">
                  &ldquo;
                </div>

                {/* Rating as number */}
                <div className="flex items-center gap-1.5 mb-4 relative z-10">
                  <span className="text-lg font-bold text-slate-800">{t.rating.toFixed(1)}</span>
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                  {t.text}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  {/* Square avatar with initial */}
                  <div className="w-10 h-10 bg-slate-800 flex items-center justify-center text-white text-sm font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.pet}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
