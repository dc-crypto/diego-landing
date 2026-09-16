"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/blog-shared";
import { formatDateEs } from "@/lib/blog-shared";
import CoverArt from "./CoverArt";

const C = {
  base: "#f5900d",
  black: "#000000",
  black2: "#101010",
  white: "#ffffff",
  color: "#909090",
  border: "#1a1a1a",
};
const font = "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif";

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)));
    return ["Todos", ...unique];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory = category === "Todos" || p.category === category;
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="blog-cat-btn"
              style={{
                fontFamily: font,
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.03em",
                padding: "10px 18px",
                cursor: "pointer",
                border: `1px solid ${category === c ? C.base : C.border}`,
                backgroundColor: category === c ? C.base : "transparent",
                color: category === c ? C.white : "rgba(255,255,255,0.65)",
                transition: "border-color 0.15s, color 0.15s",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artículos..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              fontFamily: font,
              fontSize: "14px",
              color: C.white,
              backgroundColor: "transparent",
              border: `1px solid ${C.border}`,
              padding: "12px 16px",
              outline: "none",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = C.base)}
            onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={{ fontFamily: font, fontSize: "15px", color: C.color, padding: "40px 0" }}>
          No encontré artículos que coincidan con tu búsqueda.
        </p>
      ) : (
        <div className="blog-index-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", backgroundColor: C.border }}>
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="blog-card"
              style={{ display: "flex", flexDirection: "column", textDecoration: "none", backgroundColor: C.black }}
            >
              <CoverArt image={p.image} alt={p.title} category={p.category} height="200px" />
              <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, padding: "28px 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                  <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 700, color: C.base, letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.category}</span>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: C.color }} />
                  <span style={{ fontFamily: font, fontSize: "13px", color: C.color }}>{formatDateEs(p.date)}</span>
                </div>
                <h2 className="blog-card-title" style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(19px,2vw,22px)", color: C.white, lineHeight: 1.35, letterSpacing: "-0.01em", margin: "0 0 16px", transition: "color 0.2s" }}>
                  {p.title}
                </h2>
                <p style={{ fontFamily: font, fontSize: "14.5px", lineHeight: 1.75, color: C.color, margin: "0 0 24px", flexGrow: 1 }}>
                  {p.description}
                </p>
                <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 700, color: C.base, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  Leer artículo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .blog-card:hover{background-color:${C.black2}}
        .blog-card:hover .blog-card-title{color:${C.base}}
        .blog-cat-btn:hover{border-color:${C.base}!important}
        @media(max-width:960px){.blog-index-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:640px){.blog-index-grid{grid-template-columns:1fr!important}}
      `}</style>
    </>
  );
}
