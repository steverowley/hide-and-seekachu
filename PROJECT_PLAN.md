# Hide-and-Seekachu — Project Plan

A "Where's Waldo"-style web game where Pikachu is hidden in famous public-domain paintings, restyled to blend into each artwork. Built as a personal project for my daughter.

## Important note on IP

Pikachu is owned by Nintendo / The Pokémon Company. This is fine as a personal project for family use, but it cannot be shared publicly, sold, or published without a license. Famous paintings from before ~1929 are public domain in the US (rules vary by country) and are fair game.

## Concept

The player sees a famous painting. Pikachu is hidden somewhere inside, painted in the style of that artwork. Tap or click on him to win the round. Score goes up, next painting appears.

## MVP scope

- 5 famous paintings: *Mona Lisa*, *The Starry Night*, *The Great Wave off Kanagawa*, *Girl with a Pearl Earring*, *American Gothic*.
- 3–5 hidden-Pikachu variants per painting, so each play feels different.
- Click / tap to find. "Found!" celebration + score.
- Next painting button.
- Optional hint button (highlights the quadrant Pikachu is in).
- Runs on iPad and laptop browsers.

## Tech approach

- Plain HTML + CSS + vanilla JavaScript. No frameworks, no build step.
- Pre-generated painting variants stored as PNGs in an `images/` folder.
- A JSON file lists the paintings, variants, and Pikachu's hitbox coordinates per variant.
- A small `coordinate-picker.html` helper tool lets me click on Pikachu in an image to get the coordinates to paste into the JSON file.

### Why pre-generated images instead of live AI generation?

For v1: cheap, fast, no internet needed, no API keys, predictable quality. You can swap in live generation later if you want endless variety.

## Split of work

**Me (one-time, ~1–2 hours of creative work):**

1. Download high-res versions of the 5 paintings from Wikimedia Commons.
2. For each painting, generate 3–5 versions with Pikachu hidden in different spots, styled to match. Tools: ChatGPT/Gemini image gen, Midjourney, or any image model that does inpainting.
3. Drop them in `images/` with predictable names (`mona-lisa-1.png`, etc.).
4. Use the coordinate-picker tool to click on Pikachu in each variant and paste the box into `paintings.json`.

**Claude Code (one prompt, see `BRIEF.md`):**

- Scaffolds the project.
- Builds the game logic, click detection, scaling, UI.
- Builds the coordinate-picker helper tool.
- Writes a README aimed at a non-coder explaining how to add new paintings.

## Steps in order

1. Install Claude Code (https://docs.claude.com).
2. Open a terminal in this folder and run `claude`.
3. Paste `BRIEF.md` as the first message. Let it build the scaffold and commit.
4. Open `index.html` in a browser — the dummy version should work end-to-end.
5. Generate painting variants (see image-prompt templates — ask Claude for these next).
6. Drop images into `images/`, run the coordinate picker, paste coordinates into `paintings.json`.
7. Test with my daughter. Adjust hitbox size and hint behaviour based on what's fun.

## Stretch ideas (only if v1 lands well)

- High score saved in `localStorage`.
- "How to play" intro screen.
- Painting facts shown after each round ("This is by Leonardo da Vinci, painted ~1503.").
- Difficulty levels (smaller / better-blended Pikachu).
- Sounds: Pikachu's "Pika!" on find.
- More paintings.
