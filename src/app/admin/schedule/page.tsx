"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  fetchScheduleRules,
  updateScheduleRules,
  fetchOverrides,
  createOverride,
  deleteOverrideById,
  type ScheduleRule,
  type ScheduleOverride,
} from "@/lib/api/schedule";
import { getTheme, config } from "@/lib/config";

const theme = getTheme();

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

const ALL_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
];

type TabMode = "weekly" | "overrides";

function formatDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function ScheduleAdminPage() {
  const [tab, setTab] = useState<TabMode>("weekly");
  const [rules, setRules] = useState<ScheduleRule[]>([]);
  const [overrides, setOverrides] = useState<ScheduleOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Weekly rule editing state
  const [editRules, setEditRules] = useState<
    { day_of_week: number; is_open: boolean; open_slots: string[] }[]
  >([]);

  // Override form state
  const [overrideDate, setOverrideDate] = useState(formatDateStr(new Date()));
  const [overrideIsOpen, setOverrideIsOpen] = useState(false);
  const [overrideSlots, setOverrideSlots] = useState<string[]>([]);
  const [overrideReason, setOverrideReason] = useState("");

  // Override list range
  const [overrideMonth, setOverrideMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const loadRules = useCallback(async () => {
    const data = await fetchScheduleRules();
    setRules(data);
    // Build edit state for all 7 days
    const edit = Array.from({ length: 7 }, (_, i) => {
      const rule = data.find((r) => r.day_of_week === i);
      return {
        day_of_week: i,
        is_open: rule?.is_open ?? false,
        open_slots: rule?.open_slots ?? [...ALL_SLOTS],
      };
    });
    setEditRules(edit);
  }, []);

  const loadOverrides = useCallback(async () => {
    const [year, month] = overrideMonth.split("-").map(Number);
    const start = `${year}-${String(month).padStart(2, "0")}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const end = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
    const data = await fetchOverrides(start, end);
    setOverrides(data);
  }, [overrideMonth]);

  useEffect(() => {
    setLoading(true);
    Promise.all([loadRules(), loadOverrides()]).finally(() => setLoading(false));
  }, [loadRules, loadOverrides]);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // Weekly rules handlers
  const toggleDayOpen = (dayIndex: number) => {
    setEditRules((prev) =>
      prev.map((r) =>
        r.day_of_week === dayIndex ? { ...r, is_open: !r.is_open } : r
      )
    );
  };

  const toggleSlot = (dayIndex: number, slot: string) => {
    setEditRules((prev) =>
      prev.map((r) => {
        if (r.day_of_week !== dayIndex) return r;
        const slots = r.open_slots.includes(slot)
          ? r.open_slots.filter((s) => s !== slot)
          : [...r.open_slots, slot].sort();
        return { ...r, open_slots: slots };
      })
    );
  };

  const selectAllSlots = (dayIndex: number) => {
    setEditRules((prev) =>
      prev.map((r) =>
        r.day_of_week === dayIndex ? { ...r, open_slots: [...ALL_SLOTS] } : r
      )
    );
  };

  const clearAllSlots = (dayIndex: number) => {
    setEditRules((prev) =>
      prev.map((r) =>
        r.day_of_week === dayIndex ? { ...r, open_slots: [] } : r
      )
    );
  };

  const saveRules = async () => {
    setSaving(true);
    try {
      await updateScheduleRules(
        editRules.map((r) => ({
          day_of_week: r.day_of_week,
          is_open: r.is_open,
          open_slots: r.open_slots.length > 0 ? r.open_slots : null,
        }))
      );
      await loadRules();
      showMessage("週間スケジュールを保存しました");
    } catch {
      showMessage("保存に失敗しました");
    }
    setSaving(false);
  };

  // Override handlers
  const toggleOverrideSlot = (slot: string) => {
    setOverrideSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot].sort()
    );
  };

  const handleCreateOverride = async () => {
    setSaving(true);
    try {
      await createOverride({
        date: overrideDate,
        is_open: overrideIsOpen,
        open_slots: overrideIsOpen && overrideSlots.length > 0 ? overrideSlots : null,
        reason: overrideReason || null,
      });
      await loadOverrides();
      setOverrideReason("");
      showMessage("特別日を追加しました");
    } catch {
      showMessage("追加に失敗しました");
    }
    setSaving(false);
  };

  const handleDeleteOverride = async (id: string) => {
    setSaving(true);
    try {
      await deleteOverrideById(id);
      await loadOverrides();
      showMessage("特別日を削除しました");
    } catch {
      showMessage("削除に失敗しました");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className={`text-xl font-bold ${theme.textDark}`}>予約枠の管理</h1>
            <p className="text-sm text-gray-500 mt-1">曜日ごとの診療時間と特別日の設定</p>
          </div>
          <Link
            href="/admin"
            className={`text-sm ${theme.text} hover:opacity-80`}
          >
            ← 予約カレンダーに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Message */}
        {message && (
          <div className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium ${
            message.includes("失敗") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
          }`}>
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-4">
          <button
            onClick={() => setTab("weekly")}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
              tab === "weekly" ? `${theme.primary} text-white` : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            週間スケジュール
          </button>
          <button
            onClick={() => setTab("overrides")}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
              tab === "overrides" ? `${theme.primary} text-white` : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            特別日（臨時休診・臨時診療）
          </button>
        </div>

        {/* Weekly Schedule Tab */}
        {tab === "weekly" && (
          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-gray-500 mb-4">
              曜日ごとに診療の有無と予約可能な時間帯を設定します。
            </p>
            <div className="space-y-4">
              {editRules.map((rule) => (
                <div key={rule.day_of_week} className={`border rounded-lg p-4 ${rule.is_open ? "border-gray-200" : "border-gray-100 bg-gray-50"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-bold ${
                        rule.day_of_week === 0 ? "text-red-500" : rule.day_of_week === 6 ? "text-blue-500" : "text-gray-800"
                      }`}>
                        {WEEKDAYS[rule.day_of_week]}曜日
                      </span>
                      <button
                        onClick={() => toggleDayOpen(rule.day_of_week)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          rule.is_open ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          rule.is_open ? "translate-x-6" : "translate-x-1"
                        }`} />
                      </button>
                      <span className={`text-sm font-medium ${rule.is_open ? "text-green-600" : "text-gray-400"}`}>
                        {rule.is_open ? "診療日" : "休診日"}
                      </span>
                    </div>
                    {rule.is_open && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => selectAllSlots(rule.day_of_week)}
                          className="text-xs px-2 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50"
                        >
                          全選択
                        </button>
                        <button
                          onClick={() => clearAllSlots(rule.day_of_week)}
                          className="text-xs px-2 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50"
                        >
                          全解除
                        </button>
                      </div>
                    )}
                  </div>
                  {rule.is_open && (
                    <div className="flex flex-wrap gap-1.5">
                      {ALL_SLOTS.map((slot) => {
                        const selected = rule.open_slots.includes(slot);
                        return (
                          <button
                            key={slot}
                            onClick={() => toggleSlot(rule.day_of_week, slot)}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition font-medium ${
                              selected
                                ? `${theme.primary} text-white ${theme.border}`
                                : "border-gray-200 text-gray-400 hover:border-gray-300"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={saveRules}
              disabled={saving}
              className={`mt-6 w-full py-3 rounded-lg ${theme.primary} text-white ${theme.primaryHover} transition font-medium disabled:opacity-50`}
            >
              {saving ? "保存中..." : "週間スケジュールを保存"}
            </button>
          </div>
        )}

        {/* Overrides Tab */}
        {tab === "overrides" && (
          <div className="space-y-4">
            {/* Add Override Form */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-3">特別日を追加</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">日付</label>
                    <input
                      type="date"
                      value={overrideDate}
                      onChange={(e) => setOverrideDate(e.target.value)}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 ${theme.ring}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">種別</label>
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => { setOverrideIsOpen(false); setOverrideSlots([]); }}
                        className={`flex-1 py-2 text-xs rounded-lg border transition font-medium ${
                          !overrideIsOpen ? "bg-red-50 border-red-300 text-red-600" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        臨時休診
                      </button>
                      <button
                        onClick={() => { setOverrideIsOpen(true); setOverrideSlots([...ALL_SLOTS]); }}
                        className={`flex-1 py-2 text-xs rounded-lg border transition font-medium ${
                          overrideIsOpen ? "bg-green-50 border-green-300 text-green-600" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        臨時診療
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">理由（任意）</label>
                  <input
                    type="text"
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    placeholder="例: 院長研修のため、祝日振替診療"
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 ${theme.ring}`}
                  />
                </div>

                {overrideIsOpen && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">予約可能な時間帯</label>
                    <div className="flex flex-wrap gap-1.5">
                      {ALL_SLOTS.map((slot) => {
                        const selected = overrideSlots.includes(slot);
                        return (
                          <button
                            key={slot}
                            onClick={() => toggleOverrideSlot(slot)}
                            className={`px-3 py-1.5 text-xs rounded-lg border transition font-medium ${
                              selected
                                ? `${theme.primary} text-white ${theme.border}`
                                : "border-gray-200 text-gray-400 hover:border-gray-300"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleCreateOverride}
                  disabled={saving}
                  className={`w-full py-2 rounded-lg ${theme.primary} text-white ${theme.primaryHover} transition font-medium disabled:opacity-50`}
                >
                  {saving ? "追加中..." : "追加する"}
                </button>
              </div>
            </div>

            {/* Override List */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-800">登録済みの特別日</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const [y, m] = overrideMonth.split("-").map(Number);
                      const prev = m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, "0")}`;
                      setOverrideMonth(prev);
                    }}
                    className="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50"
                  >
                    ◀
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    {overrideMonth.replace("-", "年")}月
                  </span>
                  <button
                    onClick={() => {
                      const [y, m] = overrideMonth.split("-").map(Number);
                      const next = m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, "0")}`;
                      setOverrideMonth(next);
                    }}
                    className="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50"
                  >
                    ▶
                  </button>
                </div>
              </div>

              {overrides.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">この月の特別日はありません</p>
              ) : (
                <div className="space-y-2">
                  {overrides.map((o) => {
                    const d = new Date(o.date + "T00:00:00");
                    return (
                      <div key={o.id} className="flex items-center justify-between border border-gray-100 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            o.is_open ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                          }`}>
                            {o.is_open ? "臨時診療" : "臨時休診"}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {d.getMonth() + 1}月{d.getDate()}日（{WEEKDAYS[d.getDay()]}）
                            </p>
                            {o.reason && (
                              <p className="text-xs text-gray-500">{o.reason}</p>
                            )}
                            {o.is_open && o.open_slots && (
                              <p className="text-xs text-gray-400 mt-0.5">
                                {o.open_slots.join(", ")}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteOverride(o.id)}
                          disabled={saving}
                          className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition font-medium disabled:opacity-50"
                        >
                          削除
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
