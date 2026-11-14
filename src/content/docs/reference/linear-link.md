---
title: linear-link
description: The plugin that ties Claude threads, files and artifacts to Linear epics and issues.
---

linear-link is Harry's Claude Code plugin. It keeps every thread, file and artifact filed under a Linear epic and issue, and named to one schema.

## Names

| Thing | Rule |
| --- | --- |
| Epic | a Linear project with a short code, such as `CC` |
| Issue | one task, in Linear team PER |
| Thread title | `EPIC · ISSUE · description`, or `UNFILED · …` |
| Artifact title | `EPIC · ISSUE · name`, or `MASTER · name` for a live master |

## What it enforces

| Rule | How |
| --- | --- |
| A thread's title follows its epic and issue | hooks set the title from the message or the start-issue skill |
| Each issue a thread starts gets a `Thread started` comment | a hook prompts the thread to post it |
| Documents only in `masters/` or the current epic's folder | a hook refuses other writes |
| Temporary outputs (plans, reviews, notes) are `.md` in the epic's `notes/` or an issue folder | a hook |
| Artifacts are published only from `masters/` or the epic's `artifacts/` | a hook, on publish |
| Each artifact is linked from the epic's `index.md` and its issue | a hook, after publish |

With the `block-outputs` policy, an unfiled thread can't write documents.

## Layout

In the Claude project's shared folder:

```text
masters/                 live masters, listed in masters/index.md
epics/CC-build-a-devops-control-centre/
  index.md               code, name, Linear project, status, issues, artifacts
  notes/                 epic-level notes (.md)
  artifacts/             sources of artifacts (.html)
  issues/PER-427-…/      issue-level notes (.md)
archive/epics/…          closed epics
.linear-link/            each thread's state
```

## Skills

| Skill | Use it to |
| --- | --- |
| start-issue | put the thread on an issue |
| open-epic | open a new epic and its folder |
| close-issue | post the summary or a handoff note |
| close-epic | check every issue is finished and archive the epic |
| sweep | report what's out of line, changing nothing |

## Installing it in a project

| File | Where |
| --- | --- |
| `templates/CLAUDE.md` | project root, as `CLAUDE.md` |
| `templates/settings.json` | `.claude/settings.json` |
| `templates/masters-index.md` | `masters/index.md` |
| `templates/project-instructions.txt` | the Claude project's instructions, for chat threads where hooks don't run |

Add `.linear-link/` to `.gitignore`. The current release is 0.1.2.
