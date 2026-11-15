---
title: How deploys work
description: The GitOps model every server follows, the tools that run it, and how a bad deploy is undone.
sidebar:
  order: 3
---

Harry's servers are run with GitOps, the way most platform teams run theirs. Git holds what each environment should run. An agent makes the server match Git. Every deploy and every rollback is a commit.

## The model

1. **CI builds once.** A merge into `main` builds the container images on a GitHub runner and pushes them to GitHub's container registry (GHCR).
2. **CI signs what it built** with [cosign](https://docs.sigstore.dev/cosign/), keyless. The server checks the signature before it runs an image.
3. **A commit says what runs.** The image's digest is written into the environment's folder in the GitOps repository, `endstate-gitops`. A tag such as `latest` is never deployed.
4. **An agent applies it.** It sees the new commit and makes the server match.
5. **It checks the deploy.** The deploy waits for every part to be healthy. If they aren't, it puts the last good commit back.
6. **Secrets sit beside it, encrypted** with [sops](https://getsops.io/) and [age](https://age-encryption.org/). Only Harry and the server hold a key that can read them.

Undoing a deploy is `git revert`. The history of an environment is `git log` on its folder.

## The tools

| Job | Tool | Why this one |
| --- | --- | --- |
| Run containers | [k3s](https://k3s.io/) | Certified Kubernetes in one binary, built for a single server |
| Make the server match Git | [Argo CD](https://argo-cd.readthedocs.io/) | The most used GitOps agent. It pulls, so CI never logs in to the cluster. It has a page that shows what runs and what drifted. |
| Follow `main` | [Argo CD Image Updater](https://argocd-image-updater.readthedocs.io/) | Writes each new image digest back to Git, so the dev environment follows `main` by itself |
| A preview per pull request | Argo CD's [pull request generator](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Pull-Request/) | Makes a namespace for each open pull request, and deletes it when the pull request closes |
| Package a service | [Helm](https://helm.sh/) charts, upstream where one exists | One versioned file per service. Renovate opens a pull request for each new version. |
| Reach it | [Tailscale's Kubernetes operator](https://tailscale.com/kb/1236/kubernetes-operator) | Gives each service an HTTPS address on the tailnet, with no ports open |
| Back up the cluster | [Velero](https://velero.io/), to a bucket off the server | Restores a namespace, or the whole cluster on a new machine |

## AUGUR is the exception

AUGUR runs on Docker Compose (AUGUR's ADR 0010). Its app runner starts apps' containers through Docker, so it can't run on Kubernetes until that's rebuilt. Until then it gets the same model with the standard tools for Compose:

- Its digests live in `endstate-gitops` under `envs/dev/augur/`, as for any service.
- A GitHub Actions job in the `dev` [environment](https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment) deploys each commit. It joins the tailnet with [Tailscale's GitHub Action](https://github.com/tailscale/github-action) and runs one fixed command on the server over SSH. GitHub keeps the deploy history.
- That command checks the signatures, runs AUGUR's backup, then `docker compose up --wait`. If the stack isn't healthy, it puts the last good digests back.
- AUGUR's own updater is off on the workbench, so Git is the only thing that changes what runs.

Moving AUGUR onto Kubernetes is a product decision for AUGUR's records, not this handbook.

## Environments

| Environment | What it runs | How it moves |
| --- | --- | --- |
| `dev` (the workbench) | `main`, a few minutes after each merge | By itself |
| A pull request's preview | That pull request's images | Made when it opens, deleted when it closes |
| `staging` and `production` | Released versions only | A pull request to the GitOps repository, merged after its checks |

AUGUR gets no preview per pull request on the server, because one copy needs 16 GB of memory. Its pull requests run the deploy test in CI instead.

## Undoing a deploy

1. **It didn't come up.** The deploy put the last good version back by itself. Fix it on `main`.
2. **It came up wrong.** `git revert` the commit in `endstate-gitops`, or roll back in Argo CD's page, then fix it on `main`.
3. **The server is lost.** Install a new one, apply `endstate-gitops`, and restore the data from the bucket.

## What needs Harry

A thread does everything that runs through GitHub and the GitOps repository. Harry does the steps on the machine, and anything that gives access: keys, tokens and buckets. [Set up a server](../../how-to/set-up-a-server/) lists them in one place.
