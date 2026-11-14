---
title: Add an app repository to the feed
description: Make a new app repository's releases installable by AUGUR deployments.
---

1. Check the repository exists and releases as `app/<id>@X.Y.Z`.
2. Add it to `release/app-repos.json`. That file is on Harry's paths, so ask the three questions and add `harry-ok` only after he says ok. Or Harry edits the `APP_REPOS` Actions variable instead.
3. Run the **Release feed** workflow.
4. Give Harry his server steps as a numbered list:
   1. Set `GITHUB_READ_USER` and `GITHUB_READ_KEY` (a key with `read:packages`).
   2. Add the publisher to `APP_PUBLISHERS`.
