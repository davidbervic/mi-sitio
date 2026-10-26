# davidbervic.com — mi-sitio

Personal site and GTM consulting portfolio for [davidbervic.com](https://davidbervic.com).

## Stack

Static HTML/CSS/JS. No framework. No build step. No npm. Open any `.html` file directly in a browser to work on it.

## Deploy

```
git push origin main
```

GitHub triggers a Netlify auto-deploy. Live in ~1 minute.

## Before you touch anything

Read **[CLAUDE.md](CLAUDE.md)** first. It documents the non-obvious decisions that look like bugs but are intentional — including a CSS rule that silently breaks a full page section if you "fix" it.

## Where things are

| What | Where |
|---|---|
| Full architecture | [SITE-MAP.md](SITE-MAP.md) |
| Design system | [design-rules.html](design-rules.html) |
| Critical rules and gotchas | [CLAUDE.md](CLAUDE.md) |
| Shared article styles | `article.css` — used by all 19 AEO articles |
| Shared service styles | `services.css` — used by 9 pages |
| Blog index data | `articles-data.js` — update this when adding a new article |
| URL redirects | `_redirects` |
| Lead magnet pages | `downloads/` |

## Key facts

- **43 HTML files** — 40 in root, 3 in `downloads/`
- **10 Netlify forms** — leads go to Netlify, webhook to Zoho not yet built
- **19 AEO articles** — all generated via n8n → Claude pipeline
- **GTM:** GTM-5GWJM2P9 · **GA4:** G-B0L8CEZX5F
- Some page sections are JS-rendered and won't appear in static HTML source — see SITE-MAP.md

## Pending

- [ ] Netlify webhook → n8n → Zoho (9 real submissions waiting in Netlify)
- [ ] GA4 conversion events verified in production
- [ ] Lighthouse audit
