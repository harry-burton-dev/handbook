---
title: How the handbook is organised
description: Why pages are split into how-to, reference, explanation and decisions, and why it's docs-as-code.
---

## Four kinds of page

The handbook follows [Diátaxis](https://diataxis.fr/): a page does one job for its reader.

- A **how-to** guide is for someone doing a job now. It gives steps and leaves out the why.
- A **reference** page is for someone looking a fact up. It's complete and dry.
- An **explanation** page is for someone who wants to understand. It gives reasons and trade-offs.
- A **decision** page records one choice that spans projects: what was chosen, what wasn't, and why.

Mixing them makes each worse. A how-to guide full of reasons is slow to follow, and a reference page with steps is hard to scan.

## Docs-as-code

The handbook is written the way code is, as [Write the Docs](https://www.writethedocs.org/guide/docs-as-code/) describes:

- pages are plain Markdown, in Git;
- work on them is tracked in Linear, like any other issue;
- changes go through pull requests;
- CI checks the writing, the Markdown and every link;
- the site is published from `main`.

## The same tools as AUGUR

The handbook uses [Starlight](https://starlight.astro.build/), like AUGUR's docs site, so there is one docs tool to know. It also publishes an `llms.txt`, so an agent can load the whole process in one fetch.
