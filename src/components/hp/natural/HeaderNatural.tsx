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

export default function HeaderNatural() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = getHpTheme("natural");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/hp" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-sm">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3.25a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
            </div>
            <span
              className={`font-medium tracking-wider text-sm transition-colors ${
                scrolled ? "text-stone-800" : "text-white"
              }`}
            >
              {hpConfig.hospitalName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-light tracking-wide transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-emerald-500 after:transition-all hover:after:w-full ${
                  scrolled
                    ? "text-stone-600 hover:text-emerald-700"
                    : "text-white/80 hover:text-white after:bg-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={hpConfig.bookingUrl}
              className={`text-sm font-medium tracking-wide transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:transition-all ${
                scrolled
                  ? "text-emerald-600 hover:text-emerald-700 after:bg-emerald-500"
                  : "text-emerald-200 hover:text-white after:bg-emerald-300"
              }`}
            >
              予約
            </Link>
          </nav>

          {/* Mobile: Phone + Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={`tel:${hpConfig.phone.replace(/-/g, "")}`}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                scrolled
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-white/10 text-white"
              }`}
              aria-label="電話する"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                scrolled
                  ? "text-stone-600 hover:bg-stone-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="メニュー"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-in menu from right */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-stone-900/40"
          onClick={() => setIsOpen(false)}
        />

        {/* Slide panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-stone-100">
            <span className="font-medium text-stone-800 tracking-wider text-sm">
              {hpConfig.hospitalName}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-600"
              aria-label="閉じる"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="p-5 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-stone-600 hover:text-emerald-700 py-3 px-2 border-b border-stone-50 transition-colors text-sm tracking-wide"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href={hpConfig.bookingUrl}
                onClick={() => setIsOpen(false)}
                className="block text-emerald-600 font-medium py-3 px-2 text-sm tracking-wide"
              >
                予約する
              </Link>
            </div>
          </nav>

          <div className="absolute bottom-8 left-5 right-5">
            <p className="text-xs text-stone-400 mb-2">お電話でのご予約</p>
            <a
              href={`tel:${hpConfig.phone.replace(/-/g, "")}`}
              className="text-stone-700 font-medium text-lg tracking-wide"
            >
              {hpConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
