"use client";

import { useState } from "react";
import { getBookedTimes } from "@/lib/bookings";

type WeeklyScheduleProps = {
  onSelect: (date: Date, time: string) => void;
  onBack: () => void;
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
];

function formatDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getWeekDays(startDate: Date): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

function getStartOfWeek(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export default function WeeklySchedule({ onSelect, onBack }: WeeklyScheduleProps) {
  const [weekStart, setWeekStart] = useState(getStartOfWeek);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = getWeekDays(weekStart);

  const canGoPrev = weekStart > today;

  const goNext = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
  };

  const goPrev = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    if (prev < today) {
      setWeekStart(new Date(today));
    } else {
      setWeekStart(prev);
    }
  };

  const isSlotAvailable = (date: Date, time: string) => {
    // Sunday is closed
    if (date.getDay() === 0) return false;

    // Past date
    if (date < today) return false;

    // If today, check if time has passed
    if (date.getTime() === today.getTime()) {
      const now = new Date();
      const [h, m] = time.split(":").map(Number);
      if (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes())) {
        return false;
      }
    }

    // Check if already booked
    const dateStr = formatDateStr(date);
    const booked = getBookedTimes(dateStr);
    if (booked.includes(time)) return false;

    return true;
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-4">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 text-sm mb-3"
      >
        ← 戻る
      </button>
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        日時を選択してください
      </h2>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          前の7日間
        </button>
        <button
          onClick={goNext}
          className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          次の7日間
        </button>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-2 text-gray-400 text-xs font-normal border-b border-gray-200 sticky left-0 bg-white"></th>
              {days.map((d) => {
                const dayOfWeek = d.getDay();
                const isSun = dayOfWeek === 0;
                const isSat = dayOfWeek === 6;
                return (
                  <th
                    key={d.toISOString()}
                    className={`p-2 text-center border-b border-gray-200 font-medium ${
                      isSun ? "text-red-500" : isSat ? "text-blue-500" : "text-gray-700"
                    }`}
                  >
                    <div className="text-xs">
                      {d.getMonth() + 1}/{d.getDate()}
                    </div>
                    <div className="text-xs">
                      ({WEEKDAYS[dayOfWeek]})
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((time) => (
              <tr key={time} className="border-b border-gray-100">
                <td className="p-2 text-gray-600 font-medium whitespace-nowrap sticky left-0 bg-white text-xs">
                  {time}
                </td>
                {days.map((d) => {
                  const available = isSlotAvailable(d, time);
                  return (
                    <td key={d.toISOString()} className="p-1 text-center">
                      {available ? (
                        <button
                          onClick={() => onSelect(d, time)}
                          className="w-full py-2 rounded hover:bg-orange-50 transition"
                        >
                          <span className="text-orange-500 font-bold text-base">◎</span>
                        </button>
                      ) : (
                        <span className="text-gray-300 text-base">ー</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">
        ◎：予約可能 ／ ー：予約不可 ※日曜休診
      </p>
    </div>
  );
}
