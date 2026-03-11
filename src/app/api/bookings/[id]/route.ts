export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { updateBookingById, getBookingById } from "@/lib/db/bookings";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const booking = await getBookingById(id);
  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(booking);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updates: Record<string, unknown> = {};
  if (body.status) updates.status = body.status;
  if (body.date) updates.date = body.date;
  if (body.time) updates.time = body.time;
  if (body.consultationType) updates.consultation_type = body.consultationType;
  if (body.name) updates.name = body.name;
  if (body.phone) updates.phone = body.phone;
  if (body.email !== undefined) updates.email = body.email;
  if (body.symptoms !== undefined) updates.symptoms = body.symptoms;
  if (body.googleEventId !== undefined) updates.google_event_id = body.googleEventId;
  if (body.pet) {
    updates.pet_name = body.pet.petName;
    updates.pet_name_kana = body.pet.petNameKana;
    updates.pet_species = body.pet.petSpecies;
    updates.pet_breed = body.pet.petBreed;
    updates.pet_sex = body.pet.petSex;
    updates.pet_birth_date = body.pet.petBirthDate;
  }

  const booking = await updateBookingById(id, updates);
  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(booking);
}
