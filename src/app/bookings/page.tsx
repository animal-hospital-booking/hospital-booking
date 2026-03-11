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

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(getBookings().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  }, []);

  const handleCancel = (id: string) => {
    if (confirm("この予約をキャンセルしますか？")) {
      updateBookingStatus(id, "cancelled");
      setBookings(getBookings().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-blue-700">予約一覧</h1>
            <p className="text-sm text-gray-500 mt-1">あなたの予約を確認できます</p>
          </div>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            新規予約 →
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-400 mb-4">予約がありません</p>
            <Link
              href="/"
              className="inline-block py-2 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
            >
              予約する
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-sm p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-800">
                      {formatDate(booking.date)}
                    </p>
                    <p className="text-blue-600 font-medium">{booking.time}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[booking.status]}`}
                  >
                    {statusLabels[booking.status]}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  {booking.consultationType && (
                    <p>
                      <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {booking.consultationType}
                      </span>
                    </p>
                  )}
                  {booking.pet && (
                    <p>
                      <span className="text-gray-400">ペット：</span>
                      {booking.pet.petName}（{booking.pet.petSpecies}{booking.pet.petBreed ? ` / ${booking.pet.petBreed}` : ""}・{booking.pet.petSex}）
                    </p>
                  )}
                  <p>
                    <span className="text-gray-400">飼い主：</span>
                    {booking.name}
                  </p>
                  <p>
                    <span className="text-gray-400">電話：</span>
                    {booking.phone}
                  </p>
                  {booking.symptoms && (
                    <p>
                      <span className="text-gray-400">症状：</span>
                      {booking.symptoms}
                    </p>
                  )}
                </div>
                {booking.status === "confirmed" && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="mt-3 text-sm text-red-500 hover:text-red-700"
                  >
                    キャンセルする
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
