import type { Metadata } from "next";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";

export const metadata: Metadata = {
  title: "お知らせ",
};

const categoryColors: Record<string, string> = {
  お知らせ: "bg-blue-100 text-blue-700",
  休診: "bg-red-100 text-red-700",
  キャンペーン: "bg-emerald-100 text-emerald-700",
  ブログ: "bg-purple-100 text-purple-700",
};

export default function NewsPage() {
  const theme = getHpTheme();

  return (
    <>
      {/* Page Header */}
      <section className={`bg-gradient-to-b ${theme.accentLight.replace("bg-", "from-")} to-white py-12 md:py-16`}>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 text-center">
            お知らせ
          </h1>
          <p className="text-stone-500 text-center mt-3">News</p>
        </div>
      </section>

      {/* News List */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {hpConfig.news.length === 0 ? (
            <p className="text-center text-stone-400 py-12">
              お知らせはまだありません。
            </p>
          ) : (
            <div className="space-y-6">
              {hpConfig.news.map((item) => (
                <article
                  key={item.id}
                  className="border-b border-stone-100 pb-6 last:border-0"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <time className="text-sm text-stone-400">{item.date}</time>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                        categoryColors[item.category] ||
                        "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <h2 className="font-bold text-stone-800 text-base mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {item.content}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
