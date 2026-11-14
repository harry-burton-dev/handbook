---
title: Feature flags
description: The one flag standard for every project, and how AUGUR's feature previews fit it.
---

Harry chose this standard on 14 Nov 2026 (PER-428). Rollout is PER-431.

## The standard

| Part | What every project uses |
| --- | --- |
| API | OpenFeature, in every codebase that can run it |
| Flag file | flagd's JSON format, as `flags.json` in the repository |
| Server | none; flagd as a small container, or its in-process file provider |
| Telemetry | OpenFeature's OpenTelemetry hooks: every check is a span and a metric |
| List | `docs/flags.md` in each repository |
| View | the control centre's Flags page reads every repository's flag file and finds stale flags |

Every flag has an `owner` (its Linear issue) and a `removeBy` date in its metadata.

## Where each project stands

| Project | Flags today |
| --- | --- |
| AUGUR | Feature previews, built into the registry. Moving onto OpenFeature and flagd (ADR 0021) isn't started. |
| gen-ui | One hard-coded switch, `SANDBOX_ENABLED`. The first candidate for the standard. |
| muster | None. Power Platform can't run the SDK: a flag there is a setting in the solution. |
| rn-design | None. Pages run from `file://`, so they'd use the in-process file provider. |
| Others | None. |

## AUGUR's feature previews

- An app lists `previews` in its manifest: id, name, detail, and an optional `until` end date.
- Code asks `ctx.previewOn('<id>')`.
- Admin → Apps sets each to Off, Opt-in, Everyone, or chosen floors.
- Defaults follow the ring: opt-in on dev and preview, off on production. Past `until`, it turns off.
- Release safety isn't done with flags. It's done with release channels, server rings, bake time, the deploy test and Halt rollout.
