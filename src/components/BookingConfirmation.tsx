"use client";

type BookingConfirmationProps = {
  date: Date;
  time: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function BookingConfirmation({
  date,
  time,
  onConfirm,
  onCancel,
}: BookingConfirmationProps) {
  const formatDate = (d: Date) => {
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${weekdays[d.getDay()]})`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-blue-50 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">予約内容の確認</h3>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-500">日付</span>
          <span className="font-medium text-gray-800">{formatDate(date)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">時間</span>
          <span className="font-medium text-gray-800">{time}</span>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition font-medium"
        >
          戻る
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
        >
          予約を確定する
        </button>
      </div>
    </div>
  );
}
