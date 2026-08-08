import { footer, nav } from "../_lib/content";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-zo-line/70 bg-zo-sand pt-20 pb-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <a href="#top" className="font-zo-serif leading-none text-zo-ink">
              <span className="block text-2xl tracking-[0.22em]">
                ZENSATIONAL
              </span>
              <span className="mt-1 block text-[0.65rem] tracking-[0.5em] opacity-70">
                OASIS
              </span>
            </a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-zo-ink-muted">
              {footer.tagline}
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline eyebrow w-fit text-zo-ink-muted transition-colors hover:text-zo-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-zo-line/70 pt-8 text-xs tracking-[0.05em] text-zo-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <p className="eyebrow">{footer.guarantee}</p>
        </div>
      </div>
    </footer>
  );
}
