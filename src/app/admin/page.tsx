"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBookings, updateBookingStatus, type Booking } from "@/lib/bookings";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${WEEKDAYS[d.getDay()]})`;
}

const statusLabels: Record<Booking["status"], string> = {
  confirmed: "予約確定",
  cancelled: "キャンセル済",
  completed: "診察済",
};

const statusColors: Record<Booking["status"], string> = {
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
  completed: "bg-blue-100 text-blue-700",
};

type FilterStatus = "all" | Booking["status"];

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("all");

  const reload = () => {
    setBookings(getBookings().sort((a, b) => {
      const dateA = a.date + a.time;
      const dateB = b.date + b.time;
      return dateA.localeCompare(dateB);
    }));
  };

  useEffect(() => {
    reload();
  }, []);

  const handleStatusChange = (id: string, status: Booking["status"]) => {
    updateBookingStatus(id, status);
    reload();
  };

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const counts = {
    all: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">管理者画面</h1>
            <p className="text-sm text-gray-500 mt-1">予約の管理・ステータス変更</p>
          </div>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            予約ページ →
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
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
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={`rounded-xl p-3 text-center border transition ${
                filter === s.key
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200"
              } ${s.color}`}
            >
              <p className="text-2xl font-bold text-gray-800">
                {counts[s.key]}
              </p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </button>
          ))}
        </div>

        {/* Bookings Table */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-400">該当する予約がありません</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-sm p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-800">
                      {formatDate(booking.date)}{" "}
                      <span className="text-blue-600">{booking.time}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {booking.name} ・ {booking.phone} ・ {booking.email}
                    </p>
                    {booking.symptoms && (
                      <p className="text-sm text-gray-400 mt-1">
                        症状: {booking.symptoms}
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${statusColors[booking.status]}`}
                  >
                    {statusLabels[booking.status]}
                  </span>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  {booking.status !== "confirmed" && (
                    <button
                      onClick={() =>
                        handleStatusChange(booking.id, "confirmed")
                      }
                      className="text-xs px-3 py-1 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                    >
                      予約確定に戻す
                    </button>
                  )}
                  {booking.status !== "completed" && (
                    <button
                      onClick={() =>
                        handleStatusChange(booking.id, "completed")
                      }
                      className="text-xs px-3 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      診察済にする
                    </button>
                  )}
                  {booking.status !== "cancelled" && (
                    <button
                      onClick={() =>
                        handleStatusChange(booking.id, "cancelled")
                      }
                      className="text-xs px-3 py-1 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                    >
                      キャンセル
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
