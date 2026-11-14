---
title: What the handbook is
description: What's in the handbook, what isn't, and how it's kept up to date.
sidebar:
  order: 1
---

The handbook is the one place that says how Harry's projects are built, shipped and run. It covers every project, not only AUGUR.

## What's in it

- **How-to guides** give the steps for one job.
- **Reference** pages hold facts to look up.
- **Explanation** pages say why the process is the way it is.
- **Decisions** record what was decided across projects, one page each.

[How the handbook is organised](../explanation/how-the-handbook-is-organised/) explains the split.

## What isn't in it

- A project's own docs live in that project's repository, in `docs/`.
- AUGUR's product docs are AUGUR's docs site, in the `augur` repository.

## How it's kept up to date

The handbook is docs-as-code: pages are Markdown in Git, changed through pull requests, checked in CI and published from `main`. [Write a page](../how-to/write-a-page/) has the steps.

## Moving in

The process is still being moved in from where it lives today: the DevOps agent brief, the linear-link plugin, the feature flag standard and the control centre design. Until a page exists here, those stay the source.
