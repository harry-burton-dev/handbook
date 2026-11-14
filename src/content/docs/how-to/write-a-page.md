---
title: Write a page
description: Add or change a handbook page, and get it through the docs check.
sidebar:
  order: 1
---

## Pick the kind of page

Decide what the reader is doing, then put the page in that section:

| The reader wants to | Section | Folder |
| --- | --- | --- |
| do one job | How-to | `src/content/docs/how-to/` |
| look a fact up | Reference | `src/content/docs/reference/` |
| understand why | Explanation | `src/content/docs/explanation/` |
| know what was decided | Decisions | `src/content/docs/decisions/` |

## Write it

1. Make a branch off `main`.
2. Add a Markdown file in the folder. Its file name is its address: `how-to/start-an-epic.md` is served at `/how-to/start-an-epic/`.
3. Start the file with front matter:

   ```yaml
   ---
   title: Start an epic
   description: Open a Linear project and its folder for a new piece of work.
   ---
   ```

4. Write in plain English: short sentences, the short word, headings in sentence case.
5. Link to other pages with relative links, such as `../reference/docs-check/`.

## Check it

Run the same checks as CI:

```sh
pnpm install
pnpm check
```

`pnpm check` needs [Vale](https://vale.sh/) and [lychee](https://lychee.cli.rs/) on your path. To see the site while you write, run `pnpm dev`.

## Ship it

Open a pull request. The docs check runs on it. Once it's green, merge it, and the site is rebuilt from `main`.
