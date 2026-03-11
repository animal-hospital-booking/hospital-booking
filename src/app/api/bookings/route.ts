export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getAllBookings, createBooking, getBookingsByLineUser } from "@/lib/db/bookings";
import { sendLineBookingConfirmation } from "@/lib/line";

export async function GET(request: NextRequest) {
  const lineUserId = request.nextUrl.searchParams.get("lineUserId");

  const bookings = lineUserId
    ? await getBookingsByLineUser(lineUserId)
    : await getAllBookings();

  return NextResponse.json(bookings);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const booking = await createBooking({
    date: body.date,
    time: body.time,
    consultation_type: body.consultationType,
    name: body.name,
    phone: body.phone,
    email: body.email,
    symptoms: body.symptoms || "",
    pet_name: body.pet.petName,
    pet_name_kana: body.pet.petNameKana,
    pet_species: body.pet.petSpecies,
    pet_breed: body.pet.petBreed || "",
    pet_sex: body.pet.petSex,
    pet_birth_date: body.pet.petBirthDate || "",
    status: "confirmed",
    google_event_id: body.googleEventId || null,
    line_user_id: body.lineUserId || null,
  });

  // Send LINE confirmation if user has LINE ID
  if (booking.line_user_id) {
    try {
      await sendLineBookingConfirmation(booking);
    } catch (e) {
      console.error("LINE notification failed:", e);
    }
  }

  return NextResponse.json(booking, { status: 201 });
}
