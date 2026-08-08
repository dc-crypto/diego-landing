"use client";

import { useEffect, useState } from "react";
import { bookingBar } from "../../_lib/content";

/**
 * Persistent call-to-action bar. Hides while the inline booking form or the
 * contact/footer area is on screen, so it never competes with them.
 */
export function FloatingBookingBar() {
  const [suppressed, setSuppressed] = useState(true);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const targets = ["booking", "contact", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        });
        setSuppressed(intersecting.size > 0);
      },
      { threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));

    const onScroll = () => setPastHero(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const visible = pastHero && !suppressed;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-zo-line/60 bg-zo-card/95 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 md:px-12">
        <div>
          <p className="eyebrow text-zo-ink-muted">{bookingBar.eyebrow}</p>
          <p className="font-zo-serif text-lg text-zo-ink">{bookingBar.heading}</p>
        </div>
        <a
          href="#booking"
          className="shrink-0 bg-zo-ink px-6 py-3 text-xs font-medium tracking-[0.18em] text-zo-sand uppercase transition-colors hover:bg-zo-ink/90 sm:px-8"
        >
          {bookingBar.cta}
        </a>
      </div>
    </div>
  );
}
