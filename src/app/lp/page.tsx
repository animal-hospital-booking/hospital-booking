import Link from "next/link";

export const metadata = {
  title: "PetBook - 動物病院専用オンライン予約システム",
  description: "初期費用0円、最短即日導入。動物病院の予約受付・管理をオンライン化します。",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white" style={{ color: "#1a2744" }}>
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight" style={{ color: "#1a2744" }}>PetBook</span>
          <div className="flex items-center gap-6">
            <a href="#features" className="hidden md:block text-sm text-gray-500 hover:text-gray-800 transition">機能</a>
            <a href="#pricing" className="hidden md:block text-sm text-gray-500 hover:text-gray-800 transition">料金</a>
            <a href="#flow" className="hidden md:block text-sm text-gray-500 hover:text-gray-800 transition">導入の流れ</a>
            <a href="#faq" className="hidden md:block text-sm text-gray-500 hover:text-gray-800 transition">FAQ</a>
            <a
              href="#contact"
              className="text-sm px-5 py-2 rounded-lg font-medium transition text-white"
              style={{ backgroundColor: "#e67e22" }}
            >
              無料で相談する
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-medium mb-4" style={{ color: "#0ea5a0" }}>動物病院専用 Web予約システム</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: "#1a2744" }}>
                予約システムの費用、<br />0円にしませんか？
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8">
                ・今の予約システムと同等の機能を無料で提供<br />
                ・移行作業はすべてこちらで対応<br />
                ・LINE連携・カレンダー管理・予約枠設定もすべて込み<br />
                ・合わなければいつでも解約OK
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="#contact"
                  className="px-7 py-3 rounded-lg font-medium text-white transition hover:opacity-90"
                  style={{ backgroundColor: "#e67e22" }}
                >
                  無料で相談する
                </a>
                <a
                  href="#demo"
                  className="px-7 py-3 rounded-lg font-medium border transition hover:bg-gray-50"
                  style={{ borderColor: "#d1d5db", color: "#1a2744" }}
                >
                  デモを見る
                </a>
              </div>
              <div className="flex gap-8 mt-10">
                <div>
                  <p className="text-2xl font-bold" style={{ color: "#0ea5a0" }}>0<span className="text-base font-normal text-gray-400">円</span></p>
                  <p className="text-xs text-gray-400 mt-1">初期費用・月額</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: "#0ea5a0" }}>最短即日</p>
                  <p className="text-xs text-gray-400 mt-1">導入スピード</p>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: "#0ea5a0" }}>24<span className="text-base font-normal text-gray-400">時間</span></p>
                  <p className="text-xs text-gray-400 mt-1">予約受付</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-xl border border-gray-700" style={{ width: 280 }}>
                <video
                  src="/demo.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-[2rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Problem */}
      <section className="py-20" style={{ backgroundColor: "#f8f9fb" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-center mb-3" style={{ color: "#0ea5a0" }}>課題</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">こんなお悩みありませんか？</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "診察中も電話が鳴り止まない",
                desc: "手が離せない診察中にも予約電話が入り、スタッフの手が足りない。対応漏れも発生しがち。",
              },
              {
                title: "営業時間外に予約が取れない",
                desc: "電話が繋がらず他院に流れてしまう。夜間や休日に予約したい飼い主さんの声に応えられない。",
              },
              {
                title: "予約管理に手間がかかる",
                desc: "紙やExcelでの管理はダブルブッキングのリスクも。予約状況の把握に時間がかかる。",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold mb-3" style={{ color: "#1a2744" }}>{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-center mb-3" style={{ color: "#0ea5a0" }}>解決策</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">PetBookが選ばれる理由</h2>
          <p className="text-center text-gray-500 mb-12 text-sm">LINE連携 × かんたん管理 × 手厚いサポート</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "LINE完結の予約導線",
                desc: "飼い主さんはLINEからそのまま予約。新しいアプリのインストールは不要。普段使いのLINEだから迷いません。",
              },
              {
                title: "見やすいカレンダー管理",
                desc: "週表示・月表示のカレンダーで予約を一目で把握。ステータス管理やフィルタリングで運用もスムーズ。",
              },
              {
                title: "設定から運用まで伴走",
                desc: "初期設定はすべてこちらで対応。導入後の疑問や要望にもお応えします。ITに詳しくなくても安心です。",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition">
                <h3 className="font-bold mb-3" style={{ color: "#1a2744" }}>{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-20" style={{ backgroundColor: "#f8f9fb" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-center mb-3" style={{ color: "#0ea5a0" }}>画面イメージ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">シンプルで直感的なUI</h2>
          <p className="text-center text-gray-500 mb-12 text-sm">誰でも迷わず使えるデザイン</p>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-3 font-medium">飼い主さんの予約画面</p>
                <div className="flex justify-center">
                  <img src="/ss-booking.png" alt="予約画面" className="w-48 md:w-52" />
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                診察内容の選択から予約完了まで4ステップ。LINEからアクセスするのでアプリ不要。
              </p>
            </div>
            <div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-3 font-medium">病院の管理画面</p>
                <img src="/ss-admin.png" alt="管理画面" className="w-full rounded-lg" />
              </div>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                週間カレンダーで予約を一覧表示。ステータス管理、診療メニューのフィルタリングにも対応。
              </p>
            </div>
            <div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-3 font-medium">予約枠の管理画面</p>
                <img src="/ss-schedule.png" alt="予約枠の管理" className="w-full rounded-lg" />
              </div>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                曜日ごとの診療時間や予約枠をワンクリックで設定。臨時休診・臨時診療にも対応。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-medium text-center mb-3" style={{ color: "#0ea5a0" }}>機能</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">主な機能</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "診察メニュー選択", desc: "初診・再診・狂犬病・相談など、メニューごとに予約を受付" },
              { title: "ペット情報の記録", desc: "名前・種類・品種・性別・生年月日をフォームで取得" },
              { title: "LINE自動通知", desc: "予約確定時にLINEで飼い主さんへ自動メッセージ" },
              { title: "ステータス管理", desc: "予約確定・来院済み・キャンセル・無断キャンセルを記録" },
              { title: "予約枠の管理", desc: "曜日ごとの診療時間・予約枠をワンクリックで開閉。臨時休診・臨時診療にも対応" },
              { title: "Google Calendar連携", desc: "予約をGoogleカレンダーに同期。既存のワークフローと統合" },
              { title: "デザインカスタマイズ", desc: "病院名・テーマカラー・ロゴなど、ご要望に合わせてデザインを調整します" },
              { title: "モバイル診察券", desc: "QRコード付きのデジタル診察券を発行。受付時の確認・入力の手間を省けます（近日対応予定）" },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl border border-gray-100">
                <h3 className="font-bold text-sm mb-2" style={{ color: "#1a2744" }}>{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section id="flow" className="py-20" style={{ backgroundColor: "#f8f9fb" }}>
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-center mb-3" style={{ color: "#0ea5a0" }}>導入の流れ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">かんたん3ステップで導入</h2>
          <p className="text-center text-gray-500 mb-12 text-sm">設定はすべてこちらで対応します</p>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "お問い合わせ",
                desc: "フォームまたはメールでご連絡ください。現在の予約方法やお困りごとをヒアリングします。ご質問だけでも構いません。",
              },
              {
                step: "02",
                title: "初期設定・カスタマイズ",
                desc: "病院名・診療メニュー・テーマカラーなどを設定し、LINE公式アカウントと連携します。設定作業はすべてこちらで対応しますので、手間はかかりません。",
              },
              {
                step: "03",
                title: "運用開始・継続サポート",
                desc: "設定が完了したらすぐに予約受付を開始できます。使い方の説明はもちろん、導入後の調整や改善もサポートします。",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start bg-white p-6 rounded-xl border border-gray-100">
                <span className="text-2xl font-bold shrink-0" style={{ color: "#0ea5a0" }}>{item.step}</span>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: "#1a2744" }}>{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm font-medium mb-3" style={{ color: "#0ea5a0" }}>料金プラン</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">病院の規模に合わせて選べる3プラン</h2>
          <p className="text-gray-500 mb-12 text-sm">初期費用はすべて0円。いつでもプラン変更・解約可能です。</p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {/* Free */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
              <p className="text-xs font-medium text-gray-400 mb-1">フリー</p>
              <p className="text-3xl font-bold mb-1" style={{ color: "#1a2744" }}>0<span className="text-base font-normal text-gray-400 ml-1">円/月</span></p>
              <p className="text-xs text-gray-400 mb-5">まずは試してみたい方に</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {["Web予約受付（月30件まで）", "管理カレンダー", "予約枠の管理", "ペット情報管理", "ステータス管理", "デザインカスタマイズ"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <span style={{ color: "#0ea5a0" }} className="font-bold text-xs mt-0.5">✓</span>{f}
                  </li>
                ))}
                {["LINE連携", "カルテ機能", "Google Calendar連携", "売上分析"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="font-bold text-xs mt-0.5">—</span>{f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block w-full py-3 rounded-lg font-medium text-center transition border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                無料で始める
              </a>
            </div>
            {/* Standard */}
            <div className="rounded-xl border-2 p-6 flex flex-col relative" style={{ borderColor: "#0ea5a0", backgroundColor: "#f0fdfa" }}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-white px-3 py-1 rounded-full" style={{ backgroundColor: "#0ea5a0" }}>人気</span>
              <p className="text-xs font-medium mb-1" style={{ color: "#0ea5a0" }}>スタンダード</p>
              <p className="text-3xl font-bold mb-1" style={{ color: "#1a2744" }}>4,980<span className="text-base font-normal text-gray-400 ml-1">円/月</span></p>
              <p className="text-xs text-gray-400 mb-5">本格運用したい病院に</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {["Web予約受付（無制限）", "管理カレンダー", "予約枠の管理", "ペット情報管理", "ステータス管理", "デザインカスタマイズ", "LINE連携・自動通知", "カルテ機能", "Google Calendar連携"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span style={{ color: "#0ea5a0" }} className="font-bold text-xs mt-0.5">✓</span>{f}
                  </li>
                ))}
                {["売上分析"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="font-bold text-xs mt-0.5">—</span>{f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block w-full py-3 rounded-lg font-medium text-white text-center transition hover:opacity-90"
                style={{ backgroundColor: "#0ea5a0" }}
              >
                無料トライアル開始
              </a>
            </div>
            {/* Pro */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
              <p className="text-xs font-medium text-gray-400 mb-1">プロ</p>
              <p className="text-3xl font-bold mb-1" style={{ color: "#1a2744" }}>9,800<span className="text-base font-normal text-gray-400 ml-1">円/月</span></p>
              <p className="text-xs text-gray-400 mb-5">複数スタッフで本格運用</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {["Web予約受付（無制限）", "管理カレンダー", "予約枠の管理", "ペット情報管理", "ステータス管理", "デザインカスタマイズ", "LINE連携・自動通知", "カルテ機能", "Google Calendar連携", "売上分析・集計", "モバイル診察券", "優先サポート"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <span style={{ color: "#0ea5a0" }} className="font-bold text-xs mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block w-full py-3 rounded-lg font-medium text-center transition text-white hover:opacity-90"
                style={{ backgroundColor: "#1a2744" }}
              >
                無料トライアル開始
              </a>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-8">すべてのプランに14日間の無料トライアル付き。クレジットカード不要。</p>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-20" style={{ backgroundColor: "#f8f9fb" }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm font-medium mb-3" style={{ color: "#0ea5a0" }}>デモ</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">実際の画面を試す</h2>
          <p className="text-gray-500 mb-8 text-sm">デモ環境で自由に操作できます</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="px-7 py-3 rounded-lg font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: "#1a2744" }}
            >
              予約画面を見る
            </Link>
            <Link
              href="/admin"
              className="px-7 py-3 rounded-lg font-medium border transition hover:bg-gray-50"
              style={{ borderColor: "#d1d5db", color: "#1a2744" }}
            >
              管理画面を見る
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm font-medium text-center mb-3" style={{ color: "#0ea5a0" }}>FAQ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">よくある質問</h2>
          <div className="space-y-3">
            {[
              { q: "専用のソフトや端末を購入しなければいけないのですか？", a: "いいえ。お手持ちのパソコン・タブレット・スマートフォンのブラウザからご利用いただけます。専用ソフトのインストールも不要です。" },
              { q: "ITに詳しくないのですが大丈夫ですか？", a: "はい。初期設定はすべてこちらで対応します。管理画面もカレンダーを確認するだけのシンプルな設計です。" },
              { q: "電話予約と併用できますか？", a: "はい。電話予約を継続しながら、Web予約を追加の窓口として導入できます。段階的に移行することも可能です。" },
              { q: "システムを切り替えるのは大変ですか？", a: "いいえ。既存の運用を変える必要はなく、Web予約を追加するだけです。設定はこちらで対応しますので、病院側のご負担はありません。" },
              { q: "途中でやめることはできますか？", a: "はい。契約期間の縛りはありません。いつでも利用を終了できます。" },
              { q: "サポート対象のブラウザを教えてください", a: "Google Chrome、Safari、Microsoft Edgeなど主要なブラウザに対応しています。スマートフォンのブラウザからもご利用いただけます。" },
            ].map((item) => (
              <details key={item.q} className="bg-white rounded-xl border border-gray-100 group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-sm flex items-center justify-between" style={{ color: "#1a2744" }}>
                  {item.q}
                  <span className="text-gray-300 group-open:rotate-180 transition-transform text-xs ml-4">▼</span>
                </summary>
                <p className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20" style={{ backgroundColor: "#1a2744" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">まずはお気軽にご相談ください</h2>
          <p className="text-gray-400 mb-10 text-sm">
            初期費用0円、契約期間の縛りなし。<br />
            ご質問やご不明点だけでもお気軽にどうぞ。
          </p>
          <div className="bg-white rounded-xl p-6 max-w-md mx-auto text-left">
            <form className="space-y-4" action="https://formspree.io/f/mreylepn" method="POST">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">病院名</label>
                <input
                  type="text"
                  name="hospital"
                  required
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-sm"
                  style={{ color: "#1a2744" }}
                  placeholder="○○動物病院"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">お名前</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-sm"
                  style={{ color: "#1a2744" }}
                  placeholder="山田 太郎"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">メールアドレス</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-sm"
                  style={{ color: "#1a2744" }}
                  placeholder="example@mail.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">電話番号 <span className="text-gray-300">（任意）</span></label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-sm"
                  style={{ color: "#1a2744" }}
                  placeholder="090-1234-5678"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-medium text-white transition hover:opacity-90 text-sm"
                style={{ backgroundColor: "#e67e22" }}
              >
                無料で相談する
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-sm" style={{ color: "#1a2744" }}>PetBook</p>
              <p className="text-xs text-gray-400 mt-1">動物病院専用LINE予約システム</p>
            </div>
            <div className="flex gap-6 text-xs text-gray-400">
              <Link href="/terms" className="hover:text-gray-600 transition">利用規約</Link>
              <Link href="/privacy" className="hover:text-gray-600 transition">プライバシーポリシー</Link>
            </div>
          </div>
          <p className="text-xs text-gray-300 text-center mt-8">&copy; 2025 PetBook</p>
        </div>
      </footer>
    </div>
  );
}
