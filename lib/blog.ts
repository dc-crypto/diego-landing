import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { PostMeta } from "./blog-shared";
import { WHATSAPP_URL } from "./blog-shared";

export type { PostMeta };
export { WHATSAPP_URL, formatDateEs } from "./blog-shared";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

// Posts built before the markdown pipeline existed. They keep their own
// bespoke app/blog/<slug>/page.tsx + layout.tsx — this entry only makes
// them show up in the /blog listing and the sitemap.
const LEGACY_POSTS: PostMeta[] = [
  {
    slug: "por-que-tu-negocio-necesita-pagina-web",
    title: "¿Por qué tu negocio necesita una página web profesional?",
    date: "2026-06-10",
    description:
      "Descubre por qué tener un sitio web profesional es clave para que tu negocio genere confianza, atraiga clientes y compita en línea.",
    category: "Negocio",
    keywords: [],
    href: "/blog/por-que-tu-negocio-necesita-pagina-web/",
    image: "/blog-web-profesional.webp",
    legacy: true,
  },
  {
    slug: "automatizar-whatsapp-empresa",
    title: "Cómo automatizar WhatsApp y ahorrar tiempo en tu empresa",
    date: "2026-05-28",
    description:
      "Aprende a automatizar las conversaciones de WhatsApp de tu negocio para responder más rápido, no perder clientes y ahorrar horas de trabajo manual.",
    category: "Automatización",
    keywords: [],
    href: "/blog/automatizar-whatsapp-empresa/",
    image: "/blog-automatizar-whatsapp.webp",
    legacy: true,
  },
  {
    slug: "errores-que-hacen-perder-clientes",
    title: "5 errores que hacen perder clientes desde tu sitio web",
    date: "2026-05-14",
    description:
      "Identifica los errores más comunes en sitios web de negocios que espantan visitantes y les cuestan clientes potenciales, y cómo corregirlos.",
    category: "Diseño Web",
    keywords: [],
    href: "/blog/errores-que-hacen-perder-clientes/",
    image: "/blog-errores-clientes.webp",
    legacy: true,
  },
];

function readMarkdownSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readMarkdownFile(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

function toMarkdownMeta(slug: string): PostMeta {
  const { data } = readMarkdownFile(slug);
  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    category: data.category ?? "Blog",
    keywords: data.keywords ?? [],
    href: `/blog/${slug}/`,
    image: data.image,
  };
}

/** Slugs handled by the dynamic app/blog/[slug] template. */
export function getMarkdownSlugs(): string[] {
  return readMarkdownSlugs();
}

/** All posts (legacy + markdown), newest first — used by the /blog index and the sitemap. */
export function getAllPosts(): PostMeta[] {
  const markdownPosts = readMarkdownSlugs().map(toMarkdownMeta);
  return [...LEGACY_POSTS, ...markdownPosts].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
}

export function getPostContent(slug: string) {
  const { content } = readMarkdownFile(slug);
  // The template renders the title separately in the hero, so drop a
  // leading "# Title" line to avoid showing it twice.
  const body = content.trim().replace(/^#\s+.+(\r?\n)+/, "");
  const rawHtml = marked.parse(body, { async: false }) as string;
  // Inline "conversemos" links point at the contact section by default;
  // route them straight to WhatsApp like every other CTA on the site.
  const html = rawHtml.replace(
    /href="\/#contacto"/g,
    `href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer"`
  );
  const words = body.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(words / 200));
  return { meta: toMarkdownMeta(slug), html, readingTime };
}
