---
title: Pipelines
description: The stages every repository's pipeline follows, the workflows that run them, and the rules they keep.
sidebar:
  order: 5
---

A pipeline is the automated path from a pull request to a running change. Every repository uses the same stages, so a green check means the same thing everywhere.

## The stages

1. **Check.** Lint the Markdown and the prose, run the tests, and check every link. Runs on each pull request.
2. **Review gate.** The review tier in `.github/review-tiers.json` says what else must pass before merge. See [Ship a change](../../how-to/ship-a-change/).
3. **Build.** Build the thing that ships once: a site, a container image or a package.
4. **Release.** Turn merged titles into a version and a tag. Release Please keeps one release pull request open. Merging it makes the release.
5. **Deploy.** Run the built artifact on the server. A product with its own updater, such as AUGUR, pulls its signed release and backs up first. A simple site goes through [Coolify](https://coolify.io/), which builds the Dockerfile on each push. See [How deploys work](../../explanation/how-deploys-work/).
6. **Verify.** Check that the service answers after the deploy. If it doesn't, deploy the last good version again. AUGUR's updater does this by itself.

## The workflows in the handbook

| Workflow | File | Runs on | What it does |
| --- | --- | --- | --- |
| Docs check | `.github/workflows/docs-check.yml` | Called by each repository's docs workflow | Lints the Markdown, runs Vale, builds the site and checks every link |
| CI | `.github/workflows/ci.yml` | Pull requests and pushes to `main` | Runs the docs check with Vale blocking, and checks the built site's links |
| PR title | `.github/workflows/pr-title.yml` | Pull requests | Fails a title that isn't a Conventional Commit |
| Release | `.github/workflows/release.yml` | Pushes to `main` | Keeps the release pull request up to date. Merging it tags `<name>@X.Y.Z`. |
| Review | the Review check | Pull requests in a repository with `REVIEW.md` | Works out the review tier, and what the tier needs before merge |

The Dockerfile in the handbook builds the site in one stage and serves it with [nginx](https://nginx.org/) in a second. Coolify runs that image.

## Rules every pipeline keeps

- **Pin actions by commit.** Put the version in a comment beside the commit.
- **Read-only by default.** Each workflow sets `permissions:`, and a job gets write access only when it must write.
- **Time limits.** Each job sets `timeout-minutes`, so a stuck job stops itself.
- **One release at a time.** The release workflow uses a `concurrency` group and never cancels a release that is running.
- **Runner.** Jobs run on `ubuntu-latest` on [GitHub-hosted runners](https://docs.github.com/actions/using-github-hosted-runners). A repository sets the `CI_RUNNER` variable only to use another runner.
- **Secrets stay out of Git.** They live in GitHub's secrets or in the server's stack settings, never in a file in a repository.
- **Merge only on green.** Checks must pass on the branch after `main` is merged into it, and then the pull request merges.
- **Pin tool versions.** The docs check pins each tool by version and checksum.

## Set up a repository's pipeline

1. Add the docs check or CI workflow. See [Add the docs check](../../how-to/add-the-docs-check/).
2. Add the PR title check and choose a release style. See [Set up releases](../../how-to/set-up-releases/).
3. If the repository runs as a simple service, add a Dockerfile, then connect the repository to Coolify. Coolify builds it on each push. A product with its own updater deploys its own way instead, as [Deploy AUGUR to the workbench](../../how-to/deploy-augur-to-the-workbench/) shows.
4. If the repository ships code, add `REVIEW.md` and `.github/review-tiers.json`.
5. After the first deploy, check that the service answers. Then write the check into `AGENTS.md`.
