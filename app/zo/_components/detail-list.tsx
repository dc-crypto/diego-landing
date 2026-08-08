import { Reveal } from "./reveal";

type Item = { title: string; body: string };

export function DetailList({
  items,
  columns = 2,
}: {
  items: Item[];
  columns?: 1 | 2;
}) {
  return (
    <dl
      className={`grid gap-x-12 gap-y-10 ${
        columns === 2 ? "sm:grid-cols-2" : ""
      }`}
    >
      {items.map((item, i) => (
        <Reveal key={item.title} delay={(i % 4) * 80} as="div">
          <div className="border-t border-zo-line/70 pt-5">
            <dt className="font-zo-serif text-lg text-zo-ink">{item.title}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-zo-ink-muted">
              {item.body}
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}
