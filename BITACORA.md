# Bitácora — botones "Compartir en redes" en el blog

Rama: `feature/compartir-redes` (desde `feature/subpath-portalprop` = `main` @ `1928c60`, 2026-10-28).
Commits pequeños, solo con `git add <archivo>`; los ~12 cambios ajenos sin commitear siguen fuera.
Revertir un cambio: `git revert <hash>`. Revertir todo: no mergear la rama, o `git revert` de sus commits en orden inverso.
Para quitarlo de producción después de desplegar: revertir, `npm run build && npx wrangler deploy`
desde la copia de trabajo, o "Rollback" del Worker `diego-landing` en Cloudflare.

| Fecha | Commit | Archivo | Cambio | Cómo revertir |
|---|---|---|---|---|
| 2026-10-28 | fc5eccf | `BITACORA.md` | Crear rama y esta sección | `git revert fc5eccf` |
| 2026-10-28 | be64a4e | `app/blog/imagenes/[img]/route.tsx`, `app/blog/imagenes/PlusJakartaSans-ExtraBold.woff` | Imágenes generadas en el build con `next/og`: `/blog/imagenes/<slug>-1080.png` (1080×1080) y `<slug>-og.png` (1200×630). Portada oscurecida + título + "diegocastro.tech"; posts antiguos (.webp) con fondo negro y barra naranja. La fuente es Plus Jakarta Sans 800 (OFL, vía fontsource). El build descarga las portadas de Unsplash: necesita internet | `git revert be64a4e` (borra la carpeta `app/blog/imagenes`) |
| 2026-10-28 | fe116b2 | `components/blog/ShareButtons.tsx` | Componente nuevo (cliente): Facebook, X, LinkedIn, WhatsApp (pestaña nueva, `rel="noopener"`), "Copiar enlace" y "Compartir imagen" (copia título+enlace y abre `navigator.share` con la imagen 1080). Si `canShare({ files })` falla: "Copiar texto" + "Descargar imagen". Móvil: solo íconos; ≥640px: ícono + nombre | `git revert fe116b2` (revertir antes 37f7403 y 87e8f6e, que lo usan) |
| 2026-10-28 | 37f7403 | `app/blog/[slug]/page.tsx` | Posts Markdown: `<ShareButtons>` bajo la línea autor/fecha/lectura y al final del artículo (antes de "Hablemos"). Open Graph: se agrega `images` (`<slug>-og.png`, 1200×630); Twitter `summary` → `summary_large_image` con la misma imagen. No había imagen OG antes, nada duplicado | `git revert 37f7403` |
| 2026-10-28 | 87e8f6e | `app/blog/{automatizar-whatsapp-empresa,errores-que-hacen-perder-clientes,por-que-tu-negocio-necesita-pagina-web}/page.tsx` y `layout.tsx` | Posts antiguos: `<ShareButtons>` al inicio del artículo y al final (después de las etiquetas). `layout.tsx`: se agregan `openGraph` y `twitter` (`summary_large_image`) con `<slug>-og.png`; título, descripción y canonical sin cambios | `git revert 87e8f6e` |
| 2026-10-28 | — | (Cloudflare) | `npx wrangler versions upload` desde la copia de trabajo: versión `80c0eef2-d7c0-4efb-9743-4722d4ef6d66`, **no desplegada**. Producción sigue en `ee704cd3-5109-4e17-9b76-c7af41f8f1de`. No dio URL de prueba (el Worker no tiene URLs de vista previa activadas) | Nada que revertir: la versión no recibe tráfico |
| 2026-10-28 | — | (Cloudflare) | Despliegue a producción con ok de Diego: `npm run build && npx wrangler deploy` desde la copia de trabajo (rama `feature/compartir-redes` + los cambios ajenos que ya estaban en línea). Versión `ad31d9f0-1185-4405-8b9d-7541c86ca278` (antes `ee704cd3-5109-4e17-9b76-c7af41f8f1de`). Verificado: 2 bloques de compartir y `og:image` en un post Markdown y uno antiguo; las imágenes `-1080.png` y `-og.png` → 200 `image/png`; `/`, `/proyectos/`, `/cv/`, `/boutique/`, `/portalprop/`, `/blog/` → 200. Rama sin mergear a `main` ni push | "Rollback" a `ee704cd3` en Cloudflare, o `npx wrangler rollback ee704cd3-5109-4e17-9b76-c7af41f8f1de` |
| 2026-10-28 | 51b0c35 | `app/blog/imagenes/[img]/route.tsx` | Zonas seguras: OG 1200Ã—630 con logo y tÃ­tulo centrados dentro del cuadrado central (columna de 570 px), para que el recorte casi cuadrado de la app de Facebook no los corte; cuadrada 1080 con mÃ¡rgenes laterales de 150 px (recorte 3:4 de la cuadrÃ­cula de Instagram). Nueva imagen vertical `<slug>-historia.png` 1080Ã—1920 (zona segura: 260 px arriba, 380 abajo, 180 a la derecha). Las portadas de Unsplash se piden ya recortadas al tamaÃ±o exacto (`w`, `h`, `fit=crop`) | `git revert 51b0c35` |
| 2026-10-28 | d3b3d7d | `lib/blog-shared.ts`, `lib/blog.ts` | `PostMeta` con `caption` y `hashtags` opcionales (leÃ­dos del frontmatter). `buildCaption()`: caption tal cual, o tÃ­tulo + descripciÃ³n acortada a ~200 caracteres sin cortar palabras; luego "Link en mi bio ðŸ‘†" y hashtags (`DEFAULT_HASHTAGS` si no hay). Sin URL | `git revert d3b3d7d` |
| 2026-10-28 | 0132553 | `components/blog/ShareButtons.tsx`, `app/blog/[slug]/page.tsx`, `app/blog/{3 antiguos}/page.tsx`, `lib/blog.ts` | Facebook y LinkedIn: en el clic copian tÃ­tulo + enlace, avisan "Texto copiado âœ“ PÃ©galo en tu publicaciÃ³n" y abren la ventana 600 ms despuÃ©s (el `href` queda como respaldo). "Compartir imagen" se divide en "Compartir post" (1080Ã—1080) y "Compartir historia" (1080Ã—1920); ambos copian el caption de `buildCaption()`, sin URL. Respaldo sin `canShare`: "Copiar texto", "Descargar post", "Descargar historia". Prop nueva `caption`; los posts antiguos lo arman con tÃ­tulo + descripciÃ³n. X y WhatsApp sin cambios | `git revert 0132553` |
| 2026-10-28 | 8b971b6 | `content/blog/*.md` (6) | Frontmatter: `caption` (bloque `\|`, 222â€“242 caracteres, aprobados por Diego) y `hashtags` (5 por post). El cuerpo de los posts no cambia | `git revert 8b971b6` (vuelven al caption automÃ¡tico) |
| 2026-10-28 | 451cfd0 | `CLAUDE.md` (nuevo) | Regla permanente: todo post nuevo o editado en `content/blog/*.md` lleva `caption` (â‰¤280, gancho en la 1.Âª lÃ­nea, sin enlaces) y `hashtags` (4â€“5, locales + tema), sin inventar datos ni cambiar los existentes salvo que se pida | `git revert 451cfd0` (borra `CLAUDE.md`) |
| 2026-10-28 | 99b1cec | `wrangler.jsonc` | Se agrega `"preview_urls": true` (con ok de Diego). Por sÃ­ solo no da URL: se aplica con `wrangler triggers deploy`, que **no** se ha ejecutado (toca la configuraciÃ³n de producciÃ³n) | `git revert 99b1cec` |
| 2026-10-28 | — | (Cloudflare) | `npx wrangler versions upload`: versión de prueba `b13bcf01-5b30-420a-b07f-538acb12b588`, **no desplegada** y sin URL de prueba todavía (falta `wrangler triggers deploy`). Producción sigue en `ad31d9f0-1185-4405-8b9d-7541c86ca278` | Nada que revertir: no recibe tráfico |

