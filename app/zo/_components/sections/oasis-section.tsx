import { ResponsiveImage } from "../responsive-image";
import { oasis, retreat } from "../../_lib/content";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { DetailList } from "../detail-list";
import { Gallery } from "../gallery";

export function OasisSection() {
  return (
    <section id="oasis" className="scroll-mt-24 bg-zo-card pb-28 md:pb-40">
      <Reveal>
        <div className="relative h-[62vh] min-h-[420px] w-full md:h-[86vh]">
          <ResponsiveImage
            src={oasis.heroImage.src}
            alt={oasis.heroImage.alt}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </Reveal>

      <div className="mx-auto mt-20 grid max-w-[1400px] gap-8 px-6 md:mt-28 md:px-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow text-zo-ink-muted">{retreat.eyebrow}</p>
        </Reveal>
        <div className="space-y-6">
          <Reveal delay={100}>
            <p className="font-zo-serif text-2xl leading-snug font-light text-zo-ink md:text-3xl">
              {retreat.paragraphs[0]}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="max-w-2xl text-base leading-relaxed text-zo-ink-muted md:text-lg">
              {retreat.paragraphs[1]}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-[1400px] px-6 md:mt-32 md:px-12">
        <SectionHeading
          eyebrow={oasis.eyebrow}
          heading={oasis.heading}
          accent={oasis.headingAccent}
          body={oasis.body}
        />

        <div className="mt-16 md:mt-20">
          <Gallery images={oasis.gallery} />
        </div>

        <div className="mt-20 md:mt-28">
          <Reveal>
            <p className="eyebrow text-zo-ink-muted">In The Apartment</p>
          </Reveal>
          <div className="mt-8">
            <DetailList items={oasis.amenities} />
          </div>
        </div>
      </div>
    </section>
  );
}
