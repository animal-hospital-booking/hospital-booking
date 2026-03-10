"use client";

import { useState } from "react";

type CalendarProps = {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export default function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prev);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const isPast = (day: number) => {
    const date = new Date(year, month, day);
    return date < today;
  };

  const isSunday = (day: number) => {
    return new Date(year, month, day).getDay() === 0;
  };

  const isSaturday = (day: number) => {
    return new Date(year, month, day).getDay() === 6;
  };

  const canGoPrev =
    new Date(year, month - 1, 1) >=
    new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          ◀
        </button>
        <h2 className="text-lg font-bold text-gray-800">
          {year}年 {month + 1}月
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className={`text-center text-sm font-medium py-2 ${
              i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {day}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const past = isPast(day);
          const selected = isSelected(day);
          const sunday = isSunday(day);
          const saturday = isSaturday(day);

          return (
            <button
              key={day}
              disabled={past || sunday}
              onClick={() => onSelectDate(new Date(year, month, day))}
              className={`
                py-2 rounded-lg text-sm font-medium transition
                ${past || sunday ? "text-gray-300 cursor-not-allowed" : "hover:bg-blue-50 cursor-pointer"}
                ${selected ? "!bg-blue-600 !text-white hover:!bg-blue-700" : ""}
                ${!selected && !past && sunday ? "text-red-300" : ""}
                ${!selected && !past && !sunday && saturday ? "text-blue-500" : ""}
                ${!selected && !past && !sunday && !saturday ? "text-gray-700" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
