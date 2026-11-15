---
title: Tech stack
description: The tools Harry builds, ships and runs projects with, what each one does, and where to read more.
sidebar:
  order: 6
---

Each tool has one job here. The links go to each tool's own site. A tool that runs on Harry's server is named here, but its address isn't.

## Docs and checks

| Tool | What it does here | Read more |
| --- | --- | --- |
| Starlight and Astro | Build this handbook and any docs site | [Starlight](https://starlight.astro.build/) |
| Node.js and pnpm | Build JavaScript and TypeScript projects | [Node.js](https://nodejs.org/), [pnpm](https://pnpm.io/) |
| Vale | Checks the prose: plain English, and the same names everywhere | [Vale](https://vale.sh/) |
| markdownlint-cli2 | Checks Markdown layout | [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) |
| lychee | Checks every link in a built site | [lychee](https://lychee.cli.rs/) |

## Ship and release

| Tool | What it does here | Read more |
| --- | --- | --- |
| GitHub | Hosts the repositories, pull requests and reviews | [GitHub](https://github.com/) |
| GitHub Actions | Runs CI, the docs check and releases | [GitHub Actions](https://docs.github.com/actions) |
| Release Please | Turns merged titles into versions and changelogs | [Release Please](https://github.com/googleapis/release-please) |
| Changesets | Versions and changelogs for a pnpm monorepo | [Changesets](https://github.com/changesets/changesets) |
| nginx | Serves static sites from a container | [nginx](https://nginx.org/) |
| cosign | Signs releases in CI, and checks the signature before a server runs one | [cosign](https://docs.sigstore.dev/cosign/) |
| Argo CD | Makes the server match `endstate-gitops`, and shows what runs and what drifted | [Argo CD](https://argo-cd.readthedocs.io/) |
| Argo CD Image Updater | Writes each new image digest from `main` back to Git, so the dev environment follows it | [Argo CD Image Updater](https://argocd-image-updater.readthedocs.io/) |
| Helm | Packages each service on the cluster as one versioned chart | [Helm](https://helm.sh/) |

## Run and observe

| Tool | What it does here | Read more |
| --- | --- | --- |
| Ubuntu Server LTS | The system on Harry's server. See [Set up a server](../../how-to/set-up-a-server/). | [Ubuntu Server](https://ubuntu.com/server) |
| k3s | Runs Kubernetes on Harry's server, for every service except AUGUR | [k3s](https://k3s.io/) |
| Docker and Compose | Run AUGUR on the server, beside the cluster | [Docker](https://docs.docker.com/engine/) |
| Velero | Backs up the cluster to a bucket off the server | [Velero](https://velero.io/) |
| restic | Copies AUGUR's backups off the server, encrypted | [restic](https://restic.net/) |
| Tailscale | Gives a private network (the tailnet) to reach the server without opening ports | [Tailscale](https://tailscale.com/) |
| Homarr | Harry's home page for his services | [Homarr](https://homarr.dev/) |
| Apache DevLake | Collects delivery data from GitHub and shows the DORA metrics. See the [control centre](../control-centre/). | [Apache DevLake](https://devlake.apache.org/) |
| Grafana | Shows dashboards, including DevLake's | [Grafana](https://grafana.com/) |
| Prometheus | Collects metrics from services | [Prometheus](https://prometheus.io/) |
| Langfuse | Records and evaluates calls to language models | [Langfuse](https://langfuse.com/) |
| Infisical | Keeps secrets out of code | [Infisical](https://infisical.com/) |
| sops and age | Encrypt each environment's secrets in `endstate-gitops`, so only Harry and that server can read them | [sops](https://getsops.io/), [age](https://age-encryption.org/) |

## Plan and build with agents

| Tool | What it does here | Read more |
| --- | --- | --- |
| Linear | Tracks work as epics and issues | [Linear](https://linear.app/) |
| linear-link | Files each thread's work under a Linear epic and issue. See [linear-link](../linear-link/). | [Claude Code](https://claude.com/claude-code) |
| Claude Code | Does most of the building, in threads | [Claude Code](https://claude.com/claude-code) |
| Google Drive | Holds the working agreements | not linked |

## Feature flags

| Tool | What it does here | Read more |
| --- | --- | --- |
| OpenFeature | The one flag API in code | [OpenFeature](https://openfeature.dev/) |
| flagd | The flag file format, and the provider that reads it | [flagd](https://flagd.dev/) |
