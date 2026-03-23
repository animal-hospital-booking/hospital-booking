"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { hpConfig } from "@/lib/hp-config";
import { getHpTheme } from "@/lib/hp-theme";

const navItems = [
  { label: "ホーム", href: "/hp" },
  { label: "病院紹介", href: "/hp/about" },
  { label: "診療案内", href: "/hp/services" },
  { label: "アクセス", href: "/hp/access" },
  { label: "お知らせ", href: "/hp/news" },
];

export default function HeaderModern() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = getHpTheme("modern");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-slate-900 ${
        scrolled ? "shadow-lg shadow-slate-900/50" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - simple bold text */}
        <Link href="/hp" className="flex items-center group">
          <span className="font-bold text-white text-lg tracking-tight">
            {hpConfig.hospitalName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm text-slate-300 hover:text-white px-3 py-2 transition-colors group"
            >
              {item.label}
              <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
          <Link
            href={hpConfig.bookingUrl}
            className="ml-3 border border-white/60 hover:border-white text-white text-sm font-medium px-5 py-2 rounded-sm transition-all hover:bg-white/10"
          >
            Web
          </Link>
        </nav>

        {/* Mobile: Phone + Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${hpConfig.phone.replace(/-/g, "")}`}
            className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white"
            aria-label="電話する"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            aria-label="メニュー"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav - dark backdrop */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-slate-800 border-t border-slate-700 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-slate-300 hover:text-white hover:bg-slate-700 py-2.5 px-3 rounded-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href={hpConfig.bookingUrl}
              onClick={() => setIsOpen(false)}
              className="block border border-white/60 text-white text-center font-medium px-5 py-3 rounded-sm"
            >
              Web
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
