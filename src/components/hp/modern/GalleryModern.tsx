"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "@/components/hp/AnimateOnScroll";

export default function GalleryModern() {
  const theme = getHpTheme("modern");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">
            院内紹介
          </h2>
          <div className="w-12 h-[2px] bg-blue-600 mx-auto mb-3" />
          <p className="text-slate-400 text-center mb-12 text-sm">
            清潔で安心できる環境をご用意しています
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {hpConfig.gallery.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 80}>
              <div className="group relative bg-slate-200 aspect-[4/3] overflow-hidden cursor-default">
                {/* Image placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <svg className="w-8 h-8 text-slate-300 mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                  <p className="text-slate-400 text-xs">{item.label}</p>
                </div>

                {/* Hover: dark overlay with title */}
                <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white font-bold text-base mb-1">
                    {item.label}
                  </h3>
                  <p className="text-slate-300 text-xs text-center">
                    {item.description}
                  </p>
                </div>

                {/* Mobile label */}
                <div className="md:hidden absolute bottom-0 inset-x-0 bg-slate-900/70 py-2 px-3">
                  <h3 className="text-white font-bold text-xs">{item.label}</h3>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
