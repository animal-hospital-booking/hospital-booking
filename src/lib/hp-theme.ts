// HP Template Theme System
// Switch between Warm / Natural / Modern by env var

export type HpTemplate = "warm" | "natural" | "modern";

export interface HpTheme {
  name: string;
  // Hero
  heroBg: string;
  heroBlob1: string;
  heroBlob2: string;
  heroBlob3: string;
  // Accent
  accent: string;
  accentHover: string;
  accentShadow: string;
  accentLight: string;
  accentLighter: string;
  accentText: string;
  accentTextHover: string;
  accentBorder: string;
  // Logo bg
  logoBg: string;
  // Sections
  sectionAltBg: string;
  sectionWarmBg: string;
  // Stats
  statsBg: string;
  statsText: string;
  statsSubtext: string;
  // CTA
  ctaBg: string;
  ctaSubtext: string;
  ctaBtnBg: string;
  ctaBtnText: string;
  // Tags
  tagBg: string;
  tagText: string;
  // Header scroll
  headerScrollBorder: string;
  // Hours table
  hoursBg: string;
  hoursBorder: string;
  hoursTag: string;
  hoursTagText: string;
  // Icon container
  iconBg: string;
  iconText: string;
  iconBgGradient: string;
  // Number badge
  numberBg: string;
  numberShadow: string;
  // Quote
  quoteColor: string;
  // Star
  starColor: string;
  // Avatar gradient
  avatarFrom: string;
  avatarTo: string;
  avatarText: string;
  // Floating card check
  checkBg: string;
  checkText: string;
  // Line button (always green)
  lineBg: string;
  lineHover: string;
}

const warm: HpTheme = {
  name: "Warm",
  heroBg: "from-amber-50 via-orange-50 to-yellow-50",
  heroBlob1: "bg-amber-200/20",
  heroBlob2: "bg-orange-200/20",
  heroBlob3: "bg-yellow-200/15",
  accent: "bg-amber-600",
  accentHover: "hover:bg-amber-700",
  accentShadow: "shadow-amber-600/25",
  accentLight: "bg-amber-50",
  accentLighter: "bg-amber-100",
  accentText: "text-amber-600",
  accentTextHover: "text-amber-700",
  accentBorder: "border-amber-400",
  logoBg: "from-amber-500 to-orange-500",
  sectionAltBg: "bg-stone-50",
  sectionWarmBg: "bg-amber-50/50",
  statsBg: "from-amber-600 via-amber-500 to-orange-500",
  statsText: "text-amber-100",
  statsSubtext: "text-amber-100/80",
  ctaBg: "from-amber-600 via-amber-500 to-orange-500",
  ctaSubtext: "text-amber-100/80",
  ctaBtnBg: "bg-white",
  ctaBtnText: "text-amber-700",
  tagBg: "bg-amber-50",
  tagText: "text-amber-700",
  headerScrollBorder: "border-stone-100",
  hoursBg: "from-amber-50/80 to-orange-50/50",
  hoursBorder: "border-amber-100/50",
  hoursTag: "bg-amber-100/60",
  hoursTagText: "text-amber-800",
  iconBg: "bg-amber-50",
  iconText: "text-amber-600",
  iconBgGradient: "from-amber-50 to-orange-50",
  numberBg: "bg-amber-600",
  numberShadow: "shadow-amber-600/30",
  quoteColor: "text-amber-100",
  starColor: "text-amber-400",
  avatarFrom: "from-amber-100",
  avatarTo: "to-orange-100",
  avatarText: "text-amber-700",
  checkBg: "bg-emerald-50",
  checkText: "text-emerald-600",
  lineBg: "bg-[#06C755]",
  lineHover: "hover:bg-[#05b34c]",
};

