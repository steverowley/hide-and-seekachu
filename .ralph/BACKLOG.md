# Backlog

Status: `[ ]` open · `[x]` done · `[!]` stuck (see JOURNAL.md for why)

The Ralph loop reads this file, picks one open item, ships it, ticks it.
The loop also expands this list when it runs out of items — so this is a
starting seed, not the whole job.

## Paintings (from PROJECT_PLAN.md MVP scope)

- [ ] Add Mona Lisa with 3 SVG variants and coords in `paintings.js`
- [ ] Add The Starry Night with 3 SVG variants and coords in `paintings.js`
- [ ] Add The Great Wave off Kanagawa with 3 SVG variants and coords in `paintings.js`
- [ ] Add Girl with a Pearl Earring with 3 SVG variants and coords in `paintings.js`
- [ ] Add American Gothic with 3 SVG variants and coords in `paintings.js`

## Stretch features (from PROJECT_PLAN.md)

- [ ] Persist high score in `localStorage` and show it on the splash + game-over screens
- [ ] Show a one-line fact about the painting on the celebration overlay after a find
- [ ] Add a difficulty toggle on the splash (Easy / Hard) that scales the hitbox size
- [ ] Wire a found-counter ("3 of 5") into the HUD so the player can see progress

## Polish

- [ ] Vary the confetti shapes (squares, circles, stars) instead of all-the-same rectangles
- [ ] Soften the miss-marker — it currently shakes briefly; make it feel friendlier for a young kid
- [ ] Add a subtle entrance animation when a new painting loads

## Notes for the loop

- Mondrian (`images/mondrian-1.svg` etc.) is the working example of an SVG painting with a hand-drawn Pikachu. Match that pattern.
- The `viewBox` on each SVG defines the natural coordinate space for `pikachu_box` in `paintings.js`.
- Painting facts (for the "show a fact" item) should be short, kid-friendly, and verifiable from Wikipedia.
