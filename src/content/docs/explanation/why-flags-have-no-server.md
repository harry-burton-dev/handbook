---
title: Why flags have no server
description: Why every project shares a flag standard rather than a flag platform such as FeatBit or Unleash.
sidebar:
  order: 2
---

Harry wants the same process and the same view of flags in every project. A shared flag server can't give that, because several projects can't reach one:

- **Locked-down tenants** run with no API access and no custom code, so they can't call a server.
- **Local HTML** opened from `file://` on locked-down machines can't call one either.
- **Mirrored or air-gapped deployments** each stand on their own. A central server would break that, and one per deployment adds a database to every install.

So the sameness comes from one standard, not one server: one API (OpenFeature), one file format (flagd), one telemetry path (OpenTelemetry), and one view (the control centre).

## Why not a platform now

FeatBit, Unleash, Flagsmith and GrowthBook all bring a second server, a UI and a database. Their paid features (approvals, audit, scheduling) overlap with what the release process already gives: review, a changelog, and a staged rollout. There are three platform previews and one maintainer.

## When to look again

Code talks only to OpenFeature, so a platform is a provider change, not a rewrite. Revisit when a project has real users who need percentage rollouts or A/B tests: GrowthBook for experiments, Unleash or FeatBit for a shared UI.

The full review is on PER-428.
