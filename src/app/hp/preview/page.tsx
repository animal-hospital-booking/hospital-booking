import type { Metadata } from "next";
import Link from "next/link";
import { themes, HpTemplate } from "@/lib/hp-theme";

export const metadata: Metadata = {
  title: "テンプレートを選ぶ | HP プレビュー",
  description: "3つのテンプレートから、病院のイメージに合うデザインをお選びください。",
};

const templateDescriptions: Record<HpTemplate, { tagline: string; description: string; colors: string[] }> = {
  warm: {
    tagline: "あたたかみのあるデザイン",
    description:
      "アンバーとオレンジを基調とした、親しみやすく温かい印象のデザイン。地域密着型の動物病院におすすめです。",
    colors: ["#d97706", "#ea580c", "#f59e0b", "#fbbf24", "#fef3c7"],
  },
  natural: {
    tagline: "自然で落ち着いたデザイン",
    description:
      "エメラルドグリーンとティールを基調とした、清潔感と安心感を与えるデザイン。ナチュラルな雰囲気の病院に最適です。",
    colors: ["#059669", "#0d9488", "#10b981", "#34d399", "#d1fae5"],
  },
  modern: {
    tagline: "洗練されたモダンデザイン",
    description:
      "ブルーとインディゴを基調とした、信頼感と専門性を演出するデザイン。先進的な医療を提供する病院におすすめです。",
    colors: ["#2563eb", "#4f46e5", "#3b82f6", "#60a5fa", "#dbeafe"],
  },
};

function ColorBar({ colors }: { colors: string[] }) {
  return (
    <div className="flex gap-1.5">
      {colors.map((c, i) => (
        <div
          key={i}
          className="w-8 h-8 rounded-full border border-white/50 shadow-sm"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}

function GradientPreview({ template }: { template: HpTemplate }) {
  const info = templateDescriptions[template];
  const [c1, c2, c3] = info.colors;
  return (
    <div
      className="h-40 rounded-xl relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`,
      }}
    >
      {/* Mock UI elements */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/30" />
          <div className="h-3 w-24 rounded bg-white/30" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-white/25" />
          <div className="h-3 w-1/2 rounded bg-white/20" />
          <div className="mt-3 h-8 w-28 rounded-lg bg-white/40" />
        </div>
      </div>
    </div>
  );
}

export default function PreviewSelectorPage() {
  const templates: HpTemplate[] = ["warm", "natural", "modern"];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="text-sm text-stone-500 mb-1">HP デザイン</p>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900">
            テンプレートを選ぶ
          </h1>
          <p className="text-stone-500 mt-2 text-sm md:text-base">
            病院のイメージに合うデザインテンプレートをお選びください。すべてのテンプレートでレスポンシブ対応・予約システム連携が含まれます。
          </p>
        </div>
      </header>

      {/* Template Cards */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {templates.map((key) => {
            const theme = themes[key];
            const info = templateDescriptions[key];
            return (
              <div
                key={key}
                className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Gradient preview */}
                <GradientPreview template={key} />

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-stone-900">
                      {theme.name}
                    </h2>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                      テンプレート
                    </span>
                  </div>

                  <p className="text-sm font-medium text-stone-700 mb-2">
                    {info.tagline}
                  </p>
                  <p className="text-sm text-stone-500 leading-relaxed mb-5">
                    {info.description}
                  </p>

                  {/* Color palette */}
                  <div className="mb-6">
                    <p className="text-xs text-stone-400 mb-2 uppercase tracking-wider font-medium">
                      カラーパレット
                    </p>
                    <ColorBar colors={info.colors} />
                  </div>

                  {/* Features list */}
                  <ul className="text-xs text-stone-500 space-y-1.5 mb-6">
                    <li className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      レスポンシブ対応
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      LINE予約連携
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      管理ダッシュボード付き
                    </li>
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/hp/preview/${key}`}
                    className="block w-full text-center py-3 rounded-xl text-sm font-semibold text-white transition-colors"
                    style={{
                      backgroundColor: info.colors[0],
                    }}
                  >
                    このテンプレートでプレビュー
                    <svg className="inline-block w-4 h-4 ml-1 -mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-10 bg-white border border-stone-200 rounded-xl p-6 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-800 mb-1">テンプレートは後から変更可能です</p>
            <p className="text-sm text-stone-500">
              公開後もワンクリックでテンプレートを切り替えられます。まずは気になるデザインをお試しください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