const natural: HpTheme = {
  name: "Natural",
  heroBg: "from-emerald-50 via-green-50 to-teal-50",
  heroBlob1: "bg-emerald-200/20",
  heroBlob2: "bg-green-200/20",
  heroBlob3: "bg-teal-200/15",
  accent: "bg-emerald-600",
  accentHover: "hover:bg-emerald-700",
  accentShadow: "shadow-emerald-600/25",
  accentLight: "bg-emerald-50",
  accentLighter: "bg-emerald-100",
  accentText: "text-emerald-600",
  accentTextHover: "text-emerald-700",
  accentBorder: "border-emerald-400",
  logoBg: "from-emerald-500 to-teal-500",
  sectionAltBg: "bg-stone-50",
  sectionWarmBg: "bg-emerald-50/50",
  statsBg: "from-emerald-700 via-emerald-600 to-teal-500",
  statsText: "text-emerald-100",
  statsSubtext: "text-emerald-100/80",
  ctaBg: "from-emerald-700 via-emerald-600 to-teal-500",
  ctaSubtext: "text-emerald-100/80",
  ctaBtnBg: "bg-white",
  ctaBtnText: "text-emerald-700",
  tagBg: "bg-emerald-50",
  tagText: "text-emerald-700",
  headerScrollBorder: "border-stone-100",
  hoursBg: "from-emerald-50/80 to-teal-50/50",
  hoursBorder: "border-emerald-100/50",
  hoursTag: "bg-emerald-100/60",
  hoursTagText: "text-emerald-800",
  iconBg: "bg-emerald-50",
  iconText: "text-emerald-600",
  iconBgGradient: "from-emerald-50 to-teal-50",
  numberBg: "bg-emerald-600",
  numberShadow: "shadow-emerald-600/30",
  quoteColor: "text-emerald-100",
  starColor: "text-amber-400",
  avatarFrom: "from-emerald-100",
  avatarTo: "to-teal-100",
  avatarText: "text-emerald-700",
  checkBg: "bg-emerald-50",
  checkText: "text-emerald-600",
  lineBg: "bg-[#06C755]",
  lineHover: "hover:bg-[#05b34c]",
};

const modern: HpTheme = {
  name: "Modern",
  heroBg: "from-slate-50 via-blue-50 to-indigo-50",
  heroBlob1: "bg-blue-200/20",
  heroBlob2: "bg-indigo-200/20",
  heroBlob3: "bg-slate-200/15",
  accent: "bg-blue-600",
  accentHover: "hover:bg-blue-700",
  accentShadow: "shadow-blue-600/25",
  accentLight: "bg-blue-50",
  accentLighter: "bg-blue-100",
  accentText: "text-blue-600",
  accentTextHover: "text-blue-700",
  accentBorder: "border-blue-400",
  logoBg: "from-blue-600 to-indigo-600",
  sectionAltBg: "bg-slate-50",
  sectionWarmBg: "bg-blue-50/50",
  statsBg: "from-slate-800 via-slate-700 to-blue-800",
  statsText: "text-blue-200",
  statsSubtext: "text-blue-200/80",
  ctaBg: "from-slate-800 via-slate-700 to-blue-800",
  ctaSubtext: "text-blue-200/80",
  ctaBtnBg: "bg-white",
  ctaBtnText: "text-blue-700",
  tagBg: "bg-blue-50",
  tagText: "text-blue-700",
  headerScrollBorder: "border-slate-100",
  hoursBg: "from-blue-50/80 to-indigo-50/50",
  hoursBorder: "border-blue-100/50",
  hoursTag: "bg-blue-100/60",
  hoursTagText: "text-blue-800",
  iconBg: "bg-blue-50",
  iconText: "text-blue-600",
  iconBgGradient: "from-blue-50 to-indigo-50",
  numberBg: "bg-blue-600",
  numberShadow: "shadow-blue-600/30",
  quoteColor: "text-blue-100",
  starColor: "text-amber-400",
  avatarFrom: "from-blue-100",
  avatarTo: "to-indigo-100",
  avatarText: "text-blue-700",
  checkBg: "bg-blue-50",
  checkText: "text-blue-600",
  lineBg: "bg-[#06C755]",
  lineHover: "hover:bg-[#05b34c]",
};

const themes: Record<HpTemplate, HpTheme> = { warm, natural, modern };

export const currentTemplate: HpTemplate =
  (process.env.NEXT_PUBLIC_HP_TEMPLATE as HpTemplate) || "warm";

export function getHpTheme(template?: HpTemplate): HpTheme {
  return themes[template || currentTemplate] || themes.warm;
}

export { themes };
