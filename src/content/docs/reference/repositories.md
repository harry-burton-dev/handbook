---
title: Repositories
description: How Harry's repositories are set up on GitHub, and which files each one has.
---

Repositories live on GitHub under `harry-burton-dev`. Each one has the same setup, so the same checks and the same process apply to all of them.

Public repositories don't use paid GitHub Actions minutes. Private repositories do.

## Files every repository has

| File | What it's for |
| --- | --- |
| `AGENTS.md` | The checks to run, and the repository's own rules |
| `REVIEW.md` and `.github/review-tiers.json` | The review tier of each kind of change, for a repository that ships code |
| `.github/workflows/` | CI, the docs check and the pull request title check. See [Pipelines](../pipelines/). |
| `release-please-config.json` and `.release-please-manifest.json` | Versioning, for a repository that releases with Release Please |
| `flags.json` and `docs/flags.md` | Feature flags, for a repository that has any. See [Feature flags](../feature-flags/). |

## Release styles

A repository releases in one of two styles. Both tag `<name>@X.Y.Z`, so the [control centre](../control-centre/) reads every repository the same way.

- **Release Please** is the default. Use it for a repository that holds one thing. See [Set up releases](../../how-to/set-up-releases/).
- **Changesets** is for a pnpm monorepo that releases several units from one repository. See [Why releases use Release Please](../../explanation/why-releases-use-release-please/) for the comparison.
