"use client";

import { useEffect, useState } from "react";
import { nav } from "../_lib/content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [scrolled]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled || menuOpen
          ? "border-b border-zo-line/60 bg-zo-sand/85 py-3 backdrop-blur-md"
          : "border-b border-transparent py-7"
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-start gap-6 px-6 sm:justify-between sm:gap-0 md:px-12">
        <a
          href="#top"
          className={`font-zo-serif leading-none transition-colors duration-700 ${
            scrolled || menuOpen ? "text-zo-ink" : "text-zo-sand"
          }`}
        >
          <span className="block text-[13.5px] tracking-[0.22em] sm:text-lg">ZENSATIONAL</span>
          <span className="block text-xs tracking-[0.5em] opacity-70 sm:text-[0.6rem]">
            OASIS
          </span>
        </a>

        <nav className="hidden items-center gap-7 min-[1400px]:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`link-underline eyebrow font-light transition-colors duration-700 ${
                scrolled ? "text-zo-ink/85 hover:text-zo-ink" : "text-zo-sand/85 hover:text-zo-sand"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a
            href="#booking"
            className={`inline-block border px-3 py-2.5 text-[0.65rem] font-medium tracking-[0.1em] whitespace-nowrap uppercase transition-colors duration-700 sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.18em] ${
              scrolled || menuOpen
                ? "border-zo-ink bg-zo-ink text-zo-sand hover:bg-zo-ink/85"
                : "border-zo-sand bg-zo-sand text-zo-ink hover:bg-zo-sand/85"
            }`}
          >
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book Direct</span>
          </a>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="min-[1400px]:hidden"
          >
            <span
              className={`block h-px w-7 transition-all duration-300 ${
                scrolled || menuOpen ? "bg-zo-ink" : "bg-zo-sand"
              } ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`mt-[6px] block h-px w-7 transition-all duration-300 ${
                scrolled || menuOpen ? "bg-zo-ink" : "bg-zo-sand"
              } ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden bg-zo-sand transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] min-[1400px]:hidden ${
          menuOpen ? "max-h-[32rem] border-b border-zo-line/60" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-6 md:px-12">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-zo-line/40 py-3 font-zo-serif text-2xl text-zo-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
