"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import { getIcon } from "../icons";
import AnimateOnScroll from "@/components/hp/AnimateOnScroll";

export default function FeaturesDetailModern() {
  const theme = getHpTheme("modern");

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Geometric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200/50" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-slate-200/50" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-slate-200/50" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">
            当院の特徴
          </h2>
          <div className="w-12 h-[2px] bg-blue-600 mx-auto mb-3" />
          <p className="text-slate-400 text-center mb-16 text-sm">
            {hpConfig.hospitalName}が選ばれる理由
          </p>
        </AnimateOnScroll>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Timeline line - hidden on mobile, shown on md+ */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px] bg-slate-200" />
          <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 opacity-40" />

          <div className="grid md:grid-cols-3 gap-8">
            {hpConfig.features.map((feature, i) => {
              const Icon = getIcon(feature.icon);
              return (
                <AnimateOnScroll key={i} delay={i * 200}>
                  <div className="flex flex-col items-center">
                    {/* Dot on timeline */}
                    <div className="relative z-10 w-12 h-12 bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-600/30 mb-6">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Card below */}
                    <div className="bg-white border border-slate-100 p-6 w-full shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="w-10 h-10 bg-slate-50 flex items-center justify-center mb-4 text-blue-600">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
