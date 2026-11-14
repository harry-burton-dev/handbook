---
title: Add the docs check to a repository
description: Run the shared docs check on a repository's Markdown.
sidebar:
  order: 2
---

Every repository runs the same docs check, from the handbook. It runs markdownlint, Vale and lychee, and builds the site when there is one. [Docs check](../../reference/docs-check/) lists what each tool looks for.

## Steps

1. Copy these from the handbook into the repository's root:
   - `.vale.ini`
   - `.vale/styles/Handbook/` and `.vale/styles/config/`
   - `.markdownlint-cli2.jsonc`
   - `lychee.toml`, if the repository has links to leave out
2. Add `.github/workflows/docs.yml`:

   ```yaml
   name: Docs
   on:
     pull_request:
       paths: ['**/*.md', '**/*.mdx', '.vale.ini', '.vale/**', '.markdownlint-cli2.jsonc', 'lychee.toml']
   permissions:
     contents: read
   jobs:
     docs:
       uses: harry-burton-dev/handbook/.github/workflows/docs-check.yml@main
   ```

3. For a repository with a docs site, pass the build and where it writes:

   ```yaml
       with:
         build: pnpm build
         working-directory: docs
         links: dist
   ```

4. Open a pull request. Vale shows warnings but doesn't fail at first. Once the pages are in line, add `vale-blocking: true`.
