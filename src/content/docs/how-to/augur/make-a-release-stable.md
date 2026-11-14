---
title: Make a release stable
description: Hand Harry the step that moves an AUGUR release from beta to stable.
---

Only Harry makes a release stable. A thread prepares the step.

1. Check the release's `deploy-test.json` says `passed: true`.
2. Check it has no known defect. If it has, say so and advise against promoting it.
3. Give Harry the step: **Actions → Promote to stable**, unit `augur`, the version, and whether to skip bake.
4. Say why if bake is skipped. Promote needs 72 hours of bake on a `SERVER_RING=preview` deployment, and today nothing reports bake time, so it can only run with skip bake.
