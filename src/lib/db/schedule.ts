import { getServiceClient } from "./supabase";

export type ScheduleRule = {
  id: string;
  day_of_week: number;
  is_open: boolean;
  open_slots: string[] | null;
  created_at: string;
  updated_at: string;
};

export type ScheduleOverride = {
  id: string;
  date: string;
  is_open: boolean;
  open_slots: string[] | null;
  reason: string | null;
  created_at: string;
};

export async function getScheduleRules(): Promise<ScheduleRule[]> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("schedule_rules")
    .select("*")
    .order("day_of_week");
  if (error) throw new Error(error.message);
  return data || [];
}

export async function upsertScheduleRule(
  dayOfWeek: number,
  isOpen: boolean,
  openSlots: string[] | null
) {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("schedule_rules")
    .upsert(
      { day_of_week: dayOfWeek, is_open: isOpen, open_slots: openSlots, updated_at: new Date().toISOString() },
      { onConflict: "day_of_week" }
    )
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function getOverrides(startDate: string, endDate: string): Promise<ScheduleOverride[]> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("schedule_overrides")
    .select("*")
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date");
  if (error) throw new Error(error.message);
  return data || [];
}

export async function upsertOverride(
  date: string,
  isOpen: boolean,
  openSlots: string[] | null,
  reason: string | null
) {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("schedule_overrides")
    .upsert(
      { date, is_open: isOpen, open_slots: openSlots, reason },
      { onConflict: "date" }
    )
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteOverride(id: string) {
  const supabase = getServiceClient();
  const { error } = await supabase
    .from("schedule_overrides")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}
