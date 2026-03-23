"use client";

import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import { getIcon } from "../icons";
import AnimateOnScroll from "@/components/hp/AnimateOnScroll";

export default function FeaturesModern() {
  const featured = hpConfig.services.slice(0, 6);
  const theme = getHpTheme("modern");

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">
            診療案内
          </h2>
          <div className="w-12 h-[2px] bg-blue-600 mx-auto mb-3" />
          <p className="text-slate-400 text-center mb-12 text-sm">
            {hpConfig.targetAnimals.join(" / ")}の診療に対応しています
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <AnimateOnScroll key={i} delay={i * 100}>
                <div className="bg-white border border-slate-100 border-l-[3px] border-l-blue-600 p-6 rounded-none hover:-translate-y-1 transition-all duration-300 group shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-50 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-50 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll>
          <div className="text-center mt-10">
            <Link
              href="/hp/services"
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors bg-blue-50 hover:bg-blue-100 px-6 py-2.5 rounded-sm"
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
