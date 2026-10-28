import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import { getAllPosts } from "@/lib/blog";

// Share images rendered once at build time (static export) and served as
// plain files: /blog/imagenes/<slug>-1080.png (square, for Instagram/TikTok/
// WhatsApp status) and /blog/imagenes/<slug>-og.png (Open Graph previews).
export const dynamic = "force-static";

const C = {
  base: "#f5900d",
  black: "#000000",
  white: "#ffffff",
};

const SIZES = {
  "1080": { width: 1080, height: 1080, pad: 80, title: [76, 64] },
  og: { width: 1200, height: 630, pad: 64, title: [58, 48] },
} as const;
type Size = keyof typeof SIZES;

const FONT = fs.readFileSync(path.join(process.cwd(), "app/blog/imagenes/PlusJakartaSans-ExtraBold.woff"));

export function generateStaticParams() {
  return getAllPosts().flatMap((p) =>
    (Object.keys(SIZES) as Size[]).map((size) => ({ img: `${p.slug}-${size}.png` }))
  );
}

// Legacy covers are local .webp files, which the renderer can't decode, so
// only remote (Unsplash) covers are used; the rest get the dark fallback.
async function loadCover(image: string | undefined, width: number): Promise<string | null> {
  if (!image || !image.startsWith("https://")) return null;
  const u = new URL(image);
  if (u.hostname === "images.unsplash.com") {
    u.searchParams.set("w", String(width));
    u.searchParams.set("fm", "jpg");
    u.searchParams.set("q", "80");
  }
  const res = await fetch(u);
  if (!res.ok) throw new Error(`Cover ${u} → ${res.status}`);
  const type = res.headers.get("content-type") ?? "image/jpeg";
  return `data:${type};base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`;
}

export async function GET(_req: Request, { params }: { params: Promise<{ img: string }> }) {
  const { img } = await params;
  const match = img.match(/^(.+)-(1080|og)\.png$/);
  const post = match && getAllPosts().find((p) => p.slug === match[1]);
  if (!match || !post) return new Response("Not found", { status: 404 });

  const size = SIZES[match[2] as Size];
  const cover = await loadCover(post.image, size.width);
  const titleSize = post.title.length > 60 ? size.title[1] : size.title[0];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundColor: C.black, fontFamily: "Jakarta" }}>
        {cover && (
          <img src={cover} width={size.width} height={size.height} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            backgroundImage: cover
              ? "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.35) 100%)"
              : "linear-gradient(135deg, #101010 0%, #000000 100%)",
          }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, width: size.width, height: size.height, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: size.pad }}>
          <div style={{ display: "flex", fontSize: 34 }}>
            <span style={{ color: C.white, letterSpacing: "-0.03em" }}>diegocastro</span>
            <span style={{ color: C.base, letterSpacing: "-0.03em" }}>.tech</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: 96, height: 8, backgroundColor: C.base, marginBottom: 32 }} />
            <div style={{ display: "flex", width: size.width - size.pad * 2, color: C.white, fontSize: titleSize, lineHeight: 1.12, letterSpacing: "-0.03em" }}>{post.title}</div>
          </div>
        </div>
        {!cover && <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 12, backgroundColor: C.base }} />}
      </div>
    ),
    {
      width: size.width,
      height: size.height,
      fonts: [{ name: "Jakarta", data: FONT, weight: 800, style: "normal" }],
    }
  );
}
