---
title: What the handbook is
description: What's in the handbook, what isn't, and how it's kept up to date.
sidebar:
  order: 1
---

The handbook says how Harry's projects are built, shipped and run. It covers every project. Agents follow it, and so does Harry.

## What's in it

- **How-to guides** give the steps for one job.
- **Reference** pages hold facts to look up.
- **Explanation** pages say why the process is the way it is.

[How the handbook is organised](../explanation/how-the-handbook-is-organised/) explains the split.

## What isn't in it

- **Decisions.** How Harry works is agreed in working agreements (WA records) in Drive's "Ways of working". Pages link to the WA behind them. See [Working agreements](../reference/working-agreements/).
- **A product's own docs and decisions.** Each product keeps its docs and decisions with the product.
- **Tracking.** Work is tracked in Linear.

## Where to start

1. [How work flows](../explanation/how-work-flows/): from Harry's ask to a merged change.
2. [Start an epic or an issue](../how-to/start-an-epic-or-issue/): what to do at the start of any thread.
3. [Ship a change](../how-to/ship-a-change/): branch, review tier, merge.
4. [Repositories](../reference/repositories/): how each one is set up.
5. [Pipelines](../reference/pipelines/): what runs on each change.
6. [Tech stack](../reference/tech-stack/): the tools, and what each is for.
7. [How deploys work](../explanation/how-deploys-work/): how a change gets onto a server, and how it's undone.

## How it's kept up to date

The handbook is docs-as-code: pages are Markdown in Git, changed through pull requests, checked in CI and published from `main`. [Write a page](../how-to/write-a-page/) has the steps. When a page and a WA disagree, the WA wins, and the page is fixed.
