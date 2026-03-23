"use client";

import { getTheme } from "@/lib/config";

const theme = getTheme();

type ConsultationTypeProps = {
  selected: string | null;
  onSelect: (type: string) => void;
  onBack?: () => void;
};

const TYPES = [
  { key: "初診", description: "初めてのご来院" },
  { key: "再診", description: "2回目以降のご来院" },
  { key: "狂犬病", description: "狂犬病予防接種" },
  { key: "相談", description: "ご相談・カウンセリング" },
];

export default function ConsultationType({
  selected,
  onSelect,
  onBack,
}: ConsultationTypeProps) {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
      {onBack && (
        <button
          onClick={onBack}
          className={`${theme.text} hover:opacity-80 text-sm mb-4`}
        >
          ← 戻る
        </button>
      )}
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        診察内容を選択してください
      </h2>
      <div className="space-y-3">
        {TYPES.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`w-full text-left p-4 rounded-lg border transition ${
              selected === item.key
                ? `${theme.borderLight} ${theme.primaryLight} ring-2 ring-offset-0`
                : `border-gray-200 hover:${theme.primaryLight}`
            }`}
          >
            <p className="font-medium text-gray-800">{item.key}</p>
            <p className="text-sm text-gray-500">{item.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
