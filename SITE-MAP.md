# Site Map — davidbervic.com

**Repo:** github.com/davidbervic/mi-sitio  
**Deploy:** GitHub → Netlify (auto-deploy en push a main)  
**Stack:** HTML/CSS/JS estático. Sin framework. Sin build step.  
**Última actualización:** Octubre 2026

---

## Páginas principales (core site)

| Archivo | URL | Descripción | Formulario Netlify |
|---|---|---|---|
| `index.html` | / | Home — hero, stages scroll, servicios, testimonios, pricing CTA | `contact-home` |
| `about.html` | /about | Perfil — timeline de carrera, martech stack, testimonios | — |
| `contact.html` | /contact | Formulario de contacto + testimonios slider | `contact-main` |
| `customers.html` | /customers | Case studies index + Wall of Love | — |
| `case-study.html` | /case-study?case=N | Case study individual (JS renderiza según URL param) | — |
| `resources.html` | /resources | Blog index — filtra y lista todos los artículos AEO | — |
| `downloads.html` | /downloads | Centro de descargas de herramientas gratuitas | `freebie-download` |
| `freebies.html` | /freebies | Página alternativa de recursos gratuitos | — |

---

## Páginas de servicios GTM

Usan `article.css` + `services.css` para estilos.

| Archivo | URL | Servicio |
|---|---|---|
| `gtm-architecture-evolution.html` | /gtm-architecture-evolution | GTM Architecture Evolution (programa core) |
| `gtm-outbound-evolution.html` | /gtm-outbound-evolution | GTM Outbound Evolution |
| `gtm-intelligence-evolution.html` | /gtm-intelligence-evolution | GTM Intelligence Evolution |
| `gtm-total-glowap.html` | /gtm-total-glowap | GTM Total (programa combinado) |
| `gtm-workforce-evolution.html` | /gtm-workforce-evolution | GTM Workforce Evolution |

**Redirects activos** (en `_redirects`):
- `/revenue-architecture` → `/gtm-architecture-evolution.html`
- `/modern-outbound` → `/gtm-outbound-evolution.html`

---

## Herramientas interactivas (lead gen)

Páginas con lógica JS interactiva. Todas tienen formulario Netlify.

| Archivo | URL | Qué hace |
|---|---|---|
| `gtm-tool-selector.html` | /gtm-tool-selector | Selector de herramientas GTM por caso de uso |
| `gtm-type-test.html` | /gtm-type-test | Test: qué tipo de GTM eres |
| `icp-worksheet.html` | /icp-worksheet | Worksheet para definir ICP |
| `utm-generator.html` | /utm-generator | Generador de UTMs |

---

## Artículos AEO (contenido SEO)

Generados via pipeline n8n → Claude → JSON → HTML manual.  
Todos usan `article.css` + `article-interactions.js` + `articles-data.js`.

| Archivo | Tema |
|---|---|
| `what-is-lead-scoring.html` | Qué es lead scoring |
| `how-to-score-leads-hubspot.html` | Cómo hacer lead scoring en HubSpot |
| `how-to-design-a-fit-score-in-hubspot.html` | Diseño de fit score |
| `how-to-use-fit-score-for-crm-cleaning.html` | Fit score para limpiar CRM |
| `4-ways-engagement-score-hubspot-lead-scoring.html` | Engagement score |
| `what-is-engagement-score-hubspot.html` | Engagement score HubSpot |
| `fit-scoring-vs-intent-scoring.html` | Fit vs intent scoring |
| `what-are-lifecycle-stages-in-hubspot.html` | Lifecycle stages |
| `why-sales-marketing-slas-keep-breaking.html` | SLAs sales/marketing |
| `source-of-truth-revenue-data-crm-billing-finance.html` | Single source of truth |
| `most-used-crms-hubspot-salesforce-dynamics-365.html` | Comparativa CRMs |
| `why-do-you-need-a-crm-early-stage-startup.html` | CRM para startups |
| `api-integration-mistake-breaks-every-migration.html` | Errores de integración |
| `clearbit-vs-zoominfo-vs-apollo-enrichment-provider-comparison.html` | Comparativa enriquecimiento |
| `waterfall-enrichment-clay-apollo-zoominfo.html` | Waterfall enrichment |
| `enrichment-strategy-gtm-use-case.html` | Estrategia de enriquecimiento |
| `hubspot-agent-builder-vs-workflow-builder-2026.html` | Agent vs Workflow builder |
| `why-ai-agents-fail-in-production.html` | Por qué fallan los AI agents |
| `zapier-vs-n8n-workflow-automation-comparison.html` | Zapier vs n8n |

---

## Páginas utilitarias

| Archivo | URL | Descripción |
|---|---|---|
| `link-in-bio.html` | /link-in-bio | Link in bio (LinkedIn/Instagram) |
| `linkinbio.html` | /linkinbio | Versión alternativa link in bio |
| `newsletter.html` | /newsletter | Suscripción a newsletter | 
| `design-rules.html` | /design-rules | Referencia interna del sistema de diseño |

---

## Archivos compartidos

| Archivo | Lo usan | Qué hace |
|---|---|---|
| `article.css` | Los 19 artículos AEO únicamente | Estilos base del layout de artículos |
| `services.css` | 9 archivos: gtm-architecture/outbound/intelligence/total/workforce + icp-worksheet + newsletter + utm-generator + design-rules | Estilos de páginas de servicio y herramientas |
| `article-interactions.js` | Los 19 artículos AEO | Share, copy link, progress bar de lectura |
| `articles-data.js` | `resources.html` (y artículos que se referencian entre sí) | Array con metadata de todos los artículos (título, slug, tags, fecha) |
| `_redirects` | Netlify | 10 redirects 301 — 5 URLs antiguas × variante con y sin .html: revenue-architecture, modern-outbound, digital-analytics, ai-gtm-automation, gtm-systems-reset |

