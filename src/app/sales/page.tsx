import Link from "next/link";

/* ─── SVG Icon Components ─── */

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function IconDevicePhone({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  );
}

function IconChatBubble({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  );
}

function IconChartBar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconCog({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

/* ─── Page ─── */

export default function SalesPage() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-stone-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight text-stone-900">PetClinic Web</span>
          <div className="flex items-center gap-6">
            <a href="#problems" className="hidden md:block text-sm text-stone-500 hover:text-stone-800 transition">課題</a>
            <a href="#solution" className="hidden md:block text-sm text-stone-500 hover:text-stone-800 transition">サービス</a>
            <a href="#pricing" className="hidden md:block text-sm text-stone-500 hover:text-stone-800 transition">料金</a>
            <a href="#process" className="hidden md:block text-sm text-stone-500 hover:text-stone-800 transition">流れ</a>
            <a href="#faq" className="hidden md:block text-sm text-stone-500 hover:text-stone-800 transition">FAQ</a>
            <a
              href="#cta"
              className="text-sm px-5 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm"
            >
              無料相談する
            </a>
          </div>
        </div>
      </nav>

      {/* ─── 1. Hero ─── */}
      <header className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-slate-50 via-blue-50/50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-6">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                動物病院専門
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-stone-900 mb-6">
                動物病院専門の
                <br />
                <span className="text-blue-600">ホームページ制作</span>
              </h1>
              <p className="text-stone-600 text-base md:text-lg leading-relaxed mb-4">
                ホームページ + 予約システム + LINE連携を
                <br className="hidden md:block" />
                ワンパッケージで提供。
              </p>
              <p className="text-stone-500 text-sm leading-relaxed mb-8">
                電話対応の負担を減らし、24時間Web予約を実現。
                飼い主さまの利便性を高め、来院数アップにつなげます。
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
                >
                  無料相談する
                  <IconArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/hp/preview"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border border-stone-300 text-stone-700 bg-white hover:bg-stone-50 transition"
                >
                  デザインを見る
                </Link>
              </div>
              <div className="flex gap-8 mt-10">
                <div>
                  <p className="text-2xl font-bold text-blue-600">5<span className="text-base font-normal text-stone-400">万円~</span></p>
                  <p className="text-xs text-stone-400 mt-1">初期費用</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">2<span className="text-base font-normal text-stone-400">週間</span></p>
                  <p className="text-xs text-stone-400 mt-1">最短納品</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">24<span className="text-base font-normal text-stone-400">時間</span></p>
                  <p className="text-xs text-stone-400 mt-1">予約受付</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                {/* Desktop mockup */}
                <div className="bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden" style={{ width: 380 }}>
                  <div className="bg-stone-100 px-4 py-2.5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                    </div>
                    <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-stone-400 text-center">
                      sample-hospital.com
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="h-32 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 mb-3 flex items-center justify-center">
                      <svg className="w-12 h-12 text-amber-400/50" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </div>
                    <div className="h-3 w-3/4 rounded bg-stone-200 mb-2" />
                    <div className="h-2 w-full rounded bg-stone-100 mb-1.5" />
                    <div className="h-2 w-2/3 rounded bg-stone-100 mb-4" />
                    <div className="flex gap-2">
                      <div className="h-8 flex-1 rounded-lg bg-amber-500/20" />
                      <div className="h-8 flex-1 rounded-lg bg-stone-100" />
                    </div>
                  </div>
                </div>
                {/* Phone mockup offset */}
                <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden" style={{ width: 140 }}>
                  <div className="bg-stone-800 px-2 py-1 flex justify-center">
                    <div className="w-8 h-1 rounded-full bg-stone-600" />
                  </div>
                  <div className="p-2">
                    <div className="h-16 rounded bg-gradient-to-br from-emerald-100 to-teal-100 mb-2 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-400/50" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </div>
                    <div className="h-2 w-3/4 rounded bg-stone-200 mb-1" />
                    <div className="h-1.5 w-full rounded bg-stone-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── 2. Problems ─── */}
      <section id="problems" className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-center text-blue-600 mb-3">課題</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-900 mb-4">
            こんなお悩みありませんか？
          </h2>
          <p className="text-center text-stone-500 mb-12 max-w-2xl mx-auto text-sm">
            多くの動物病院が抱える共通の課題。解決策はあります。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <IconPhone className="w-6 h-6" />,
                title: "電話が鳴りやまない",
                description:
                  "診察中にも予約の電話が次々と。スタッフの業務を圧迫し、目の前の患者への対応品質が下がってしまう。",
              },
              {
                icon: <IconGlobe className="w-6 h-6" />,
                title: "Web上に情報がない",
                description:
                  "ホームページがない、または古いまま。新規の飼い主さまが病院を見つけられず、来院機会を逃している。",
              },
              {
                icon: <IconCalendar className="w-6 h-6" />,
                title: "予約管理が手作業",
                description:
                  "紙の台帳やExcelでの予約管理。ダブルブッキングや記入ミスが発生し、スタッフも飼い主さまもストレスに。",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Solution ─── */}
      <section id="solution" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-center text-blue-600 mb-3">解決策</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-900 mb-4">
            HP + 予約 + LINE をワンパッケージで
          </h2>
          <p className="text-center text-stone-500 mb-12 max-w-2xl mx-auto text-sm">
            動物病院に必要な機能をすべて一つのサービスで。個別に発注する必要はありません。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <IconDevicePhone className="w-6 h-6" />,
                title: "プロ品質のHP",
                description: "動物病院に特化したテンプレートで、スマホ対応のホームページを短期間で制作。3つのデザインから選択可能。",
              },
              {
                icon: <IconChatBubble className="w-6 h-6" />,
                title: "LINE予約システム",
                description: "飼い主さまはLINEから24時間予約可能。自動リマインドで無断キャンセルも減少。管理画面で一括管理。",
              },
              {
                icon: <IconChartBar className="w-6 h-6" />,
                title: "管理ダッシュボード",
                description: "予約状況・患者情報をリアルタイムで確認。Googleカレンダー連携で、既存のワークフローにも対応。",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Pricing ─── */}
      <section id="pricing" className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-center text-blue-600 mb-3">料金</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-900 mb-4">
            シンプルな料金体系
          </h2>
          <p className="text-center text-stone-500 mb-12 max-w-2xl mx-auto text-sm">
            病院の規模やニーズに合わせて最適なプランをお選びいただけます。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Plan 1 */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-md transition-shadow">
              <p className="text-sm font-medium text-stone-500 mb-1">ライト</p>
              <h3 className="text-lg font-bold text-stone-900 mb-3">HP制作のみ</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-stone-900">5</span>
                <span className="text-lg text-stone-500">万円</span>
                <p className="text-xs text-stone-400 mt-1">初期費用のみ / 月額なし</p>
              </div>
              <ul className="space-y-2.5 mb-6">
                {[
                  "レスポンシブHP",
                  "テンプレート選択（3種）",
                  "基本5ページ構成",
                  "お問い合わせフォーム",
                  "SSL対応",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
                    <IconCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className="block w-full text-center py-3 rounded-xl text-sm font-semibold border border-stone-300 text-stone-700 hover:bg-stone-50 transition"
              >
                相談する
              </a>
            </div>

            {/* Plan 2 - Recommended */}
            <div className="bg-white rounded-2xl border-2 border-blue-600 p-6 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                  おすすめ
                </span>
              </div>
              <p className="text-sm font-medium text-blue-600 mb-1">スタンダード</p>
              <h3 className="text-lg font-bold text-stone-900 mb-3">HP + 予約システム</h3>
              <div className="mb-1">
                <span className="text-3xl font-bold text-stone-900">8</span>
                <span className="text-lg text-stone-500">万円</span>
              </div>
              <p className="text-xs text-stone-400 mb-6">初期費用 + 月額1万円</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  "ライトプランの全機能",
                  "LINE予約システム",
                  "管理ダッシュボード",
                  "Googleカレンダー連携",
                  "自動リマインド通知",
                  "月次レポート",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
                    <IconCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className="block w-full text-center py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm"
              >
                無料相談する
              </a>
            </div>

            {/* Plan 3 */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-md transition-shadow">
              <p className="text-sm font-medium text-stone-500 mb-1">プレミアム</p>
              <h3 className="text-lg font-bold text-stone-900 mb-3">HP + 予約 + 集患</h3>
              <div className="mb-1">
                <span className="text-3xl font-bold text-stone-900">8</span>
                <span className="text-lg text-stone-500">万円</span>
              </div>
              <p className="text-xs text-stone-400 mb-6">初期費用 + 月額3万円</p>
              <ul className="space-y-2.5 mb-6">
                {[
                  "スタンダードの全機能",
                  "SEO対策・MEO対策",
                  "Google口コミ促進機能",
                  "SNS連携・投稿代行",
                  "アクセス解析レポート",
                  "優先サポート",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
                    <IconCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className="block w-full text-center py-3 rounded-xl text-sm font-semibold border border-stone-300 text-stone-700 hover:bg-stone-50 transition"
              >
                相談する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. Features Detail ─── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-center text-blue-600 mb-3">機能一覧</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-900 mb-12">
            充実の標準機能
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <IconDevicePhone className="w-5 h-5" />, title: "レスポンシブ対応", desc: "PC・タブレット・スマホすべてに最適化" },
              { icon: <IconChatBubble className="w-5 h-5" />, title: "LINE予約連携", desc: "LINEから簡単に予約受付・管理" },
              { icon: <IconCog className="w-5 h-5" />, title: "管理ダッシュボード", desc: "予約・患者情報をWebで一括管理" },
              { icon: <IconCalendar className="w-5 h-5" />, title: "Googleカレンダー", desc: "既存カレンダーと自動同期" },
              { icon: <IconShield className="w-5 h-5" />, title: "SSL / セキュリティ", desc: "HTTPS標準対応で安全な通信" },
              { icon: <IconChartBar className="w-5 h-5" />, title: "アクセス解析", desc: "訪問者数・ページビューを可視化" },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                ),
                title: "自動リマインド",
                desc: "予約前日に自動でLINE通知",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                ),
                title: "コンテンツ更新",
                desc: "お知らせ・ブログを簡単に投稿",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-4 rounded-xl bg-stone-50 border border-stone-100">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-800">{item.title}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Process ─── */}
      <section id="process" className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-center text-blue-600 mb-3">導入の流れ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-900 mb-12">
            4ステップで公開まで
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "ヒアリング",
                desc: "病院の特徴やご要望を丁寧にお伺いします。オンラインまたは対面で30分程度。",
              },
              {
                step: "02",
                title: "デザイン選択",
                desc: "3つのテンプレートからイメージに合うデザインを選択。カスタマイズもご相談可能。",
              },
              {
                step: "03",
                title: "制作・納品",
                desc: "最短2週間で制作完了。確認・修正を経て、公開準備を進めます。",
              },
              {
                step: "04",
                title: "運用開始",
                desc: "公開後も安心のサポート体制。操作方法のレクチャーも無料で実施。",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-stone-200 h-full">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <IconChevronRight className="w-5 h-5 text-stone-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Template Showcase ─── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-center text-blue-600 mb-3">デザイン</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-900 mb-4">
            選べる3つのテンプレート
          </h2>
          <p className="text-center text-stone-500 mb-12 max-w-2xl mx-auto text-sm">
            病院のイメージに合わせて最適なデザインをお選びいただけます。公開後の変更も可能です。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Warm",
                tagline: "あたたかみのあるデザイン",
                colors: ["#d97706", "#ea580c", "#f59e0b", "#fbbf24"],
                gradient: "from-amber-100 to-orange-100",
              },
              {
                name: "Natural",
                tagline: "自然で落ち着いたデザイン",
                colors: ["#059669", "#0d9488", "#10b981", "#34d399"],
                gradient: "from-emerald-100 to-teal-100",
              },
              {
                name: "Modern",
                tagline: "洗練されたモダンデザイン",
                colors: ["#2563eb", "#4f46e5", "#3b82f6", "#60a5fa"],
                gradient: "from-blue-100 to-indigo-100",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className={`h-32 bg-gradient-to-br ${t.gradient} flex items-center justify-center`}>
                  <div className="flex gap-3">
                    {t.colors.map((c, j) => (
                      <div
                        key={j}
                        className="w-10 h-10 rounded-full shadow-sm border border-white/60"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-stone-900 mb-1">{t.name}</h3>
                  <p className="text-sm text-stone-500">{t.tagline}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/hp/preview"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              テンプレートのプレビューを見る
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 8. FAQ ─── */}
      <section id="faq" className="py-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm font-medium text-center text-blue-600 mb-3">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-900 mb-12">
            よくあるご質問
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "制作期間はどのくらいですか？",
                a: "ヒアリングから最短2週間で公開可能です。内容のボリュームやカスタマイズ度合いによって前後しますが、通常2~4週間を目安にしてください。",
              },
              {
                q: "既存のホームページからの移行は可能ですか？",
                a: "はい、可能です。既存サイトのコンテンツ移行もサポートしています。ドメインの引き継ぎについてもご相談ください。",
              },
              {
                q: "予約システムだけの導入はできますか？",
                a: "基本的にはHP制作とセットでの提供となりますが、既存HPへの予約システム組み込みについてもご相談可能です。まずはお気軽にお問い合わせください。",
              },
              {
                q: "解約時の縛りはありますか？",
                a: "最低利用期間は3ヶ月です。その後はいつでも解約可能で、解約金は発生しません。",
              },
              {
                q: "デザインのカスタマイズはどこまで可能ですか？",
                a: "テンプレートをベースに、ロゴ・写真・テキスト・カラーの調整が可能です。大幅なレイアウト変更は別途お見積りとなります。",
              },
              {
                q: "サポート体制はどうなっていますか？",
                a: "メール・LINEでのサポートを提供しています。プレミアムプランでは優先サポートで、平日営業時間内に迅速に対応します。",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-200 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold">Q</span>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800 text-sm">{item.q}</p>
                    <p className="text-sm text-stone-500 leading-relaxed mt-2">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. CTA ─── */}
      <section id="cta" className="py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            まずは無料相談から
          </h2>
          <p className="text-slate-300 mb-8 text-sm md:text-base leading-relaxed">
            病院の状況やご要望をお伺いし、最適なプランをご提案します。
            <br className="hidden md:block" />
            お気軽にご連絡ください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://line.me/R/ti/p/@844jztca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition hover:opacity-90 shadow-lg"
              style={{ backgroundColor: "#06C755" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              LINEで無料相談
            </a>
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 transition"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              メールで問い合わせ
            </a>
          </div>
          <p className="text-slate-400 text-xs mt-6">
            ご相談は完全無料です。しつこい営業は一切行いません。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-white font-bold text-lg mb-1">PetClinic Web</p>
              <p className="text-stone-400 text-sm">動物病院専門ホームページ制作サービス</p>
            </div>
            <div className="flex gap-6 text-sm text-stone-400">
              <a href="#problems" className="hover:text-stone-200 transition">課題</a>
              <a href="#solution" className="hover:text-stone-200 transition">サービス</a>
              <a href="#pricing" className="hover:text-stone-200 transition">料金</a>
              <a href="#process" className="hover:text-stone-200 transition">流れ</a>
              <a href="#faq" className="hover:text-stone-200 transition">FAQ</a>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-stone-500">
              &copy; 2026 PetClinic Web. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-stone-500">
              <Link href="/privacy" className="hover:text-stone-300 transition">プライバシーポリシー</Link>
              <Link href="/terms" className="hover:text-stone-300 transition">利用規約</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