---

# Bitácora — demo en diegocastro.tech/portalprop

Rama: `feature/subpath-portalprop` (desde `main` @ `4352985`; antes `feature/subpath-renta-tu-villa`,
renombrada 2026-10-21).
Cada cambio va en un commit pequeño; para revertir uno: `git revert <hash>`.

Nota: al crear la rama había 65 cambios sin commitear en `main` ajenos a esta tarea
(layouts, `public/boutique`, `public/cv`, etc.). Siguen sin commitear y NO forman parte
de esta rama: los commits se hacen con `git add <archivo>` uno por uno, nunca `git add .` ni `commit -a`.

## Contexto
- Hosting confirmado 2026-10-21: Cloudflare. NS emily/olof.ns.cloudflare.com,
  Worker `diego-landing` (assets estáticos de `out/`), ruta `diegocastro.tech/*`.
- El demo (Flask en Railway, https://portalprop-production.up.railway.app) se servirá con el
  Worker proxy `portalprop-proxy` (`C:\Users\Diego\portalprop-proxy`) en las rutas
  `diegocastro.tech/portalprop` y `diegocastro.tech/portalprop/*`, igual que vallartaandco.
  Revertir el proxy = borrar ese Worker/ruta; no afecta a `diego-landing`.
- El nombre "renta-tu-villa" se descartó: todo se llama "portalprop".

## Registro

| Fecha | Commit | Cambio | Cómo revertir |
|---|---|---|---|
| 2026-10-21 | a755ded | Crear rama y bitácora | `git revert a755ded` |
| 2026-10-21 | 7978824 | Renombrar renta-tu-villa → portalprop (rama y bitácora) | `git revert 7978824`; `git branch -m feature/subpath-portalprop feature/subpath-renta-tu-villa` |
| 2026-10-21 | 2d25028 | Galería `/proyectos`: `ProjectsSection.tsx` muestra un fondo de respaldo (degradado de acento + nombre) en tarjetas sin `image` ni `vidSrc`, en vez de una imagen rota. `projectsData.ts`: la tarjeta 11 existente "Rentatuvilla" (`https://rentatuvilla.com/`, dominio vencido) pasa a "PortalProp" → https://diegocastro.tech/portalprop/; conserva `image: "/feat-rentatuvilla.webp"` (captura de la portada sin logo). No se agrega tarjeta nueva: siguen 19 y el diseño no cambia. El fondo de respaldo queda como protección para tarjetas futuras sin imagen | `git revert 2d25028` |

| 2026-10-24 | — | Paso d: `npm run build && npx wrangler deploy` desde la copia de trabajo (rama `feature/subpath-portalprop` + los 65 cambios ajenos que ya estaban en línea). Versión `diego-landing` `ee704cd3-5109-4e17-9b76-c7af41f8f1de`. Verificado: `/proyectos/` tiene 1 enlace a `diegocastro.tech/portalprop/` y 0 a `rentatuvilla.com`; `/`, `/proyectos/`, `/cv/`, `/boutique/`, `/portalprop/` → 200. Fast-forward de `main` a esta rama + push (solo commits) | `git revert 2d25028` + build y `wrangler deploy` desde la copia de trabajo; o "Rollback" a la versión anterior en el panel de Cloudflare |

## Pendientes (requieren confirmación antes de tocarse)
- [x] `app/proyectos/_components/projectsData.ts`: tarjeta del demo /portalprop (se actualizó la 11 existente)
- [ ] Opcional: renombrar `public/feat-rentatuvilla.webp` → `feat-portalprop.webp` o tomar captura nueva del demo real tras desplegar
- [x] Deploy (`wrangler deploy`), 2026-10-24

## Pendiente de despliegue (cuando Railway reanude los builds)

Orden obligatorio: **1) portalprop en Railway → 2) Worker `portalprop-proxy` → 3) esta tarjeta.**
Si la tarjeta sale antes, apunta a diegocastro.tech/portalprop/ cuando todavía no funciona.

