"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "@/components/hp/AnimateOnScroll";

export default function HoursModern() {
  const theme = getHpTheme("modern");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-2">
            診療時間
          </h2>
          <div className="w-12 h-[2px] bg-blue-600 mx-auto mb-3" />
          <p className="text-slate-400 text-center mb-10 text-sm">
            ご来院前にご確認ください
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="max-w-2xl mx-auto">
            <div className="border border-slate-200 overflow-hidden">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="text-left py-3 px-4 md:px-6 font-medium text-xs uppercase tracking-wider">
                      曜日
                    </th>
                    <th className="text-center py-3 px-4 md:px-6 font-medium text-xs uppercase tracking-wider">
                      午前
                    </th>
                    <th className="text-center py-3 px-4 md:px-6 font-medium text-xs uppercase tracking-wider">
                      午後
                    </th>
                    <th className="text-center py-3 px-2 md:px-4 font-medium text-xs uppercase tracking-wider">
                      状態
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hpConfig.hours.map((h, i) => {
                    const isClosed = h.morning === "休診";
                    return (
                      <tr
                        key={i}
                        className={`border-b border-slate-100 last:border-0 ${
                          i % 2 === 1 ? "bg-slate-50" : "bg-white"
                        }`}
                      >
                        <td className="py-3.5 px-4 md:px-6 text-slate-800 font-medium">
                          {h.days}
                        </td>
                        <td className="py-3.5 px-4 md:px-6 text-center text-slate-600">
                          {isClosed ? (
                            <span className="text-slate-300">-</span>
                          ) : (
                            h.morning
                          )}
                        </td>
                        <td className="py-3.5 px-4 md:px-6 text-center text-slate-600">
                          {isClosed ? (
                            <span className="text-slate-300">-</span>
                          ) : (
                            h.afternoon
                          )}
                        </td>
                        <td className="py-3.5 px-2 md:px-4 text-center">
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isClosed ? "bg-red-500" : "bg-emerald-500"
                              }`}
                            />
                            <span className={`text-xs font-medium ${
                              isClosed ? "text-red-600" : "text-emerald-600"
                            }`}>
                              {isClosed ? "休診" : "診療"}
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 text-sm px-1">
              <div className="flex items-center gap-2 text-slate-500">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                休診日: {hpConfig.closedDays}
              </div>
              {hpConfig.emergencyNote && (
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  {hpConfig.emergencyNote}
                </div>
              )}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
