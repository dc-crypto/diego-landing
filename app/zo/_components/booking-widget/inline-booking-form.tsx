"use client";

import { useState } from "react";
import { bookingBar } from "../../_lib/content";

/**
 * Visual-only booking form. No availability, pricing, or reservation logic —
 * to be wired to the external booking backend (Flask + PostgreSQL / iCal sync) later.
 */
export function InlineBookingForm() {
  const [guests, setGuests] = useState(2);

  return (
    <div
      id="booking"
      className="relative z-10 mx-auto -mt-16 max-w-[1400px] px-6 md:-mt-20 md:px-12"
    >
      <div className="border border-zo-line/70 bg-zo-card shadow-[0_30px_60px_-25px_rgba(35,32,28,0.35)]">
        <div className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-zo-line/60 px-6 py-4 text-zo-ink-muted md:px-10">
          <span>Book Direct</span>
          <span aria-hidden>·</span>
          <span>Best Rate Guaranteed</span>
          <span aria-hidden>·</span>
          <span>{bookingBar.eyebrow}</span>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]"
        >
          <label className="border-b border-zo-line/60 px-6 py-5 sm:border-r md:px-10">
            <span className="eyebrow block text-zo-ink-muted">Arrive</span>
            <input
              type="date"
              className="mt-2 w-full bg-transparent font-zo-serif text-lg text-zo-ink outline-none [color-scheme:light] accent-zo-brass"
              aria-label="Arrival date"
            />
          </label>

          <label className="border-b border-zo-line/60 px-6 py-5 lg:border-r md:px-10">
            <span className="eyebrow block text-zo-ink-muted">Depart</span>
            <input
              type="date"
              className="mt-2 w-full bg-transparent font-zo-serif text-lg text-zo-ink outline-none [color-scheme:light] accent-zo-brass"
              aria-label="Departure date"
            />
          </label>

          <div className="border-b border-zo-line/60 px-6 py-5 sm:border-r-0 md:px-10 lg:border-r">
            <span className="eyebrow block text-zo-ink-muted">Guests</span>
            <div className="mt-2 flex items-center gap-4 font-zo-serif text-lg text-zo-ink">
              <button
                type="button"
                aria-label="Decrease guests"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="text-zo-ink-muted transition-colors hover:text-zo-ink"
              >
                &minus;
              </button>
              <span className="w-4 text-center">{guests}</span>
              <button
                type="button"
                aria-label="Increase guests"
                onClick={() => setGuests((g) => Math.min(6, g + 1))}
                className="text-zo-ink-muted transition-colors hover:text-zo-ink"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-zo-ink px-8 py-5 text-xs font-medium tracking-[0.18em] text-zo-sand uppercase transition-colors hover:bg-zo-ink/90 md:px-10"
          >
            Check Availability
          </button>
        </form>
      </div>
    </div>
  );
}
