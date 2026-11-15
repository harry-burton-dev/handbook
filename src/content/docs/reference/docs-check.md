---
title: Docs check
description: What the shared docs check runs, and the settings a repository can pass it.
---

The docs check is the reusable workflow `.github/workflows/docs-check.yml` in the handbook. It runs in one job, in this order.

| Step | Tool | Fails when |
| --- | --- | --- |
| Markdown is consistent | markdownlint-cli2 0.24.1 | a rule in `.markdownlint-cli2.jsonc` is broken |
| Writing is plain and names are right | Vale 3.27.0 | an error-level rule is broken, and `vale-blocking` is on |
| The site builds | the repository's own build | the build fails (only when `build` is set) |
| Every link works | lychee 0.24.2 | a link or a `#fragment` is broken |

Tools are pinned by version and checksum, and actions by commit.

## Settings

| Input | Default | What it does |
| --- | --- | --- |
| `vale-blocking` | `false` | Fail on Vale errors. Warnings show either way. |
| `build` | empty | Command that builds the docs site, such as `pnpm build`. |
| `working-directory` | `.` | Where the site's `package.json` is. |
| `links` | `**/*.md` | What lychee checks: a site's built HTML (`dist`) or the Markdown. |

The runner is `ubuntu-latest` unless the calling repository sets the variable `CI_RUNNER`, as JSON (for example `"self-hosted"`).

## Vale rules

The Handbook style is in `.vale/styles/Handbook/`.

| Rule | Level | Looks for |
| --- | --- | --- |
| Terms | error | names written the wrong way, such as `Github` for GitHub |
| PlainWords | warning | long words with a short one, such as `utilise` for `use` |
| Vague | warning | `etc.` and `various` in place of the actual things |
| SentenceLength | warning | sentences over 30 words |
| Headings | warning | headings not in sentence case |
| Hedging | suggestion | `simply`, `just` and `easy` |

Words Vale should accept are in `.vale/styles/config/vocabularies/Handbook/accept.txt`.

## Links left out

`lychee.toml` leaves out links that CI can't reach: Harry's servers on the tailnet, Linear, Google Drive, Claude, and GitHub's edit pages, which need a sign-in.
