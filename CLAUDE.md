# Clear Path QHHT Website

Static site for a QHHT (Quantum Healing Hypnosis Technique) practice at clearpath.love.

## Build

```bash
npm run build        # Generates docs/ from templates + content
```

Dependencies: `js-yaml`, `marked`. Build script: `build.js`.

## Architecture

Content and presentation are separated:

- **`content/`** — YAML files (`home.yaml`, `about.yaml`, `contact.yaml`, `blog.yaml`) and Markdown blog posts in `content/blog/`
- **`templates/`** — HTML templates with mustache-style placeholders (`{{variable}}`, `{{#array}}...{{/array}}`, `{{^condition}}...{{/condition}}`)
- **`styles.css`** — All site styling (single file, root level)
- **`build.js`** — Reads YAML/Markdown content, renders templates, outputs to `docs/`
- **`docs/`** — Generated output (deploy this folder). Do not edit directly.

## Editing workflow

1. Edit content in `content/*.yaml` or `content/blog/*.md`
2. Edit layout/structure in `templates/*.html`
3. Edit styling in `styles.css`
4. Run `npm run build` to regenerate `docs/`

## Key conventions

- Blog posts use front matter (`---` delimited YAML) with `title`, `date`, `description` fields
- Templates use a custom mustache-like engine (not Handlebars/Mustache library) — see `renderTemplate()` in `build.js`
- The footer is duplicated across all templates (`index.html`, `about.html`, `contact.html`, `blog.html`, `blog/post.html`) — changes must be applied to each
- Contact form uses Formspree (form ID configured in `content/contact.yaml`)

## Git conventions

- Do NOT include "Co-Authored-By: Claude" lines in commit messages
- Keep commit messages concise and descriptive
