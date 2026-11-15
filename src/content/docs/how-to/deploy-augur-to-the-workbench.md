---
title: Deploy AUGUR to the workbench
description: Put AUGUR on Harry's server as the workbench, from its file in augur-fleet, so it follows main by itself.
sidebar:
  order: 7
---

The workbench is the AUGUR server things are built on. It runs ring `dev`, so it takes a dev build of every merge into AUGUR's `main` by itself. It backs up first, and rolls back if the build doesn't come up. [How deploys work](../../explanation/how-deploys-work/) explains the model.

AUGUR's own docs hold the detail. This page is the order to do it in, and who does each step. Steps marked **Harry** need him.

## Before you start

- The server is set up: [Set up a server](../set-up-a-server/).
- The release you install has a signed deploy bundle, `augur-deploy-<version>.tar.gz`. Releases up to 0.26.x have none. Dev builds have none either, so the first install is from a release.
- A checkout of [augur-fleet](https://github.com/harry-burton-dev/augur-fleet), Harry's fleet repository, and of [augur](https://github.com/harry-burton-dev/augur).

## 1. Get the keys ready (Harry)

1. **Tailscale auth key.** In the admin console, under Settings, then Keys, make a reusable key tagged `tag:augur`. A tagged key never expires.
2. **Read key.** Make a classic GitHub token with only `read:packages`. The server pulls images and reads the signed release feed with it.
3. **Backup bucket.** Make an S3-compatible bucket off the server, such as Backblaze B2 or Cloudflare R2, and a key that can reach only that bucket.
4. **age keys.** On his own machine, `age-keygen -o ~/.config/sops/age/keys.txt`. Keep the file in his password manager, and give the thread the public key, the line starting `age1`.

Each of these gives access, so a thread never makes one.

## 2. Install the tools on the server

As the admin user, from `/opt/stacks`:

```sh
git clone https://github.com/harry-burton-dev/augur.git augur-src
cd augur-src && pnpm install --filter .   # augurctl's own packages, no package token needed
```

Install [sops](https://github.com/getsops/sops/releases) and [age](https://github.com/FiloSottile/age/releases) from their releases. Make the server's own age key with `age-keygen -o ~/.config/sops/age/keys.txt` and `chmod 600` it.

## 3. Write the workbench's file

In augur-fleet, on a branch:

1. In `.sops.yaml`, encrypt `secrets/workbench.sops.env` for two keys: Harry's and the server's. The server can then read only its own secrets.
2. In `deployments/workbench.yaml`, set the new server: `host.ssh: local`, `host.dir: /opt/stacks/augur`, the release to install, and these settings beyond the URL and machine name:

   ```yaml
   ring: dev
   release: <the first release with a deploy bundle>
   settings:
     COMPOSE_PROFILES: updater        # the server upgrades itself
     SEED_ALLOWED: "true"             # sample people only: no real ones on the workbench
     GITHUB_READ_USER: harry-burton-dev
   ```

3. Run `node <augur>/scripts/augurctl/augurctl.mjs check --dir deployments`, and open a pull request.

Keep `COMPOSE_PROJECT_NAME` unset, so the project is `platform`, the name AUGUR expects.

## 4. Make the secrets

```sh
node <augur>/scripts/augurctl/augurctl.mjs init workbench --dir deployments
sops secrets/workbench.sops.env
```

`init` makes every secret AUGUR can make up. In `sops`, add the ones only Harry has: `TS_AUTHKEY`, `PLATFORM_ADMIN_PASSWORD` and the `OFFSITE_*` bucket settings. Commit only the encrypted file.

Then put the read key where the server reads it. The preflight stops if `GITHUB_READ_USER` is set and the file isn't there:

```sh
mkdir -p /opt/stacks/augur/infra/deploy/secrets
printf '%s' '<the read key>' > /opt/stacks/augur/infra/deploy/secrets/github-read-key
sudo chown 1000 /opt/stacks/augur/infra/deploy/secrets/github-read-key
sudo chmod 600 /opt/stacks/augur/infra/deploy/secrets/github-read-key
```

## 5. Install it

```sh
node <augur>/scripts/augurctl/augurctl.mjs up workbench --dir deployments
```

`up` fetches the release's bundle, checks its cosign signature, checks its sums on the server, writes `.env` and runs the preflight. It starts AUGUR only when the preflight ends `✓ Ready`. If the preflight stops it, fix what it says and run `up` again.

## 6. Check it

1. `node <augur>/scripts/augurctl/augurctl.mjs plan workbench --dir deployments` exits 0: the server matches its file.
2. From a device on the tailnet, open the workbench's address and sign in as the admin. Choose a new password.
3. **Deployment, then Health** shows every part working.
4. **Deployment, then Backups** shows a backup, a restore test and an off-server copy, within a few minutes.

## 7. Let it follow main

1. In augur-fleet, set `release: follow` in `deployments/workbench.yaml`, and merge the pull request. From now on the server's updater picks the release, not the file.
2. Fill it with sample people: [AUGUR's seed guide](https://github.com/harry-burton-dev/augur/blob/main/docs/seed.md).
3. Install the apps the file lists, and set each one's **Releases from** to Dev builds in Deployment, so their `main` reaches the workbench too.

## When a dev build goes wrong

- It didn't come up: the updater went back by itself, and that build is never taken again by itself. Fix it on `main`, and the next dev build comes.
- It came up but is wrong: **Go back** in Deployment, then fix on `main`.
- The server is lost: [Restore a lost server](https://github.com/harry-burton-dev/augur/blob/main/docs/src/content/docs/run/restore-a-lost-server.md), from the off-server copy and the sops file.

## Read more

- [Install AUGUR](https://github.com/harry-burton-dev/augur/blob/main/docs/src/content/docs/run/install.md): every setting and check.
- [Run deployments from files](https://github.com/harry-burton-dev/augur/blob/main/docs/src/content/docs/run/from-files.md): augurctl's commands.
- [Release channels](https://github.com/harry-burton-dev/augur/blob/main/docs/release-channels.md): rings, dev builds, going back and halting.
