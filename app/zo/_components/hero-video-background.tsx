"use client";

import { useRef, useState } from "react";

const videos = [
  "/zo/videos/hero-rooftop.mp4",
  "/zo/videos/hero-beach.mp4",
  "/zo/videos/hero-pool.mp4",
];

export function HeroVideoBackground() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleEnded = (index: number) => {
    if (index !== active) return;
    const next = (index + 1) % videos.length;
    setActive(next);
    const nextVideo = refs.current[next];
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }
  };

  return (
    <div className="absolute inset-0">
      {videos.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          autoPlay={i === 0}
          muted
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          onEnded={() => handleEnded(i)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
