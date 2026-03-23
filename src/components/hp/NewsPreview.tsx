"use client";

import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "./AnimateOnScroll";

const categoryColors: Record<string, string> = {
  お知らせ: "bg-blue-100 text-blue-700",
  休診: "bg-red-100 text-red-700",
  キャンペーン: "bg-emerald-100 text-emerald-700",
  ブログ: "bg-purple-100 text-purple-700",
};

export default function NewsPreview() {
  const recent = hpConfig.news.slice(0, 3);
  const theme = getHpTheme();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-3">
            お知らせ
          </h2>
          <p className="text-stone-400 text-center mb-12 text-sm">
            最新の情報をお届けします
          </p>
        </AnimateOnScroll>

        <div className="max-w-2xl mx-auto">
          {recent.map((item, i) => (
            <AnimateOnScroll key={item.id} delay={i * 100}>
              <div className="flex items-start gap-4 p-5 rounded-xl hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-0">
                <div className="shrink-0 pt-0.5">
                  <time className="text-xs text-stone-400 block">{item.date}</time>
                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1.5 ${
                      categoryColors[item.category] || "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <div>
                  <p className="text-stone-700 text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-1">{item.content}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <div className="text-center mt-8">
            <Link
              href="/hp/news"
              className={`inline-flex items-center gap-1.5 ${theme.accentTextHover} font-medium text-sm transition-colors ${theme.tagBg} ${theme.accentLighter.replace("bg-", "hover:bg-")} px-6 py-2.5 rounded-full`}
            >
              お知らせ一覧を見る
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
