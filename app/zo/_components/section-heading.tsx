import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  accent?: string;
  body?: string;
  align?: "left" | "split";
};

export function SectionHeading({
  eyebrow,
  heading,
  accent,
  body,
  align = "split",
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "split"
          ? "grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24"
          : "max-w-2xl"
      }
    >
      <div>
        <Reveal>
          <p className="eyebrow text-zo-ink-muted">{eyebrow}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 font-zo-serif text-4xl leading-[1.1] font-light text-zo-ink sm:text-5xl">
            {heading}
            {accent ? (
              <>
                <br />
                <span className="italic">{accent}</span>
              </>
            ) : null}
          </h2>
        </Reveal>
      </div>
      {body ? (
        <Reveal delay={180}>
          <p className="max-w-md text-base leading-relaxed text-zo-ink-muted md:text-lg lg:mt-2">
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
