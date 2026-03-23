"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import { getIcon } from "../icons";
import AnimateOnScroll from "../AnimateOnScroll";

export default function FeaturesDetailNatural() {
  const theme = getHpTheme("natural");

  return (
    <section className="py-20 md:py-32 bg-stone-50">
      <div className="max-w-3xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-3">
            当院の特徴
          </h2>
          <p className="text-stone-400 text-center mb-16 text-sm">
            {hpConfig.hospitalName}が選ばれる理由
          </p>
        </AnimateOnScroll>

        <div className="space-y-10">
          {hpConfig.features.map((feature, i) => {
            const Icon = getIcon(feature.icon);
            return (
              <AnimateOnScroll key={i} delay={i * 120}>
                <div className="flex gap-6 md:gap-8 pl-6 border-l-2 border-emerald-400">
                  <div className="flex-shrink-0 pt-1">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1 py-1">
                    <h3 className="font-bold text-stone-800 text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
