import { NextRequest, NextResponse } from "next/server";
import { getScheduleRules, getOverrides } from "@/lib/db/schedule";
import { getServiceClient } from "@/lib/db/supabase";

export const dynamic = "force-dynamic";

const ALL_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date");
    if (!dateStr) {
      return NextResponse.json({ error: "date is required" }, { status: 400 });
    }

    const date = new Date(dateStr + "T00:00:00");
    const dayOfWeek = date.getDay();

    // Get schedule rules and overrides
    const [rules, overrides] = await Promise.all([
      getScheduleRules(),
      getOverrides(dateStr, dateStr),
    ]);

    // Check override first
    const override = overrides.find((o) => o.date === dateStr);
    let availableSlots: string[];

    if (override) {
      if (!override.is_open) {
        // Closed for the day
        return NextResponse.json([]);
      }
      availableSlots = override.open_slots || ALL_SLOTS;
    } else {
      // Use weekly rule
      const rule = rules.find((r) => r.day_of_week === dayOfWeek);
      if (!rule || !rule.is_open) {
        return NextResponse.json([]);
      }
      availableSlots = rule.open_slots || ALL_SLOTS;
    }

    // Remove already booked times
    const supabase = getServiceClient();
    const { data: bookings } = await supabase
      .from("bookings")
      .select("time")
      .eq("date", dateStr)
      .in("status", ["confirmed"]);

    const bookedTimes = (bookings || []).map((b: { time: string }) => b.time);
    const openSlots = availableSlots.filter((s) => !bookedTimes.includes(s));

    return NextResponse.json(openSlots);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
