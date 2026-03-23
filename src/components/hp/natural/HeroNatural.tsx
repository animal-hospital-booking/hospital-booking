import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";

export default function HeroNatural() {
  const theme = getHpTheme("natural");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-width background image area */}
      <div className="absolute inset-0 bg-stone-200">
        {/* Image placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-20 h-20 text-stone-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
            />
          </svg>
        </div>
      </div>

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/50 to-stone-900/70" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 py-32 md:py-40 text-center">
        {hpConfig.subcatchphrase && (
          <p className="text-emerald-200/80 text-sm tracking-[0.25em] uppercase mb-6 font-light">
            {hpConfig.subcatchphrase}
          </p>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.3] whitespace-pre-line">
          {hpConfig.catchphrase}
        </h1>

        <p className="mt-8 text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {hpConfig.description}
        </p>

        <div className="mt-12">
          <Link
            href={hpConfig.bookingUrl}
            className="group inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-10 py-4 rounded-full transition-all text-base shadow-lg shadow-emerald-900/30 hover:-translate-y-0.5"
          >
            Webで予約する
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {hpConfig.emergencyNote && (
          <p className="mt-6 text-sm text-white/50 flex items-center justify-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full" />
            {hpConfig.emergencyNote}
          </p>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
