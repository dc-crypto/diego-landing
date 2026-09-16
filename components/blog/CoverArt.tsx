const C = {
  base: "#f5900d",
  black2: "#101010",
};
const font = "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif";

// Ask Unsplash for an image sized for where it's actually displayed instead
// of always downloading the same large file for a small card thumbnail.
function sizedSrc(url: string, width: number): string {
  if (!url.includes("images.unsplash.com")) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("w", String(width));
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    u.searchParams.set("q", "75");
    return u.toString();
  } catch {
    return url;
  }
}

export default function CoverArt({
  image,
  alt,
  category,
  height = "220px",
  width = 640,
  priority = false,
}: {
  image?: string;
  alt: string;
  category: string;
  height?: string;
  /** intended render width in px, used to request an appropriately sized source image */
  width?: number;
  /** set true for the one hero image visible on load (skips lazy-loading) */
  priority?: boolean;
}) {
  if (image) {
    return (
      <div style={{ height, overflow: "hidden" }}>
        <img
          src={sizedSrc(image, width)}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  const letter = category.trim().charAt(0).toUpperCase() || "B";

  return (
    <div
      style={{
        height,
        position: "relative",
        backgroundColor: C.black2,
        borderBottom: `3px solid ${C.base}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <span style={{ fontFamily: font, fontWeight: 800, fontSize: "7rem", lineHeight: 1, letterSpacing: "-0.05em", color: "rgba(245,144,13,0.14)" }}>
        {letter}
      </span>
      <span
        style={{
          position: "absolute",
          bottom: "16px",
          left: "20px",
          fontFamily: font,
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: C.base,
        }}
      >
        {category}
      </span>
    </div>
  );
}
