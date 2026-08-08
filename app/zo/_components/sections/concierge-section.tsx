import { concierge } from "../../_lib/content";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { Gallery } from "../gallery";

export function ConciergeSection() {
  return (
    <section id="concierge" className="scroll-mt-24 bg-zo-sand py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading
          eyebrow={concierge.eyebrow}
          heading={concierge.heading}
          accent={concierge.headingAccent}
          body={concierge.body}
        />

        <div className="mt-16 md:mt-20">
          <Gallery images={concierge.gallery} />
        </div>

        <div className="mt-20 grid gap-x-12 gap-y-10 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
          {concierge.services.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 80}>
              <div className="border-t border-zo-line/70 pt-5">
                <h3 className="font-zo-serif text-lg text-zo-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zo-ink-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
