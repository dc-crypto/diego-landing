const WIDTHS = [640, 960, 1280, 1920];

function toOptimizedBase(src: string) {
  const slash = src.lastIndexOf("/");
  const dot = src.lastIndexOf(".");
  const dir = src.slice(0, slash);
  const name = src.slice(slash + 1, dot);
  return `${dir}/optimized/${name}`;
}

type ResponsiveImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function ResponsiveImage({ src, alt, sizes, className, priority }: ResponsiveImageProps) {
  const base = toOptimizedBase(src);
  const srcSet = WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(", ");

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}
