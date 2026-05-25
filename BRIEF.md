# Brief — Hide-and-Seekachu

Paste this whole file as your first message to Claude Code.

---

Build a single-page web game called **Hide-and-Seekachu**.

## Concept

"Where's Waldo"-style game where Pikachu is hidden in famous public-domain paintings, styled to match each painting. The player clicks or taps to find him. The game is for an iPad and a laptop browser. The player is a young child, so the UI must be large, friendly, and forgiving.

## Tech stack

Plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step. The whole game runs by opening `index.html` in a browser. Mobile-friendly responsive layout. Touch and mouse both supported.

## File structure

- `index.html` — game UI
- `styles.css` — styling
- `game.js` — game logic
- `paintings.json` — data file describing each painting and its variants
- `images/` — painting variant images, named `<painting-slug>-<variant-number>.png`
- `tools/coordinate-picker.html` — a standalone helper page where I can drop in an image and click on Pikachu to get the box coordinates printed on screen for copy-pasting into `paintings.json`
- `README.md` — explains how to add new paintings, aimed at a non-coder

## paintings.json schema

```json
{
  "paintings": [
    {
      "id": "mona-lisa",
      "title": "Mona Lisa",
      "artist": "Leonardo da Vinci",
      "variants": [
        {
          "image": "images/mona-lisa-1.png",
          "pikachu_box": { "x": 420, "y": 380, "width": 80, "height": 80 }
        }
      ]
    }
  ]
}
```

The box is in pixels relative to the original image's natural dimensions. The game must scale clicks correctly when the image is displayed at a different size on screen (e.g. fit to viewport on iPad vs. laptop).

## Gameplay

1. On load, show a "How to play" splash with a big "Start" button.
2. Pick a random painting, then a random variant of that painting.
3. Display the painting filling most of the screen, with a small UI overlay: painting title, artist, current score, Hint button, Skip button.
4. Click or tap inside the `pikachu_box` → celebration ("You found him!" + confetti + Pikachu sound if available), score +1, advance to a new painting after 2 seconds.
5. Click outside the box → brief "Not there!" shake animation on the cursor location. No score penalty.
6. Hint button briefly (2 seconds) highlights the quadrant Pikachu is in (top-left / top-right / bottom-left / bottom-right) with a translucent overlay.
7. Skip button advances to a different random painting (no score change).
8. After all paintings have been played once: "You found them all!" final-score screen with a "Play again" button. Reshuffle on replay.

## Quality bar

- Code should be readable by a semi-technical adult. Comment only the non-obvious bits (e.g. the click-scaling math).
- Use conventional commits (https://www.conventionalcommits.org/en/v1.0.0/). Examples: `feat: add hint button`, `fix: correct click scaling on resize`.
- Start with a placeholder `paintings.json` containing one dummy entry (a solid-coloured PNG with a labelled box) so the whole game runs end-to-end **before** any real painting images exist.
- Touch targets and buttons must be finger-friendly on iPad (min 44pt).
- No external dependencies, no CDN scripts. Everything offline-capable.

## Build order

1. Scaffold + working dummy painting with click detection and correct coordinate scaling.
2. Score, advancement, random-variant logic.
3. Hint button + Skip button + end-of-game screen.
4. Splash / "How to play" screen.
5. Coordinate-picker tool in `tools/coordinate-picker.html`.
6. Polish: celebration animation, shake animation, sounds (use a free Pikachu "pika!" if you can find one packaged, otherwise leave a `sounds/` folder with a README noting what file to drop in).
7. README with step-by-step instructions for adding new paintings, written for a non-coder.

After each step, commit with a conventional-commits message and verify the game still loads and plays end-to-end.

## Out of scope for v1

- Online leaderboards, accounts, multiplayer.
- Live AI image generation.
- Difficulty levels.
- Anything that requires an internet connection at play time.
