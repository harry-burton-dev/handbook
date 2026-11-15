---
title: Deploy AUGUR to the workbench
description: Run AUGUR's main on Harry's server as the dev environment, deployed from endstate-gitops by a GitHub Actions job.
sidebar:
  order: 7
---

The workbench is AUGUR's `dev` environment. It runs `main`, a few minutes after each merge. What it runs is a commit in `endstate-gitops`, so a deploy is a commit and a rollback is `git revert`. [How deploys work](../../explanation/how-deploys-work/) says why AUGUR uses Compose and not the cluster.

Steps marked **Harry** need him.

## How it fits together

1. AUGUR's dev build workflow builds and signs the images for a merge into `main`, then tells `endstate-gitops` with a `repository_dispatch`.
2. A job in `endstate-gitops` writes the new digests to `envs/dev/augur/images.env`, with the AUGUR commit they came from, and commits that to `main`.
3. That commit starts the **Deploy** workflow, in the `dev` environment. It joins the tailnet as `tag:ci` and runs the deploy command on the server as the `deploy` user.
4. The deploy command fetches `infra/deploy` at that AUGUR commit, checks each image's cosign signature, runs AUGUR's backup, then `docker compose up --wait`.
5. If any part isn't healthy in time, it starts the last good digests again, and the job fails. GitHub keeps each deploy, good or bad, in the environment's history.

## 1. Get the keys ready (Harry)

1. **Tailscale.** In the admin console, make an OAuth client with the `auth_keys` scope and the tag `tag:ci`. In the access rules, let `tag:ci` reach `tag:server` on port 22 only. Save its id and secret as the `TS_OAUTH_CLIENT_ID` and `TS_OAUTH_SECRET` secrets of the `dev` environment in `endstate-gitops`.
2. **Dispatch token.** Make a fine-grained GitHub token with Contents write on `endstate-gitops` only. Save it as the `GITOPS_DISPATCH_TOKEN` secret in augur.
3. **Read key.** Make a classic GitHub token with only `read:packages`, for the server to pull images.
4. **Backup bucket.** Make an S3-compatible bucket off the server, such as Backblaze B2 or Cloudflare R2, and a key that reaches only that bucket.
5. **age key.** On his own machine, `age-keygen -o ~/.config/sops/age/keys.txt`. Keep the file in his password manager, and give the thread the public line, starting `age1`.

Each of these gives access, so a thread never makes one.

## 2. Write the environment

In `endstate-gitops`, on a branch, a thread adds:

- `envs/dev/augur/settings.env`: the settings that aren't secret, with `SERVER_RING=dev` and `SEED_ALLOWED=true`. Leave `COMPOSE_PROFILES` without `updater`, so Git is the only thing that changes what runs.
- `envs/dev/augur/secrets.sops.env`: every secret, encrypted for Harry's age key and the server's. `augurctl init` in AUGUR's repository makes the ones AUGUR can make up. Harry adds `TS_AUTHKEY`, `PLATFORM_ADMIN_PASSWORD` and the `OFFSITE_*` bucket settings with `sops`.
- `envs/dev/augur/images.env`: the first dev build's digests.
- `.github/workflows/deploy-augur.yml`: the Deploy workflow, with actions pinned by commit and `permissions: contents: read`.
- `bin/deploy-augur`: the deploy command. It's installed on the server as the `deploy` user's forced command.

The thread opens a pull request, and merges it on green.

## 3. First deploy

Merging that pull request runs the Deploy workflow. Then check:

1. The workflow's run is green, and the `dev` environment shows the deploy.
2. On the server, `docker compose ps` in `/opt/stacks/augur` shows every container `healthy`.
3. From a device on the tailnet, open the workbench's address and sign in as the admin. Choose a new password.
4. **Deployment, then Health** shows every part working. **Deployment, then Backups** shows a backup and an off-server copy.

Then fill it with sample people: [AUGUR's seed guide](https://github.com/harry-burton-dev/augur/blob/main/docs/seed.md).

## When a deploy goes wrong

- **It didn't come up.** The deploy command put the last good digests back, and the run is red. Fix it on `main`, and the next dev build deploys.
- **It came up wrong.** `git revert` the digest commit in `endstate-gitops`. That deploys the version before. A data migration is never undone this way: restore the backup the deploy took instead.
- **The server is lost.** [Set up a server](../set-up-a-server/), re-run the last Deploy, and restore the data from the bucket ([Restore a lost server](https://github.com/harry-burton-dev/augur/blob/main/docs/src/content/docs/run/restore-a-lost-server.md)).

## Read more

- [Install AUGUR](https://github.com/harry-burton-dev/augur/blob/main/docs/src/content/docs/run/install.md): every setting and check.
- [Release channels](https://github.com/harry-burton-dev/augur/blob/main/docs/release-channels.md): rings, dev builds and signatures.
