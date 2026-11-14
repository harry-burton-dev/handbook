---
title: Add a feature flag
description: Add a flag to any project with OpenFeature and a flagd file in the repository.
sidebar:
  order: 3
---

Every project uses the same flag standard: the OpenFeature API, flags in a flagd file kept in the repository, and no central flag server. [Feature flags](../../reference/feature-flags/) has the details and [Why flags have no server](../../explanation/why-flags-have-no-server/) the reasons.

AUGUR is different: an app declares a **feature preview** in its manifest, and Admin turns it on. Use that in AUGUR apps, not this guide.

## Steps

1. **Add the OpenFeature SDK** for the project's language, and the flagd provider. Where the project can't run a flagd container, use the provider's in-process file mode.
2. **Add the flag to `flags.json`** at the repository root, in flagd's format:

   ```json
   {
     "$schema": "https://flagd.dev/schema/v0/flags.json",
     "flags": {
       "new-canvas": {
         "state": "ENABLED",
         "variants": { "on": true, "off": false },
         "defaultVariant": "off",
         "metadata": { "owner": "PER-123", "removeBy": "2027-02-01" }
       }
     }
   }
   ```

   Give every flag an `owner` (its Linear issue) and a `removeBy` date.
3. **Read it in code** through OpenFeature, with a safe default:

   ```ts
   const client = OpenFeature.getClient();
   const on = await client.getBooleanValue('new-canvas', false);
   ```

4. **Add the OpenTelemetry hook**, so each check is a span and a metric in the same place as the project's other telemetry.
5. **List the flag** in the repository's `docs/flags.md`.
6. **Remove the flag** by its `removeBy` date: delete the code path you aren't keeping, the entry in `flags.json` and the line in `docs/flags.md`.
