"use client";

import { useEffect, useRef } from "react";
import { BG_DARK } from "./styles";

type Tile = { type: "image" | "video"; src: string };

const PLANE_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4";

const LUME_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_203023_87a26602-2898-4acc-a396-c7a2b5ad84fd.mp4";

const img = (name: string) => ({ type: "image" as const, src: `/landing/${name}` });
const localImg = (name: string) => ({ type: "image" as const, src: `/${name}` });
const vid = (src: string) => ({ type: "video" as const, src });

/** Row 1 — lighter tone: beach/lifestyle shots, Lumé's real treatment video and bright project screens. */
const ROW1: Tile[] = [
  localImg("hero-client.webp"),
  vid(LUME_VIDEO),
  localImg("feat-app-web.webp"),
  img("marquee-sirecla.png"),
  localImg("feat-automatizacion-ia.webp"),
  vid(PLANE_VIDEO),
];

/** Row 2 — darker/moodier tone: Vallarta Transportation's real hero footage + night/deep-color project shots. */
const ROW2: Tile[] = [
  vid("https://diegocastro.tech/tv/video/hero-sayulita.mp4"),
  img("marquee-restaurante.png"),
  img("marquee-reiki.png"),
  img("marquee-ruaire.png"),
  img("marquee-pizzeria.png"),
  img("marquee-leadtrack.png"),
];

function tripled(arr: Tile[]) {
  return [...arr, ...arr, ...arr];
}

function TileEl({ tile }: { tile: Tile }) {
  const style = { width: 420, height: 270 };
  const className = "rounded-2xl object-cover flex-shrink-0";

  if (tile.type === "video") {
    return (
      <video
        src={tile.src}
        className={className}
        style={style}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }
  return <img src={tile.src} alt="" loading="lazy" className={className} style={style} />;
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${offset - 200}px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${-(offset - 200)}px)`;
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-10"
      style={{ background: BG_DARK }}
    >
      <div className="overflow-hidden">
        <div ref={row1Ref} className="flex gap-3" style={{ willChange: "transform" }}>
          {tripled(ROW1).map((tile, i) => (
            <TileEl key={i} tile={tile} />
          ))}
        </div>
      </div>
      <div className="overflow-hidden mt-3">
        <div ref={row2Ref} className="flex gap-3" style={{ willChange: "transform" }}>
          {tripled(ROW2).map((tile, i) => (
            <TileEl key={i} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}
