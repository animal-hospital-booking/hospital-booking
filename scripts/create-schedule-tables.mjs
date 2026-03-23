import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Since we can't run raw SQL via Supabase JS client,
// we create tables by attempting to insert/select and using the dashboard.
// Instead, we'll create an API endpoint to set up the tables.

// For now, test if tables exist
const { data, error } = await supabase.from("schedule_rules").select("*").limit(1);
if (error && error.code === "42P01") {
  console.log("Tables don't exist yet. Please create them via Supabase Dashboard SQL Editor:");
  console.log(`
CREATE TABLE schedule_rules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week integer NOT NULL UNIQUE CHECK (day_of_week >= 0 AND day_of_week <= 6),
  is_open boolean NOT NULL DEFAULT true,
  open_slots text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE schedule_overrides (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL UNIQUE,
  is_open boolean NOT NULL DEFAULT false,
  open_slots text[],
  reason text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE schedule_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for service role" ON schedule_rules FOR ALL USING (true);
CREATE POLICY "Allow all for service role" ON schedule_overrides FOR ALL USING (true);
CREATE POLICY "Allow read for anon" ON schedule_rules FOR SELECT USING (true);
CREATE POLICY "Allow read for anon" ON schedule_overrides FOR SELECT USING (true);

INSERT INTO schedule_rules (day_of_week, is_open) VALUES
  (0, false), (1, true), (2, true), (3, true), (4, true), (5, true), (6, true);
  `);
} else if (error) {
  console.log("Error:", error.message);
} else {
  console.log("Tables already exist. Rules:", data);
}
