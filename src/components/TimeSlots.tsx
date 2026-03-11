"use client";

type TimeSlotsProps = {
  selectedTime: string | null;
  bookedTimes: string[];
  onSelectTime: (time: string) => void;
};

const MORNING_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
const AFTERNOON_SLOTS = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

function SlotButton({
  time,
  selected,
  booked,
  onSelect,
}: {
  time: string;
  selected: boolean;
  booked: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      disabled={booked}
      onClick={onSelect}
      className={`
        py-2 px-3 rounded-lg text-sm font-medium border transition
        ${booked
          ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through"
          : selected
            ? "bg-blue-600 text-white border-blue-600"
            : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
        }
      `}
    >
      {time}
      {booked && <span className="block text-xs no-underline">予約済</span>}
    </button>
  );
}

export default function TimeSlots({ selectedTime, bookedTimes, onSelectTime }: TimeSlotsProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">午前</h3>
        <div className="grid grid-cols-3 gap-2">
          {MORNING_SLOTS.map((time) => (
            <SlotButton
              key={time}
              time={time}
              selected={selectedTime === time}
              booked={bookedTimes.includes(time)}
              onSelect={() => onSelectTime(time)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">午後</h3>
        <div className="grid grid-cols-3 gap-2">
          {AFTERNOON_SLOTS.map((time) => (
            <SlotButton
              key={time}
              time={time}
              selected={selectedTime === time}
              booked={bookedTimes.includes(time)}
              onSelect={() => onSelectTime(time)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
