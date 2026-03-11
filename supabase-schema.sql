-- Hospital Booking System - Supabase Schema
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  consultation_type TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  symptoms TEXT DEFAULT '',
  pet_name TEXT NOT NULL DEFAULT '',
  pet_name_kana TEXT NOT NULL DEFAULT '',
  pet_species TEXT NOT NULL DEFAULT '',
  pet_breed TEXT DEFAULT '',
  pet_sex TEXT NOT NULL DEFAULT '',
  pet_birth_date TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'confirmed',
  google_event_id TEXT,
  line_user_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_line_user ON bookings(line_user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
