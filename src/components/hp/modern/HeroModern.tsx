import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";

export default function HeroModern() {
  const theme = getHpTheme("modern");

  return (
    <section className="relative min-h-[85vh] flex">
      {/* Left: Dark text side (40%) */}
      <div className="relative w-full md:w-[40%] bg-slate-900 flex items-center overflow-hidden">
        {/* Geometric accent lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-0 w-24 h-[1px] bg-blue-500/30" />
          <div className="absolute top-[15%] left-0 w-[1px] h-16 bg-blue-500/30" />
          <div className="absolute bottom-[20%] right-0 w-32 h-[1px] bg-blue-500/20" />
          <div className="absolute bottom-[20%] right-0 w-[1px] h-20 bg-blue-500/20" />
          <div className="absolute top-[50%] left-[10%] w-8 h-8 border border-blue-500/10" />
          <div className="absolute bottom-[35%] right-[15%] w-12 h-12 border border-blue-500/10" />
        </div>

        <div className="relative px-8 md:px-12 lg:px-16 py-20 md:py-32 w-full">
          {hpConfig.subcatchphrase && (
            <p className="text-blue-400/70 text-xs tracking-[0.25em] uppercase mb-6 font-medium">
              {hpConfig.subcatchphrase}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.3] whitespace-pre-line">
            {hpConfig.catchphrase}
          </h1>
          <p className="mt-6 text-slate-400 text-sm md:text-base leading-relaxed max-w-md">
            {hpConfig.description}
          </p>

          <div className="mt-10 flex flex-row gap-3">
            <Link
              href={hpConfig.bookingUrl}
              className="group inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3.5 rounded-sm transition-all text-sm shadow-lg shadow-blue-600/25 hover:-translate-y-0.5"
            >
              Web
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
              className="inline-flex items-center justify-center border border-slate-500 text-slate-300 hover:text-white hover:border-white font-medium px-6 py-3.5 rounded-sm transition-all text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {hpConfig.phone}
            </a>
          </div>

          {hpConfig.emergencyNote && (
            <p className="mt-5 text-xs text-slate-500 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full" />
              {hpConfig.emergencyNote}
            </p>
          )}
        </div>
      </div>

      {/* Right: Image side (60%) */}
      <div className="hidden md:flex w-[60%] bg-slate-100 items-center justify-center relative overflow-hidden">
        {/* Geometric decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 right-8 w-20 h-20 border-2 border-slate-200" />
          <div className="absolute bottom-12 left-12 w-16 h-16 border-2 border-slate-200" />
          <div className="absolute top-1/2 right-1/4 w-[1px] h-32 bg-slate-200" />
        </div>

        {/* Image placeholder */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-[85%] h-[75%] bg-slate-200 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
              <p className="text-slate-400 text-sm">Hero Image</p>
            </div>
          </div>

          {/* Floating info cards */}
          <div className="absolute bottom-12 left-8 bg-white p-4 shadow-lg flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400">Web</p>
              <p className="text-sm font-bold text-slate-800">24</p>
            </div>
          </div>

          <div className="absolute top-12 right-12 bg-white p-4 shadow-lg">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-lg font-bold text-slate-800">4.8</span>
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500">Google</p>
          </div>
        </div>
      </div>
    </section>
  );
}
