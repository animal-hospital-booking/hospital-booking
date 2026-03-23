"use client";

import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import { getIcon } from "../icons";
import AnimateOnScroll from "../AnimateOnScroll";

export default function FeaturesNatural() {
  const featured = hpConfig.services.slice(0, 4);
  const theme = getHpTheme("natural");

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-3">
            診療案内
          </h2>
          <p className="text-stone-400 text-center mb-16 md:mb-24 text-sm">
            {hpConfig.targetAnimals.join(" / ")}の診療に対応しています
          </p>
        </AnimateOnScroll>

        <div className="space-y-16 md:space-y-24">
          {featured.map((service, i) => {
            const Icon = getIcon(service.icon);
            const isReversed = i % 2 === 1;

            return (
              <AnimateOnScroll key={i} delay={i * 100}>
                <div
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                    isReversed ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Icon side */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600">
                      <Icon className="w-12 h-12 md:w-16 md:h-16" />
                    </div>
                  </div>

                  {/* Text side */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-stone-800 text-xl md:text-2xl mb-4">
                      {service.name}
                    </h3>
                    <p className="text-stone-500 leading-relaxed max-w-lg">
                      {service.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll>
          <div className="text-center mt-16 md:mt-24">
            <Link
              href="/hp/services"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-emerald-300"
            >
              すべての診療内容を見る
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
