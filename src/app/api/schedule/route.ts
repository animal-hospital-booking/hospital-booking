import { NextRequest, NextResponse } from "next/server";
import { getScheduleRules, upsertScheduleRule } from "@/lib/db/schedule";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rules = await getScheduleRules();
    return NextResponse.json(rules);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const rules: { day_of_week: number; is_open: boolean; open_slots: string[] | null }[] = await req.json();
    const results = await Promise.all(
      rules.map((r) => upsertScheduleRule(r.day_of_week, r.is_open, r.open_slots))
    );
    return NextResponse.json(results);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
