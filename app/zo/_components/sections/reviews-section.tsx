import { reviews } from "../../_lib/content";
import { Reveal } from "../reveal";

export function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-zo-sand py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow text-zo-ink-muted">{reviews.eyebrow}</p>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-10">
          {reviews.items.map((item, i) => (
            <Reveal key={item.attribution} delay={i * 120}>
              <figure className="border-t border-zo-line/70 pt-6">
                <blockquote className="font-zo-serif text-xl leading-snug font-light text-zo-ink italic">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="eyebrow mt-5 text-zo-ink-muted">
                  {item.attribution}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
