# Design

## Theme

Premium SaaS founder aesthetic. Stark neutrals with a single precise accent. High information density balanced with generous whitespace. The site looks like the products Diego builds — clean, functional, and clearly crafted by someone who respects the craft.

References: Linear (precision and dark depth), Vercel (stark contrast and product-as-brand), Stripe (typographic hierarchy), Emil Kowalski (typographic restraint and detail), Notion (accessible sophistication).

Dual mode: light and dark. Light mode is the primary experience — off-white base, not pure white. Dark mode inverts gracefully without becoming the "hacker aesthetic" anti-reference.

---

## Color Palette

### Light Mode

| Role | Name | Value | Notes |
|---|---|---|---|
| Background | Canvas | `#FAFAFA` | Warm off-white, not pure white — avoids harshness |
| Surface | Card | `#FFFFFF` | Cards and elevated surfaces |
| Surface Alt | Muted | `#F4F4F5` | Subtle section backgrounds, input fills |
| Border | Default | `#E4E4E7` | Dividers, card borders |
| Border Focus | Accent | `#3B82F6` | Focus rings, interactive borders |
| Text Primary | Ink | `#09090B` | Headings and high-emphasis text |
| Text Secondary | Muted | `#52525B` | Body copy, supporting text |
| Text Tertiary | Subtle | `#A1A1AA` | Captions, placeholders, metadata |
| Accent | Blue | `#2563EB` | Primary CTA, links, highlights |
| Accent Hover | Blue Dark | `#1D4ED8` | Hover states |
| Accent Light | Blue Tint | `#EFF6FF` | Tag backgrounds, subtle highlights |
| Success | Green | `#16A34A` | Positive states |
| Destructive | Red | `#DC2626` | Errors, warnings |

### Dark Mode

| Role | Name | Value | Notes |
|---|---|---|---|
| Background | Canvas | `#09090B` | Near-black, not pure black — depth without harshness |
| Surface | Card | `#18181B` | Cards and elevated surfaces |
| Surface Alt | Muted | `#27272A` | Subtle section backgrounds |
| Border | Default | `#3F3F46` | Dividers, card borders |
| Border Focus | Accent | `#3B82F6` | Focus rings |
| Text Primary | Ink | `#FAFAFA` | Headings and high-emphasis text |
| Text Secondary | Muted | `#A1A1AA` | Body copy |
| Text Tertiary | Subtle | `#71717A` | Captions, metadata |
| Accent | Blue | `#3B82F6` | Primary CTA — slightly lighter for dark mode contrast |
| Accent Hover | Blue Light | `#60A5FA` | Hover states |
| Accent Light | Blue Tint | `#1E3A5F` | Tag backgrounds |

### Usage rules

- Never use pure black `#000000` or pure white `#FFFFFF` for backgrounds.
- Accent blue is the only non-neutral color. Do not introduce secondary brand colors.
- Gradient use: one subtle gradient is permitted in the hero section only (radial glow behind the headline — very subtle, opacity ≤ 0.08). No gradient CTAs, no gradient text.
- Dark mode should feel like Linear's aesthetic, not a terminal.

---

## Typography

### Fonts

| Role | Font | Fallback |
|---|---|---|
| Primary (UI + headings) | Geist Sans | Inter, system-ui, sans-serif |
| Mono (code snippets, tags) | Geist Mono | ui-monospace, monospace |

Load via Vercel's CDN or `next/font`. No display font — Geist's high weights handle hero text with enough authority.

### Scale

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `display` | 4rem / 64px | 1.05 | 700 | Hero headline only |
| `h1` | 2.5rem / 40px | 1.1 | 700 | Section titles |
| `h2` | 1.75rem / 28px | 1.15 | 600 | Sub-section headers, card titles |
| `h3` | 1.25rem / 20px | 1.2 | 600 | Card headings, list headers |
| `body-lg` | 1.125rem / 18px | 1.65 | 400 | Lead paragraphs, hero sub |
| `body` | 1rem / 16px | 1.65 | 400 | Standard body copy |
| `small` | 0.875rem / 14px | 1.5 | 400 | Captions, metadata, labels |
| `xs` | 0.75rem / 12px | 1.4 | 500 | Tags, badges, overlines |

### Rules

