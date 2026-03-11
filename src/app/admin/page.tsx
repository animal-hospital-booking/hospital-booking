"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  fetchBookings,
  updateBookingStatus as apiUpdateStatus,
  updateBooking as apiUpdateBooking,
  type Booking,
} from "@/lib/api/bookings";
import type { PetInfo } from "@/lib/bookings";
import {
  isConfigured as isGCalConfigured,
  loadGoogleScripts,
  initTokenClient,
  requestAuth,
  isAuthenticated,
  signOut,
  addToCalendar,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "@/lib/googleCalendar";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const HOUR_HEIGHT = 80;
const CONSULTATION_TYPES = ["初診", "再診", "狂犬病", "相談"];
const PET_SPECIES = ["犬", "猫", "うさぎ", "ハムスター", "鳥", "その他"];
const PET_SEX_OPTIONS = ["オス", "メス", "不明"];

type ViewMode = "week" | "month";

const statusColors: Record<Booking["status"], string> = {
  confirmed: "bg-green-200 border-green-400 text-green-900",
  cancelled: "bg-gray-200 border-gray-400 text-gray-500",
  completed: "bg-blue-200 border-blue-400 text-blue-900",
  no_show: "bg-red-200 border-red-400 text-red-900",
};

const statusLabels: Record<Booking["status"], string> = {
  confirmed: "予約確定",
  cancelled: "キャンセル済",
  completed: "来院済み",
  no_show: "無断キャンセル",
};

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  d.setDate(d.getDate() - day + 1);
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

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getMonthDays(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: (Date | null)[][] = [];
  let week: (Date | null)[] = [];

  // Monday start: adjust firstDay (0=Sun -> 6, 1=Mon -> 0, etc.)
  const startOffset = (firstDay + 6) % 7;
  for (let i = 0; i < startOffset; i++) week.push(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(new Date(year, month, day));
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

// ─── Edit Modal ───
function EditModal({
  booking,
  onSave,
  onClose,
  onStatusChange,
}: {
  booking: Booking;
  onSave: (id: string, updates: Partial<Booking>) => void;
  onClose: () => void;
  onStatusChange: (id: string, status: Booking["status"]) => void;
}) {
  const [tab, setTab] = useState<"detail" | "edit">("detail");
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

  const formatDisplayDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${WEEKDAYS[d.getDay()]})`;
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
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-xl">
          <div className="flex gap-1">
            <button
              onClick={() => setTab("detail")}
              className={`px-3 py-1 text-sm rounded-lg font-medium transition ${
                tab === "detail" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              詳細
            </button>
            <button
              onClick={() => setTab("edit")}
              className={`px-3 py-1 text-sm rounded-lg font-medium transition ${
                tab === "edit" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              編集
            </button>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
            ✕
          </button>
        </div>

        <div className="p-5">
          {tab === "detail" ? (
            /* ─── Detail Tab ─── */
            <>
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[booking.status]}`}>
                    {statusLabels[booking.status]}
                  </span>
                  {booking.consultationType && (
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                      {booking.consultationType}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-400">日時</p>
                  <p className="font-medium text-gray-800">
                    {formatDisplayDate(booking.date)} {booking.time}〜
                  </p>
                </div>
                {booking.pet && (
                  <div>
                    <p className="text-xs text-gray-400">ペット情報</p>
                    <p className="font-medium text-gray-800">
                      {booking.pet.petName}（{booking.pet.petNameKana}）
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.pet.petSpecies}
                      {booking.pet.petBreed ? ` / ${booking.pet.petBreed}` : ""}・
                      {booking.pet.petSex}
                      {booking.pet.petBirthDate ? ` ・ ${booking.pet.petBirthDate}` : ""}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-400">飼い主</p>
                  <p className="font-medium text-gray-800">{booking.name}</p>
                  <p className="text-sm text-gray-600">{booking.phone}</p>
                  {booking.email && <p className="text-sm text-gray-600">{booking.email}</p>}
                </div>
                {booking.symptoms && (
                  <div>
                    <p className="text-xs text-gray-400">症状</p>
                    <p className="text-sm text-gray-800">{booking.symptoms}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                {booking.status !== "confirmed" && (
                  <button onClick={() => onStatusChange(booking.id, "confirmed")}
                    className="text-xs px-3 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition font-medium">
                    予約確定に戻す
                  </button>
                )}
                {booking.status !== "completed" && (
                  <button onClick={() => onStatusChange(booking.id, "completed")}
                    className="text-xs px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-medium">
                    来院済みにする
                  </button>
                )}
                {booking.status !== "cancelled" && (
                  <button onClick={() => onStatusChange(booking.id, "cancelled")}
                    className="text-xs px-3 py-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition font-medium">
                    キャンセル
                  </button>
                )}
                {booking.status !== "no_show" && (
                  <button onClick={() => onStatusChange(booking.id, "no_show")}
                    className="text-xs px-3 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition font-medium">
                    無断キャンセル
                  </button>
                )}
              </div>
            </>
          ) : (
            /* ─── Edit Tab ─── */
            <div className="space-y-4">
              {/* Booking Info */}
              <p className="text-xs font-semibold text-gray-400">予約情報</p>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">診察内容</label>
                <div className="grid grid-cols-4 gap-1">
                  {CONSULTATION_TYPES.map((t) => (
                    <button key={t} type="button" onClick={() => setConsultationType(t)}
                      className={`py-1 text-xs rounded-lg border transition ${
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
                      className={`py-1 text-xs rounded-lg border transition ${
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
                        className={`py-1 text-xs rounded-lg border transition ${
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
                保存する
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Page ───
export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [filterStatus, setFilterStatus] = useState<"all" | Booking["status"]>("all");
  const [filterConsultation, setFilterConsultation] = useState<string>("all");
  const [gcalReady, setGcalReady] = useState(false);
  const [gcalConnected, setGcalConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const reload = useCallback(async () => {
    const fresh = await fetchBookings();
    setBookings(fresh);
    return fresh;
  }, []);

  useEffect(() => { reload(); }, [reload]);

  // Google Calendar init
  useEffect(() => {
    if (!isGCalConfigured()) return;
    loadGoogleScripts().then(() => {
      setGcalReady(true);
      initTokenClient(() => {
        setGcalConnected(true);
      });
    });
  }, []);

  const handleGCalConnect = () => {
    if (gcalConnected) {
      signOut();
      setGcalConnected(false);
    } else {
      requestAuth();
    }
  };

  // Sync all confirmed bookings to Google Calendar
  const syncAllToGCal = async () => {
    if (!gcalConnected) return;
    setSyncing(true);
    const current = await fetchBookings();
    for (const booking of current) {
      if (booking.status === "cancelled") {
        if (booking.googleEventId) {
          await deleteCalendarEvent(booking.googleEventId);
          await apiUpdateBooking(booking.id, { googleEventId: undefined });
        }
        continue;
      }
      const eventData = {
        id: booking.id,
        date: booking.date,
        time: booking.time,
        consultationType: booking.consultationType || "",
        name: booking.name,
        petName: booking.pet?.petName || "",
        petSpecies: booking.pet?.petSpecies || "",
        symptoms: booking.symptoms || "",
      };
      if (booking.googleEventId) {
        await updateCalendarEvent(booking.googleEventId, eventData);
      } else {
        const eventId = await addToCalendar(eventData);
        if (eventId) {
          await apiUpdateBooking(booking.id, { googleEventId: eventId });
        }
      }
    }
    await reload();
    setSyncing(false);
  };

  // Sync single booking
  const syncBookingToGCal = async (booking: Booking) => {
    if (!gcalConnected) return;
    const eventData = {
      id: booking.id,
      date: booking.date,
      time: booking.time,
      consultationType: booking.consultationType || "",
      name: booking.name,
      petName: booking.pet?.petName || "",
      petSpecies: booking.pet?.petSpecies || "",
      symptoms: booking.symptoms || "",
    };
    if (booking.status === "cancelled" && booking.googleEventId) {
      await deleteCalendarEvent(booking.googleEventId);
      await apiUpdateBooking(booking.id, { googleEventId: undefined });
    } else if (booking.googleEventId) {
      await updateCalendarEvent(booking.googleEventId, eventData);
    } else {
      const eventId = await addToCalendar(eventData);
      if (eventId) {
        await apiUpdateBooking(booking.id, { googleEventId: eventId });
      }
    }
    await reload();
  };

  const today = new Date();

  // ─── Week helpers ───
  const days = getWeekDays(weekStart);
  const goThisWeek = () => setWeekStart(getWeekStart(new Date()));
  const goPrevWeek = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    setWeekStart(prev);
  };
  const goNextWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
  };

  // ─── Month helpers ───
  const monthWeeks = getMonthDays(viewMonth.year, viewMonth.month);
  const goThisMonth = () => {
    const now = new Date();
    setViewMonth({ year: now.getFullYear(), month: now.getMonth() });
  };
  const goPrevMonth = () => {
    setViewMonth((prev) => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { ...prev, month: prev.month - 1 };
    });
  };
  const goNextMonth = () => {
    setViewMonth((prev) => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { ...prev, month: prev.month + 1 };
    });
  };

  const getBookingsForDay = (date: Date) => {
    const dateStr = formatDateStr(date);
    let filtered = bookings.filter((b) => b.date === dateStr);
    if (filterStatus !== "all") {
      filtered = filtered.filter((b) => b.status === filterStatus);
    } else {
      filtered = filtered.filter((b) => b.status !== "cancelled" && b.status !== "no_show");
    }
    if (filterConsultation !== "all") {
      filtered = filtered.filter((b) => b.consultationType === filterConsultation);
    }
    return filtered;
  };

  const getBookingPosition = (booking: Booking) => {
    const startMin = timeToMinutes(booking.time);
    const topMin = startMin - HOURS[0] * 60;
    const top = (topMin / 60) * HOUR_HEIGHT;
    const height = (60 / 60) * HOUR_HEIGHT; // 1 hour per booking
    return { top, height };
  };

  const handleStatusChange = async (id: string, status: Booking["status"]) => {
    await apiUpdateStatus(id, status);
    const fresh = await reload();
    const updated = fresh.find((b: Booking) => b.id === id);
    setSelectedBooking(updated || null);
    if (updated && gcalConnected) {
      await syncBookingToGCal(updated);
    }
  };

  const handleSave = async (id: string, updates: Partial<Booking>) => {
    await apiUpdateBooking(id, updates);
    const fresh = await reload();
    const updated = fresh.find((b: Booking) => b.id === id);
    if (updated && gcalConnected) {
      await syncBookingToGCal(updated);
    }
  };

  // Stats
  const todayStr = formatDateStr(today);
  const todayBookings = bookings.filter((b) => b.date === todayStr && b.status !== "cancelled" && b.status !== "no_show");
  const counts = {
    today: todayBookings.length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    no_show: bookings.filter((b) => b.status === "no_show").length,
  };

  // Week label
  const weekEndDate = new Date(weekStart);
  weekEndDate.setDate(weekEndDate.getDate() + 6);
  const weekLabel = `${weekStart.getFullYear()}年${weekStart.getMonth() + 1}月${weekStart.getDate()}日 〜 ${weekEndDate.getMonth() + 1}月${weekEndDate.getDate()}日`;
  const monthLabel = `${viewMonth.year}年${viewMonth.month + 1}月`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">管理者画面</h1>
            <p className="text-sm text-gray-500 mt-1">予約カレンダー</p>
          </div>
          <div className="flex items-center gap-3">
            {gcalReady && (
              <>
                <button
                  onClick={handleGCalConnect}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition font-medium ${
                    gcalConnected
                      ? "border-green-300 bg-green-50 text-green-700"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {gcalConnected ? "Google Calendar 連携中" : "Google Calendar 連携"}
                </button>
                {gcalConnected && (
                  <button
                    onClick={syncAllToGCal}
                    disabled={syncing}
                    className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium disabled:opacity-50"
                  >
                    {syncing ? "同期中..." : "全件同期"}
                  </button>
                )}
              </>
            )}
            <Link href="/" className="text-sm text-blue-600 hover:text-blue-800">予約ページ →</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {([
            { key: "today", label: "本日の診察", color: "bg-white" },
            { key: "completed", label: "来院済み", color: "bg-blue-50" },
            { key: "cancelled", label: "キャンセル", color: "bg-gray-50" },
            { key: "no_show", label: "無断キャンセル", color: "bg-red-50" },
          ] as const).map((s) => (
            <div key={s.key} className={`rounded-xl p-3 text-center border border-gray-200 ${s.color}`}>
              <p className="text-2xl font-bold text-gray-800">{counts[s.key]}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4 bg-white rounded-xl shadow-sm p-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">ステータス:</span>
            <div className="flex gap-1">
              {([
                { key: "all", label: "すべて" },
                { key: "confirmed", label: "予約確定" },
                { key: "completed", label: "来院済み" },
                { key: "cancelled", label: "キャンセル" },
                { key: "no_show", label: "無断" },
              ] as const).map((s) => (
                <button
                  key={s.key}
                  onClick={() => setFilterStatus(s.key)}
                  className={`text-xs px-2 py-1 rounded-lg transition font-medium ${
                    filterStatus === s.key
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">診療メニュー:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setFilterConsultation("all")}
                className={`text-xs px-2 py-1 rounded-lg transition font-medium ${
                  filterConsultation === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                すべて
              </button>
              {CONSULTATION_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterConsultation(t)}
                  className={`text-xs px-2 py-1 rounded-lg transition font-medium ${
                    filterConsultation === t
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View Toggle + Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-4">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <button onClick={viewMode === "week" ? goPrevWeek : goPrevMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600">◀</button>
              <button onClick={viewMode === "week" ? goThisWeek : goThisMonth}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                {viewMode === "week" ? "今週" : "今月"}
              </button>
              <button onClick={viewMode === "week" ? goNextWeek : goNextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-600">▶</button>
            </div>

            <p className="font-bold text-gray-800">
              {viewMode === "week" ? weekLabel : monthLabel}
            </p>

            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button onClick={() => setViewMode("week")}
                className={`px-3 py-1 text-sm rounded-md transition font-medium ${
                  viewMode === "week" ? "bg-white shadow text-gray-800" : "text-gray-500"
                }`}>週</button>
              <button onClick={() => setViewMode("month")}
                className={`px-3 py-1 text-sm rounded-md transition font-medium ${
                  viewMode === "month" ? "bg-white shadow text-gray-800" : "text-gray-500"
                }`}>月</button>
            </div>
          </div>

          {/* ─── Week View ─── */}
          {viewMode === "week" && (
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-200">
                  <div className="p-2"></div>
                  {days.map((d) => {
                    const dow = d.getDay();
                    const isSun = dow === 0;
                    const isSat = dow === 6;
                    const isT = isSameDay(d, today);
                    return (
                      <div key={d.toISOString()} className={`p-2 text-center border-l border-gray-100 ${isT ? "bg-blue-50" : ""}`}>
                        <p className={`text-xs ${isSun ? "text-red-500" : isSat ? "text-blue-500" : "text-gray-500"}`}>
                          {WEEKDAYS[dow]}
                        </p>
                        <p className={`text-lg font-bold ${
                          isT ? "bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                            : isSun ? "text-red-500" : isSat ? "text-blue-500" : "text-gray-800"
                        }`}>{d.getDate()}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-[60px_repeat(7,1fr)] relative" style={{ height: HOURS.length * HOUR_HEIGHT }}>
                  <div className="relative">
                    {HOURS.map((h, i) => (
                      <div key={h} className="absolute w-full text-right pr-2 text-xs text-gray-400" style={{ top: i * HOUR_HEIGHT - 8 }}>
                        {`${h}:00`}
                      </div>
                    ))}
                  </div>
                  {days.map((d) => {
                    const dayBookings = getBookingsForDay(d);
                    const isT = isSameDay(d, today);
                    return (
                      <div key={d.toISOString()} className={`relative border-l border-gray-100 ${isT ? "bg-blue-50/30" : ""}`}>
                        {HOURS.map((_, i) => (
                          <div key={i} className="absolute w-full border-t border-gray-100" style={{ top: i * HOUR_HEIGHT }} />
                        ))}
                        {HOURS.map((_, i) => (
                          <div key={`h-${i}`} className="absolute w-full border-t border-gray-50" style={{ top: i * HOUR_HEIGHT + HOUR_HEIGHT / 2 }} />
                        ))}
                        {dayBookings.map((booking) => {
                          const pos = getBookingPosition(booking);
                          return (
                            <button key={booking.id} onClick={() => setSelectedBooking(booking)}
                              className={`absolute left-0.5 right-0.5 rounded px-1 overflow-hidden cursor-pointer hover:opacity-80 transition text-left ${statusColors[booking.status]}`}
                              style={{ top: pos.top, height: pos.height, borderLeftWidth: "3px" }}>
                              <p className="text-[10px] font-bold truncate">{booking.time} {booking.pet?.petName || booking.name}</p>
                              <p className="text-[9px] truncate opacity-75">{booking.consultationType} ・ {booking.name}</p>
                              <p className="text-[9px] truncate opacity-60">{booking.pet?.petSpecies}{booking.pet?.petBreed ? ` / ${booking.pet.petBreed}` : ""}</p>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ─── Month View ─── */}
          {viewMode === "month" && (
            <div>
              <div className="grid grid-cols-7 border-b border-gray-200">
                {["月", "火", "水", "木", "金", "土", "日"].map((d, i) => (
                  <div key={d} className={`p-2 text-center text-xs font-medium ${
                    i === 6 ? "text-red-500" : i === 5 ? "text-blue-500" : "text-gray-500"
                  }`}>{d}</div>
                ))}
              </div>
              {monthWeeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 border-b border-gray-50">
                  {week.map((d, di) => {
                    if (!d) return <div key={di} className="p-1 min-h-[100px] bg-gray-50/50 border-l border-gray-50" />;
                    const dayBookings = getBookingsForDay(d);
                    const isT = isSameDay(d, today);
                    const dow = d.getDay();
                    const isSun = dow === 0;
                    const isSat = dow === 6;
                    return (
                      <div key={di} className={`p-1 min-h-[100px] border-l border-gray-50 ${isT ? "bg-blue-50/50" : ""}`}>
                        <p className={`text-xs font-medium mb-1 ${
                          isT ? "bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            : isSun ? "text-red-500" : isSat ? "text-blue-500" : "text-gray-600"
                        }`}>{d.getDate()}</p>
                        <div className="space-y-0.5">
                          {dayBookings.slice(0, 3).map((booking) => (
                            <button key={booking.id} onClick={() => setSelectedBooking(booking)}
                              className={`w-full text-left px-1 py-0.5 rounded text-[10px] truncate cursor-pointer hover:opacity-80 transition ${statusColors[booking.status]}`}>
                              {booking.time} {booking.pet?.petName || booking.name}
                            </button>
                          ))}
                          {dayBookings.length > 3 && (
                            <p className="text-[10px] text-gray-400 px-1">+{dayBookings.length - 3}件</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {selectedBooking && (
        <EditModal
          booking={selectedBooking}
          onSave={handleSave}
          onClose={() => setSelectedBooking(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
