import type { Metadata } from "next";
import Link from "next/link";
import { themes, HpTemplate } from "@/lib/hp-theme";
import { notFound } from "next/navigation";

// Warm (existing)
import Hero from "@/components/hp/Hero";
import FeaturesDetail from "@/components/hp/FeaturesDetail";
import Stats from "@/components/hp/Stats";
import Hours from "@/components/hp/Hours";
import Features from "@/components/hp/Features";
import Gallery from "@/components/hp/Gallery";
import Testimonials from "@/components/hp/Testimonials";
import NewsPreview from "@/components/hp/NewsPreview";
import Cta from "@/components/hp/Cta";
import Header from "@/components/hp/Header";
import Footer from "@/components/hp/Footer";

// Natural
import HeroNatural from "@/components/hp/natural/HeroNatural";
import FeaturesNatural from "@/components/hp/natural/FeaturesNatural";
import FeaturesDetailNatural from "@/components/hp/natural/FeaturesDetailNatural";
import StatsNatural from "@/components/hp/natural/StatsNatural";
import HoursNatural from "@/components/hp/natural/HoursNatural";
import GalleryNatural from "@/components/hp/natural/GalleryNatural";
import TestimonialsNatural from "@/components/hp/natural/TestimonialsNatural";
import NewsPreviewNatural from "@/components/hp/natural/NewsPreviewNatural";
import CtaNatural from "@/components/hp/natural/CtaNatural";
import HeaderNatural from "@/components/hp/natural/HeaderNatural";
import FooterNatural from "@/components/hp/natural/FooterNatural";

// Modern
import HeroModern from "@/components/hp/modern/HeroModern";
import FeaturesModern from "@/components/hp/modern/FeaturesModern";
import FeaturesDetailModern from "@/components/hp/modern/FeaturesDetailModern";
import StatsModern from "@/components/hp/modern/StatsModern";
import HoursModern from "@/components/hp/modern/HoursModern";
import GalleryModern from "@/components/hp/modern/GalleryModern";
import TestimonialsModern from "@/components/hp/modern/TestimonialsModern";
import NewsPreviewModern from "@/components/hp/modern/NewsPreviewModern";
import CtaModern from "@/components/hp/modern/CtaModern";
import HeaderModern from "@/components/hp/modern/HeaderModern";
import FooterModern from "@/components/hp/modern/FooterModern";

const validTemplates = ["warm", "natural", "modern"] as const;

type Params = { template: string };

export function generateStaticParams() {
  return validTemplates.map((template) => ({ template }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { template } = await params;
  const theme = themes[template as HpTemplate];
  if (!theme) return {};
  return {
    title: `${theme.name} テンプレート プレビュー`,
    description: `${theme.name} テンプレートの全画面プレビュー`,
  };
}

function WarmTemplate() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturesDetail />
        <Stats />
        <Hours />
        <Features />
        <Gallery />
        <Testimonials />
        <NewsPreview />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

function NaturalTemplate() {
  return (
    <>
      <HeaderNatural />
      <main className="flex-1">
        <HeroNatural />
        <FeaturesDetailNatural />
        <StatsNatural />
        <HoursNatural />
        <FeaturesNatural />
        <GalleryNatural />
        <TestimonialsNatural />
        <NewsPreviewNatural />
        <CtaNatural />
      </main>
      <FooterNatural />
    </>
  );
}

function ModernTemplate() {
  return (
    <>
      <HeaderModern />
      <main className="flex-1">
        <HeroModern />
        <FeaturesDetailModern />
        <StatsModern />
        <HoursModern />
        <FeaturesModern />
        <GalleryModern />
        <TestimonialsModern />
        <NewsPreviewModern />
        <CtaModern />
      </main>
      <FooterModern />
    </>
  );
}

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { template } = await params;

  if (!validTemplates.includes(template as HpTemplate)) {
    notFound();
  }

  const key = template as HpTemplate;
  const theme = themes[key];

  const colorMap: Record<HpTemplate, string> = {
    warm: "#d97706",
    natural: "#059669",
    modern: "#2563eb",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky template switcher bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/hp/preview"
              className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              一覧に戻る
            </Link>
            <span className="text-stone-300">|</span>
            <span className="text-sm font-semibold text-stone-800">{theme.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {validTemplates.map((t) => (
              <Link
                key={t}
                href={`/hp/preview/${t}`}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                  t === key
                    ? "text-white"
                    : "text-stone-500 bg-stone-100 hover:bg-stone-200"
                }`}
                style={t === key ? { backgroundColor: colorMap[t] } : undefined}
              >
                {themes[t].name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Template content */}
      <div className="pt-12">
        {key === "warm" && <WarmTemplate />}
        {key === "natural" && <NaturalTemplate />}
        {key === "modern" && <ModernTemplate />}
      </div>
    </div>
  );
}
