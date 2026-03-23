"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Testimonials() {
  const theme = getHpTheme();

  return (
    <section className={`py-16 md:py-24 ${theme.sectionWarmBg} relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-10 right-10 w-40 h-40 border-2 border-stone-800 rounded-full" />
        <div className="absolute bottom-10 left-10 w-28 h-28 border-2 border-stone-800 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-3">
            飼い主さまの声
          </h2>
          <p className="text-stone-400 text-center mb-12 text-sm">
            ご来院いただいた皆さまからの温かいお言葉
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {hpConfig.testimonials.map((t, i) => (
            <AnimateOnScroll key={i} delay={i * 150}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative">
                {/* Quote mark */}
                <div className={`absolute top-4 right-5 text-5xl ${theme.quoteColor} font-serif leading-none select-none`}>
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className={`w-4 h-4 ${theme.starColor}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-stone-600 text-sm leading-relaxed mb-6 relative z-10">
                  {t.text}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${theme.avatarFrom} ${theme.avatarTo} flex items-center justify-center ${theme.avatarText} text-sm font-bold`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-700">{t.name}</p>
                    <p className="text-xs text-stone-400">{t.pet}</p>
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
