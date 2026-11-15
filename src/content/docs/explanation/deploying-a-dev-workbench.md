---
title: Deploying a dev workbench
description: How a professional team puts its dev branch on a server as a working environment, phase by phase, with the standard practice and common tools for each.
sidebar:
  order: 3
---

A dev workbench is a server that always runs the newest code from the dev branch. On a trunk-based team, that's `main`. People use it to see and test the product as it is today.

This page is the standard practice, from first principles. It doesn't assume any of Harry's current tools. Mapping it to them comes later, one phase at a time.

## The rules behind every phase

- **Build once, deploy many.** CI builds one artifact per commit. Dev, staging and production all run that same artifact, never a rebuild.
- **Everything is code.** The server, its config and its deploys are files in Git. A person never changes a server by hand.
- **The server can be thrown away.** Rebuilding it from the code and the backups takes under an hour.
- **Secrets never sit in Git or in an image** as plain text.
- **Every deploy can be undone,** and the team has done it at least once.

## The phases

### 1. Provision the server

**Standard practice.** Describe the server in code: its size, disk, network and DNS. Create it from that code. When it breaks, replace it rather than repair it. Keep one server per environment, so dev can't hurt staging.

**Common tools.** OpenTofu or Terraform for the machine. cloud-init or Ansible for what goes on it.

### 2. Harden it

**Standard practice.** Follow a known baseline, such as the CIS Benchmark for the OS.

- SSH with keys only, no passwords and no root login.
- A firewall that denies everything coming in by default.
- Security updates install by themselves.
- Each service runs as its own unprivileged user or container.
- An audit runs on a schedule and its report is kept.

**Common tools.** Ansible with the dev-sec hardening roles. Lynis for the audit.

### 3. Control network access

**Standard practice.** Dev is private by default. People reach it through a VPN or an identity-aware access proxy, never on an open port. Admin access, such as SSH, goes through the same path. If dev must be public, only a reverse proxy faces the internet. It serves HTTPS with a real certificate on a proper name, such as `dev.example.com`, and puts a sign-in in front.

**Common tools.** WireGuard or an access proxy such as Teleport or Cloudflare Access. Caddy, Traefik or nginx as the reverse proxy, with Let's Encrypt certificates.

### 4. Build, sign and store the artifact

**Standard practice.**

- CI builds a container image for each merge.
- The image is tagged with the commit SHA, and deployed by its digest, never by `latest`.
- CI signs the image and attaches an SBOM, a list of what's inside it.
- The image goes to a container registry. The server refuses an image without a valid signature.
- Old images are cleaned up on a schedule, keeping enough to roll back.

**Common tools.** A registry such as GHCR, or Harbor self-hosted. cosign for signing, Syft for the SBOM.

### 5. Deploy

**Standard practice.**

- Each merge to the dev branch deploys to dev automatically. Nobody presses a button.
- The deploy names the exact image digest, so you always know what's running.
- It waits for health checks before it calls itself done, and it fails loudly if they don't pass.
- Where it can, it starts the new version before stopping the old one, so there's no downtime.
- Every deploy is recorded: what, when, from which commit, and whether it worked.

There are two shapes, and both are standard:

| Shape | How it works | Fits | Common tools |
| --- | --- | --- | --- |
| Push | CI connects to the server at the end of the pipeline and deploys | One or a few servers running containers | Kamal, Ansible, or SSH plus Docker Compose |
| Pull | An agent on the server watches Git or the registry and deploys what it sees | A Kubernetes cluster, or many servers | Argo CD or Flux |

A small team with one server usually pushes. A pull agent is worth it once there's a cluster or a fleet.

### 6. Manage config and secrets

**Standard practice.**

- Config lives in the environment, not the code (the [Twelve-Factor App](https://12factor.net/config) rule). The same image reads different settings in dev and production.
- Settings that aren't secret live in Git, one file per environment.
- Secrets live in a secrets manager, or in Git only if encrypted. They're injected at deploy time and never baked into an image.
- Each environment has its own secrets. Dev never holds a production password.
- Secrets can be rotated without a code change, and rotating one is practised.

**Common tools.** SOPS with age keys for encrypted files in Git. HashiCorp Vault or OpenBao, Infisical, or a cloud provider's secrets manager.

### 7. Environments and promotion

**Standard practice.**

| Environment | Runs | Moves when | Data |
| --- | --- | --- | --- |
| Dev (the workbench) | The newest commit on the dev branch | Every merge, automatically | Synthetic data only |
| Preview (optional) | One pull request | When the pull request opens, then deleted when it closes | Synthetic data only |
| Staging | A release candidate | A person or a passing pipeline promotes it | A copy shaped like production, with personal data removed |
| Production | A released version | An approval, after staging | Real data |

- Promotion moves the **same artifact** forward. Nothing is rebuilt for staging or production.
- Environments are as alike as possible: same OS, same images, same kind of database. Only config differs.
- Database changes only add, or are made in two steps (expand, then contract). The old version can then still run on the new schema, so a rollback is safe.

**Common tools.** The CI system's environments and approval gates, such as GitHub Environments or GitLab environments.

### 8. Observe it

**Standard practice.**

- Logs from every service go to one place and are kept for a set time.
- Metrics show the four golden signals: traffic, errors, latency and saturation.
- An outside uptime check confirms the workbench answers. It's run from somewhere other than the server itself.
- Errors are grouped and sent to the person who owns them.
- An alert reaches a person only when they need to act. Dev alerts go to a chat channel, not a pager.

**Common tools.** OpenTelemetry to collect. Prometheus and Grafana, with Loki for logs. Uptime Kuma or Gatus for uptime. Sentry for errors.

### 9. Back up and prove the restore

**Standard practice.**

- Follow the 3-2-1 rule: three copies, on two kinds of storage, one off the site. The off-site copy is encrypted.
- Back up data, not servers. The servers are rebuilt from code.
- Back up the database in a way it's built for, with point-in-time recovery where it matters.
- Test a restore on a schedule, into a throwaway environment, and record that it worked.
- Write down how much data you can lose (RPO) and how long a restore may take (RTO). Dev can accept more than production.

**Common tools.** restic or Borg for files. pgBackRest or WAL-G for Postgres. Any S3-compatible bucket off site.

### 10. Roll back

**Standard practice.**

- A failed health check rolls back on its own to the last good version.
- A person can roll back with one command or one click, by redeploying the previous digest.
- Keep the last several images in the registry, so there's always something to go back to.
- When a database change can't be undone, roll forward with a fix instead. Restore from backup only as a last resort.
- Feature flags can turn a bad feature off without any deploy.

**Common tools.** The deploy tool's own rollback, such as `kamal rollback` or Argo CD's history. A feature flag tool, such as OpenFeature with flagd.

## Done when

The workbench is set up properly when all of these are true:

- [ ] The server can be rebuilt from code and backups, and that has been tried.
- [ ] A merge to the dev branch is live on dev within minutes, with nobody touching it.
- [ ] Anyone can say which commit dev runs, and when it was deployed.
- [ ] No secret sits in Git or in an image as plain text.
- [ ] Dev isn't reachable from the internet without a sign-in.
- [ ] A bad deploy rolls itself back, and a person can roll back in one step.
- [ ] A restore from the off-site backup has been tested and timed.
- [ ] Someone hears about it when dev is down.
