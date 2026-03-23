import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";

export default function FooterModern() {
  const theme = getHpTheme("modern");

  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Blue accent line at top */}
      <div className="h-[2px] bg-blue-600" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1: Info */}
          <div>
            <span className="font-bold text-white text-lg block mb-4">
              {hpConfig.hospitalName}
            </span>
            <p className="text-sm leading-relaxed">{hpConfig.description}</p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              メニュー
            </h3>
            <div className="text-sm space-y-2.5">
              <Link href="/hp" className="block hover:text-blue-400 transition-colors">
                ホーム
              </Link>
              <Link href="/hp/about" className="block hover:text-blue-400 transition-colors">
                病院紹介
              </Link>
              <Link href="/hp/services" className="block hover:text-blue-400 transition-colors">
                診療案内
              </Link>
              <Link href="/hp/access" className="block hover:text-blue-400 transition-colors">
                アクセス
              </Link>
              <Link href="/hp/news" className="block hover:text-blue-400 transition-colors">
                お知らせ
              </Link>
            </div>
          </div>

          {/* Column 3: Hours */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              診療時間
            </h3>
            <div className="text-sm space-y-1.5">
              {hpConfig.hours.map((h, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-24 shrink-0 text-slate-500">{h.days}</span>
                  <span>
                    {h.morning === "休診" ? "休診" : `${h.morning} / ${h.afternoon}`}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3 text-slate-500">
              休診日: {hpConfig.closedDays}
            </p>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              お問い合わせ
            </h3>
            <div className="text-sm space-y-3">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>{hpConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href={`tel:${hpConfig.phone.replace(/-/g, "")}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {hpConfig.phone}
                </a>
              </div>
              {hpConfig.email && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>{hpConfig.email}</span>
                </div>
              )}
              <div className="pt-2">
                <Link
                  href={hpConfig.bookingUrl}
                  className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                >
                  Web
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} {hpConfig.hospitalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