---

## Reglas críticas — no romper

### 1. overflow-x y position:sticky

**index.html y case-study.html** usan `position:sticky` para animaciones de scroll. En estos dos archivos:
- `body { overflow-x: hidden }` ✅
- `html { overflow-x: hidden }` ❌ ROMPE el sticky — la sección de stages aparece vacía

Todos los demás archivos pueden tener `html { overflow-x: clip }`.

### 2. .nav-mob-icons necesita `!important`

En varias páginas hay declaraciones `display:none` posteriores en el CSS que sobreescriben el media query. El `display:flex !important` es intencional, no accidental.

### 3. Nunca usar PowerShell Set-Content en archivos HTML

`-Encoding Default` corrompe caracteres UTF-8 (☰ ✕ © → …) a `?`. Siempre usar la herramienta Edit de Claude para modificar HTML.

### 4. case-study.html es una sola página que renderiza N casos

El parámetro URL `?case=N` determina qué caso se muestra. El JS lee `CASE_DATA[n]` del array interno. Agregar un nuevo case study = agregar una entrada al array `CASE_DATA` en `case-study.html`, no crear una página nueva.

### 5. Los artículos AEO están registrados en articles-data.js

Para que un artículo aparezca en `resources.html`, debe tener su entrada en el array de `articles-data.js`. Crear el HTML sin actualizar ese archivo = artículo que no se puede encontrar desde el blog.

---

## Secciones JS-rendered (no están en el HTML estático)

Estas secciones solo existen en el DOM después de que el JS corre. No buscar su contenido en el HTML.

| Página | Función JS | Sección que renderiza |
|---|---|---|
| `index.html` | `renderServices()` | Cards de servicios |
| `index.html` | `renderTestimonials()` | Cards de testimonios |
| `about.html` | `renderTimeline()` | Timeline de carrera (usa `badgeImg` para logos) |
| `about.html` | `renderMetrics()` | Fila de métricas numéricas |
| `about.html` | `renderMartech()` | Grid de herramientas con tabs |
| `about.html` | `renderTestimonials()` | Cards de testimonios |
| `contact.html` | (slider JS inline) | Slider de testimonios |
| `customers.html` | (JS inline en script) | Cards de case studies + Wall of Love |
| `case-study.html` | (JS inline en script) | Todo el contenido del caso (lee `?case=N`) |

---

## Formularios Netlify registrados

10 formularios en total. Los marcados como "hidden" son formularios fantasma que Netlify necesita para registrar el nombre del form, pero el submit real ocurre via JS fetch.

| Nombre del form | Página | Tipo |
|---|---|---|
| `muvap-book-a-call` | index.html | CTA principal visible |
| `muvap-contact` | contact.html | Contacto general visible |
| `gtm-arch-book-a-call` | gtm-architecture-evolution.html | CTA servicio visible |
| `gtm-tool-selector` | gtm-tool-selector.html | Captura resultado quiz (hidden) |
| `gtm-type-test` | gtm-type-test.html | Captura resultado test (hidden) |
| `icp-worksheet` | icp-worksheet.html | Captura descarga (hidden) |
| `utm-generator-download` | utm-generator.html | Captura descarga (hidden) |
| `muvap-newsletter` | newsletter.html | Newsletter signup (hidden) |
| `muvap-lead-magnet-handoff-sla` | downloads/lead-magnet-template.html | Lead magnet descarga |
| `utm-generator` | downloads/utm-generator.html | Lead magnet UTM Generator |

**CRM destino: Zoho** (no HubSpot).

**Webhook pendiente:** Netlify → n8n → Zoho (no construido aún). Ya hay 9 submissions reales en Netlify: 5 en `gtm-arch-book-a-call`, 1 en `muvap-book-a-call`, 3 en form legacy `contact`. Exportar manualmente antes de construir el webhook.

**Forms que van directo a n8n** (no pasan por Netlify, usan fetch con placeholder URL): `gtm-tool-selector`, `gtm-type-test`, `icp-worksheet`.

---

## Carpeta downloads/ (lead magnets)

Subcarpeta independiente con páginas de descarga y los archivos descargables.

| Archivo | Descripción |
|---|---|
| `downloads/lead-magnet-template.html` | Página: Free GTM Handoff SLA Template |
| `downloads/utm-generator.html` | Página: Free UTM Generator |
| `downloads/gracias.html` | Página de confirmación post-submit |
| `downloads/Muvap_UTM_Generator_Public.xlsx` | Archivo descargable: UTM Generator |
| `downloads/muvap-icp-worksheet.xlsx` | Archivo descargable: ICP Worksheet |
| `downloads/utm-generator.xlsx` | Archivo descargable: UTM Generator (versión alternativa) |

---

## Cómo agregar un nuevo case study

1. Abrir `case-study.html`
2. Al inicio del script hay constantes nombradas (`MEDLIFE`, `CLOUDTASK`) y un objeto `DATA` que las mapea a claves numéricas: `{ '1': MEDLIFE, '2': CLOUDTASK, ... }`
3. Crear una nueva constante con los datos del caso siguiendo la misma estructura
4. Agregar la clave al objeto `DATA`: `'3': NUEVAEMPRESA`
5. El número de la clave es el `?case=N` que usará la URL
6. Agregar la card correspondiente en `customers.html`
7. Agregar las imágenes en `/images/` con el prefijo del nombre de empresa

## Cómo agregar un nuevo artículo AEO

1. Crear el archivo HTML copiando la estructura de un artículo existente
2. Actualizar `articles-data.js` con la metadata del artículo nuevo
3. El artículo aparecerá automáticamente en `resources.html`
