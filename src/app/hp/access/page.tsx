import type { Metadata } from "next";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import Cta from "@/components/hp/Cta";

export const metadata: Metadata = {
  title: "アクセス",
};

export default function AccessPage() {
  const theme = getHpTheme();

  return (
    <>
      {/* Page Header */}
      <section className={`relative bg-gradient-to-b ${theme.accentLight.replace("bg-", "from-")} to-white py-16 md:py-20 overflow-hidden`}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute top-10 right-20 w-32 h-32 border-2 border-stone-800 rounded-full" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <p className={`${theme.accentTextHover}/60 text-sm tracking-[0.2em] uppercase mb-3`}>
            Access
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-stone-800">
            アクセス
          </h1>
        </div>
      </section>

      {/* 地図 & 情報 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden shadow-sm bg-stone-100 aspect-[4/3]">
              {hpConfig.googleMapsEmbedUrl ? (
                <iframe
                  src={hpConfig.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">
                  地図を準備中です
                </div>
              )}
            </div>

            {/* 情報 */}
            <div className="space-y-6">
              <div>
                <h2 className="font-bold text-stone-800 text-xl mb-5">
                  {hpConfig.hospitalName}
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-3 items-start">
                    <div className={`w-8 h-8 shrink-0 ${theme.iconBg} rounded-lg flex items-center justify-center`}>
                      <svg className={`w-4 h-4 ${theme.iconText}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <span className="text-stone-600 pt-1">{hpConfig.address}</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className={`w-8 h-8 shrink-0 ${theme.iconBg} rounded-lg flex items-center justify-center`}>
                      <svg className={`w-4 h-4 ${theme.iconText}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <a
                      href={`tel:${hpConfig.phone.replace(/-/g, "")}`}
                      className={`${theme.accentTextHover} pt-1 font-medium`}
                    >
                      {hpConfig.phone}
                    </a>
                  </div>
                  {hpConfig.email && (
                    <div className="flex gap-3 items-start">
                      <div className={`w-8 h-8 shrink-0 ${theme.iconBg} rounded-lg flex items-center justify-center`}>
                        <svg className={`w-4 h-4 ${theme.iconText}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <span className="text-stone-600 pt-1">{hpConfig.email}</span>
                    </div>
                  )}
                  {hpConfig.parking && (
                    <div className="flex gap-3 items-start">
                      <div className={`w-8 h-8 shrink-0 ${theme.iconBg} rounded-lg flex items-center justify-center`}>
                        <svg className={`w-4 h-4 ${theme.iconText}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                      </div>
                      <span className="text-stone-600 pt-1">{hpConfig.parking}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 診療時間 */}
              <div className={`bg-gradient-to-br ${theme.hoursBg} rounded-xl p-5 border ${theme.hoursBorder}`}>
                <h3 className="font-bold text-stone-800 text-sm mb-3">
                  診療時間
                </h3>
                <div className="text-sm space-y-1.5">
                  {hpConfig.hours.map((h, i) => (
                    <div key={i} className="flex gap-3 text-stone-600">
                      <span className="w-28 shrink-0 text-stone-700 font-medium">
                        {h.days}
                      </span>
                      <span>
                        {h.morning === "休診"
                          ? "休診"
                          : `${h.morning} / ${h.afternoon}`}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-400 mt-3">
                  休診日: {hpConfig.closedDays}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
