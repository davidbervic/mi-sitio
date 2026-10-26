# CLAUDE.md — davidbervic.com (mi-sitio)

Este archivo se carga automaticamente al inicio de cada sesion de Claude Code.
Lee esto antes de tocar cualquier archivo del proyecto.

---

## Stack y deploy

- **HTML/CSS/JS estatico. Sin framework. Sin build step.** No hay npm, no hay bundler.
- **Deploy:** `git push origin main` → GitHub → Netlify auto-deploy (~1 min).
- **No pushear automaticamente.** Solo cuando el usuario lo pida explicitamente. Cada push consume un build credit de Netlify.
- Arquitectura completa en `SITE-MAP.md`. Leelo si necesitas saber donde esta algo.

---

## Reglas que no se pueden romper

### 1. overflow-x y position:sticky

`index.html` y `case-study.html` tienen `position:sticky` para animaciones de scroll.
En **esos dos archivos solamente**, la regla es:

```css
body { overflow-x: hidden; }   /* OK */
html { overflow-x: hidden; }   /* ROMPE el sticky — NO hacer */
html { overflow-x: clip; }     /* ROMPE igual — Chrome lo trata como hidden en root */
```

Todos los demas archivos pueden tener `html { overflow-x: clip }` sin problema.
El sintoma de haberlo roto: la seccion de stages queda vacia, sin error en consola.

### 2. .nav-mob-icons necesita `display:flex !important`

Hay declaraciones `display:none` posteriores en el CSS de varias paginas que sobreescriben
el media query. El `!important` es intencional. No lo quites "para limpiar el CSS".

### 3. Nunca usar PowerShell Set-Content en archivos HTML

`-Encoding Default` corrompe UTF-8. Los caracteres ☰ ✕ © → … se convierten en `?`.
**Siempre usar la herramienta Edit de Claude para modificar HTML.**
Si PowerShell es inevitable, usar `-Encoding utf8` o `[System.IO.File]::WriteAllText(..., [System.Text.Encoding]::UTF8)`.

### 4. article.css y services.css tienen alcance amplio

- `article.css` — lo usan los **19 articulos AEO solamente**. Un cambio afecta 19 paginas.
- `services.css` — lo usan **9 archivos**: 5 paginas de servicio GTM + icp-worksheet + newsletter + utm-generator + design-rules.
- `article-interactions.js` — lo usan los 19 articulos AEO (share, copy link, progress bar).
- Testear en al menos una pagina de cada grupo antes de pushear.

### 5. Agregar un articulo AEO requiere dos archivos

Crear el HTML sin actualizar `articles-data.js` = articulo que no aparece en `resources.html`.
Siempre actualizar ambos.

---

## Secciones que NO estan en el HTML estatico

Estas secciones solo existen en el DOM despues de que el JS corre.
Buscar su contenido en el HTML fuente no va a funcionar — hay que mirar el `<script>` con los datos.

| Pagina | Que renderiza JS |
|---|---|
| `index.html` | Cards de servicios, testimonios |
| `about.html` | Timeline de carrera, metricas, herramientas martech, testimonios |
| `customers.html` | Cards de case studies, Wall of Love |
| `case-study.html` | Todo el contenido del caso (lee `?case=N` del URL) |

---

## case-study.html es una pagina para N casos

El parametro `?case=1`, `?case=2`, `?case=3` determina que caso se muestra.
La estructura interna son constantes nombradas (`MEDLIFE`, `CLOUDTASK`) mapeadas en un objeto `DATA`:
```js
const DATA = { '1': MEDLIFE, '2': CLOUDTASK, '3': pendingCase(...) }
```
**Agregar un case study = crear una nueva constante y agregarla al objeto `DATA`.**
No hay array numerico, no se crea un archivo nuevo. Ver `SITE-MAP.md` para la guia paso a paso.

---

## Imagenes de logos de empresas

| Empresa | Badge (usar en cards) | Sidebar logo |
|---|---|---|
| MEDLIFE | `images/medlife-badge-mini.webp` (200x200) | `images/medlife-sidebar-logo.webp` (wordmark horizontal) |
| CloudTask | `images/cloudtask-badge-mini.webp` (200x200) | `images/cloudtask-sidebar-logo.webp` (icono cuadrado, NO es wordmark) |

