---
title: Set up a server
description: Take an empty machine to a locked-down server that runs k3s, Argo CD and AUGUR's Compose stack, and say which steps are Harry's.
sidebar:
  order: 6
---

Do this once per machine. Steps marked **Harry** need his hands on the machine or give access. A thread does the rest through a Remote Control session on the server. [How deploys work](../../explanation/how-deploys-work/) explains why it's built this way.

## What you need

- A machine with at least 32 GB of memory. AUGUR alone needs 16 GB.
- [Ubuntu Server 24.04 LTS](https://ubuntu.com/download/server) on a USB stick.
- Harry's SSH public key.
- The private GitOps repository, `endstate-gitops`.

## 1. Install the system (Harry)

1. Install Ubuntu Server. Make one admin user, and paste Harry's SSH key when the installer asks.
2. Turn on OpenSSH in the installer. Leave every other snap unticked.
3. After the first boot, run `sudo apt update && sudo apt full-upgrade -y`, then reboot.

## 2. Join the tailnet (Harry)

1. In the [Tailscale admin console](https://login.tailscale.com/admin/machines), remove the old server's machines, so their names are free again.
2. On the server, install Tailscale and sign in, tagged `tag:server`:

   ```sh
   curl -fsSL https://tailscale.com/install.sh | sh
   sudo tailscale up --ssh --advertise-tags=tag:server
   ```

The tailnet is how Harry reaches his own machines. A product must never need it.

## 3. Start a Remote Control session (Harry)

Install [Claude Code](https://code.claude.com/docs/en/overview) as the admin user, sign in, and start Remote Control in `/opt/stacks`. From here a thread can do the rest.

## 4. Lock it down

```sh
# SSH: keys only, no root
printf '%s\n' 'PasswordAuthentication no' 'KbdInteractiveAuthentication no' 'PermitRootLogin no' |
  sudo tee /etc/ssh/sshd_config.d/10-harden.conf
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

Docker and Kubernetes publish ports around ufw. So nothing publishes a port to `0.0.0.0`. Services are reached through Tailscale's operator instead.

## 5. Install k3s and Argo CD

```sh
# k3s, without its own ingress: services are reached through Tailscale's operator
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik --write-kubeconfig-mode 600" sh -
mkdir -p ~/.kube && sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config && sudo chown "$USER" ~/.kube/config

# Argo CD, at the version pinned in endstate-gitops
kubectl create namespace argocd
kubectl apply -n argocd -f "https://raw.githubusercontent.com/argoproj/argo-cd/<version>/manifests/install.yaml"
```

Then point Argo CD at `endstate-gitops`, once. Its `bootstrap/` folder holds one app that installs every other app: the Image Updater, the sops plugin, Tailscale's operator, Velero, and each service. From here on, a change to the server is a pull request to that repository.

The server's age key goes in as a Kubernetes secret, so Argo CD can decrypt the secrets files. It never goes into Git.

## 6. Install Docker, for AUGUR

AUGUR runs on Compose beside the cluster (see [How deploys work](../../explanation/how-deploys-work/)). Install Docker Engine and the Compose plugin from [Docker's own apt repository](https://docs.docker.com/engine/install/ubuntu/), not Ubuntu's `docker.io`. In `/etc/docker/daemon.json`, cap the logs so a noisy container can't fill the disk:

```json
{ "log-driver": "local", "log-opts": { "max-size": "20m", "max-file": "5" }, "live-restore": true }
```

Make a `deploy` user for AUGUR's deploy job. It's in the `docker` group and owns `/opt/stacks/augur`. Its SSH key may run only the deploy command (`command=` in `authorized_keys`).

Install `cosign` and `sops` from their releases, for the deploy command.

## Check it worked

- `ssh` with a password is refused, and `sudo ufw status` shows only port 22 on `tailscale0`.
- `kubectl get nodes` shows the server `Ready`.
- Argo CD's page lists every app `Synced` and `Healthy`.
- `docker compose version` prints a version.
- The Remote Control session answers from `/opt/stacks`.
