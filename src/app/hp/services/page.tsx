import type { Metadata } from "next";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import { getIcon } from "@/components/hp/icons";
import Cta from "@/components/hp/Cta";

export const metadata: Metadata = {
  title: "診療案内",
};

export default function ServicesPage() {
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
            Services
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-stone-800">
            診療案内
          </h1>
        </div>
      </section>

      {/* 対応動物 */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-stone-600">
            当院では
            <span className="font-bold text-stone-800 mx-1">
              {hpConfig.targetAnimals.join("・")}
            </span>
            の診療に対応しています。
          </p>
        </div>
      </section>

      {/* サービス一覧 */}
      <section className={`py-12 ${theme.sectionAltBg}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {hpConfig.services.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex gap-5 group"
                >
                  <div className={`w-14 h-14 shrink-0 bg-gradient-to-br ${theme.iconBgGradient} rounded-2xl flex items-center justify-center ${theme.iconText} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800 text-lg mb-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 初診の方へ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-stone-800 text-center mb-8">
            初診の方へ
          </h2>
          <div className={`bg-gradient-to-br ${theme.hoursBg} rounded-2xl p-6 md:p-8 border ${theme.hoursBorder}`}>
            <div className="space-y-5 text-sm text-stone-600 leading-relaxed">
              <div className="flex gap-4">
                <span className={`w-8 h-8 shrink-0 ${theme.numberBg} text-white rounded-lg flex items-center justify-center text-xs font-bold`}>
                  01
                </span>
                <p className="pt-1">
                  ご来院前にWeb予約またはお電話でご予約ください。急患の場合はお電話にてご連絡ください。
                </p>
              </div>
              <div className="flex gap-4">
                <span className={`w-8 h-8 shrink-0 ${theme.numberBg} text-white rounded-lg flex items-center justify-center text-xs font-bold`}>
                  02
                </span>
                <p className="pt-1">
                  ご来院時は、これまでの診療記録やワクチン接種証明書をお持ちください。
                </p>
              </div>
              <div className="flex gap-4">
                <span className={`w-8 h-8 shrink-0 ${theme.numberBg} text-white rounded-lg flex items-center justify-center text-xs font-bold`}>
                  03
                </span>
                <p className="pt-1">
                  問診票のご記入をお願いしております。Web問診票を事前にご記入いただくとスムーズです。
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
