# `.ralph/` — the Ralph loop

A "Ralph loop" is a way of using Claude Code where you write **one** prompt
and run it on repeat. Each invocation is a fresh agent. The agent reads
files in this folder to know what's been done and what's next, so successive
runs make incremental progress without a human in the loop.

(Named after Ralph Wiggum from The Simpsons — the joke being that simple
beats clever. One prompt, ticked off one item at a time, eventually finishes
a surprising amount.)

## What's in here

| File          | What it is                                                    |
| ------------- | ------------------------------------------------------------- |
| `PROMPT.md`   | The prompt the loop feeds to Claude every iteration.          |
| `BACKLOG.md`  | The TODO list. The agent ticks items off and adds new ones.   |
| `JOURNAL.md`  | The agent's notes-to-self across runs.                        |
| `smoke.sh`    | A tiny self-check the loop runs before each commit.           |
| `ralph.sh`    | The shell wrapper that runs the loop locally.                 |

## How to run it (locally — the canonical way)

You need the `claude` CLI installed and logged in. Get it from
<https://docs.claude.com>.

Then, from the repo root:

    ./.ralph/ralph.sh

That's it. The script will:

1. Pipe `PROMPT.md` to `claude -p` once.
2. The agent reads the backlog, picks one item, builds it, runs the
   smoke check, commits with a conventional-commits message, pushes.
3. The script loops. Another fresh agent picks the next item.
4. Stops automatically when the backlog ends with `ALL DONE`, or when
   it hits `RALPH_MAX_ITER` (default 50), or when you Ctrl+C.

**Heads up — destructive flag:** the wrapper passes
`--dangerously-skip-permissions` so the agent doesn't pause to ask
before every file edit and git push. The prompt has guardrails baked
in (no force-push, no workflow edits, no Nintendo artwork, one commit
per iteration) but the flag is the flag. Only run this on a feature
branch you don't mind churning, and watch the first few iterations to
make sure you like the output.

## How to run it from the web

A web Claude Code session is interactive, so the "headless loop" model
doesn't quite fit, but you can still do single iterations by hand:

> Open a Claude Code web session against this repo and paste this
> message:
>
> ```
> Run one iteration of the Ralph loop. The prompt is in `.ralph/PROMPT.md`.
> Follow it exactly.
> ```
>
> Each session = one iteration. Re-trigger to advance.

## Stopping or steering it

- `Ctrl+C` the wrapper any time.
- To change direction, edit `BACKLOG.md` between iterations — move items
  around, add new ones, delete what you don't want built.
- To pause without quitting, just `Ctrl+C`, change what you want, and
  start it again — the journal and backlog are the only state, and
  they're already on disk.

## When to use it (and when not)

**Good fit:** a long list of small, independent tasks where each one is
self-contained and verifiable. This codebase is a good example — paintings
to add, stretch features to build, polish items to chip away at.

**Bad fit:** anything where you need to think carefully across iterations
(architecture decisions, anything ambiguous, anything where you'd want to
see the diff before the next step builds on it). The Ralph loop is
"keep going, don't ask" — it's not the right tool when each decision
should be deliberated.
