---
title: Set up a server
description: Take an empty machine to a locked-down Docker host that Harry's stacks can run on, and say which steps are Harry's.
sidebar:
  order: 6
---

Do this once per machine, before any stack goes on it. Steps marked **Harry** need his hands on the machine or give access. A thread does the rest through a Remote Control session on the server.

## What you need

- A machine with at least 32 GB of memory if AUGUR runs on it beside other stacks. AUGUR alone needs 16 GB.
- [Ubuntu Server 24.04 LTS](https://ubuntu.com/download/server) on a USB stick.
- Harry's SSH public key.

## 1. Install the system (Harry)

1. Install Ubuntu Server. Make one admin user, and paste Harry's SSH key when the installer asks.
2. Turn on OpenSSH in the installer. Leave every other snap unticked.
3. After the first boot, run `sudo apt update && sudo apt full-upgrade -y`, then reboot.

## 2. Join the tailnet (Harry)

1. In the [Tailscale admin console](https://login.tailscale.com/admin/machines), remove the old server's machines, so their names are free again.
2. On the server, install Tailscale and sign in:

   ```sh
   curl -fsSL https://tailscale.com/install.sh | sh
   sudo tailscale up --ssh
   ```

3. In the admin console, turn off key expiry for the new machine.

The tailnet is how Harry reaches his own machines. A product must never need it, so it isn't part of any product's design.

## 3. Start a Remote Control session (Harry)

Install [Claude Code](https://code.claude.com/docs/en/overview) as the admin user, sign in, and start Remote Control in `/opt/stacks`. From here a thread can do the rest.

## 4. Lock it down

```sh
# SSH: keys only, no root
sudo tee /etc/ssh/sshd_config.d/10-harden.conf <<'EOF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
EOF
sudo systemctl reload ssh

# Firewall: nothing in, except SSH over the tailnet
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow in on tailscale0 to any port 22 proto tcp
sudo ufw --force enable

# Security updates by themselves
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -f noninteractive unattended-upgrades
```

Docker publishes ports around ufw. So a stack binds each port it publishes to `127.0.0.1`, or to the server's tailnet address, never to `0.0.0.0`.

## 5. Install Docker

Install Docker Engine and the Compose plugin from [Docker's own apt repository](https://docs.docker.com/engine/install/ubuntu/), not Ubuntu's `docker.io`. Then cap the logs, so a noisy container can't fill the disk:

```sh
sudo tee /etc/docker/daemon.json <<'EOF'
{ "log-driver": "local", "log-opts": { "max-size": "20m", "max-file": "5" }, "live-restore": true }
EOF
sudo systemctl restart docker
sudo usermod -aG docker "$USER"
```

Also install `cosign` from [its releases](https://github.com/sigstore/cosign/releases), to check signed bundles.

## 6. Lay out the stacks

Each stack gets its own folder under `/opt/stacks/<name>`, its own Compose project and its own `.env`, readable only by its owner (`chmod 600`). A stack's secrets live in that `.env` and in the fleet repository's encrypted file, never in Git as plain text.

| Folder | What it runs | How it deploys |
| --- | --- | --- |
| `/opt/stacks/augur` | AUGUR, the workbench | [Deploy AUGUR to the workbench](../deploy-augur-to-the-workbench/) |
| `/opt/stacks/<tool>` | One of Harry's tools, such as DevLake | Its own pinned Compose file |

Give each stack a memory limit, so one stack can't starve the others.

## Check it worked

- `ssh` with a password is refused, and `sudo ufw status` shows only port 22 on `tailscale0`.
- `docker compose version` prints a version.
- `cosign version` prints a version.
- The Remote Control session answers from `/opt/stacks`.
