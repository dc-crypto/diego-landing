import { ResponsiveImage } from "./responsive-image";
import { Reveal } from "./reveal";

type GalleryImage = { src: string; alt: string };

export function Gallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
      {images.map((image, i) => (
        <Reveal key={image.src} delay={(i % 4) * 90}>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-zo-line/40">
            <ResponsiveImage
              src={image.src}
              alt={image.alt}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
