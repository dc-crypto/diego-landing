import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { getMarkdownSlugs, getPostContent, formatDateEs, WHATSAPP_URL } from "@/lib/blog";
import BlogNav from "@/components/blog/BlogNav";
import BlogFooter from "@/components/blog/BlogFooter";
import CoverArt from "@/components/blog/CoverArt";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});
const font = "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif";

const C = {
  base: "#f5900d",
  baseH: "#d97a00",
  black: "#000000",
  black3: "#1a1a1a",
  white: "#ffffff",
  color: "#909090",
  border: "#1a1a1a",
};

export function generateStaticParams() {
  return getMarkdownSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPostContent(slug);
  const url = `https://diegocastro.tech${meta.href}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: meta.href },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      type: "article",
      publishedTime: meta.date,
      siteName: "Diego Castro",
      locale: "es_MX",
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta, html, readingTime } = getPostContent(slug);

  return (
    <div className={jakarta.variable} style={{ fontFamily: font, backgroundColor: C.black }}>
      <BlogNav />

      <section style={{ padding: "168px 24px 56px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
            <a href="/blog/" style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Blog</a>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 700, color: C.base }}>{meta.category}</span>
          </div>
          <h1 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(30px,4vw,46px)", color: C.white, lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
            {meta.title}
          </h1>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>Diego Castro</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>{formatDateEs(meta.date)}</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span style={{ fontFamily: font, fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>{readingTime} min de lectura</span>
          </div>
        </div>
      </section>

      <CoverArt image={meta.image} alt={meta.title} category={meta.category} height="min(420px, 46vw)" width={1400} priority />

      <article style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 24px 80px" }}>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <section style={{ backgroundColor: C.black3, borderTop: `1px solid ${C.border}`, padding: "96px 0", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px" }}>
          <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.base, display: "block", marginBottom: "16px" }}>— Hablemos</span>
          <h2 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(28px,3vw,36px)", color: C.white, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 20px" }}>
            ¿Tienes un proyecto<br /><span style={{ color: C.base }}>en mente?</span>
          </h2>
          <p style={{ fontFamily: font, fontSize: "clamp(16px,1.4vw,17px)", color: C.color, margin: "0 auto 36px", lineHeight: 1.8, maxWidth: "45ch" }}>
            Cuéntame sobre tu negocio y te ayudo a definir qué tipo de sitio o sistema te conviene.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="post-cta-btn"
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: C.base, color: C.white, fontFamily: font, fontSize: "14px", fontWeight: 700, padding: "16px 40px", textDecoration: "none", transition: "background-color 0.2s" }}
          >
            Hablar de mi proyecto
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>

      <BlogFooter />

      <style>{`
        .post-cta-btn:hover{background-color:${C.baseH}!important}
        .post-body{font-family:${font};font-size:clamp(16px,1.4vw,17px);line-height:1.9;color:rgba(255,255,255,0.75)}
        .post-body h2{font-family:${font};font-weight:800;color:${C.white};font-size:clamp(1.3rem,2.2vw,1.8rem);letter-spacing:-0.025em;line-height:1.25;margin:48px 0 18px;padding-left:16px;border-left:3px solid ${C.base}}
        .post-body h3{font-family:${font};font-weight:700;color:${C.white};font-size:clamp(1.1rem,1.8vw,1.35rem);letter-spacing:-0.015em;margin:36px 0 14px}
        .post-body p{margin:0 0 24px}
        .post-body strong{color:${C.white};font-weight:700}
        .post-body a{color:${C.base};text-decoration:underline;text-underline-offset:3px}
        .post-body ul,.post-body ol{margin:0 0 24px;padding-left:22px}
        .post-body li{margin-bottom:10px}
        .post-body blockquote{margin:32px 0;padding:4px 24px;border-left:3px solid ${C.base};color:rgba(255,255,255,0.6);font-style:italic}
        .post-body img{max-width:100%;height:auto;margin:32px 0}
      `}</style>
    </div>
  );
}
