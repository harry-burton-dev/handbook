---
title: Fix a release's failed deploy test
description: Find out whether the product or the test is wrong, fix it, and run the test again.
---

The beta feed offers a release only once its `deploy-test.json` says it passed.

1. Read the failed job's step: list the run's jobs, then read the failed job's log.
2. Decide whether the product or the test is wrong. On recent releases it has usually been the test.
3. Fix it on `main` in a High pull request. The deploy test runs on it before merge.
4. Dispatch the **Deploy test** workflow with `to=<version>`.
5. Check that `deploy-test.json` on the release says `passed: true`.
