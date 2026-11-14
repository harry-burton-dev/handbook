---
title: 0001 Write docs as code, with Starlight
description: The DevOps process is written in a Starlight handbook repository, checked in CI.
sidebar:
  label: 0001 Docs as code, with Starlight
---

**Status:** accepted, 14 Nov 2026

## Context

The process for Harry's projects was spread across a Word brief, plugin files, chat threads and notes. Only AUGUR had a docs site. Nothing checked that any of it was right or current.

## Decision

The process is written in this handbook: Markdown in a private Git repository, built with Starlight and published from `main`. One shared docs check runs markdownlint, Vale, lychee and the build in CI. Every repository uses the same docs check.

## Options not chosen

- **Backstage TechDocs.** It collects every repository's docs in one portal, but it's built on Material for MkDocs, which went into maintenance mode in November 2025, and it needs Backstage running.
- **Material for MkDocs, or Zensical.** In maintenance mode, or still young, and a second docs tool next to AUGUR's Starlight.
- **Docusaurus.** Good versioning, but a heavier stack and a second docs tool.
- **Plain Markdown in each repository, checks only.** No hosting, but no search and no one place to read the process.

## Consequences

- One docs tool, Starlight, for the handbook and AUGUR's docs site.
- Each repository carries a copy of the Vale style and calls the shared workflow, so the handbook must allow other repositories to call it.
- The handbook needs somewhere to be served from.
