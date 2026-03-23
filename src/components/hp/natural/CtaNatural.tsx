"use client";

import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "../AnimateOnScroll";

export default function CtaNatural() {
  const theme = getHpTheme("natural");

  return (
    <section className="py-20 md:py-28 bg-emerald-50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <AnimateOnScroll>
          <p className="text-emerald-600/60 text-sm tracking-widest uppercase mb-4">
            Reservation
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4 leading-tight">
            ご予約・お問い合わせ
          </h2>
          <p className="text-stone-500 mb-12 leading-relaxed">
            24時間いつでもWebからご予約いただけます。
            <br />
            お急ぎの場合はお電話でご連絡ください。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={hpConfig.bookingUrl}
              className="group inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-10 py-4 rounded-full transition-all shadow-md shadow-emerald-600/20 hover:-translate-y-0.5"
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
            <a
              href={`tel:${hpConfig.phone.replace(/-/g, "")}`}
              className="inline-flex items-center justify-center border-2 border-stone-300 text-stone-700 hover:border-emerald-400 hover:text-emerald-700 font-medium px-10 py-4 rounded-full transition-all hover:-translate-y-0.5"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {hpConfig.phone}
            </a>
          </div>

          {hpConfig.lineUrl && (
            <div className="mt-8">
              <a
                href={hpConfig.lineUrl}
                className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-medium px-6 py-3 rounded-full transition-all text-sm shadow-md shadow-emerald-900/10 hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINEで友だち追加して予約
              </a>
            </div>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
