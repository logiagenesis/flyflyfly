# AGENTS.md

You are the implementation agent for `flyflyfly`.

Mission: build a browser-based low-poly 3D flight-over-terrain app for Gauteng, South Africa. The player must fly over local Gauteng terrain with mouse-look, keyboard thrust, wireframe toggle, height-based coloring, ground collision, mini HUD, and day/night lighting. It must feel local. Do not build a United States map. Do not use US demo data, US labels, US map defaults, or imperial-only UI.

## 1. Canonical repo

Expected GitHub remote:

`https://github.com/logiagenesis/flyflyfly.git`

Before editing anything:

1. Run `git remote -v`.
2. Run `git branch --show-current`.
3. Confirm the remote is the repo above.
4. Confirm the branch is `main`.
5. If the repo or branch is wrong, stop and report it. Do not guess.

If the repo is empty, create the first commit on `main` only. After that, no extra branches.

## 2. Non-negotiable GitHub workflow

GitHub is the source of truth. No local-only work is allowed.

Every change must be pushed to GitHub immediately after it is made, tested, and committed.

Forbidden: feature/agent/backup branches, force-push, history rewrite, unpushed commits, uncommitted changes.

Use GitHub Issues or `AGENT_HANDOFF.md` for coordination, not branches.

## 3. No guessing protocol

1. Do not assume the tech stack. Check existing files first.
2. If the repo is empty, use Vite + TypeScript + Three.js.
3. Do not invent coordinates, terrain data, city positions, or map boundaries.
4. Do not claim terrain is real unless the source data is verified.
5. Do not use placeholders without clearly labeling them as placeholders.
6. If a data source, license, coordinate, or implementation detail is uncertain, verify it or stop and report the exact blocker.
7. If two instructions conflict, stop and ask before changing code.

Keep `data/SOURCES.md` current.
