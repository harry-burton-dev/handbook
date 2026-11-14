---
title: Repositories
description: Harry's repositories, what each is, and how it releases.
---

All on GitHub under `harry-burton-dev`. The AUGUR repositories and the handbook are public, so their Actions minutes are free.

## AUGUR

| Repository | What it is | Releases as |
| --- | --- | --- |
| `augur` | The platform: shell, SDK, services, packaging, deploy test, release feed | `augur@X.Y.Z`, plus `@augur/*` packages |
| `augur-kit` | The React kit and Storybook | `kit@X.Y.Z` (0.x: features ship as patches) |
| `augur-app-template` | Starter, the app template; the deploy test installs it | never (use an empty changeset) |
| `augur-folio` | Artifacts app | `app/<id>@X.Y.Z` |
| `augur-atlas` | Data Atlas app | `app/<id>@X.Y.Z` |
| `augur-auspex` | Explorer app | `app/<id>@X.Y.Z` |
| `augur-mandate` | Mandate app | `app/<id>@X.Y.Z` |
| `augur-run` | Scripted synthetic use of a deployment | doesn't release |
| `backstage-hb` | Backstage portal | image build only |

AUGUR is trunk-based: `main` is the only long-lived branch. Releases are built and signed once with cosign, as GitHub pre-releases on beta.

## Other projects

Outside AUGUR, repositories release with Release Please ([Set up releases](../../how-to/set-up-releases/)).

| Repository | What it is | Notes |
| --- | --- | --- |
| `handbook` | This handbook | Starlight; releases as `handbook@X.Y.Z` |
| `gen-ui` | A canvas web app (`apps/web`) | can reach a server |
| `muster` | Power Platform solution | locked-down tenant: no API access or custom code |
| `rn-design` | HTML pages | opened from `file://` on locked-down machines |
| `Org`, `org-chart` | not described yet | |

Projects tracked in Linear without a repository here include Endstate, Biography Pack-up Builder and Apollo.
