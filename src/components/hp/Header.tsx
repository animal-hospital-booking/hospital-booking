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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = getHpTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? `bg-white/90 backdrop-blur-lg shadow-sm border-b ${theme.headerScrollBorder}`
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link href="/hp" className="flex items-center gap-2.5 group">
          <div className={`w-9 h-9 bg-gradient-to-br ${theme.logoBg} rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3.25a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
            </svg>
          </div>
          <span className="font-bold text-stone-800 text-base leading-tight">
            {hpConfig.hospitalName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm text-stone-600 ${theme.accentTextHover} px-3 py-2 rounded-lg ${theme.accentLight.replace("bg-", "hover:bg-")} transition-all`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={hpConfig.bookingUrl}
            className={`ml-2 ${theme.accent} ${theme.accentHover} text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all shadow-sm ${theme.accentShadow} hover:shadow-md hover:-translate-y-px`}
          >
            Web予約
          </Link>
        </nav>

        {/* Mobile: Phone + Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${hpConfig.phone.replace(/-/g, "")}`}
            className={`w-10 h-10 ${theme.accentLight} rounded-full flex items-center justify-center ${theme.accentText}`}
            aria-label="電話する"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
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

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-white/95 backdrop-blur-lg border-t border-stone-100 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block text-stone-600 ${theme.accentTextHover} ${theme.accentLight.replace("bg-", "hover:bg-")} py-2.5 px-3 rounded-lg transition-colors`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href={hpConfig.bookingUrl}
              onClick={() => setIsOpen(false)}
              className={`block ${theme.accent} text-white text-center font-medium px-5 py-3 rounded-full shadow-sm`}
            >
              Web予約はこちら
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
