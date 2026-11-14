---
title: Set up releases in a repository
description: Add Release Please to a repository outside AUGUR, so merged pull requests become versioned releases.
sidebar:
  order: 4
---

Every repository outside AUGUR releases with Release Please. AUGUR keeps Changesets. [Why releases use Release Please](../../explanation/why-releases-use-release-please/) gives the reasons. The handbook is the first repository set up this way, so copy its files.

## How it works

1. Pull requests are squash-merged, and the title is a Conventional Commit: `feat: …`, `fix: …`, `docs: …`, `chore: …`. A `!` after the type, as in `feat!: …`, marks a breaking change.
2. On each push to `main`, Release Please updates one open release pull request. It holds the next version and the changelog.
3. Merging the release pull request tags `<name>@X.Y.Z` and makes the GitHub release.

`feat` gives a minor version and `fix` a patch. Before 1.0.0, a breaking change gives a minor version. Other types don't release on their own.

## Before you start

In the repository's **Settings → Actions → General → Workflow permissions**, turn on **Allow GitHub Actions to create and approve pull requests**. Release Please can't open its pull request without it. This is done once.

In **Settings → General → Pull Requests**, allow squash merging and set the default commit message to the pull request title.

## Steps

1. Copy these from the handbook into the repository's root:
   - `.github/workflows/release.yml`
   - `.github/workflows/pr-title.yml`
   - `release-please-config.json`
   - `.release-please-manifest.json`
2. In `release-please-config.json`, set:
   - `component` and `package-name` to the repository's short name. Tags read `<component>@X.Y.Z`.
   - `release-type` to the project's kind: `node` for a `package.json`, `python`, `go`, or `simple` for a plain `version.txt`.
   - `bootstrap-sha` to the commit on `main` that the first changelog starts after.
3. In `.release-please-manifest.json`, set the current version. Use `0.1.0` for a project that hasn't released.
4. For `node`, add the same `version` to `package.json`.
5. Keep the actions pinned by commit, as the handbook's files are.
6. Open the pull request with a Conventional Commit title, such as `chore: release with Release Please`.

## After the first merge

Release Please opens a pull request named `chore(main): release <component> X.Y.Z`. Check that the version and changelog look right, then merge it.

A pull request opened by Actions doesn't start other workflows, so CI doesn't run on the release pull request. It only changes the version and the changelog, so that's fine.

The control centre counts a release from its tag, so keep the `<component>@X.Y.Z` form.
