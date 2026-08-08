import Image from "next/image";
import { hero } from "../_lib/content";
import { Reveal } from "./reveal";
import { InlineBookingForm } from "./booking-widget/inline-booking-form";

export function Hero() {
  return (
    <div id="top" className="relative">
      <div className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zo-ink/70 via-zo-ink/10 to-zo-ink/30" />

        <div className="relative mx-auto w-full max-w-[1500px] px-6 pb-28 md:px-12 md:pb-36">
          <Reveal>
            <p className="eyebrow text-zo-sand/90">{hero.eyebrow}</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-4 font-zo-serif text-[2.75rem] leading-[1.05] font-light text-zo-sand sm:text-6xl md:text-7xl">
              {hero.heading}
              <br />
              <span className="italic">{hero.headingAccent}</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-zo-sand/90 md:text-lg">
              {hero.body}
            </p>
          </Reveal>
        </div>
      </div>

      <InlineBookingForm />
    </div>
  );
}
