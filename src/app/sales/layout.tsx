import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "動物病院専門 ホームページ制作 | HP + 予約システム + LINE連携",
  description:
    "動物病院に特化したホームページ制作サービス。予約システム・LINE連携・管理画面をワンパッケージで提供。初期費用5万円から。",
};

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-stone-900">
      {children}
    </div>
  );
}
