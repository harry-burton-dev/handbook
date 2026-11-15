---
title: How the handbook is organised
description: Why pages are split into how-to, reference and explanation, where decisions live, and why it's docs-as-code.
---

## Three kinds of page

The handbook follows [Diátaxis](https://diataxis.fr/): a page does one job for its reader.

- A **how-to** guide is for someone doing a job now. It gives steps and leaves out the why.
- A **reference** page is for someone looking a fact up. It's complete and dry.
- An **explanation** page is for someone who wants to understand. It gives reasons and trade-offs.

Mixing them makes each worse. A how-to guide full of reasons is slow to follow, and a reference page with steps is hard to scan.

## Where decisions live

The handbook says how the process works. It doesn't decide it. Decisions about how Harry works are working agreements (WA records) in the Drive folder "Ways of working". Only the Records thread writes them, and only Harry accepts them (WA-001). A page names the WA behind it, so a reader can find the reason and who agreed it. [Working agreements](../../reference/working-agreements/) lists them.

Why the split: Harry reads and accepts agreements in Drive, and a team at work would too. The steps and facts that agents follow every day are better as code, where CI checks them and a pull request changes them.

## Docs-as-code

The handbook is written the way code is, as [Write the Docs](https://www.writethedocs.org/guide/docs-as-code/) describes:

- pages are plain Markdown, in Git;
- work on them is tracked in Linear, like any other issue;
- changes go through pull requests;
- CI checks the writing, the Markdown and every link;
- the site is published from `main`.

## One docs tool

The handbook uses [Starlight](https://starlight.astro.build/), so there is one docs tool to know. It also publishes an `llms.txt`, so an agent can load the whole process in one fetch.
