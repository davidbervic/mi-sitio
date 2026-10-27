# CLAUDE.md — davidbervic.com (mi-sitio)

Este archivo se carga automaticamente al inicio de cada sesion de Claude Code.
Lee esto antes de tocar cualquier archivo del proyecto.

---

## Stack y deploy

- **HTML/CSS/JS estatico. Sin framework.** No hay npm, no hay bundler en local.
- **Build step en Netlify:** `node generate-articles.js` — regenera `articles-data.js` a partir de `articles-meta.json` + el JSON-LD de cada articulo HTML. Corre automaticamente en cada deploy.
- **Deploy:** `git push origin main` → GitHub → Netlify corre el build → auto-deploy (~1-2 min).
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

### 5. Agregar un articulo AEO: el pipeline correcto

`articles-data.js` es **generado automaticamente** por Netlify — no editarlo a mano.

**Pasos para publicar un articulo nuevo:**
1. Crear el archivo `.html` del articulo con JSON-LD de tipo `Article` en el `<head>` (headline, description, image, datePublished).
2. Agregar una linea en `articles-meta.json` con los campos que no se pueden extraer del HTML:
   ```json
   { "href": "nombre-del-archivo.html", "id": "a23", "category": "RevOps", "readTime": "10 min read" }
   ```
   Categorias validas: `Scoring`, `Enrichment`, `CRM`, `AI & Automation`, `RevOps`, `Data Analytics`.
3. Push a GitHub → Netlify corre `generate-articles.js` → `articles-data.js` se regenera → el articulo aparece en `resources.html`.

**No tocar `articles-data.js` directamente** — cualquier cambio manual se sobreescribe en el proximo build.

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

**Antes de disenar o crear cualquier pagina, seccion, deck o pieza visual, lee `design-system/README.md` completo.**
Es la copia en el repo del design system "Muvap Design System" (fuente de verdad: https://claude.ai/artifact/UNy2sPp3fpQ6VaCvDcRPqT).
Los tokens exactos estan en `design-system/tokens.json` y coinciden con las variables `--nx-*` de `services.css` y `article.css`.

Reglas que mas se olvidan:
- Grilla azul `#0574fd` de 64px para hero, CTA y features; headlines blancos en Archivo Black. Nunca texto de cuerpo directo sobre el azul.
- Secciones con tarjetas blancas: sobre el cielo (`images/process-bg.webp`) en vez de fondo blanco o gris, con pill y titulo centrados.
- Toda tarjeta, boton y pill: borde negro solido y sombra plana desplazada.
- Eyebrow pills siempre de un color de acento, nunca blancos ni negros.
- En presentaciones el negro es solo tinta, nunca fondo de slide.
- Nunca em dashes.

Si cambias un color, tipografia o regla visual del sitio, actualiza tambien `design-system/` y avisa para re-sincronizar el artifact.

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
| `articles-meta.json` | **Fuente de verdad** de articulos AEO: id, category, readTime. Editar aqui para agregar articulos. |
| `generate-articles.js` | Script de build que genera `articles-data.js` desde `articles-meta.json` + JSON-LD de cada HTML. |
| `articles-data.js` | **AUTO-GENERADO** por Netlify. No editar a mano — se sobreescribe en cada build. |
