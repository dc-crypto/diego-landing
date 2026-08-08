import { experience } from "../../_lib/content";
import { SectionHeading } from "../section-heading";
import { DetailList } from "../detail-list";
import { Gallery } from "../gallery";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 bg-zo-sand py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeading
          eyebrow={experience.eyebrow}
          heading={experience.heading}
          accent={experience.headingAccent}
          body={experience.body}
        />

        <div className="mt-16 md:mt-20">
          <Gallery images={experience.gallery} />
        </div>

        <div className="mt-20 md:mt-28">
          <DetailList items={experience.list} />
        </div>
      </div>
    </section>
  );
}
