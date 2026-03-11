export type PetInfo = {
  petName: string;
  petNameKana: string;
  petSpecies: string;
  petBreed: string;
  petSex: string;
  petBirthDate: string;
};

export type Booking = {
  id: string;
  date: string;
  time: string;
  consultationType: string;
  name: string;
  phone: string;
  email: string;
  symptoms: string;
  pet: PetInfo;
  status: "confirmed" | "cancelled" | "completed";
  googleEventId?: string;
  createdAt: string;
};

const STORAGE_KEY = "hospital-bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addBooking(
  booking: Omit<Booking, "id" | "status" | "createdAt">
): Booking {
  const bookings = getBookings();
  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return newBooking;
}

export function updateBookingStatus(
  id: string,
  status: Booking["status"]
): void {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    bookings[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
}

export function updateBooking(
  id: string,
  updates: Partial<Omit<Booking, "id" | "createdAt">>
): void {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
}

export function getBookedTimes(dateStr: string): string[] {
  const bookings = getBookings();
  return bookings
    .filter((b) => b.date === dateStr && b.status === "confirmed")
    .map((b) => b.time);
}
