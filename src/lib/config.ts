// Hospital branding configuration
// These values are set via environment variables per hospital

export const config = {
  hospitalName: process.env.NEXT_PUBLIC_HOSPITAL_NAME || "クリニック予約",
  hospitalSubtitle: process.env.NEXT_PUBLIC_HOSPITAL_SUBTITLE || "オンライン診療予約システム",
  themeColor: (process.env.NEXT_PUBLIC_THEME_COLOR || "blue") as ThemeColor,
};

export type ThemeColor = "blue" | "green" | "purple" | "pink" | "orange" | "teal";

// Tailwind color mappings per theme
export const themeColors: Record<ThemeColor, {
  primary: string;        // bg-{color}-600
  primaryHover: string;   // hover:bg-{color}-700
  primaryLight: string;   // bg-{color}-50
  primaryLighter: string; // bg-{color}-100
  text: string;           // text-{color}-600
  textDark: string;       // text-{color}-700
  textLight: string;      // text-{color}-500
  border: string;         // border-{color}-600
  borderLight: string;    // border-{color}-300
  ring: string;           // focus:ring-{color}-500
  badge: string;          // bg-{color}-100 text-{color}-700
}> = {
  blue: {
    primary: "bg-blue-600",
    primaryHover: "hover:bg-blue-700",
    primaryLight: "bg-blue-50",
    primaryLighter: "bg-blue-100",
    text: "text-blue-600",
    textDark: "text-blue-700",
    textLight: "text-blue-500",
    border: "border-blue-600",
    borderLight: "border-blue-300",
    ring: "focus:ring-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },
  green: {
    primary: "bg-emerald-600",
    primaryHover: "hover:bg-emerald-700",
    primaryLight: "bg-emerald-50",
    primaryLighter: "bg-emerald-100",
    text: "text-emerald-600",
    textDark: "text-emerald-700",
    textLight: "text-emerald-500",
    border: "border-emerald-600",
    borderLight: "border-emerald-300",
    ring: "focus:ring-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
  purple: {
    primary: "bg-purple-600",
    primaryHover: "hover:bg-purple-700",
    primaryLight: "bg-purple-50",
    primaryLighter: "bg-purple-100",
    text: "text-purple-600",
    textDark: "text-purple-700",
    textLight: "text-purple-500",
    border: "border-purple-600",
    borderLight: "border-purple-300",
    ring: "focus:ring-purple-500",
    badge: "bg-purple-100 text-purple-700",
  },
  pink: {
    primary: "bg-pink-600",
    primaryHover: "hover:bg-pink-700",
    primaryLight: "bg-pink-50",
    primaryLighter: "bg-pink-100",
    text: "text-pink-600",
    textDark: "text-pink-700",
    textLight: "text-pink-500",
    border: "border-pink-600",
    borderLight: "border-pink-300",
    ring: "focus:ring-pink-500",
    badge: "bg-pink-100 text-pink-700",
  },
  orange: {
    primary: "bg-orange-600",
    primaryHover: "hover:bg-orange-700",
    primaryLight: "bg-orange-50",
    primaryLighter: "bg-orange-100",
    text: "text-orange-600",
    textDark: "text-orange-700",
    textLight: "text-orange-500",
    border: "border-orange-600",
    borderLight: "border-orange-300",
    ring: "focus:ring-orange-500",
    badge: "bg-orange-100 text-orange-700",
  },
  teal: {
    primary: "bg-teal-600",
    primaryHover: "hover:bg-teal-700",
    primaryLight: "bg-teal-50",
    primaryLighter: "bg-teal-100",
    text: "text-teal-600",
    textDark: "text-teal-700",
    textLight: "text-teal-500",
    border: "border-teal-600",
    borderLight: "border-teal-300",
    ring: "focus:ring-teal-500",
    badge: "bg-teal-100 text-teal-700",
  },
};

export function getTheme() {
  return themeColors[config.themeColor] || themeColors.blue;
}
