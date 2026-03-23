import Hero from "@/components/hp/Hero";
import FeaturesDetail from "@/components/hp/FeaturesDetail";
import Hours from "@/components/hp/Hours";
import Stats from "@/components/hp/Stats";
import Features from "@/components/hp/Features";
import Gallery from "@/components/hp/Gallery";
import Testimonials from "@/components/hp/Testimonials";
import NewsPreview from "@/components/hp/NewsPreview";
import Cta from "@/components/hp/Cta";

export default function HpTopPage() {
  return (
    <>
      <Hero />
      <FeaturesDetail />
      <Stats />
      <Hours />
      <Features />
      <Gallery />
      <Testimonials />
      <NewsPreview />
      <Cta />
    </>
  );
}
