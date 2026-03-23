"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Hours() {
  const theme = getHpTheme();

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-3">
            診療時間
          </h2>
          <p className="text-stone-400 text-center mb-10 text-sm">
            ご来院前にご確認ください
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="max-w-2xl mx-auto">
            <div className={`bg-gradient-to-br ${theme.hoursBg} rounded-3xl p-6 md:p-10 border ${theme.hoursBorder} shadow-sm`}>
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className={`border-b-2 ${theme.hoursBorder}`}>
                    <th className="text-left py-3 text-stone-400 font-medium text-xs uppercase tracking-wider">
                      曜日
                    </th>
                    <th className="text-center py-3 text-stone-400 font-medium text-xs uppercase tracking-wider">
                      午前
                    </th>
                    <th className="text-center py-3 text-stone-400 font-medium text-xs uppercase tracking-wider">
                      午後
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hpConfig.hours.map((h, i) => {
                    const isClosed = h.morning === "休診";
                    return (
                      <tr
                        key={i}
                        className={`border-b ${theme.hoursBorder} last:border-0 ${
                          isClosed ? "opacity-50" : ""
                        }`}
                      >
                        <td className="py-4 text-stone-800 font-medium">
                          {h.days}
                        </td>
                        <td className="py-4 text-center text-stone-600">
                          {isClosed ? (
                            <span className="inline-block bg-stone-100 text-stone-400 text-xs px-3 py-1 rounded-full">
                              休診
                            </span>
                          ) : (
                            <span className={`inline-block ${theme.hoursTag} ${theme.hoursTagText} text-xs px-3 py-1 rounded-full font-medium`}>
                              {h.morning}
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-center text-stone-600">
                          {isClosed ? (
                            <span className="inline-block bg-stone-100 text-stone-400 text-xs px-3 py-1 rounded-full">
                              休診
                            </span>
                          ) : (
                            <span className={`inline-block ${theme.hoursTag} ${theme.hoursTagText} text-xs px-3 py-1 rounded-full font-medium`}>
                              {h.afternoon}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className={`mt-6 pt-5 border-t ${theme.hoursBorder} flex flex-col sm:flex-row sm:items-center gap-3 text-sm`}>
                <div className="flex items-center gap-2 text-stone-500">
                  <span className="w-2 h-2 bg-red-400 rounded-full" />
                  休診日: {hpConfig.closedDays}
                </div>
                {hpConfig.emergencyNote && (
                  <div className="flex items-center gap-2 text-stone-500">
                    <span className={`w-2 h-2 ${theme.accentBorder.replace("border-", "bg-")} rounded-full`} />
                    {hpConfig.emergencyNote}
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
