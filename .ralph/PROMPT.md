# Hide-and-Seekachu — Ralph loop prompt

You are one iteration of a Ralph loop on the Hide-and-Seekachu codebase: a
"Where's Waldo"-style web game where Pikachu hides in famous paintings.
Vanilla HTML/CSS/JS, no build step, no frameworks. Open `index.html` and play.

Each loop invocation is a fresh agent. You have no memory of previous
iterations. Your only context is the repo on disk. The loop's state lives in
this folder (`.ralph/`).

## What to do, every time

1. **Read state, in this order:**
   - `.ralph/BACKLOG.md` — todo list. `[ ]` = open, `[x]` = done, `[!]` = stuck.
   - `.ralph/JOURNAL.md` — past iterations' notes. Skim the last few entries.
   - Skim `PROJECT_PLAN.md`, `README.md`, and any file the backlog item points at.

2. **If the backlog has no open `[ ]` items**, expand it. Read `PROJECT_PLAN.md`
   (especially the "Stretch ideas" section), `README.md`, `BRIEF.md`, and the
   source files (`game.js`, `styles.css`, `index.html`, `paintings.js`). Append
   every concrete improvement you can find as a new `[ ]` line under the right
   section. Then continue to step 3.

3. **Pick ONE open item.** Smallest reasonable scope. Prefer items that:
   - Ship visible progress (a new painting, a new feature) over refactors.
   - Are unblocked (don't need image assets or sounds you can't produce).
   - You can finish and verify in this one iteration.

4. **Implement it.** Constraints:
   - Vanilla HTML/CSS/JS only. No npm installs, no CDN scripts, no build step.
   - Match the existing code style (see `game.js` for the bar).
   - Stay surgical. Don't refactor adjacent code that isn't part of your task.
   - For new paintings: SVG placeholders are fine, mirror the
     `images/mondrian-1.svg` / `mondrian-2.svg` / `mondrian-3.svg` pattern.
     Pikachu must be drawn in your own SVG — do not embed any Nintendo
     artwork. Coordinates in `paintings.js` are in the SVG's natural
     dimensions (look at the `viewBox`).
   - For new features: keep them simple. Persist data in `localStorage` if
     needed. No backend.

5. **Verify before committing.** Run:

       bash .ralph/smoke.sh

   It checks JS syntax and that every painting image referenced in
   `paintings.js` exists on disk. If it fails, fix or revert your change
   before committing.

6. **Commit** with a Conventional Commits message
   (https://www.conventionalcommits.org). Examples:

       feat: add Starry Night with 3 SVG variants
       feat(score): persist high score in localStorage
       fix: correct hint quadrant on letterboxed images

7. **Update `.ralph/BACKLOG.md`:** tick `[x]` the item you finished. Add any
   new items you discovered while working.

8. **Append a short entry to `.ralph/JOURNAL.md`:** date, what you did,
   anything notable (a surprise, a decision, a blocker). 2-4 sentences.

9. **Push** to the current branch:

       git push -u origin "$(git rev-parse --abbrev-ref HEAD)"

   Don't create or merge PRs from inside the loop. The human handles that.

10. **Check the stop condition.** If, after your update, every line in
    `.ralph/BACKLOG.md` under a section heading is `[x]` and you can't think
    of any new `[ ]` items to add after re-reading the source, append a
    final line containing exactly:

        ALL DONE

    to `.ralph/BACKLOG.md` and exit. The outer shell loop watches for this.

## Hard rules — never violate

- **Don't break the game.** If `bash .ralph/smoke.sh` fails after your change,
  fix it or `git restore` your changes before committing. Do not commit
  red builds.
- **Don't add Pikachu artwork from Nintendo or any other rights-holder.**
  Hand-drawn SVG Pikachu only.
- **Don't touch the IP / license stance** in `README.md` or `PROJECT_PLAN.md`.
- **Don't change `.github/workflows/`** unless the backlog item explicitly says so.
- **Don't `git push --force`. Don't rewrite history. Don't delete branches.**
- **Don't install dependencies, add a build step, or pull in a framework.**
- **One commit per iteration.** If you find yourself wanting two commits, you
  picked too big an item — split it and put the rest back on the backlog.

## When you're stuck

If after one honest attempt you can't make progress on the item you picked:
- Mark it `[!]` in `.ralph/BACKLOG.md` with a one-line reason after the `[!]`.
- Note the blocker in `.ralph/JOURNAL.md`.
- Pick a different open item and continue.
- Don't leave the repo dirty — `git restore .` any half-done changes first.

End of prompt. Start at step 1.
