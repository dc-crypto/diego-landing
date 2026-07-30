import { ACCENT, ACCENT_HOVER } from "./styles";

interface ContactButtonProps {
  className?: string;
  label?: string;
  href?: string;
}

const WHATSAPP_HREF =
  "https://wa.me/523221097649?text=Hola%20Diego%2C%20me%20interesa%20cotizar%20un%20proyecto";

export default function ContactButton({
  className,
  label = "Contáctame",
  href = WHATSAPP_HREF,
}: ContactButtonProps) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`inline-block rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-colors duration-200 ${className ?? ""}`}
      style={{ backgroundColor: ACCENT }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
    >
      {label}
    </a>
  );
}
