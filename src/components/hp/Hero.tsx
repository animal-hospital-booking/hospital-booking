import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";

export default function Hero() {
  const theme = getHpTheme();

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Warm gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.heroBg}`} />

      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="absolute top-[10%] right-[5%] w-40 h-40 border-2 border-stone-800 rounded-full" />
        <div className="absolute top-[30%] right-[20%] w-24 h-24 border-2 border-stone-800 rounded-full" />
        <div className="absolute bottom-[15%] left-[8%] w-32 h-32 border-2 border-stone-800 rounded-full" />
      </div>

      {/* Soft blobs */}
      <div className={`absolute top-0 left-0 w-[500px] h-[500px] ${theme.heroBlob1} rounded-full blur-[100px]`} />
      <div className={`absolute bottom-0 right-0 w-[600px] h-[600px] ${theme.heroBlob2} rounded-full blur-[120px]`} />
      <div className={`absolute top-1/2 left-1/3 w-[300px] h-[300px] ${theme.heroBlob3} rounded-full blur-[80px]`} />

      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            {hpConfig.subcatchphrase && (
              <p className={`${theme.accentTextHover}/70 text-sm tracking-[0.2em] uppercase mb-4 font-medium`}>
                {hpConfig.subcatchphrase}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 leading-[1.3] whitespace-pre-line">
              {hpConfig.catchphrase}
            </h1>
            <p className="mt-6 text-stone-500 text-base md:text-lg leading-relaxed max-w-lg">
              {hpConfig.description}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href={hpConfig.bookingUrl}
                className={`group inline-flex items-center justify-center ${theme.accent} ${theme.accentHover} text-white font-medium px-8 py-4 rounded-full transition-all text-base shadow-lg ${theme.accentShadow} hover:-translate-y-0.5`}
              >
                Webで予約する
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={`tel:${hpConfig.phone.replace(/-/g, "")}`}
                className={`inline-flex items-center justify-center bg-white/80 backdrop-blur border-2 border-stone-200 hover:${theme.accentBorder} text-stone-700 ${theme.accentTextHover} font-medium px-8 py-4 rounded-full transition-all text-base hover:-translate-y-0.5`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {hpConfig.phone}
              </a>
            </div>

            {hpConfig.emergencyNote && (
              <p className="mt-5 text-sm text-stone-400 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full" />
                {hpConfig.emergencyNote}
              </p>
            )}
          </div>

          {/* Right: Image placeholder */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Main image area */}
              <div className={`bg-gradient-to-br ${theme.avatarFrom}/80 ${theme.avatarTo}/80 rounded-3xl aspect-[4/3] flex items-center justify-center overflow-hidden shadow-2xl shadow-stone-900/10`}>
                <div className="text-center p-8">
                  <svg className={`w-16 h-16 ${theme.accentText}/40 mx-auto mb-3`} fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                  <p className={`${theme.accentText}/40 text-sm`}>病院の写真をここに配置</p>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg shadow-stone-900/5 flex items-center gap-3">
                <div className={`w-10 h-10 ${theme.checkBg} rounded-full flex items-center justify-center`}>
                  <svg className={`w-5 h-5 ${theme.checkText}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-stone-400">Web予約</p>
                  <p className="text-sm font-bold text-stone-700">24時間受付中</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg shadow-stone-900/5">
                <div className="flex items-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3.5 h-3.5 ${theme.starColor}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-stone-500">Google口コミ 4.8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