**Patron de testimonial card establecido (consistente en index, about, contact, customers):**
Badge 48px arriba → quote text → avatar + nombre + rol de la persona

---

## Sistema de diseno

El sitio usa tokens propios derivados del brand Muvap. Las reglas completas estan en:
- `design-rules.html` — referencia visual navegable en el navegador
- El CLAUDE.md global del usuario (`~/.claude/CLAUDE.md`) tiene los tokens CSS completos

**Ritmo de secciones:**
1. Azul `#0574fd` + grid blanco — hero, CTAs
2. Blanco `#ffffff` — problema, cards de contenido
3. Oscuro `#0d0d0d` — metricas, social proof
4. Azul + grid — CTA final

**Headlines en paginas web: blancos con Archivo Black 900.** No sticker negro (eso es solo para infografias/social).

---

## Analytics y formularios

- **GTM:** GTM-5GWJM2P9 (instalado en todas las paginas)
- **GA4:** G-B0L8CEZX5F

**Formularios Netlify registrados (10):**

| Nombre del form | Pagina | Tipo |
|---|---|---|
| `muvap-book-a-call` | index.html | CTA principal |
| `muvap-contact` | contact.html | Contacto general |
| `gtm-arch-book-a-call` | gtm-architecture-evolution.html | CTA servicio |
| `gtm-tool-selector` | gtm-tool-selector.html | Captura resultado quiz (hidden) |
| `gtm-type-test` | gtm-type-test.html | Captura resultado test (hidden) |
| `icp-worksheet` | icp-worksheet.html | Captura descarga (hidden) |
| `utm-generator-download` | utm-generator.html | Captura descarga (hidden) |
| `muvap-newsletter` | newsletter.html | Newsletter signup (hidden) |
| `muvap-lead-magnet-handoff-sla` | downloads/lead-magnet-template.html | Lead magnet GTM Handoff SLA |
| `utm-generator` | downloads/utm-generator.html | Lead magnet UTM Generator |

**CRM destino: Zoho** (no HubSpot).

**Pendiente critico:** Webhook Netlify → n8n → Zoho no esta construido. Ya hay 9 submissions reales en Netlify sin entrar al CRM (5 en `gtm-arch-book-a-call`, 1 en `muvap-book-a-call`, 3 en form legacy `contact`). Exportar manualmente antes de construir el webhook.

**Nota:** `gtm-tool-selector`, `gtm-type-test` e `icp-worksheet` envian directo a n8n via fetch, no pasan por Netlify. Sus webhooks tienen placeholder `YOUR_N8N_WEBHOOK_URL` en el codigo — reemplazar con la URL real cuando se construya el flujo.

## Carpeta downloads/

Subcarpeta con lead magnets independientes. Tiene su propia estructura:

| Archivo | Descripcion |
|---|---|
| `downloads/lead-magnet-template.html` | Pagina de descarga: Free GTM Handoff SLA Template |
| `downloads/utm-generator.html` | Pagina de descarga: Free UTM Generator |
| `downloads/gracias.html` | Pagina de confirmacion post-submit |
| `downloads/Muvap_UTM_Generator_Public.xlsx` | Archivo descargable: UTM Generator |
| `downloads/muvap-icp-worksheet.xlsx` | Archivo descargable: ICP Worksheet |
| `downloads/utm-generator.xlsx` | Archivo descargable: UTM Generator (version alternativa) |

---

## Tareas pendientes de produccion

- [ ] Webhook Netlify → n8n → HubSpot para los 5 formularios
- [ ] Verificar eventos GA4 en produccion (form submit, WhatsApp click, Book a call)
- [ ] Lighthouse audit en produccion
- [ ] Verificar robots.txt y sitemap.xml
- [ ] Revisar consistencia de JSON-LD structured data en articulos AEO

---

## Archivos clave de referencia

| Archivo | Para que sirve |
|---|---|
| `SITE-MAP.md` | Arquitectura completa: todas las paginas, shared files, how-tos |
| `design-rules.html` | Sistema de diseno visual navegable |
| `_redirects` | Redirects 301 de Netlify (URLs antiguas → nuevas) |
| `articles-data.js` | Indice de todos los articulos AEO (alimenta resources.html) |
