// Client-safe blog helpers: no Node builtins (fs/path) here, so this file
// can be imported from client components like BlogList without pulling
// the filesystem-reading code (lib/blog.ts) into the browser bundle.

export const WHATSAPP_URL = "https://wa.me/523221097649";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  keywords: string[];
  href: string;
  /** optional cover image; falls back to a typographic cover when absent */
  image?: string;
  /** true for hand-built posts living under app/blog/<slug>, not driven by markdown */
  legacy?: boolean;
};

export function formatDateEs(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
