"use client";

import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import { getIcon } from "./icons";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Features() {
  const featured = hpConfig.services.slice(0, 3);
  const theme = getHpTheme();

  return (
    <section className={`py-16 md:py-24 ${theme.sectionAltBg} relative overflow-hidden`}>
      <div className={`absolute bottom-0 right-0 w-80 h-80 ${theme.accentLighter}/20 rounded-full blur-[80px]`} />

      <div className="relative max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-3">
            診療案内
          </h2>
          <p className="text-stone-400 text-center mb-12 text-sm">
            {hpConfig.targetAnimals.join("・")}の診療に対応しています
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <AnimateOnScroll key={i} delay={i * 150}>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border border-stone-100">
                  <div className={`w-14 h-14 bg-gradient-to-br ${theme.iconBgGradient} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${theme.iconText}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-stone-800 text-lg mb-3">
                    {service.name}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll>
          <div className="text-center mt-10">
            <Link
              href="/hp/services"
              className={`inline-flex items-center gap-1.5 ${theme.accentTextHover} font-medium text-sm transition-colors ${theme.tagBg} ${theme.accentLighter.replace("bg-", "hover:bg-")} px-6 py-2.5 rounded-full`}
            >
              すべての診療内容を見る
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
