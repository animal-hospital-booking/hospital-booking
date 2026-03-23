"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Stats() {
  const theme = getHpTheme();

  return (
    <section className={`relative py-16 md:py-24 bg-gradient-to-r ${theme.statsBg} overflow-hidden`}>
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
            数字で見る当院
          </h2>
          <p className={`${theme.statsSubtext} text-center mb-12 text-sm`}>
            地域の皆さまに支えられ、日々成長を続けています
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {hpConfig.stats.map((stat, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                  {stat.suffix && (
                    <span className={`text-lg md:text-xl font-medium ${theme.statsText}`}>
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className={`${theme.statsSubtext} text-sm`}>{stat.label}</div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
