"use client";

import { useState } from "react";
import Link from "next/link";
import Calendar from "@/components/Calendar";
import TimeSlots from "@/components/TimeSlots";
import PatientForm from "@/components/PatientForm";
import { addBooking, getBookedTimes } from "@/lib/bookings";
import { sendConfirmationEmail } from "@/lib/email";

type Step = "date" | "time" | "patient" | "confirm" | "done";

export default function Home() {
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState<{
    name: string;
    phone: string;
    email: string;
    symptoms: string;
  } | null>(null);
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const formatDateStr = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const formatDate = (d: Date) => {
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${weekdays[d.getDay()]})`;
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setStep("time");
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setStep("patient");
  };

  const handlePatientSubmit = (data: {
    name: string;
    phone: string;
    email: string;
    symptoms: string;
  }) => {
    setPatientInfo(data);
    setStep("confirm");
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || !patientInfo) return;

    setSending(true);
    const dateStr = formatDateStr(selectedDate);

    addBooking({
      date: dateStr,
      time: selectedTime,
      name: patientInfo.name,
      phone: patientInfo.phone,
      email: patientInfo.email,
      symptoms: patientInfo.symptoms,
    });

    const sent = await sendConfirmationEmail({
      to_email: patientInfo.email,
      patient_name: patientInfo.name,
      booking_date: formatDate(selectedDate),
      booking_time: selectedTime,
      symptoms: patientInfo.symptoms || "なし",
    });

    setEmailSent(sent);
    setSending(false);
    setStep("done");
  };

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setPatientInfo(null);
    setEmailSent(false);
    setStep("date");
  };

  const bookedTimes = selectedDate
    ? getBookedTimes(formatDateStr(selectedDate))
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-blue-700">クリニック予約</h1>
            <p className="text-sm text-gray-500 mt-1">
              オンライン診療予約システム
            </p>
          </div>
          <Link
            href="/bookings"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            予約一覧 →
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { key: "date", label: "日付" },
            { key: "time", label: "時間" },
            { key: "patient", label: "情報入力" },
            { key: "confirm", label: "確認" },
          ].map((s, i) => {
            const steps: Step[] = ["date", "time", "patient", "confirm"];
            const currentIndex = steps.indexOf(
              step === "done" ? "confirm" : step
            );
            const isActive = i <= currentIndex;
            return (
              <div key={s.key} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className={`w-6 h-0.5 ${isActive ? "bg-blue-500" : "bg-gray-200"}`}
                  />
                )}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-xs mt-1 ${
                      isActive ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Date Selection */}
        {step === "date" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              診察日を選択してください
            </h2>
            <Calendar
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
            <p className="text-xs text-gray-400 mt-4 text-center">
              ※ 日曜日は休診日です
            </p>
          </div>
        )}

        {/* Time Selection */}
        {step === "time" && selectedDate && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <button
              onClick={() => setStep("date")}
              className="text-blue-600 hover:text-blue-800 text-sm mb-4"
            >
              ← 戻る
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              時間を選択してください
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {formatDate(selectedDate)}
            </p>
            <TimeSlots
              selectedTime={selectedTime}
              bookedTimes={bookedTimes}
              onSelectTime={handleSelectTime}
            />
          </div>
        )}

        {/* Patient Info */}
        {step === "patient" && (
          <PatientForm
            onSubmit={handlePatientSubmit}
            onBack={() => setStep("time")}
          />
        )}

        {/* Confirmation */}
        {step === "confirm" &&
          selectedDate &&
          selectedTime &&
          patientInfo && (
            <div className="w-full max-w-md mx-auto bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                予約内容の確認
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">日付</span>
                  <span className="font-medium text-gray-800">
                    {formatDate(selectedDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">時間</span>
                  <span className="font-medium text-gray-800">
                    {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">お名前</span>
                  <span className="font-medium text-gray-800">
                    {patientInfo.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">電話番号</span>
                  <span className="font-medium text-gray-800">
                    {patientInfo.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">メール</span>
                  <span className="font-medium text-gray-800">
                    {patientInfo.email}
                  </span>
                </div>
                {patientInfo.symptoms && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">症状</span>
                    <span className="font-medium text-gray-800">
                      {patientInfo.symptoms}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("patient")}
                  disabled={sending}
                  className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition font-medium disabled:opacity-50"
                >
                  戻る
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={sending}
                  className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium disabled:opacity-50"
                >
                  {sending ? "送信中..." : "予約を確定する"}
                </button>
              </div>
            </div>
          )}

        {/* Done */}
        {step === "done" && selectedDate && selectedTime && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              予約が完了しました
            </h2>
            <p className="text-gray-500 mb-2">
              {formatDate(selectedDate)} {selectedTime}
            </p>
            {emailSent ? (
              <p className="text-sm text-green-600 mb-6">
                確認メールを {patientInfo?.email} に送信しました
              </p>
            ) : (
              <p className="text-sm text-gray-400 mb-6">
                ご来院をお待ちしております
              </p>
            )}
            <div className="flex gap-3 justify-center">
              <Link
                href="/bookings"
                className="py-2 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
              >
                予約一覧を見る
              </Link>
              <button
                onClick={handleReset}
                className="py-2 px-6 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition font-medium"
              >
                新規予約
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
