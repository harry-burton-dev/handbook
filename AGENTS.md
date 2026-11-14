# Handbook

How Harry builds, ships and runs his projects, for every project. A Starlight site (ADR 0082 in AUGUR; here, decision 0001).

## Where things go

- Pages are in `src/content/docs/`, one folder per kind: `how-to/`, `reference/`, `explanation/`, `decisions/`. `how-to/write-a-page.md` says which kind a page is.
- Cross-project decisions are numbered pages in `decisions/`. A project's own decisions stay with that project.
- The shared docs check is `.github/workflows/docs-check.yml`; other repositories call it. `reference/docs-check.md` must match it.

## Writing

- Plain English: short sentences, the short word, headings in sentence case.
- Names one way: AUGUR, DevLake, OpenFeature, flagd, linear-link, GitHub. Vale's Terms rule enforces them.
- No server addresses, secrets or links to private chats in pages.

## Checking a change

- `pnpm install`, then `pnpm check` (needs Vale and lychee on the path). CI runs the same checks with Vale blocking.

## Pull requests

- Open them against `main`. Say "Part of PER-x" in the body when an issue spans several pull requests.
- Nothing in the repository names the tool that wrote it: no `Co-Authored-By` or session trailers on commits, no assistant attribution in pull requests.
