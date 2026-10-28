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
  /** optional social caption (frontmatter); built from title + description when absent */
  caption?: string;
  /** optional hashtags (frontmatter); DEFAULT_HASHTAGS when absent */
  hashtags?: string[];
};

export const DEFAULT_HASHTAGS = ["#PuertoVallarta", "#BahiaDeBanderas", "#DesarrolloWeb", "#SEOLocal", "#PaginasWeb"];

function shorten(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max + 1);
  const end = cut.lastIndexOf(" ");
  return `${cut.slice(0, end > 0 ? end : max).replace(/[\s.,;:—-]+$/, "")}…`;
}

/**
 * Text pasted on Instagram, TikTok and WhatsApp status. No URL on purpose:
 * links in those captions aren't clickable, so it points to the bio instead.
 */
export function buildCaption(post: Pick<PostMeta, "title" | "description" | "caption" | "hashtags">): string {
  const body = post.caption?.trim() || `${post.title}\n\n${shorten(post.description, 200)}`;
  const tags = (post.hashtags?.length ? post.hashtags : DEFAULT_HASHTAGS)
    .map((t) => (t.startsWith("#") ? t : `#${t}`))
    .join(" ");
  return `${body}\n\nLink en mi bio 👆\n\n${tags}`;
}

export function formatDateEs(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
