# mi-sitio — davidbervic.com

Personal site and blog for David Berrocal (GTM Revenue Systems Architect). It is a
**plain static HTML site, deliberately kept simple**: nothing to compile and no framework
to maintain, deployed on Netlify. The blog articles are produced by an AI content pipeline
(see [Content pipeline](#content-pipeline)).

- **Live:** https://davidbervic.com
- **Repo:** https://github.com/davidbervic/mi-sitio
- **Hosting:** Netlify (auto-deploys from the `main` branch)

---

## Run it locally

No build step is needed. Serve the folder with any static file server and open it in a browser.

```bash
python -m http.server 8080
```

Then open http://localhost:8080. (Any static server works: `npx http-server`, VS Code Live Server, etc.)

---

## Deploy

Deployment is automatic. **Push to `main` and Netlify rebuilds and publishes.**

```bash
git add -A
git commit -m "your message"
git push origin main
```

Deploy is intentionally minimal: Netlify serves the files exactly as they are in `main`, so
there is no build to configure, no CI pipeline, and no deploy-time secrets to manage. Fewer
moving parts means fewer things that can break.

---

## What is in here

| File | What it is |
|------|------------|
| `index.html` | Home page. The main "GTM system" landing page. Has its own inline CSS. |
| `resources.html` | Blog listing. Topic tabs + article cards. New articles are linked here **by hand** (add a card). Has its own inline CSS. |
| `contact.html` | 3-step contact form. Submits via **Netlify Forms** (AJAX to `/`). Pushes a `lead_submitted` event to the GTM dataLayer on success. |
| `downloads.html` | Downloads page (resources marked "coming soon"). |
| `blog.css` | **Shared stylesheet for all AEO blog articles.** Single source of truth for the article design. Change the design here once and every article updates. |
| `what-is-lead-scoring.html` | Blog article on the canonical AEO template. Links `blog.css`. |
| `what-is-engagement-score-hubspot.html` | Blog article on the canonical AEO template. Links `blog.css`. |
| `how-to-score-leads-hubspot.html` | Older blog article. Uses its **own inline CSS**, not `blog.css` (predates the shared stylesheet). Migration pending, see Known issues. |

### The blog article template

The two `blog.css`-based articles follow a canonical AEO (Answer Engine Optimization)
template: a question-format title, a direct-answer block, key takeaways, a collapsible
question index, question-style H2 sections, an FAQ, a sources list, and JSON-LD schema
(`Article` + `FAQPage` + `BreadcrumbList`). New articles should follow the same structure
and link `blog.css` instead of inlining styles.

---

## Analytics

Google Tag Manager and GA4 are installed on every page. **GA4 loads through GTM**, not via
a direct gtag.js snippet, so do not add gtag.js to the HTML (it would double-count).

- GTM container: `GTM-5GWJM2P9` (snippet in the `<head>` and `<body>` of every page)
- GA4 measurement ID: `G-B0L8CEZX5F` (configured as a tag inside GTM)

The contact form pushes a `lead_submitted` dataLayer event on successful submission.

---

## Content pipeline

Most blog articles are drafted by an AI pipeline, not written by hand:

1. A research automation fills a **Google Sheet** (`GTM_Content_Repository`, tab
   `Content Library`) with raw research content per topic.
2. An **n8n workflow** ("AEO Scribe") detects rows marked `Done` + `GENERATE ARTICLE? = YES`,
   reads the linked Google Doc, and uses Claude to transform it into a structured article
   JSON that matches the template contract. Output lands in the `AEO Articles` tab as
   `Pending Review`.
3. A human reviews and approves the JSON.
4. The approved JSON is turned into a final HTML article on the AEO template and linked in
   `resources.html`.

The n8n workflow lives in n8n Cloud. See `automation/` once it is exported (pending).

---

## Known issues / pending work

- `about.html` is linked from the nav on every page but **does not exist** (404). Deferred.
- `how-to-score-leads-hubspot.html` still uses inline CSS; not yet migrated to `blog.css`.
- The blog index in `resources.html` is updated manually per new article.
- The n8n workflow is not yet exported/version-controlled in this repo.

---

## Conventions

- **No em dashes** anywhere in site copy. Use commas or colons.
- Article design changes go in `blog.css`, never inline in a new article.
- Deploy = push to `main`. Keep `main` publishable.
