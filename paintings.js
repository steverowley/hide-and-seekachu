// Painting data for Hide-and-Seekachu.
//
// Each painting has an id, title, artist, and a list of variants.
// Each variant points to an image and gives Pikachu's hitbox in the
// image's NATURAL pixel coordinates (i.e. relative to the image file's
// actual dimensions, not however it's currently displayed on screen).
//
// To add a new painting:
//   1. Drop the image into ./images/ (PNG, JPG, or SVG).
//   2. Open tools/coordinate-picker.html in your browser.
//   3. Load the image, click the corners of Pikachu, copy the JSON.
//   4. Paste a new entry below. Don't forget the comma.
//
// See README.md and IMAGE_PROMPTS.md for the full workflow.

window.PAINTINGS_DATA = {
  "paintings": [
    {
      "id": "placeholder",
      "title": "Placeholder Painting",
      "artist": "Hide-and-Seekachu",
      "variants": [
        {
          "image": "images/placeholder-1.svg",
          "pikachu_box": { "x": 820, "y": 520, "width": 160, "height": 160 }
        },
        {
          "image": "images/placeholder-2.svg",
          "pikachu_box": { "x": 200, "y": 180, "width": 160, "height": 160 }
        }
      ]
    }
  ]
};
