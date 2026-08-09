"use client";

import { useEffect, useRef, useState } from "react";

type DatePickerProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}-${date.getFullYear()}`;
}

function buildCells(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { date: Date; currentMonth: boolean }[] = [];

  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), currentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), currentMonth: true });
  }
  while (cells.length < 42) {
    const last = cells[cells.length - 1].date;
    cells.push({
      date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
      currentMonth: false,
    });
  }

  return cells;
}

export function DatePicker({ value, onChange, minDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const cells = buildCells(viewDate);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-2 block w-full text-left font-zo-serif text-lg text-zo-ink"
      >
        {value ? formatDate(value) : "Select date"}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-3 w-72 border border-zo-line bg-zo-card p-4 shadow-[0_20px_45px_-20px_rgba(35,32,28,0.35)]">
          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() =>
                setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
              }
              className="px-1 text-zo-ink-muted transition-colors hover:text-zo-ink"
            >
              &#8249;
            </button>
            <span className="font-zo-serif text-base text-zo-ink">
              {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button
              type="button"
              aria-label="Next month"
              onClick={() =>
                setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
              }
              className="px-1 text-zo-ink-muted transition-colors hover:text-zo-ink"
            >
              &#8250;
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-y-1 text-center">
            {WEEKDAYS.map((d) => (
              <span key={d} className="text-xs text-zo-ink-muted">
                {d}
              </span>
            ))}
            {cells.map(({ date, currentMonth }, i) => {
              const selected = value ? isSameDay(date, value) : false;
              const isToday = isSameDay(date, today);
              const disabled = minDate ? date < minDate : false;

              return (
                <button
                  type="button"
                  key={i}
                  disabled={disabled}
                  onClick={() => {
                    onChange(date);
                    setOpen(false);
                  }}
                  className={`mx-auto flex h-9 w-9 items-center justify-center text-sm transition-colors ${
                    selected
                      ? "bg-zo-brass text-zo-sand"
                      : disabled
                        ? "cursor-not-allowed text-zo-ink-muted/30"
                        : currentMonth
                          ? `text-zo-ink hover:bg-zo-line/50 ${isToday ? "border border-zo-brass" : ""}`
                          : `text-zo-ink-muted/40 hover:bg-zo-line/30 ${isToday ? "border border-zo-brass" : ""}`
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
