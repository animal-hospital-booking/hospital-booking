"use client";

type ConsultationTypeProps = {
  selected: string | null;
  onSelect: (type: string) => void;
  onBack: () => void;
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
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 text-sm mb-4"
      >
        ← 戻る
      </button>
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        診察内容を選択してください
      </h2>
      <div className="space-y-3">
        {TYPES.map((t) => (
          <button
            key={t.key}
            onClick={() => onSelect(t.key)}
            className={`w-full text-left p-4 rounded-lg border transition ${
              selected === t.key
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            }`}
          >
            <p className="font-medium text-gray-800">{t.key}</p>
            <p className="text-sm text-gray-500">{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
