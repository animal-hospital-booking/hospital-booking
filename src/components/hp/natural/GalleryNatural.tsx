"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "../AnimateOnScroll";

// Masonry-style aspect ratios: alternating tall and wide
const aspectPatterns = [
  "aspect-[3/4]",  // tall
  "aspect-[4/3]",  // wide
  "aspect-square",  // square
  "aspect-[4/3]",  // wide
  "aspect-[3/4]",  // tall
  "aspect-square",  // square
];

export default function GalleryNatural() {
  const theme = getHpTheme("natural");

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-3">
            院内紹介
          </h2>
          <p className="text-stone-400 text-center mb-14 text-sm">
            清潔で安心できる環境をご用意しています
          </p>
        </AnimateOnScroll>

        {/* Masonry-style layout using CSS columns */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {hpConfig.gallery.map((item, i) => {
            const aspect = aspectPatterns[i % aspectPatterns.length];
            return (
              <AnimateOnScroll key={i} delay={i * 80}>
                <div
                  className={`group relative bg-stone-100 ${aspect} overflow-hidden rounded-xl break-inside-avoid cursor-default`}
                >
                  {/* Image placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-transform duration-500 group-hover:scale-105">
                    <svg
                      className="w-8 h-8 text-stone-300 mb-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                      />
                    </svg>
                    <p className="text-stone-400 text-xs">{item.label}の写真</p>
                  </div>

                  {/* Hover overlay with description */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-5">
                    <h3 className="text-white font-bold text-base mb-1">
                      {item.label}
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed">
                      {item.description}
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
