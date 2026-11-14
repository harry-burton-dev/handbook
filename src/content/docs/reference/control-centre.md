---
title: Control centre
description: Where Harry sees the state of every project, from Apache DevLake on the MSI server and a pinned Claude artifact.
---

The control centre is epic CC. It covers every project, not only AUGUR.

| Part | What it is | Issue |
| --- | --- | --- |
| Apache DevLake | Collects from GitHub and other sources, and shows DORA metrics in its Grafana | PER-429 |
| Pinned artifact | A Claude artifact Harry keeps pinned, with the state across projects | PER-430 |
| Flags view | Every repository's flag file and AUGUR's previews, with stale flags | PER-431 |
| Docs health | Per repository: docs kit present, last docs check, runbook age | PER-437 |

## DevLake

- Runs on the MSI server as a Docker Compose stack, version 1.0.2, reached over the tailnet.
- Its config UI uses basic auth. Its secrets are in the stack's `.env` on the server, never in a repository.
- It has no Linear plugin in this version, so Linear data doesn't reach it yet.
- The server's memory is tight, so add collectors one at a time and watch it.

## DORA metrics

DevLake measures the four keys from GitHub: deployment frequency, lead time for changes, change failure rate and time to restore. For AUGUR, a release is a `<unit>@X.Y.Z` tag, and lead time runs from a commit to the first release tag that holds it.
