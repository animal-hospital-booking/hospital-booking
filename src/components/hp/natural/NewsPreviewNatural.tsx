"use client";

import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "../AnimateOnScroll";

export default function NewsPreviewNatural() {
  const recent = hpConfig.news.slice(0, 3);
  const theme = getHpTheme("natural");

  return (
    <section className="py-20 md:py-28 bg-stone-50">
      <div className="max-w-3xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-3">
            お知らせ
          </h2>
          <p className="text-stone-400 text-center mb-14 text-sm">
            最新の情報をお届けします
          </p>
        </AnimateOnScroll>

        <div>
          {recent.map((item, i) => (
            <AnimateOnScroll key={item.id} delay={i * 80}>
              <div className="flex items-baseline gap-6 py-5 border-b border-stone-200 last:border-0">
                <time className="text-sm text-stone-400 shrink-0 w-24 tabular-nums">
                  {item.date}
                </time>
                <div className="flex-1 min-w-0">
                  <p className="text-stone-700 text-sm font-medium truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <div className="text-center mt-10">
            <Link
              href="/hp/news"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-emerald-300"
            >
              お知らせ一覧を見る
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
