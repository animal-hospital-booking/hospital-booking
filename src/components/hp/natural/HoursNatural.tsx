"use client";

import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";
import AnimateOnScroll from "../AnimateOnScroll";

export default function HoursNatural() {
  const theme = getHpTheme("natural");

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-3">
            診療時間
          </h2>
          <p className="text-stone-400 text-center mb-12 text-sm">
            ご来院前にご確認ください
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="overflow-hidden">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="bg-emerald-50">
                  <th className="text-left py-3 px-4 text-emerald-800 font-medium text-sm">
                    曜日
                  </th>
                  <th className="text-center py-3 px-4 text-emerald-800 font-medium text-sm">
                    午前
                  </th>
                  <th className="text-center py-3 px-4 text-emerald-800 font-medium text-sm">
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
                      className={`border-b border-stone-100 last:border-0 ${
                        isClosed ? "text-stone-400" : ""
                      }`}
                    >
                      <td className="py-4 px-4 text-stone-700 font-medium">
                        {h.days}
                      </td>
                      <td className="py-4 px-4 text-center text-stone-600">
                        {isClosed ? "休診" : h.morning}
                      </td>
                      <td className="py-4 px-4 text-center text-stone-600">
                        {isClosed ? "休診" : h.afternoon}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 text-sm px-1">
              <div className="flex items-center gap-2 text-stone-500">
                <span className="w-2 h-2 bg-red-400 rounded-full" />
                休診日: {hpConfig.closedDays}
              </div>
              {hpConfig.emergencyNote && (
                <div className="flex items-center gap-2 text-stone-500">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full" />
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
