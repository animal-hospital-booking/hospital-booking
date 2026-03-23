import Link from "next/link";

export const metadata = {
  title: "利用規約 - PetBook",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/lp" className="text-xl font-bold text-gray-800">PetBook</Link>
          <Link href="/lp" className="text-sm text-blue-600 hover:text-blue-800">← トップに戻る</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">利用規約</h1>
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 text-sm text-gray-700 leading-relaxed">
          <p>最終更新日：2026年1月</p>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">第1条（適用）</h2>
            <p>本利用規約（以下「本規約」）は、PetBook（以下「当サービス」）の利用に関する条件を定めるものです。本サービスをご利用いただく全てのお客様（以下「利用者」）に適用されます。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">第2条（サービス内容）</h2>
            <p>当サービスは、動物病院向けのオンライン予約管理システムを提供します。以下の機能を含みますが、これに限定されません。</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>LINE連携によるオンライン予約受付</li>
              <li>予約管理カレンダー</li>
              <li>予約通知・リマインド</li>
              <li>Google Calendar連携</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">第3条（利用登録）</h2>
            <p>本サービスの利用を希望する方は、運営者所定の方法により利用登録を申請し、運営者がこれを承認することで利用契約が成立します。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">第4条（料金）</h2>
            <p>本サービスは現在無料で提供しています。将来的に有料プランを設ける場合は、事前に利用者へ通知し、同意を得たうえで適用します。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">第5条（禁止事項）</h2>
            <p>利用者は以下の行為を行ってはなりません。</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>法令または公序良俗に違反する行為</li>
              <li>当サービスの運営を妨害する行為</li>
              <li>他の利用者の情報を不正に取得する行為</li>
              <li>当サービスを営利目的で第三者に再販売する行為</li>
              <li>その他、運営者が不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">第6条（サービスの停止・変更）</h2>
            <p>運営者は、以下の場合にサービスの全部または一部を停止・変更できるものとします。</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>システムの保守・更新を行う場合</li>
              <li>天災やその他不可抗力による場合</li>
              <li>その他、運営者がやむを得ないと判断した場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">第7条（免責事項）</h2>
            <ol className="list-decimal ml-6 space-y-1">
              <li>運営者は、本サービスの完全性、正確性、有用性等について保証しません。</li>
              <li>本サービスの利用により生じた損害について、運営者は一切の責任を負いません。</li>
              <li>運営者は、利用者間または利用者と第三者間のトラブルについて責任を負いません。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">第8条（解約）</h2>
            <p>利用者は、いつでも当サービスの利用を終了することができます。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">第9条（規約の変更）</h2>
            <p>運営者は、必要に応じて本規約を変更できるものとします。変更後の規約は、本ページに掲載した時点で効力を生じます。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">第10条（準拠法・管轄）</h2>
            <p>本規約は日本法に準拠し、本サービスに関する紛争は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
          </section>
        </div>
      </main>
    </div>
  );
}
