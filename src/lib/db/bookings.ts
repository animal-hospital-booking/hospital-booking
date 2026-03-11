import { getServiceClient } from "./supabase";

export type BookingRow = {
  id: string;
  date: string;
  time: string;
  consultation_type: string;
  name: string;
  phone: string;
  email: string;
  symptoms: string;
  pet_name: string;
  pet_name_kana: string;
  pet_species: string;
  pet_breed: string;
  pet_sex: string;
  pet_birth_date: string;
  status: "confirmed" | "cancelled" | "completed" | "no_show";
  google_event_id: string | null;
  line_user_id: string | null;
  created_at: string;
};

export type BookingInsert = Omit<BookingRow, "id" | "created_at">;

export async function getAllBookings(): Promise<BookingRow[]> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getBookingById(id: string): Promise<BookingRow | null> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function createBooking(booking: BookingInsert): Promise<BookingRow> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("bookings")
    .insert(booking)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateBookingById(
  id: string,
  updates: Partial<BookingRow>
): Promise<BookingRow | null> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("bookings")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getBookedTimesForDate(dateStr: string): Promise<string[]> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("time")
    .eq("date", dateStr)
    .eq("status", "confirmed");
  if (error) throw error;
  return (data ?? []).map((row) => row.time);
}

export async function getBookingsByLineUser(lineUserId: string): Promise<BookingRow[]> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("line_user_id", lineUserId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
