"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "@/components/hp/AnimateOnScroll";

export default function StatsModern() {
  const theme = getHpTheme("modern");

  return (
    <section className="relative py-16 md:py-24 bg-slate-900 overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-48 h-48 border border-slate-700/30" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border border-slate-700/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-800/50 rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            数字で見る当院
          </h2>
          <div className="w-12 h-[2px] bg-blue-500 mx-auto mb-3" />
          <p className="text-slate-400 text-center mb-12 text-sm">
            地域の皆さまに支えられ、日々成長を続けています
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4">
          {hpConfig.stats.map((stat, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div
                className={`text-center py-8 px-4 ${
                  i < hpConfig.stats.length - 1 ? "md:border-r md:border-slate-700/50" : ""
                } ${i < 2 ? "border-b md:border-b-0 border-slate-700/50" : ""}`}
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-base md:text-lg font-medium text-blue-300/70 ml-1">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
