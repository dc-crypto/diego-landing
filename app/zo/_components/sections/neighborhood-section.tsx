import { neighborhood } from "../../_lib/content";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { Gallery } from "../gallery";

export function NeighborhoodSection() {
  return (
    <section id="neighborhood" className="scroll-mt-24 bg-zo-card py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading
          eyebrow={neighborhood.eyebrow}
          heading={neighborhood.heading}
          accent={neighborhood.headingAccent}
          body={neighborhood.body}
        />

        <div className="mt-16 md:mt-20">
          <Gallery images={neighborhood.gallery} />
        </div>

        <div className="mt-20 md:mt-28">
          <ul className="grid gap-x-12 gap-y-0 sm:grid-cols-2">
            {neighborhood.distances.map((item, i) => (
              <Reveal key={item.place} delay={(i % 4) * 70}>
                <li className="flex items-baseline justify-between gap-6 border-t border-zo-line/70 py-5">
                  <span className="font-zo-serif text-lg text-zo-ink">
                    {item.place}
                  </span>
                  <span className="eyebrow shrink-0 text-zo-ink-muted">
                    {item.time}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
