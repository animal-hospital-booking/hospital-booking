import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";

export default function FooterNatural() {
  const theme = getHpTheme("natural");

  return (
    <footer className="bg-stone-50 text-stone-600">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Hospital info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3.25a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
              </div>
              <span className="font-medium text-stone-800 tracking-wider text-sm">
                {hpConfig.hospitalName}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone-500">
              {hpConfig.address}
            </p>
            <p className="text-sm mt-2 text-stone-500">
              TEL:{" "}
              <a
                href={`tel:${hpConfig.phone.replace(/-/g, "")}`}
                className="text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                {hpConfig.phone}
              </a>
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-medium text-stone-800 mb-4 text-sm tracking-wide">
              診療時間
            </h3>
            <div className="text-sm space-y-1 text-stone-500">
              {hpConfig.hours.map((h, i) => (
                <div key={i} className="flex gap-4">
                  <span className="w-28 shrink-0">{h.days}</span>
                  <span>
                    {h.morning} / {h.afternoon}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-2 text-stone-400">
              休診日: {hpConfig.closedDays}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-medium text-stone-800 mb-4 text-sm tracking-wide">
              メニュー
            </h3>
            <div className="text-sm space-y-2 text-stone-500">
              <Link
                href="/hp/about"
                className="block hover:text-emerald-600 transition-colors"
              >
                病院紹介
              </Link>
              <Link
                href="/hp/services"
                className="block hover:text-emerald-600 transition-colors"
              >
                診療案内
              </Link>
              <Link
                href="/hp/access"
                className="block hover:text-emerald-600 transition-colors"
              >
                アクセス
              </Link>
              <Link
                href="/hp/news"
                className="block hover:text-emerald-600 transition-colors"
              >
                お知らせ
              </Link>
              <Link
                href={hpConfig.bookingUrl}
                className="block text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                Web予約はこちら
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200 mt-8 pt-6 text-center text-xs text-stone-400">
          &copy; {new Date().getFullYear()} {hpConfig.hospitalName}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
