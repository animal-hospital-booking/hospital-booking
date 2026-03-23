import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: "public" } }
  );

  // Use Supabase's SQL via the postgres connection
  // Since we can't run DDL via the JS client, we'll use a workaround:
  // Create a temporary function that creates our tables
  const { error: fnError } = await supabase.rpc("exec_ddl", {
    sql: `
      CREATE TABLE IF NOT EXISTS schedule_rules (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        day_of_week integer NOT NULL UNIQUE CHECK (day_of_week >= 0 AND day_of_week <= 6),
        is_open boolean NOT NULL DEFAULT true,
        open_slots text[],
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS schedule_overrides (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        date date NOT NULL UNIQUE,
        is_open boolean NOT NULL DEFAULT false,
        open_slots text[],
        reason text,
        created_at timestamptz DEFAULT now()
      );
    `,
  });

  if (fnError) {
    return NextResponse.json({ error: fnError.message, hint: "Run SQL manually in Supabase Dashboard" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
