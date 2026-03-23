import type { Metadata } from "next";
import { hpConfig } from "@/lib/hp-config";
import Header from "@/components/hp/Header";
import Footer from "@/components/hp/Footer";

export const metadata: Metadata = {
  title: {
    default: hpConfig.hospitalName,
    template: `%s | ${hpConfig.hospitalName}`,
  },
  description: hpConfig.description,
};

export default function HpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
