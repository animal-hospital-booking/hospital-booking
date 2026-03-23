"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "../AnimateOnScroll";

export default function StatsNatural() {
  const theme = getHpTheme("natural");

  return (
    <section className="py-20 md:py-28 bg-emerald-50/30">
      <div className="max-w-5xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-4">
            数字で見る当院
          </h2>
          <p className="text-stone-400 text-center mb-14 text-sm">
            地域の皆さまに支えられ、日々成長を続けています
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {hpConfig.stats.map((stat, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center">
                <div className="text-4xl md:text-5xl font-extralight text-emerald-700 mb-3 tracking-tight">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-base md:text-lg font-normal text-emerald-500 ml-1">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="text-sm text-stone-500">{stat.label}</div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
