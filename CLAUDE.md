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

### 4. article.css afecta 29 paginas simultaneamente

Lo usan todos los articulos AEO (19), las paginas de servicio GTM (5), y las herramientas interactivas (4).
Un cambio en este archivo es un cambio en 29 paginas. Testear antes de pushear.

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

El parametro `?case=0`, `?case=1`, `?case=2` determina que caso se muestra.
**Agregar un case study = agregar un objeto al array `CASE_DATA` dentro de case-study.html.**
No crear un archivo nuevo. Ver `SITE-MAP.md` para la guia paso a paso.

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

**Formularios Netlify registrados (5):**

| Nombre | Pagina |
|---|---|
| `contact-home` | index.html |
| `contact-main` | contact.html |
| `freebie-download` | downloads.html |
| `gtm-tool-result` | gtm-tool-selector.html |
| `gtm-type-result` | gtm-type-test.html |

**Pendiente:** Webhook Netlify → n8n → HubSpot no esta construido. Los leads llegan a Netlify pero no entran al CRM.

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
