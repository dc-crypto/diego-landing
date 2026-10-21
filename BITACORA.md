# Bitácora — demo en diegocastro.tech/renta-tu-villa

Rama: `feature/subpath-renta-tu-villa` (desde `main` @ `4352985`).
Cada cambio va en un commit pequeño; para revertir uno: `git revert <hash>`.

Nota: al crear la rama había 65 cambios sin commitear en `main` ajenos a esta tarea
(layouts, `public/boutique`, `public/cv`, etc.). Siguen sin commitear y NO forman parte
de esta rama: solo se agregan a los commits los archivos listados abajo.

## Contexto
- Hosting confirmado 2026-10-21: Cloudflare. NS emily/olof.ns.cloudflare.com,
  Worker `diego-landing` (assets estáticos de `out/`), ruta `diegocastro.tech/*`.
- El demo (Flask en Railway, https://portalprop-production.up.railway.app) se servirá con un
  Worker proxy separado en la ruta `diegocastro.tech/renta-tu-villa*`, igual que vallartaandco.
  Revertir el proxy = borrar ese Worker/ruta; no afecta a `diego-landing`.

## Registro

| Fecha | Commit | Cambio | Cómo revertir |
|---|---|---|---|
| 2026-10-21 | (este) | Crear rama y bitácora | `git revert` del commit |

## Pendientes (requieren confirmación antes de tocarse)
- [ ] Worker proxy `renta-tu-villa-proxy` (proyecto aparte)
- [ ] `app/proyectos/_components/projectsData.ts`: tarjeta del demo
- [ ] Deploy (`wrangler deploy`), solo con confirmación explícita
