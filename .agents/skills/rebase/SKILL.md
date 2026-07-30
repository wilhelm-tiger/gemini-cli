---
name: rebase
description: Rebase this fork on top of upstream repo. Use when a rebase request is explicity initiated
---

This is a fork of [Google Gemini CLI](https://github.com/google-gemini/gemini-cli). The fork default branch is `master`. To perform rebase, first run:

1. `git fetch upstream`
2. `git rebase upstream/main`

If there are no code conflicts, simply run `git push origin master -f` and stop.

If there are code conflicts, you should resolve the following 


