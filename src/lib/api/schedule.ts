export type ScheduleRule = {
  id: string;
  day_of_week: number;
  is_open: boolean;
  open_slots: string[] | null;
};

export type ScheduleOverride = {
  id: string;
  date: string;
  is_open: boolean;
  open_slots: string[] | null;
  reason: string | null;
};

export async function fetchScheduleRules(): Promise<ScheduleRule[]> {
  const res = await fetch("/api/schedule");
  if (!res.ok) throw new Error("Failed to fetch schedule rules");
  return res.json();
}

export async function updateScheduleRules(
  rules: { day_of_week: number; is_open: boolean; open_slots: string[] | null }[]
): Promise<void> {
  const res = await fetch("/api/schedule", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rules),
  });
  if (!res.ok) throw new Error("Failed to update schedule rules");
}

export async function fetchOverrides(start: string, end: string): Promise<ScheduleOverride[]> {
  const res = await fetch(`/api/schedule/overrides?start=${start}&end=${end}`);
  if (!res.ok) throw new Error("Failed to fetch overrides");
  return res.json();
}

export async function createOverride(data: {
  date: string;
  is_open: boolean;
  open_slots: string[] | null;
  reason: string | null;
}): Promise<ScheduleOverride> {
  const res = await fetch("/api/schedule/overrides", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create override");
  return res.json();
}

export async function deleteOverrideById(id: string): Promise<void> {
  const res = await fetch("/api/schedule/overrides", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Failed to delete override");
}

export async function fetchAvailableSlots(date: string): Promise<string[]> {
  const res = await fetch(`/api/schedule/available-slots?date=${date}`);
  if (!res.ok) throw new Error("Failed to fetch available slots");
  return res.json();
}
