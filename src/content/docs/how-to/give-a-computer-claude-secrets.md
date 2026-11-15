---
title: Give a computer its Claude secrets
description: Set up Claude Desktop on a Windows computer so its MCP servers get their tokens from Infisical.
sidebar:
  order: 5
---

This sets up a new computer the way [How a local Claude gets its secrets](../../explanation/how-a-local-claude-gets-its-secrets/) describes. It assumes Infisical already has the "Claude tools" project and a read-only machine identity for it.

## Before you start

- [Tailscale](https://tailscale.com/download) is running and signed in to the tailnet.
- [Claude Desktop](https://claude.ai/download) is installed.
- The [Infisical CLI](https://infisical.com/docs/cli/overview) is installed. If `winget` is missing, `npm install -g @infisical/cli` works. Note the path to `infisical.exe`.
- You have the machine identity's client ID and client secret, and the project ID. They're in Infisical, under the identity and the project's settings.

## Set it up

1. Copy `run-mcp.ps1` and `set-infisical-cred.ps1` from `~/.config/mcp/` on a computer that already works. Don't copy `infisical.cred` or `infisical-project.txt`: the script makes them, and the credential only works on the computer that made it.
2. Copy the `mcpServers` section of `claude_desktop_config.json` into the same file on the new computer. Each server's command runs `run-mcp.ps1` with the server's name, then the command that starts the server.
3. Check the top of `run-mcp.ps1`: it sets the path to `infisical.exe` and Infisical's tailnet address. Change the path if the CLI is in a different place.
4. In PowerShell, save the credential:

   ```powershell
   powershell -File $env:USERPROFILE\.config\mcp\set-infisical-cred.ps1
   ```

   It asks for the client ID, the client secret (hidden as you type) and the project ID, then prints "Saved encrypted. Nothing readable is stored."

5. Quit and reopen Claude Desktop.

## Check it

In Claude Desktop, open Settings, then Developer. Each MCP server should show as running. Ask Claude to use one, such as listing the Coolify applications.

If a server fails, check that Tailscale is connected, then look at the server's log from the same Developer page.

## Add a service

1. In Infisical, add the service's token to "Claude tools" in `prod`, at the top level.
2. Add the MCP server to `claude_desktop_config.json` on each computer, started through `run-mcp.ps1`.
3. Restart Claude Desktop.

## Rotate a token

Change the secret in Infisical. Restart Claude Desktop on each computer to pick it up.

## Rotate the machine identity

1. In Infisical, add a new client secret to the identity, and revoke the old one.
2. On each computer, run `set-infisical-cred.ps1` again with the new secret.
