"use client";

import { useState } from "react";
import Link from "next/link";
import ConsultationType from "@/components/ConsultationType";
import WeeklySchedule from "@/components/WeeklySchedule";
import PetForm, { type PetInfo } from "@/components/PetForm";
import PatientForm from "@/components/PatientForm";
import { createBooking } from "@/lib/api/bookings";
import { sendConfirmationEmail } from "@/lib/email";
import { useLiff } from "@/components/LiffProvider";
import { config, getTheme } from "@/lib/config";

type Step = "consultation" | "schedule" | "pet" | "patient" | "confirm" | "done";
const t = getTheme();

export default function Home() {
  const [step, setStep] = useState<Step>("consultation");
  const [consultationType, setConsultationType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);
  const [patientInfo, setPatientInfo] = useState<{
    name: string;
    phone: string;
    email: string;
    symptoms: string;
  } | null>(null);
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { lineUserId } = useLiff();

  const formatDateStr = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const formatDate = (d: Date) => {
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${weekdays[d.getDay()]})`;
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || !consultationType || !petInfo || !patientInfo) return;

    setSending(true);
    const dateStr = formatDateStr(selectedDate);

    await createBooking({
      date: dateStr,
      time: selectedTime,
      consultationType,
      name: patientInfo.name,
      phone: patientInfo.phone,
      email: patientInfo.email,
      symptoms: patientInfo.symptoms,
      pet: petInfo,
      lineUserId: lineUserId || undefined,
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
    setConsultationType(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setPetInfo(null);
    setPatientInfo(null);
    setEmailSent(false);
    setStep("consultation");
  };

  const progressSteps = [
    { key: "consultation", label: "診察" },
    { key: "schedule", label: "日時" },
    { key: "pet", label: "ペット" },
    { key: "patient", label: "飼い主" },
    { key: "confirm", label: "確認" },
  ];

  const stepOrder: Step[] = ["consultation", "schedule", "pet", "patient", "confirm"];
  const currentIndex = stepOrder.indexOf(step === "done" ? "confirm" : step);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className={`text-xl font-bold ${t.textDark}`}>{config.hospitalName}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {config.hospitalSubtitle}
            </p>
          </div>
          <Link
            href="/bookings"
            className={`text-sm ${t.text} hover:opacity-80`}
          >
            予約一覧 →
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {progressSteps.map((s, i) => {
            const isActive = i <= currentIndex;
            return (
              <div key={s.key} className="flex items-center gap-1">
                {i > 0 && (
                  <div
                    className={`w-5 h-0.5 ${isActive ? t.primary : "bg-gray-200"}`}
                  />
                )}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isActive
                        ? `${t.primary} text-white`
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-[10px] mt-1 ${
                      isActive ? t.text : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step 1: Consultation Type */}
        {step === "consultation" && (
          <ConsultationType
            selected={consultationType}
            onSelect={(type) => {
              setConsultationType(type);
              setStep("schedule");
            }}

          />
        )}

        {/* Step 2: Weekly Schedule */}
        {step === "schedule" && (
          <WeeklySchedule
            onSelect={(date, time) => {
              setSelectedDate(date);
              setSelectedTime(time);
              setStep("pet");
            }}
            onBack={() => setStep("consultation")}
          />
        )}

        {/* Step 3: Pet Info */}
        {step === "pet" && (
          <PetForm
            onSubmit={(data) => {
              setPetInfo(data);
              setStep("patient");
            }}
            onBack={() => setStep("schedule")}
          />
        )}

        {/* Step 4: Patient (Owner) Info */}
        {step === "patient" && (
          <PatientForm
            onSubmit={(data) => {
              setPatientInfo(data);
              setStep("confirm");
            }}
            onBack={() => setStep("pet")}
          />
        )}

        {/* Step 5: Confirmation */}
        {step === "confirm" &&
          selectedDate &&
          selectedTime &&
          consultationType &&
          petInfo &&
          patientInfo && (
            <div className={`w-full max-w-3xl mx-auto ${t.primaryLight} rounded-xl p-6`}>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                予約内容の確認
              </h3>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400 mb-2">予約情報</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">診察内容</span>
                      <span className="font-medium text-gray-800">{consultationType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">日付</span>
                      <span className="font-medium text-gray-800">{formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">時間</span>
                      <span className="font-medium text-gray-800">{selectedTime}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <p className="text-xs font-semibold text-gray-400 mb-2">ペット情報</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">名前</span>
                      <span className="font-medium text-gray-800">{petInfo.petName}（{petInfo.petNameKana}）</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">種類</span>
                      <span className="font-medium text-gray-800">{petInfo.petSpecies}{petInfo.petBreed ? ` / ${petInfo.petBreed}` : ""}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">性別</span>
                      <span className="font-medium text-gray-800">{petInfo.petSex}</span>
                    </div>
                    {petInfo.petBirthDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">生年月日</span>
                        <span className="font-medium text-gray-800">{petInfo.petBirthDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div>
                  <p className="text-xs font-semibold text-gray-400 mb-2">飼い主情報</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">お名前</span>
                      <span className="font-medium text-gray-800">{patientInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">電話番号</span>
                      <span className="font-medium text-gray-800">{patientInfo.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">メール</span>
                      <span className="font-medium text-gray-800">{patientInfo.email}</span>
                    </div>
                    {patientInfo.symptoms && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">症状</span>
                        <span className="font-medium text-gray-800">{patientInfo.symptoms}</span>
                      </div>
                    )}
                  </div>
                </div>
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
                  className={`flex-1 py-2 rounded-lg ${t.primary} text-white ${t.primaryHover} transition font-medium disabled:opacity-50`}
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
                className={`py-2 px-6 rounded-lg ${t.primary} text-white ${t.primaryHover} transition font-medium`}
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
