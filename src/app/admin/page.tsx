"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getBookings, updateBookingStatus, type Booking } from "@/lib/bookings";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const HOUR_HEIGHT = 80; // px per hour

const statusColors: Record<Booking["status"], string> = {
  confirmed: "bg-green-200 border-green-400 text-green-900",
  cancelled: "bg-gray-200 border-gray-400 text-gray-500",
  completed: "bg-blue-200 border-blue-400 text-blue-900",
};

const statusLabels: Record<Booking["status"], string> = {
  confirmed: "予約確定",
  cancelled: "キャンセル済",
  completed: "診察済",
};

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  d.setDate(d.getDate() - day + 1); // Monday start
  return d;
}

function getWeekDays(weekStart: Date): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function isToday(d: Date): boolean {
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const reload = useCallback(() => {
    setBookings(getBookings());
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const days = getWeekDays(weekStart);

  const goThisWeek = () => setWeekStart(getWeekStart(new Date()));
  const goPrev = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    setWeekStart(prev);
  };
  const goNext = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
  };

  const getBookingsForDay = (date: Date) => {
    const dateStr = formatDateStr(date);
    return bookings.filter((b) => b.date === dateStr && b.status !== "cancelled");
  };

  const getBookingPosition = (booking: Booking) => {
    const startMin = timeToMinutes(booking.time);
    const topMin = startMin - HOURS[0] * 60;
    const top = (topMin / 60) * HOUR_HEIGHT;
    const height = (30 / 60) * HOUR_HEIGHT; // 30min per booking
    return { top, height };
  };

  const handleStatusChange = (id: string, status: Booking["status"]) => {
    updateBookingStatus(id, status);
    reload();
    setSelectedBooking(null);
  };

  // Week label
  const weekEndDate = new Date(weekStart);
  weekEndDate.setDate(weekEndDate.getDate() + 6);
  const weekLabel = `${weekStart.getFullYear()}年${weekStart.getMonth() + 1}月${weekStart.getDate()}日 〜 ${weekEndDate.getMonth() + 1}月${weekEndDate.getDate()}日`;

  // Stats
  const counts = {
    all: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">管理者画面</h1>
            <p className="text-sm text-gray-500 mt-1">予約カレンダー</p>
          </div>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            予約ページ →
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {(
            [
              { key: "all", label: "全件", color: "bg-white" },
              { key: "confirmed", label: "予約確定", color: "bg-green-50" },
              { key: "completed", label: "診察済", color: "bg-blue-50" },
              { key: "cancelled", label: "キャンセル", color: "bg-gray-50" },
            ] as const
          ).map((s) => (
            <div
              key={s.key}
              className={`rounded-xl p-3 text-center border border-gray-200 ${s.color}`}
            >
              <p className="text-2xl font-bold text-gray-800">{counts[s.key]}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-4">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600"
              >
                ◀
              </button>
              <button
                onClick={goThisWeek}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                今週
              </button>
              <button
                onClick={goNext}
                className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600"
              >
                ▶
              </button>
            </div>
            <p className="font-bold text-gray-800">{weekLabel}</p>
          </div>

          {/* Calendar Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Day Headers */}
              <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-200">
                <div className="p-2"></div>
                {days.map((d) => {
                  const dayOfWeek = d.getDay();
                  const isSun = dayOfWeek === 0;
                  const isSat = dayOfWeek === 6;
                  const today = isToday(d);
                  return (
                    <div
                      key={d.toISOString()}
                      className={`p-2 text-center border-l border-gray-100 ${today ? "bg-blue-50" : ""}`}
                    >
                      <p
                        className={`text-xs ${
                          isSun ? "text-red-500" : isSat ? "text-blue-500" : "text-gray-500"
                        }`}
                      >
                        {WEEKDAYS[dayOfWeek]}
                      </p>
                      <p
                        className={`text-lg font-bold ${
                          today
                            ? "bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                            : isSun
                              ? "text-red-500"
                              : isSat
                                ? "text-blue-500"
                                : "text-gray-800"
                        }`}
                      >
                        {d.getDate()}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Time Grid */}
              <div
                className="grid grid-cols-[60px_repeat(7,1fr)] relative"
                style={{ height: HOURS.length * HOUR_HEIGHT }}
              >
                {/* Time Labels */}
                <div className="relative">
                  {HOURS.map((h, i) => (
                    <div
                      key={h}
                      className="absolute w-full text-right pr-2 text-xs text-gray-400"
                      style={{ top: i * HOUR_HEIGHT - 8 }}
                    >
                      {`${h}:00`}
                    </div>
                  ))}
                </div>

                {/* Day Columns */}
                {days.map((d) => {
                  const dayBookings = getBookingsForDay(d);
                  const today = isToday(d);
                  return (
                    <div
                      key={d.toISOString()}
                      className={`relative border-l border-gray-100 ${today ? "bg-blue-50/30" : ""}`}
                    >
                      {/* Hour lines */}
                      {HOURS.map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-full border-t border-gray-100"
                          style={{ top: i * HOUR_HEIGHT }}
                        />
                      ))}
                      {/* Half-hour lines */}
                      {HOURS.map((_, i) => (
                        <div
                          key={`half-${i}`}
                          className="absolute w-full border-t border-gray-50"
                          style={{ top: i * HOUR_HEIGHT + HOUR_HEIGHT / 2 }}
                        />
                      ))}

                      {/* Booking blocks */}
                      {dayBookings.map((booking) => {
                        const pos = getBookingPosition(booking);
                        return (
                          <button
                            key={booking.id}
                            onClick={() => setSelectedBooking(booking)}
                            className={`absolute left-0.5 right-0.5 rounded border-l-3 px-1 overflow-hidden cursor-pointer hover:opacity-80 transition text-left ${statusColors[booking.status]}`}
                            style={{
                              top: pos.top,
                              height: pos.height,
                              borderLeftWidth: "3px",
                            }}
                          >
                            <p className="text-[10px] font-bold truncate">
                              {booking.time} {booking.pet?.petName || booking.name}
                            </p>
                            <p className="text-[9px] truncate opacity-75">
                              {booking.consultationType} ・ {booking.name}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">予約詳細</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[selectedBooking.status]}`}
                >
                  {statusLabels[selectedBooking.status]}
                </span>
                {selectedBooking.consultationType && (
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                    {selectedBooking.consultationType}
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-400">日時</p>
                <p className="font-medium text-gray-800">
                  {(() => {
                    const d = new Date(selectedBooking.date + "T00:00:00");
                    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${WEEKDAYS[d.getDay()]})`;
                  })()}{" "}
                  {selectedBooking.time}
                </p>
              </div>

              {selectedBooking.pet && (
                <div>
                  <p className="text-xs text-gray-400">ペット情報</p>
                  <p className="font-medium text-gray-800">
                    {selectedBooking.pet.petName}（{selectedBooking.pet.petNameKana}）
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedBooking.pet.petSpecies}
                    {selectedBooking.pet.petBreed ? ` / ${selectedBooking.pet.petBreed}` : ""}
                    ・{selectedBooking.pet.petSex}
                    {selectedBooking.pet.petBirthDate ? ` ・ ${selectedBooking.pet.petBirthDate}` : ""}
                  </p>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-400">飼い主</p>
                <p className="font-medium text-gray-800">{selectedBooking.name}</p>
                <p className="text-sm text-gray-600">{selectedBooking.phone}</p>
                {selectedBooking.email && (
                  <p className="text-sm text-gray-600">{selectedBooking.email}</p>
                )}
              </div>

              {selectedBooking.symptoms && (
                <div>
                  <p className="text-xs text-gray-400">症状</p>
                  <p className="text-sm text-gray-800">{selectedBooking.symptoms}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-100">
              {selectedBooking.status !== "confirmed" && (
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, "confirmed")}
                  className="text-xs px-3 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition font-medium"
                >
                  予約確定に戻す
                </button>
              )}
              {selectedBooking.status !== "completed" && (
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, "completed")}
                  className="text-xs px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-medium"
                >
                  診察済にする
                </button>
              )}
              {selectedBooking.status !== "cancelled" && (
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, "cancelled")}
                  className="text-xs px-3 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition font-medium"
                >
                  キャンセル
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
