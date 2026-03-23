import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー - PetBook",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/lp" className="text-xl font-bold text-gray-800">PetBook</Link>
          <Link href="/lp" className="text-sm text-blue-600 hover:text-blue-800">← トップに戻る</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">プライバシーポリシー</h1>
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 text-sm text-gray-700 leading-relaxed">
          <p>最終更新日：2026年1月</p>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">1. はじめに</h2>
            <p>PetBook（以下「当サービス」）は、利用者の個人情報の保護を重要と考え、以下のとおりプライバシーポリシーを定めます。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">2. 収集する情報</h2>
            <p>当サービスでは、以下の情報を収集します。</p>
            <h3 className="font-bold mt-3 mb-1">利用者（動物病院）から収集する情報：</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>病院名、担当者名、メールアドレス、電話番号</li>
              <li>サービス利用に関するログデータ</li>
            </ul>
            <h3 className="font-bold mt-3 mb-1">予約者（飼い主）から収集する情報：</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>氏名、電話番号、メールアドレス</li>
              <li>ペットの情報（名前、種類、品種、性別、生年月日）</li>
              <li>症状・相談内容</li>
              <li>LINE ユーザーID（LINE連携利用時）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">3. 情報の利用目的</h2>
            <p>収集した情報は、以下の目的で利用します。</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>予約の受付・管理・通知</li>
              <li>サービスの提供・運営・改善</li>
              <li>利用者へのサポート対応</li>
              <li>利用状況の分析・統計</li>
              <li>重要なお知らせの連絡</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">4. 情報の第三者提供</h2>
            <p>当サービスは、以下の場合を除き、個人情報を第三者に提供しません。</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>利用者の同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命・身体・財産の保護に必要な場合</li>
              <li>サービス運営に必要な業務委託先に対して（適切な管理のもと）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">5. 外部サービスの利用</h2>
            <p>当サービスでは、以下の外部サービスを利用しています。</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Supabase</strong>：データベース（予約データの保存）</li>
              <li><strong>LINE</strong>：予約ページの提供、通知の送信</li>
              <li><strong>Vercel</strong>：サービスのホスティング</li>
              <li><strong>Google Calendar</strong>：カレンダー連携（利用時のみ）</li>
            </ul>
            <p className="mt-2">各サービスのプライバシーポリシーについては、各社のWebサイトをご確認ください。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">6. データの保管・セキュリティ</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>データは暗号化された通信（SSL/TLS）で送受信されます。</li>
              <li>データベースへのアクセスは認証により制限されています。</li>
              <li>管理画面はパスワード認証で保護されています。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">7. データの保持期間</h2>
            <p>予約データは、サービス利用契約が有効な期間中保持されます。解約後は、合理的な期間内にデータを削除します。利用者からの削除要請にも対応します。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">8. 利用者の権利</h2>
            <p>利用者は、以下の権利を有します。</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>個人情報の開示・訂正・削除の請求</li>
              <li>個人情報の利用停止の請求</li>
              <li>サービスの利用終了（解約）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">9. Cookie について</h2>
            <p>当サービスでは、管理者のログインセッション管理のためにCookieを使用します。Cookieはブラウザの設定で無効にできますが、一部機能が利用できなくなる場合があります。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">10. ポリシーの変更</h2>
            <p>当サービスは、必要に応じて本ポリシーを変更することがあります。重要な変更がある場合は、サービス内または登録メールアドレスへ通知します。</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-2">11. お問い合わせ</h2>
            <p>本ポリシーに関するお問い合わせは、サービス内のお問い合わせフォームよりご連絡ください。</p>
          </section>
        </div>
      </main>
    </div>
  );
}
