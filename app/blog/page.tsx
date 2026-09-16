import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { getAllPosts } from "@/lib/blog";
import BlogNav from "@/components/blog/BlogNav";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogList from "@/components/blog/BlogList";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});
const font = "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif";

const C = {
  base: "#f5900d",
  black: "#000000",
  white: "#ffffff",
  border: "#1a1a1a",
};

export const metadata: Metadata = {
  title: "Blog — Diego Castro",
  description:
    "Artículos sobre desarrollo web, automatización e inteligencia artificial para ayudar a tu negocio a crecer.",
  alternates: { canonical: "/blog/" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className={jakarta.variable} style={{ fontFamily: font, backgroundColor: C.black, minHeight: "100vh" }}>
      <BlogNav />

      <section style={{ padding: "168px 0 64px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px" }}>
          <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.base, display: "block", marginBottom: "16px" }}>
            — Blog
          </span>
          <h1 style={{ fontFamily: font, fontWeight: 800, fontSize: "clamp(32px,5vw,56px)", color: C.white, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0, maxWidth: "16ch" }}>
            Recursos y consejos para hacer crecer tu negocio
          </h1>
        </div>
      </section>

      <section style={{ padding: "56px 0 100px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px" }}>
          <BlogList posts={posts} />
        </div>
      </section>

      <BlogFooter />
    </div>
  );
}
