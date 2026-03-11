export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getBookedTimesForDate } from "@/lib/db/bookings";

export async function GET(request: NextRequest) {
  const dateStr = request.nextUrl.searchParams.get("date");
  if (!dateStr) {
    return NextResponse.json({ error: "date parameter required" }, { status: 400 });
  }
  const times = await getBookedTimesForDate(dateStr);
  return NextResponse.json(times);
}
