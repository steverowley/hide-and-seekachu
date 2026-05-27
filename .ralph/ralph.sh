#!/usr/bin/env bash
# Hide-and-Seekachu — Ralph loop runner.
#
# This script runs the Claude Code CLI in a tight loop, feeding it the same
# prompt (.ralph/PROMPT.md) every iteration. The agent reads .ralph/BACKLOG.md
# to figure out what to do next, ships it, ticks it off, commits, pushes,
# and exits. The loop then starts the next iteration with a fresh agent.
#
# Stops when the agent writes "ALL DONE" as the last line of BACKLOG.md
# (or when you Ctrl+C).
#
# Requirements:
#   - The `claude` CLI installed and logged in (https://docs.claude.com).
#   - Node.js on PATH (used by .ralph/smoke.sh).
#   - You're on a branch you're OK with the loop pushing commits to.
#
# SAFETY: this passes `--dangerously-skip-permissions` so the agent doesn't
# pause to ask before every file edit / git push. Only run it in a repo
# you're OK with the agent freely modifying. The prompt has explicit
# guardrails (no force-push, no workflow changes, no IP violations), but
# the flag is what it is. Stop the loop the moment you don't like a commit:
#   - Ctrl+C the loop.
#   - `git reset --hard <last-good-commit>` and force-push *yourself* if needed.
#
# Usage: ./.ralph/ralph.sh

set -u

PROMPT_FILE=".ralph/PROMPT.md"
BACKLOG_FILE=".ralph/BACKLOG.md"
MAX_ITER="${RALPH_MAX_ITER:-50}"   # hard cap so it can't run forever

if [ ! -f "$PROMPT_FILE" ]; then
  echo "ralph.sh: missing $PROMPT_FILE — run from the repo root." >&2
  exit 1
fi

if ! command -v claude >/dev/null 2>&1; then
  echo "ralph.sh: 'claude' CLI not found on PATH." >&2
  echo "Install it from https://docs.claude.com, then re-run." >&2
  exit 1
fi

iter=0
while [ "$iter" -lt "$MAX_ITER" ]; do
  iter=$((iter + 1))
  echo
  echo "================================================================"
  echo "  Ralph iteration #$iter  —  $(date '+%Y-%m-%d %H:%M:%S')"
  echo "  Branch: $(git rev-parse --abbrev-ref HEAD)"
  echo "================================================================"
  echo

  claude -p "$(cat "$PROMPT_FILE")" --dangerously-skip-permissions

  if [ -f "$BACKLOG_FILE" ] && tail -n 5 "$BACKLOG_FILE" | grep -qx "ALL DONE"; then
    echo
    echo "==== Ralph: backlog reports ALL DONE after $iter iteration(s). Stopping. ===="
    exit 0
  fi

  sleep 2
done

echo
echo "==== Ralph: reached MAX_ITER ($MAX_ITER) without ALL DONE. Stopping. ===="
echo "==== To go further, re-run or raise RALPH_MAX_ITER. ===="
