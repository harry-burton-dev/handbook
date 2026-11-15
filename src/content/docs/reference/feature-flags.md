---
title: Feature flags
description: The one flag standard for every project.
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

Release safety doesn't come from flags. It comes from the release process: review, a staged rollout and a way to roll back. See [Pipelines](../pipelines/).

To add one, follow [Add a feature flag](../../how-to/add-a-feature-flag/).
