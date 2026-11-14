---
title: Start an epic or an issue
description: File a thread's work in Linear with linear-link before writing anything.
sidebar:
  order: 1
---

Every piece of work belongs to a Linear issue inside an epic (WA-002). linear-link enforces it: a thread that hasn't named an epic can't write documents or publish artifacts. [linear-link](../../reference/linear-link/) has the rules.

## Start an issue

1. Find the issue in Linear, team PER. If there isn't one, check for a near match, then create it in the epic's Linear project with a short task title.
2. Run the **start-issue** skill with the issue key and title. It makes the issue's folder and puts the thread on it.
3. Post one comment on the Linear issue: `Thread started: <thread title> <thread link>`.
4. The thread's title changes to `EPIC · ISSUE · description` on Harry's next message.

A thread that moves to another issue runs start-issue again.

## Start an epic

Use this when Harry starts work that will take several issues.

1. Agree a short code with Harry: 2 to 6 capitals or digits, starting with a letter, such as `CC`.
2. Find or create the Linear project, named after the epic.
3. Run the **open-epic** skill with the code, name and Linear project link.
4. Put the epic's folder path in the Linear project's description.

## Finish

- When the issue's work is done, run **close-issue**. It posts a summary on the issue: what was done, the artifacts and files, and anything left open. Set the status only when Harry says so.
- If the thread stops part way, post a handoff note instead: the state, the next step and the links.
- When every issue in an epic is Done or Canceled, run **close-epic**.
