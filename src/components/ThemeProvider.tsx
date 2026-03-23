"use client";

import { config } from "@/lib/config";

const colorMap: Record<string, { h: number; s: number }> = {
  blue:   { h: 221, s: 83 },
  green:  { h: 160, s: 84 },
  purple: { h: 271, s: 81 },
  pink:   { h: 330, s: 81 },
  orange: { h: 25,  s: 95 },
  teal:   { h: 175, s: 77 },
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const color = colorMap[config.themeColor] || colorMap.blue;

  return (
    <div
      style={{
        ["--theme-h" as string]: color.h,
        ["--theme-s" as string]: `${color.s}%`,
      }}
    >
      {children}
    </div>
  );
}

export function useHospitalName() {
  return {
    name: config.hospitalName,
    subtitle: config.hospitalSubtitle,
  };
}
