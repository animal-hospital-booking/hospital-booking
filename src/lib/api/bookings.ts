import type { PetInfo } from "@/lib/bookings";

export type BookingResponse = {
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

// Convert DB row format to the app's Booking format
export function toBooking(row: BookingResponse) {
  return {
    id: row.id,
    date: row.date,
    time: row.time,
    consultationType: row.consultation_type,
    name: row.name,
    phone: row.phone,
    email: row.email,
    symptoms: row.symptoms,
    pet: {
      petName: row.pet_name,
      petNameKana: row.pet_name_kana,
      petSpecies: row.pet_species,
      petBreed: row.pet_breed,
      petSex: row.pet_sex,
      petBirthDate: row.pet_birth_date,
    } as PetInfo,
    status: row.status,
    googleEventId: row.google_event_id || undefined,
    lineUserId: row.line_user_id || undefined,
    createdAt: row.created_at,
  };
}

export type Booking = ReturnType<typeof toBooking>;

export async function fetchBookings(lineUserId?: string): Promise<Booking[]> {
  const params = lineUserId ? `?lineUserId=${lineUserId}` : "";
  const res = await fetch(`/api/bookings${params}`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  const rows: BookingResponse[] = await res.json();
  return rows.map(toBooking);
}

export async function createBooking(data: {
  date: string;
  time: string;
  consultationType: string;
  name: string;
  phone: string;
  email: string;
  symptoms: string;
  pet: PetInfo;
  googleEventId?: string;
  lineUserId?: string;
}): Promise<Booking> {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create booking");
  const row: BookingResponse = await res.json();
  return toBooking(row);
}

export async function updateBooking(
  id: string,
  updates: Record<string, unknown>
): Promise<Booking> {
  const res = await fetch(`/api/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update booking");
  const row: BookingResponse = await res.json();
  return toBooking(row);
}

export async function updateBookingStatus(
  id: string,
  status: string
): Promise<Booking> {
  return updateBooking(id, { status });
}

export async function fetchBookedTimes(dateStr: string): Promise<string[]> {
  const res = await fetch(`/api/bookings/booked-times?date=${dateStr}`);
  if (!res.ok) throw new Error("Failed to fetch booked times");
  return res.json();
}
