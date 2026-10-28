# diegocastro-v2

## Blog: posts en `content/blog/*.md`

Cada vez que se cree o edite un post en `content/blog/*.md`, el frontmatter debe llevar siempre:

- `caption`: texto para Instagram, TikTok y Estado de WhatsApp.
  - Máximo 280 caracteres.
  - Gancho en la primera línea.
  - Sin enlaces ni URLs (en Instagram no son clicables; el sitio agrega "Link en mi bio 👆" y los hashtags solo).
- `hashtags`: lista de 4 o 5, mezclando locales (ej. `#PuertoVallarta`, `#BahiaDeBanderas`) y de tema del post.

Reglas:
- Español, tono natural, sin exagerar.
- No inventar datos: todo lo que diga el caption tiene que estar en el post.
- No cambiar un `caption` o `hashtags` que ya exista, salvo que Diego lo pida.

Formato:

```yaml
caption: |
  Primera línea con el gancho.
  Segunda línea con el resto.
hashtags:
  - "#PuertoVallarta"
  - "#BahiaDeBanderas"
  - "#Tema"
  - "#OtroTema"
```

Cómo se usa: `buildCaption()` en `lib/blog-shared.ts`; si falta `caption`, arma uno con título + descripción.
