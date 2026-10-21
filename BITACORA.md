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
| 2026-10-21 | (este) | Renombrar renta-tu-villa → portalprop (rama y bitácora) | `git revert <hash>`; `git branch -m feature/subpath-portalprop feature/subpath-renta-tu-villa` |

## Pendientes (requieren confirmación antes de tocarse)
- [ ] `app/proyectos/_components/projectsData.ts`: tarjeta del demo /portalprop
- [ ] Deploy (`wrangler deploy`), solo con confirmación explícita
