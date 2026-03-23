"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import { getIcon } from "./icons";
import AnimateOnScroll from "./AnimateOnScroll";

export default function FeaturesDetail() {
  const theme = getHpTheme();

  return (
    <section className={`py-16 md:py-24 ${theme.sectionAltBg} relative overflow-hidden`}>
      <div className={`absolute top-20 right-0 w-72 h-72 ${theme.accentLighter}/30 rounded-full blur-[80px]`} />
      <div className={`absolute bottom-20 left-0 w-60 h-60 ${theme.accentLighter}/30 rounded-full blur-[60px]`} />

      <div className="relative max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-3">
            当院の特徴
          </h2>
          <p className="text-stone-400 text-center mb-14 text-sm">
            {hpConfig.hospitalName}が選ばれる理由
          </p>
        </AnimateOnScroll>

        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {hpConfig.features.map((feature, i) => {
            const Icon = getIcon(feature.icon);
            return (
              <AnimateOnScroll key={i} delay={i * 150}>
                <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <div className={`absolute -top-3 -left-3 w-10 h-10 ${theme.numberBg} text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md ${theme.numberShadow} group-hover:scale-110 transition-transform`}>
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className={`w-12 h-12 ${theme.iconBg} rounded-xl flex items-center justify-center mb-5 mt-2 ${theme.iconText}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-stone-800 text-lg mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
