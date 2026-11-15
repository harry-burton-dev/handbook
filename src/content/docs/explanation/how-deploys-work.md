---
title: How deploys work
description: How a change gets onto Harry's servers, why the server pulls signed builds instead of being pushed to, and how a bad deploy is undone.
sidebar:
  order: 3
---

A deploy puts a built, signed release on a server and proves it runs. The same model holds for every project. Only the tool that does each step changes.

## The model

1. **Build once, in CI.** A merge into `main` builds the release on a GitHub runner. Nothing is built on a server.
2. **Sign what was built.** CI signs the images and files with [cosign](https://docs.sigstore.dev/cosign/), keyless, as the workflow and branch that made them. There's no signing key to lose.
3. **The server pulls.** The server checks for new releases and fetches them itself. CI never logs in to a server, so a leaked CI secret can't change what runs there.
4. **The server checks the signature** before it runs anything. A build from another workflow, another branch or a fork is refused.
5. **Back up, then roll forward.** The server takes a backup, starts the new release and waits for every part to say it's healthy.
6. **Roll back by itself.** If the new release doesn't come up, the server goes back to the release before, with the backup it took.
7. **Desired state lives in Git.** What each server should run, and its settings, sit in a file in a fleet repository. Its secrets sit beside it, encrypted with [sops](https://getsops.io/) and [age](https://age-encryption.org/). A tool compares the server with its file and says what differs.

This is GitOps: Git says what should run, the server pulls toward it, and every change has a record.

## Rings

A server says what kind it is, so one release can move through them in turn.

| Ring | What it is | What it takes |
| --- | --- | --- |
| `dev` | The workbench: the server things are built on | A dev build of every merge into `main`, by itself |
| `preview` | A staging server | Each beta release, so it bakes before it's stable |
| `production` | A server real people use | Stable releases only |

The workbench runs on Harry's own server. It runs `main`, so it shows the product as it is today, not as it was at the last release.

## Which tool deploys what

| What runs | How it deploys | Why |
| --- | --- | --- |
| A product with its own updater, such as AUGUR | Its own signed deploy bundle and updater, with its file in the fleet repository | The updater already checks signatures, backs up and rolls back. Another tool on top would fight it. |
| A simple service or site, such as this handbook | [Coolify](https://coolify.io/) builds its Dockerfile on each push to `main` | It has no data to migrate, so redeploying the last good commit undoes it |
| Harry's own tools, such as DevLake | A Compose stack per tool in its own folder | Each one is a stock image, pinned by version, that Renovate keeps up to date |

AUGUR doesn't run on Kubernetes (AUGUR's ADR 0010), so tools that need it, such as Argo CD and Flux, don't fit. Tools that pull `latest` without checking a signature, such as Watchtower, aren't used.

## Previews

- **A pull request to a product** is tested on a throwaway server in CI before it merges. For AUGUR that's the deploy test.
- **An app's pull request** can be built and run on the workbench, beside the app's real release.
- **There's no server per branch.** One AUGUR needs 16 GB of memory, so a second copy on the same machine would starve the first.

## Undoing a deploy

In order, from the cheapest:

1. **Nothing to do.** The server rolled back by itself.
2. **Go back** on the server's own page. It takes a backup first.
3. **Halt the release**, so no other server takes it. Then fix forward with a new release.
4. **Restore the backup** from the off-server copy, when the server itself is lost.

## What needs Harry

A thread can do everything above that runs through GitHub or the fleet repository. Harry does the steps on the machine itself, and anything that gives access: auth keys, tokens, buckets and age keys. [Set up a server](../../how-to/set-up-a-server/) bundles those steps into one list.
