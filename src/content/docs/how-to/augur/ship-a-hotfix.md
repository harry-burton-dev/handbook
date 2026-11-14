---
title: Ship a hotfix
description: Fix a released AUGUR version on its release branch, then on main.
---

Hotfixes go into `release/<unit>-<major>.<minor>`, then onto `main`.

1. Ask Harry to cut the release branch, or to let you push it. A cloud session pushes only its own `claude/…` branch.
2. Make the fix, with a patch changeset, in a pull request into the release branch. Release branches accept only a `hotfix/…` branch or its Version packages pull request. Bring the branch up to date with its release branch, not with `main`.
3. That opens a Version packages pull request on the release branch. Merging it releases the patch. Harry merges Version packages unless he says otherwise.
4. Cherry-pick the fix to `main`, with its own changeset.
5. Never assume the server's state. Ask Harry for a command's output, or use Remote Control when he starts it.
