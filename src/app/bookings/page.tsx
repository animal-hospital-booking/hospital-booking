"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getBookings,
  updateBookingStatus,
  updateBooking,
  type Booking,
  type PetInfo,
} from "@/lib/bookings";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
const CONSULTATION_TYPES = ["初診", "再診", "狂犬病", "相談"];
const PET_SPECIES = ["犬", "猫", "うさぎ", "ハムスター", "鳥", "その他"];
const PET_SEX_OPTIONS = ["オス", "メス", "不明"];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${WEEKDAYS[d.getDay()]})`;
}

const statusLabels: Record<Booking["status"], string> = {
  confirmed: "予約確定",
  cancelled: "キャンセル済",
  completed: "来院済み",
  no_show: "無断キャンセル",
};

const statusColors: Record<Booking["status"], string> = {
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
  completed: "bg-blue-100 text-blue-700",
  no_show: "bg-red-100 text-red-700",
};

// ─── Edit Modal ───
function EditModal({
  booking,
  onSave,
  onClose,
}: {
  booking: Booking;
  onSave: (id: string, updates: Partial<Booking>) => void;
  onClose: () => void;
}) {
  const [consultationType, setConsultationType] = useState(booking.consultationType || "");
  const [date, setDate] = useState(booking.date);
  const [time, setTime] = useState(booking.time);
  const [name, setName] = useState(booking.name);
  const [phone, setPhone] = useState(booking.phone);
  const [email, setEmail] = useState(booking.email || "");
  const [symptoms, setSymptoms] = useState(booking.symptoms || "");
  const [petName, setPetName] = useState(booking.pet?.petName || "");
  const [petNameKana, setPetNameKana] = useState(booking.pet?.petNameKana || "");
  const [petSpecies, setPetSpecies] = useState(booking.pet?.petSpecies || "");
  const [petBreed, setPetBreed] = useState(booking.pet?.petBreed || "");
  const [petSex, setPetSex] = useState(booking.pet?.petSex || "");
  const [petBirthDate, setPetBirthDate] = useState(booking.pet?.petBirthDate || "");

  const handleSave = () => {
    const pet: PetInfo = { petName, petNameKana, petSpecies, petBreed, petSex, petBirthDate };
    onSave(booking.id, {
      consultationType,
      date,
      time,
      name,
      phone,
      email,
      symptoms,
      pet,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-xl">
          <h3 className="text-lg font-bold text-gray-800">予約内容の変更</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Booking Info */}
          <p className="text-xs font-semibold text-gray-400">予約情報</p>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">診察内容</label>
            <div className="grid grid-cols-4 gap-1">
              {CONSULTATION_TYPES.map((t) => (
                <button key={t} type="button" onClick={() => setConsultationType(t)}
                  className={`py-1.5 text-xs rounded-lg border transition ${
                    consultationType === t ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:bg-blue-50"
                  }`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">日付</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">時間</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Pet Info */}
          <p className="text-xs font-semibold text-gray-400">ペット情報</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">名前</label>
              <input type="text" value={petName} onChange={(e) => setPetName(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">フリガナ</label>
              <input type="text" value={petNameKana} onChange={(e) => setPetNameKana(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ペットの種類</label>
            <div className="grid grid-cols-3 gap-1">
              {PET_SPECIES.map((s) => (
                <button key={s} type="button" onClick={() => setPetSpecies(s)}
                  className={`py-1.5 text-xs rounded-lg border transition ${
                    petSpecies === s ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:bg-blue-50"
                  }`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">品種</label>
              <input type="text" value={petBreed} onChange={(e) => setPetBreed(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">性別</label>
              <div className="grid grid-cols-3 gap-1">
                {PET_SEX_OPTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => setPetSex(s)}
                    className={`py-1.5 text-xs rounded-lg border transition ${
                      petSex === s ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:bg-blue-50"
                    }`}>{s}</button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">生年月日</label>
            <input type="date" value={petBirthDate} onChange={(e) => setPetBirthDate(e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <hr className="border-gray-100" />

          {/* Owner Info */}
          <p className="text-xs font-semibold text-gray-400">飼い主情報</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">お名前</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">電話番号</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">メール</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">症状</label>
            <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={2}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
          >
            変更を保存する
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───
export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const reload = () => {
    setBookings(getBookings().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  };

  useEffect(() => {
    reload();
  }, []);

  const handleCancel = (id: string) => {
    if (confirm("この予約をキャンセルしますか？")) {
      updateBookingStatus(id, "cancelled");
      reload();
    }
  };

  const handleSave = (id: string, updates: Partial<Booking>) => {
    updateBooking(id, updates);
    reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
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

      <main className="max-w-3xl mx-auto px-4 py-6">
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
                  <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => setEditingBooking(booking)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      変更する
                    </button>
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      キャンセルする
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {editingBooking && (
        <EditModal
          booking={editingBooking}
          onSave={handleSave}
          onClose={() => setEditingBooking(null)}
        />
      )}
    </div>
  );
}
