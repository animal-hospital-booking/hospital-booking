"use client";

import { useState } from "react";

export type PetInfo = {
  petName: string;
  petNameKana: string;
  petSpecies: string;
  petBreed: string;
  petSex: string;
  petBirthDate: string;
};

type PetFormProps = {
  onSubmit: (data: PetInfo) => void;
  onBack: () => void;
};

const PET_SPECIES = ["犬", "猫", "うさぎ", "ハムスター", "鳥", "その他"];
const PET_SEX = ["オス", "メス", "不明"];

export default function PetForm({ onSubmit, onBack }: PetFormProps) {
  const [petName, setPetName] = useState("");
  const [petNameKana, setPetNameKana] = useState("");
  const [petSpecies, setPetSpecies] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petSex, setPetSex] = useState("");
  const [petBirthDate, setPetBirthDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!petName.trim()) newErrors.petName = "ペットの名前を入力してください";
    if (!petNameKana.trim())
      newErrors.petNameKana = "フリガナを入力してください";
    if (!petSpecies) newErrors.petSpecies = "飼っているペットを選択してください";
    if (!petSex) newErrors.petSex = "性別を選択してください";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        petName: petName.trim(),
        petNameKana: petNameKana.trim(),
        petSpecies,
        petBreed: petBreed.trim(),
        petSex,
        petBirthDate,
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 text-sm mb-4"
      >
        ← 戻る
      </button>
      <h2 className="text-lg font-bold text-gray-800 mb-4">ペット情報の入力</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ペットの名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="ポチ"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          />
          {errors.petName && (
            <p className="text-red-500 text-xs mt-1">{errors.petName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            フリガナ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={petNameKana}
            onChange={(e) => setPetNameKana(e.target.value)}
            placeholder="ポチ"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          />
          {errors.petNameKana && (
            <p className="text-red-500 text-xs mt-1">{errors.petNameKana}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            飼っているペット <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PET_SPECIES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setPetSpecies(s)}
                className={`py-2 px-3 rounded-lg text-sm font-medium border transition ${
                  petSpecies === s
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {errors.petSpecies && (
            <p className="text-red-500 text-xs mt-1">{errors.petSpecies}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            品種
          </label>
          <input
            type="text"
            value={petBreed}
            onChange={(e) => setPetBreed(e.target.value)}
            placeholder="柴犬、マンチカンなど"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            性別 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PET_SEX.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setPetSex(s)}
                className={`py-2 px-3 rounded-lg text-sm font-medium border transition ${
                  petSex === s
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {errors.petSex && (
            <p className="text-red-500 text-xs mt-1">{errors.petSex}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            生年月日
          </label>
          <input
            type="date"
            value={petBirthDate}
            onChange={(e) => setPetBirthDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
        >
          次へ
        </button>
      </form>
    </div>
  );
}
