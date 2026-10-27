# Muvap Design System

> Source of truth: the "Muvap Design System" artifact on claude.ai (https://claude.ai/artifact/UNy2sPp3fpQ6VaCvDcRPqT).
> This folder is a copy for Claude Code. When the artifact changes, refresh this file and `tokens.json` from it.
> Assets (logos, sky backgrounds, tool logos) live in `images/` in this repo; the sky is `images/process-bg.webp` and `images/dl-downloads-bg.webp`.

Muvap is David Berrocal's GTM and RevOps consultancy (davidbervic.com). The look is neo-brutalist and loud: a bright blue grid, solid black ink, flat offset shadows and one candy accent at a time. Every rule below names the token to use.

## Content fundamentals

- Write in English, second person ("your CRM", "your team"), short declarative sentences. Example: "A CRM your team trusts. Consistent data. A pipeline with clear rules."
- Headlines are plain statements, set in `hero` or `section-h2`. Section intro copy is one or two sentences, never more than three lines.
- Eyebrow labels are UPPERCASE in `eyebrow`, often with a middle dot: "Program 1 · Architecture".
- Buttons are verbs with an arrow when they navigate: "Book a Discovery Call", "See Pricing →", "Let's talk ↗".
- Never use em dashes. Use a comma, a period or a colon instead.
- No emoji as decoration. The glyphs in use are ★, →, ↗, ✓ and ✗.

## Color

Eight core colors, each with one job. Never mix roles.

- `nx-blue` is a background only: heroes, CTAs and feature sections, always with the grid (GridSection). Never a text color.
- `nx-ink` is all text, all borders and all shadows, and the background of metrics, CTA and footer sections. Never a hero background.
- `nx-paper` for cards and white sections; `nx-paper-dim` for alternate sections.
- `nx-mint` is the primary CTA button, with `nx-ink` text. `nx-pink` for the nav CTA and accents. `nx-cyan` for metric values on `nx-ink`.
- `nx-yellow` is an accent, never a primary surface.
- Each `-pale` color is the soft fill behind content in that accent (price boxes, highlights).

### Section rhythm

Pages alternate blue grid, black, white and light gray. Main pages run: Hero (blue grid) → Metrics (black, cyan numbers) → Content (white) → Feature (blue grid) → Secondary (gray) → Testimonials (blue grid) → CTA (blue grid) → Footer (black). Service pages run: Hero with inline trust badges (blue grid) → Pain (gray) → Method (white) → Tiers (gray) → Process (white) → CTA (black) → Evolution Partner (blue grid) → Related (gray) → Footer (black).

- Never stack more than 2 white or gray sections without a blue or black break.
- Only five section backgrounds exist: `nx-blue`, `nx-ink`, `nx-paper`, `nx-paper-dim`, or a program accent.
- Never put body text directly on `nx-blue`. Blue sections hold only headlines, eyebrow pills, CTAs and white card panels.

### Sky background

When a section is mostly white cards, set it on the sky (`process-bg.webp`, or the wider `dl-downloads-bg.webp`) instead of `nx-paper` or `nx-paper-dim`, so white does not sit on white. The site does this behind its process steps, testimonials and download pages.

- Use it as a full-bleed `cover` image, with `nx-blue` as the fallback color underneath.
- It follows the same rules as `nx-blue`: white Archivo Black headlines, eyebrow pills, CTAs and white or accent cards with the black border and offset shadow. No body text directly on the sky.
- Keep the grass at the bottom edge; never crop it to plain sky or tile it.
- Center the eyebrow pill and the headline horizontally. The deepest blue of the sky is in the middle; the edges turn pale with clouds, where white text loses contrast. Content cards span the full width below.

### Program accents

Each service program sets `--acc` (and `--acc-pale`, `--acc-ink`) on `body`; never hardcode program colors in markup. `p1` Architecture Evolution = `nx-ink`, `p2` Outbound Evolution = `nx-mint`, `p3` Intelligence Evolution = `nx-purple`, `p4` Workforce Evolution = `nx-yellow`, `p5` Total Glowap! = `nx-pink`. The default accent is `nx-cyan`. `--acc-ink` is the text color on the accent (white when the accent is ink); `--acc-dark` is the accent used on the ink CTA section, where ink would vanish.

### Contrast

`nx-ink` on `nx-paper`, `nx-paper-dim`, `nx-mint`, `nx-cyan` and `nx-yellow` passes easily. White on `nx-blue` is 4.4:1, fine for headlines only. The source sets white 11px eyebrow text on `nx-pink`, `nx-mint` and `nx-purple`; pink and mint fall under 4.5:1 there. They are kept exactly as the site has them.

## Typography

Three families, each with a fixed role. Load them from Google Fonts: Archivo (400 to 900, italic too), Archivo Black and JetBrains Mono 400 and 500.

- `display` (Archivo Black) for headlines and labels only: `hero`, `section-h2`, `card-h3`, `eyebrow`, and button labels. Never for body text.
- `text` (Archivo) for all reading copy: `lead`, `section-intro`, `body`, `card-body`.
- `mono` (JetBrains Mono) for prices, codes and tech labels only: `price`. Never for headlines. Prices always sit in a pill or a fee box on the accent's pale color.
- Headlines on web pages are white Archivo Black on blue. The black "sticker" headline treatment is for infographics and social only.
- Tracking: `nx-track-display` on hero and section headlines, `nx-track-tight` on card headings and buttons, `nx-track-label` on eyebrows.

## Borders, shadows and radii

The black border plus flat offset shadow is the brand's most recognizable trait. No exceptions.

- Every card, button and pill: `1.5px solid` `nx-ink` border and `nx-drop-sm`.
- Tier cards and panels use `nx-drop-md`; hero snapshots and modals `nx-drop-lg`. On an `nx-ink` background, buttons take a white offset shadow instead: `5px 5px 0 rgba(255,255,255,.9)`, growing to 8px on hover.
- Hover on every card and button: `transform: translate(-2px,-2px)` and grow the shadow to `nx-drop-md`. Active: `translate(3px,3px)` and no shadow.
- Radii: `nx-radius-sm` buttons, `nx-radius-md` cards, `nx-radius-lg` larger cards, `nx-radius-pill` pills and tags. Never exceed `nx-radius-xl` (30px). No fully circular sections.
- Never use gradient text (`background-clip: text`) anywhere.

## Layout and spacing

- Fluid sizing with `clamp()`. Standard section padding: `clamp(64px, 9vw, 112px) clamp(16px, 4vw, 44px)`. Hero padding: `clamp(48px, 7vw, 96px) 0 clamp(56px, 8vw, 104px)`.
- Inner container max width 1200px, centered. Section head max width 720px, 52px below it.
- Gaps: 24px between tier cards, 16 to 18px between smaller cards. Card padding 22 to 28px.
- The blue grid is exactly `nx-grid-cell` (64px) squares with `nx-grid-width` lines at `rgba(255,255,255,.07)`. Do not vary the grid color, opacity or size.

## Components

Extend these shapes; never invent new ones. Every section head has an eyebrow pill with an icon (the 4-point star SVG, or ★) before the text.

- EyebrowPill: section labels, always filled with an accent color (`nx-pink`, `nx-mint`, `nx-cyan`, `nx-yellow`, `nx-purple` or the program `--acc`). Never white, never `nx-ink`.
- Button: primary `nx-mint`, dark `nx-ink`, paper, and the pink nav CTA.
- ContentCard: white card with eyebrow, `card-h3`, `card-body` and an optional button.
- SectionHead: centered pill, headline and intro.
- GridSection: the blue grid background for heroes and CTAs.
- Testimonial cards (index, about, contact, customers) follow one pattern: a 48px client badge on top, then the quote, then avatar, name and role.

## Imagery and logos

- Logos: `muvap-logo.webp` (robot mascot plus wordmark) for headers; `favicon.png` (the robot alone) and `apple-touch-icon.png` for icons. Never redraw the mascot or the wordmark.
- Clients: use the 200×200 `*-badge-mini.webp` in cards and the `*-sidebar-logo.webp` in case study sidebars. The CloudTask sidebar logo is a square icon, not a wordmark.
- Tools: the platforms Muvap works with (HubSpot, Salesforce, Zoho, n8n, Clay, Apollo and more), shown in tool grids.
- Backgrounds: the illustrated sky with clouds and green grass (`process-bg.webp`, `dl-downloads-bg.webp`), behind card sections. See Sky background.
- Illustrations across the site are glossy 3D renders (robots, CRM objects) on transparent or blue backgrounds.

## Iconography

Inline SVG at 24×24 viewBox, `currentColor`, stroke width 2.5 with round caps and joins for line icons (arrow, chat). The section-head star is a filled 4-point star: `M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z`. No icon font.

## Presentations

Slides fill the whole screen, so a full black slide reads as a dark screen, not as the short break a black band gives a web page. In decks, `nx-ink` is ink only (text, borders, shadows), never a slide background. The web's black sections stay as they are.

- Backgrounds: `nx-blue` with the grid for the cover, statements, process and the closing slide; the sky for slides built from white cards (scenarios, deliverables, pricing, tool stack); `nx-paper-dim` for the rest (problem, metrics). Alternate the three so no two neighbours look alike. Never `nx-ink`.
- Statement slides: white headline on the blue grid, with the punchline inside a white card with a black border and `nx-drop-lg`, like a sticker.
- Metrics: on `nx-paper-dim`, each number in `nx-ink` inside a white card, marked by an accent bar (`nx-cyan`, `nx-pink`, `nx-mint`, `nx-yellow`). `nx-cyan` numbers only ever sat on `nx-ink`, so they do not move to light grounds.
- Closing slide: the blue grid like the cover, benefits in a white card, the `nx-mint` button with a black shadow.
- Scale: on the 1920px slide canvas, double the web values: 3px borders, 8px, 14px and 22px shadows, 20px, 32px and 44px radii, a 128px grid with 2px lines.
- Eyebrow pills on `nx-yellow`, `nx-cyan`, `nx-mint` and `nx-pink` take `nx-ink` text so they read when projected; `nx-purple` keeps white text. Pills are never white or black.
- On sky slides the pill and headline are centered (see Sky background).

## Not synced

- Fonts: Archivo, Archivo Black and JetBrains Mono are loaded from Google Fonts by the site, so there are no font files in the repository to copy.
- Components: the site is static HTML with no component library, so the five components here are static renditions hand-written from `services.css` and `design-rules.html`, styled by `bundle.css`. No React bundle.
- Not tokenized (literal values, not CSS variables): section paddings and max widths, the `.07` grid line opacity, the white shadow on dark, and `#ff4444` used for "don't" marks in design-rules.html.
- Image references in the site that are missing from the repository: logo-amplitude, logo-bigquery, logo-fireflies, logo-fivetran, logo-gong, logo-gtm, logo-looker, logo-mixpanel, logo-segment.
- Not brought in: 3D illustrations, article covers, hero photos and people photos.
