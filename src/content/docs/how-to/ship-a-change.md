---
title: Ship a change
description: From a branch to a merged pull request, with the review the change's tier needs.
sidebar:
  order: 2
---

This is the path for any repository with a `REVIEW.md` and `.github/review-tiers.json`. Each repository's `AGENTS.md` adds its own checks.

## Steps

1. **Branch** off `main`. Cloud sessions push only to their own `claude/…` branch.
2. **Make the change** and run the checks `AGENTS.md` lists.
3. **Add a changeset** (`pnpm changeset`, or `pnpm changeset --empty` for a change that doesn't release).
4. **Find the tier.** A pull request takes the tier of its highest path (WA-007):

   | Tier | Paths | Needs before merge |
   | --- | --- | --- |
   | Low | shipped docs, copy, stories, tests, changesets, dependency bumps | green CI |
   | Medium | ordinary product code | green CI and a fresh review |
   | High | sign-in and permissions, data migrations, storage, public API contracts, infrastructure, release and workflow files | the review, under 400 lines, and a deploy check where a server runs it |

   When unsure, go up a tier. The Review check works the tier out from `.github/review-tiers.json`.

5. **Review Medium and High** with `/code-review high` in a fresh context. Fix or answer every finding. At most two rounds. If round two still finds something, stop and say so.
6. **Write the description** with five sections: Testing, Not run, Risk, How to undo, Review. Say "Part of PER-x" when the issue spans several pull requests.
7. **Open the pull request** as a draft.
8. **On Harry's paths** (the `harryOk` list), ask Harry the three questions in the thread: what isn't tested, how to undo it, and which release path it takes. Add the `harry-ok` label only after he says ok. Any later change to the diff removes it.
9. **Merge** once CI and Review are green, after merging fresh `origin/main` in and re-running the checks (WA-003).

## Keep the review cheap

A change that only renames a path in comments still takes that file's tier. If a docs move would touch Harry's paths, ship the docs first and leave a pointer at the old path. Then change the references in a small pull request of their own.
