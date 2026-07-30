---
name: rebase
description: Rebase this fork on top of upstream repo. Use when a rebase request is explicity initiated
---

This is a fork of [Google Gemini CLI](https://github.com/google-gemini/gemini-cli). The fork default branch is `master`. To perform rebase, first run:

1. `git fetch upstream`
2. `git rebase upstream/main`

If there are no code conflicts, simply run `git push origin master -f` and stop.

If there are code conflicts, you should resolve the following cases

### All `package.json`/`package-lock.json` Files

If you see conflics like the following:

```json
<<<<<<< HEAD
  "name": "@google/gemini-cli-sdk",
  "version": "0.55.0-nightly.20260729.g3499c84f7",
=======
  "name": "@wilhelm-tiger/gemini-cli-sdk",
  "version": "0.52.0-nightly.20260715.gfa975395b",
>>>>>>> 2cb6e8197 (Release NPM package to wilhelm-tiger)
```

You should always use `wilhelm-tiger` and google's version. For example, the code above should resolve to

```json
  "name": "@wilhelm-tiger/gemini-cli-sdk",
  "version": "0.55.0-nightly.20260729.g3499c84f7",
```

Any other conflicts should be left untouched and please list unresolved files for me to resolve manually.
