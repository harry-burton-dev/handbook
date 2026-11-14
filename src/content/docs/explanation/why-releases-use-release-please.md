---
title: Why releases use Release Please
description: Why repositories outside AUGUR use Release Please, AUGUR keeps Changesets, and none use semantic-release.
sidebar:
  order: 3
---

Three tools turn merged work into versioned releases on GitHub. They differ in where the version bump comes from and whether there is a step before a release.

| | Changesets | Release Please | semantic-release |
| --- | --- | --- | --- |
| Bump comes from | a changeset file in each pull request | Conventional Commit titles | Conventional Commit titles |
| On merge | a "Version packages" pull request collects changes | a release pull request collects changes | releases straight away |
| A step before release | yes | yes | no |
| Monorepos | built in, made for pnpm | built in, one entry per unit | only through community plugins |
| Languages | JavaScript first | many | Node first |

## AUGUR keeps Changesets

AUGUR is a pnpm monorepo with several units (`augur@`, `kit@`, `app/<id>@`) and `-dev.N` builds. Changesets was made for that. Agents already add a changeset to each pull request, so each release note is written on purpose. Moving would cost a migration and fix nothing that is broken.

## Other repositories use Release Please

Most other repositories hold one thing and release rarely. Release Please needs no file in each pull request: it reads the titles. It works in any language, and it is one GitHub Action. Its release pull request keeps a step before anything ships. It writes tags in AUGUR's `<name>@X.Y.Z` form, so the control centre reads every repository with one pattern.

## No repository uses semantic-release

It releases on every merge, with nothing to look at first. It has no monorepo support of its own. A badly worded title ships a wrong version straight away.

## What it costs

The pull request title decides the version, so a wrong title gives a wrong version. The PR title check fails a title that isn't a Conventional Commit, but it can't tell a `fix` from a `feat`. Read the release pull request before merging it.