- Letter-spacing: headlines use `tracking-tight` (−0.02em). Body is default. Tags/overlines use `tracking-widest` (0.1em) in uppercase.
- Spanish copy: watch for longer strings — leave room in CTA buttons and card headers for 20–30% more characters vs. English.
- Hero headline is display size on desktop. On mobile, clamp to `h1` or use `clamp(2rem, 5vw, 4rem)`.
- No italic body copy. Italic reserved for quotes or emphasis only.

---

## Spacing & Layout

### Grid

- Max content width: `1200px` (with `px-6` gutters on mobile, `px-8` on desktop)
- Section padding: `py-24` (96px) desktop, `py-16` (64px) mobile
- Card gap: `gap-6` (24px) default, `gap-8` (32px) for featured cards
- 12-column grid for complex layouts, 4-column for card grids

### Spacing scale

Uses Tailwind default (4px base). Key breakpoints:
- `4` (16px) — inline gaps, icon-to-text spacing
- `6` (24px) — card internal padding, small gaps
- `8` (32px) — component separation
- `12` (48px) — section internal spacing
- `16` (64px) — large section gaps
- `24` (96px) — section vertical rhythm

### Layout principles

- Content never full-bleeds to viewport edge. Always maintain gutters.
- Cards use `rounded-xl` (12px) — not sharp, not bubbly.
- Inputs and secondary buttons: `rounded-lg` (8px).
- Primary CTA: `rounded-lg` with `px-6 py-3`.

---

## Components

### Buttons

**Primary**: `bg-accent text-white font-medium rounded-lg px-6 py-3 hover:bg-accent-hover transition-colors`
**Secondary**: `border border-border text-primary font-medium rounded-lg px-6 py-3 hover:bg-muted transition-colors`
**Ghost**: Text only with underline on hover. Used for nav links.
**Sizes**: Default (16px text, 44px height), Large for hero CTAs (18px text, 52px height).

### Cards

`bg-surface border border-border rounded-xl p-6 hover:border-accent/40 transition-colors`

Project cards include: tag (industry), title, one-line description, technology stack badges, and a hover state that reveals a subtle border accent.

### Navigation

Sticky, frosted glass: `bg-canvas/80 backdrop-blur-md border-b border-border`
Logo on left, nav links centered (desktop), CTA button right.
Mobile: hamburger → slide-in drawer.

### Tags / Badges

`text-xs font-medium tracking-widest uppercase px-2.5 py-1 rounded-full bg-accent-light text-accent`

Used for: technology labels, industry tags, process step numbers.

### Section headers

Consistent pattern: small uppercase overline (tag style), large headline, optional sub-paragraph in `text-secondary`. Max width `640px` for centered layouts.

### Mockups / Visual blocks

Use abstract UI mockup illustrations rather than screenshots. Style: CRM pipeline cards, WhatsApp conversation bubbles, lead capture forms, automation flow diagrams. These should look like actual product UI, not icons or generic illustrations.

---

## Motion & Animation

Philosophy: functional animation. Animations confirm state, guide attention, and reinforce the premium feel — they never perform.

### Principles

- Default: 200ms ease-out for micro-interactions (buttons, hovers, focus).
- Entrance: elements animate in as they enter viewport — fade + subtle upward translate (`y: 16px → 0`, `opacity: 0 → 1`, 400ms ease-out). Stagger list items by 60ms.
- Hero: a single subtle radial glow animates in on load (opacity, 600ms ease-in).
- No bounce, spring, or elastic easing on primary UI elements.
- No looping animations except a single subtle floating motion on a hero mockup (8s ease-in-out infinite, very small amplitude — ≤4px).
- `prefers-reduced-motion`: skip all entrance animations and the floating mockup. Transitions remain at 150ms for functional feedback.

### Implementation tokens

```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 400ms;
--duration-entrance: 600ms;
--ease-default: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
```

---

## Iconography

Library: Lucide React (consistent with Linear/Vercel ecosystem).
Size: 20px default, 16px inline, 24px for feature icons.
Stroke width: 1.5px (default Lucide) — do not use bold stroke.
Color: `text-secondary` for decorative, `text-accent` for interactive/highlighted.

---

## Imagery

- No stock photography of people.
- Hero visual: abstract dashboard mockup (CRM pipeline + WhatsApp follow-up + lead capture flow) rendered as a product UI screenshot or SVG illustration.
- Project cards: SaaS-style dashboard mockups or interface screenshots relevant to each project.
- About section: professional founder-style portrait — real photo, not illustrated.
- Favor clean illustrations and real software aesthetics over decorative imagery.
