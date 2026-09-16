const C = {
  base: "#f5900d",
  black2: "#101010",
};
const font = "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif";

export default function CoverArt({
  image,
  alt,
  category,
  height = "220px",
}: {
  image?: string;
  alt: string;
  category: string;
  height?: string;
}) {
  if (image) {
    return (
      <div style={{ height, overflow: "hidden" }}>
        <img src={image} alt={alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
