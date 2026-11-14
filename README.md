# Handbook

How Harry builds, ships and runs his projects. One process for every project, written down as code.

It's a [Starlight](https://starlight.astro.build/) site. Pages are Markdown in `src/content/docs/`.

```sh
pnpm install
pnpm dev     # the site at http://localhost:4321
pnpm check   # markdownlint, Vale, the build and lychee, as in CI
```

`pnpm check` needs [Vale](https://vale.sh/) and [lychee](https://lychee.cli.rs/) on your path.

Other repositories run the same docs check: see `src/content/docs/how-to/add-the-docs-check.md`.
