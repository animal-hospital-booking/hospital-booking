"use client";

import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "@/components/hp/AnimateOnScroll";

const categoryColors: Record<string, { bg: string; text: string }> = {
  "お知らせ": { bg: "bg-blue-600", text: "text-white" },
  "休診": { bg: "bg-red-600", text: "text-white" },
  "キャンペーン": { bg: "bg-emerald-600", text: "text-white" },
  "ブログ": { bg: "bg-purple-600", text: "text-white" },
};

export default function NewsPreviewModern() {
  const recent = hpConfig.news.slice(0, 3);
  const theme = getHpTheme("modern");

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">
            お知らせ
          </h2>
          <div className="w-12 h-[2px] bg-blue-600 mx-auto mb-3" />
          <p className="text-slate-400 text-center mb-12 text-sm">
            最新の情報をお届けします
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {recent.map((item, i) => {
            const colors = categoryColors[item.category] || { bg: "bg-slate-600", text: "text-white" };
            return (
              <AnimateOnScroll key={item.id} delay={i * 100}>
                <div className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                  {/* Category badge */}
                  <div className="px-5 pt-5 pb-0">
                    <span className={`inline-block text-xs font-medium px-3 py-1 ${colors.bg} ${colors.text}`}>
                      {item.category}
                    </span>
                  </div>

                  <div className="px-5 pt-3 pb-5">
                    <time className="text-xs text-slate-400 block mb-2">{item.date}</time>
                    <h3 className="text-slate-800 text-sm font-bold mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll>
          <div className="text-center mt-10">
            <Link
              href="/hp/news"
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors bg-blue-50 hover:bg-blue-100 px-6 py-2.5 rounded-sm"
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
