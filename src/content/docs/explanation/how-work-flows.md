---
title: How work flows
description: From Harry's ask to a change running on a server, and who does each step.
sidebar:
  order: 1
---

Harry works alone, with Claude threads doing most of the building. The process is built so that a thread can do a whole piece of work without asking, and Harry only does the few steps that need him.

## The flow

1. **Harry asks** in a Claude project's chat. The coordinator opens a thread for the work.
2. **The thread files the work in Linear** under an epic, with linear-link (WA-002). See [Start an epic or an issue](../../how-to/start-an-epic-or-issue/).
3. **The thread makes the change** on a branch, runs the repository's checks, and opens a draft pull request.
4. **The review tier decides what else is needed** (WA-007). Medium and High get a fresh `/code-review high`. A change that runs on a server gets the deploy test. Harry's short list of paths needs his ok.
5. **The thread merges its own pull request** once CI and the Review check are green (WA-003).
6. **Releases** follow the repository's release style, see [Pipelines](../../reference/pipelines/). Promoting a release is Harry's step.
7. **Servers** are upgraded by Harry. A thread can't see his servers, so it never assumes a step there worked.

## What only Harry does

- Answers the three questions on his paths: what isn't tested, how to undo it, and which release path it takes.
- Merges into production, and promotes releases.
- Changes repository settings, secrets and billing.
- Accepts working agreements.
- Anything on his servers, unless he starts a Remote Control session for it.

## Rules that hold everywhere

- Nothing in a repository names the tool that wrote it: no `Co-Authored-By` or session trailers, no assistant footers in pull requests, no links to private chats.
- One pull request at a time per thread, small enough to review in one sitting.
- Agents act as Harry on GitHub, so every pull request and Linear comment says which thread did the work.
- Check memory and skills against the source. They go stale.
