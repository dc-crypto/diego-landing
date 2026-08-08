"use client";

import { contact } from "../../_lib/content";
import { Reveal } from "../reveal";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "dates", label: "Dates in mind", type: "text" },
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-zo-sand py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:px-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow text-zo-ink-muted">{contact.eyebrow}</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-zo-serif text-4xl leading-[1.1] font-light text-zo-ink sm:text-5xl">
              {contact.heading}
              <br />
              <span className="italic">{contact.headingAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-zo-ink-muted md:text-lg">
              {contact.body}
            </p>
          </Reveal>

          <Reveal delay={280}>
            <dl className="mt-10 space-y-3 border-t border-zo-line/70 pt-8">
              <div className="flex flex-wrap gap-2">
                <dt className="eyebrow text-zo-ink-muted">Email</dt>
                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                    className="link-underline font-zo-serif text-lg text-zo-ink"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-2">
                <dt className="eyebrow text-zo-ink-muted">Phone</dt>
                <dd>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="link-underline font-zo-serif text-lg text-zo-ink"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-2">
                <dt className="eyebrow text-zo-ink-muted">Address</dt>
                <dd className="font-zo-serif text-lg text-zo-ink">
                  {contact.address}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            {fields.map((field) => (
              <label key={field.name} className="block">
                <span className="eyebrow block text-zo-ink-muted">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  name={field.name}
                  className="mt-3 w-full border-b border-zo-line bg-transparent pb-3 font-zo-serif text-lg text-zo-ink outline-none transition-colors focus:border-zo-ink"
                />
              </label>
            ))}
            <label className="block">
              <span className="eyebrow block text-zo-ink-muted">Message</span>
              <textarea
                name="message"
                rows={3}
                className="mt-3 w-full resize-none border-b border-zo-line bg-transparent pb-3 font-zo-serif text-lg text-zo-ink outline-none transition-colors focus:border-zo-ink"
              />
            </label>
            <button
              type="submit"
              className="bg-zo-ink px-8 py-4 text-xs font-medium tracking-[0.18em] text-zo-sand uppercase transition-colors hover:bg-zo-ink/90"
            >
              Send Enquiry
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
