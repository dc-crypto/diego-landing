import { guide } from "../../_lib/content";
import { Reveal } from "../reveal";

export function GuideSection() {
  return (
    <section id="guide" className="scroll-mt-24 bg-zo-card py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-zo-ink-muted">{guide.eyebrow}</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-zo-serif text-4xl leading-[1.1] font-light text-zo-ink sm:text-5xl">
              {guide.heading}
              <br />
              <span className="italic">{guide.headingAccent}</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 md:mt-20">
          {guide.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 70}>
              <div className="border-t border-zo-line/70 pt-5">
                <h3 className="font-zo-serif text-lg text-zo-ink">{item.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-zo-ink-muted">
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
