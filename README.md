# Hide-and-Seekachu

A "Where's Waldo"-style web game where Pikachu is hidden in famous public-domain paintings, restyled to blend into each artwork. Built as a personal project &mdash; not for distribution.

## Play it

1. Open `index.html` in any modern browser. That's it.
2. On the splash screen, tap **Start**.
3. Find Pikachu and tap him. Use **Hint** for a clue, **Skip** to move on.

> If your browser blocks the page or the painting doesn't appear, run a local server instead. From this folder: `python3 -m http.server 8000` &mdash; then open <http://localhost:8000>.

## How to add a new painting (step by step)

This is the workflow once you've got the game working with the placeholders:

### 1. Find a public-domain painting

[Wikimedia Commons](https://commons.wikimedia.org) has high-res versions of just about every famous painting from before 1929. Download the largest version you can.

### 2. Generate variants with Pikachu hidden inside

Use an image AI (ChatGPT, Gemini, Midjourney, or any inpainting tool). The file [`IMAGE_PROMPTS.md`](./IMAGE_PROMPTS.md) has ready-made prompts for five starter paintings. Generate **3 to 5 variants** of each painting, each with Pikachu in a different spot.

Save them into `images/` with predictable names, e.g.:

    images/mona-lisa-1.png
    images/mona-lisa-2.png
    images/mona-lisa-3.png

### 3. Find Pikachu's coordinates

Open `tools/coordinate-picker.html` in your browser. For each variant:

1. Click **Choose image** and pick the variant file.
2. Click the top-left corner of Pikachu.
3. Click the bottom-right corner.
4. Click **Copy JSON**.

### 4. Add the painting to `paintings.js`

Open `paintings.js` in any text editor (TextEdit, Notepad, VS Code). You'll see a `"paintings": [ &hellip; ]` list. Add a new entry, pasting the coordinate-picker output as each variant:

```js
{
  "id": "mona-lisa",
  "title": "Mona Lisa",
  "artist": "Leonardo da Vinci",
  "variants": [
    {
      "image": "images/mona-lisa-1.png",
      "pikachu_box": { "x": 420, "y": 380, "width": 110, "height": 110 }
    },
    {
      "image": "images/mona-lisa-2.png",
      "pikachu_box": { "x": 880, "y": 240, "width": 90, "height": 90 }
    }
  ]
}
```

Don't forget the comma between paintings. Save the file, reload the game, and you're done.

### Tip: hitbox sizing

If your daughter is missing the box even when she taps right on Pikachu, make the box a bit bigger than Pikachu's actual outline in the coordinate picker. Forgiving hitboxes are friendlier for young kids.

## What's in this folder

### The game

| File | What it is |
|---|---|
| `index.html` | The page that opens in the browser. |
| `styles.css` | Visual styling. |
| `game.js` | Game logic (loading, click detection, scoring, animations). |
| `paintings.js` | The painting data &mdash; **this is the file you'll edit**. |
| `images/` | Painting variants. Drop new PNG/JPG/SVG files in here. |
| `sounds/` | Drop a `pika.mp3` here to enable the "found!" sound. |
| `tools/coordinate-picker.html` | Helper for finding Pikachu's coordinates in an image. |

### Planning &amp; reference

| File | What it is |
|---|---|
| `PROJECT_PLAN.md` | Concept, scope, tech approach, IP notes. |
| `BRIEF.md` | The prompt that built this scaffold. |
| `IMAGE_PROMPTS.md` | Image-generation prompts for the 5 starter paintings. |

## IP note

Pikachu is owned by Nintendo / The Pokémon Company. This is a personal project &mdash; don't share, sell, or publish it. Public-domain paintings (generally pre-1929) are fair game.

## Troubleshooting

- **Pikachu doesn't move between rounds.** The game picks a random variant per round; with only one variant it'll always be in the same spot. Add more variants.
- **Click goes through Pikachu and registers as a miss.** The coordinates in `paintings.js` are probably off, or were taken from a different-resolution copy of the image. Re-run the coordinate picker on the exact file in `images/`.
- **No sound.** Drop `sounds/pika.mp3` into the `sounds/` folder, then reload.
- **Browser shows a blank page from `file://`.** Run a local server: `python3 -m http.server 8000`.
