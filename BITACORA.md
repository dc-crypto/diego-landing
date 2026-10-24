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
