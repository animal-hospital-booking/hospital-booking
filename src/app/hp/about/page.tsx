import type { Metadata } from "next";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import Stats from "@/components/hp/Stats";
import Gallery from "@/components/hp/Gallery";
import Testimonials from "@/components/hp/Testimonials";
import Cta from "@/components/hp/Cta";

export const metadata: Metadata = {
  title: "病院紹介",
};

export default function AboutPage() {
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
            About Us
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-stone-800">
            病院紹介
          </h1>
        </div>
      </section>

      {/* 理念 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-block mb-6">
            <div className={`w-16 h-[2px] ${theme.accentBorder.replace("border-", "bg-")} mx-auto`} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-8">
            私たちの想い
          </h2>
          <p className="text-stone-600 leading-[2] text-base md:text-lg">
            {hpConfig.philosophy || hpConfig.description}
          </p>
        </div>
      </section>

      {/* 対応動物 */}
      <section className={`py-16 ${theme.sectionAltBg}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-stone-800 text-center mb-10">
            診療対象動物
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {hpConfig.targetAnimals.map((animal) => (
              <div
                key={animal}
                className="bg-white rounded-2xl px-8 py-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-center group"
              >
                <div className={`w-12 h-12 mx-auto mb-3 ${theme.iconBg} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <svg className={`w-6 h-6 ${theme.iconText}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3.25a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-stone-700">
                  {animal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* スタッフ紹介 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-3">
            スタッフ紹介
          </h2>
          <p className="text-stone-400 text-center mb-12 text-sm">
            経験豊富なスタッフがお待ちしています
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {hpConfig.staff.map((member, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-stone-50 to-white rounded-2xl p-6 md:p-8 text-center group hover:shadow-lg transition-all duration-300"
              >
                {/* Avatar */}
                <div className={`w-32 h-32 mx-auto mb-5 rounded-full bg-gradient-to-br ${theme.avatarFrom} ${theme.avatarTo} flex items-center justify-center shadow-inner overflow-hidden`}>
                  <svg className={`w-12 h-12 ${theme.starColor}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>

                <h3 className="font-bold text-stone-800 text-lg mb-1">
                  {member.name}
                </h3>
                <p className={`text-sm ${theme.accentTextHover} mb-4`}>{member.role}</p>

                {/* Specialties */}
                {member.specialties && member.specialties.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {member.specialties.map((s) => (
                      <span
                        key={s}
                        className={`text-xs ${theme.tagBg} ${theme.tagText} px-2.5 py-0.5 rounded-full`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-sm text-stone-500 leading-relaxed">
                  {member.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Gallery />
      <Stats />
      <Testimonials />
      <Cta />
    </>
  );
}