a. Diego: push a `main` de portalprop y verificar SUCCESS en Railway.
b. Claude: curl con y sin `X-Portalprop-Prefix` contra Railway y mostrar resultados.
c. Solo con ok de Diego: `npm run deploy` del Worker `portalprop-proxy`.
   (Pasos a–c con comandos exactos en `portalprop/BITACORA.md`.)

**d. Solo con ok de Diego — publicar la tarjeta en diegocastro.tech**

⚠️ El push NO despliega este sitio: se publica con `npm run build` + `npx wrangler deploy`
(Worker `diego-landing`, sale de `out/`). Y **lo que está en línea coincide con la copia de trabajo,
no con lo commiteado** (verificado 2026-10-21: `/cv` en línea usa `index-BEjrQMLo.js` igual que
`public/cv` local, mientras `HEAD` tiene `index-DzaGjvZN.js`; `/boutique` igual). Por eso:
- NO construir desde un checkout limpio de `main`: revertiría en producción los 65 cambios ajenos
  que ya están en línea.
- Construir desde esta copia de trabajo, en la rama `feature/subpath-portalprop`
  (= lo que está en línea + la tarjeta):
```
cd ~/diegocastro-v2 && git branch --show-current     # feature/subpath-portalprop
npm run build && npx wrangler deploy
curl -s https://diegocastro.tech/proyectos/ | grep -c 'diegocastro.tech/portalprop/'   # ≥ 1
curl -s https://diegocastro.tech/proyectos/ | grep -c 'rentatuvilla.com'               # 0
```
- Registro en git: push de `feature/subpath-portalprop` y merge fast-forward a `main` + push
  (solo commits; los 65 cambios ajenos siguen sin commitear y conviene ordenarlos aparte).

Revertir: `git revert 2d25028` + `npm run build && npx wrangler deploy` desde la copia de trabajo.
