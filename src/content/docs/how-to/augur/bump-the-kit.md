---
title: Bump the kit in AUGUR
description: Move AUGUR onto a new release of the kit.
---

A kit change reaches deployments only when an AUGUR pull request bumps `release/kit.json`.

1. Branch off `main`.
2. Set the version in `release/kit.json`, and the package versions it pins.
3. Run the **Lockfile** workflow on the branch, then pull its commit. A cloud session can't read GitHub Packages, so it can't update the lockfile itself.
4. Add a changeset: a patch, unless the kit change adds something AUGUR uses, which is a minor.
5. Open the pull request. `release/kit.json` is High and a deploy test path, so the deploy test runs before merge. It isn't on Harry's paths, so no `harry-ok` is needed.
6. Merge on green.
