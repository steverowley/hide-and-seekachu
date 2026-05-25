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
//   3. Load the image, click two opposite corners of Pikachu, copy the JSON.
//   4. Paste a new entry into the "paintings" list below. Don't forget the
//      comma between entries.
//
// See README.md and IMAGE_PROMPTS.md for the full workflow.
//
// Reference entry shape (uncomment, edit, and add to the list):
//
//   {
//     "id": "mona-lisa",
//     "title": "Mona Lisa",
//     "artist": "Leonardo da Vinci",
//     "variants": [
//       {
//         "image": "images/mona-lisa-1.png",
//         "pikachu_box": { "x": 420, "y": 380, "width": 110, "height": 110 }
//       }
//     ]
//   }

window.PAINTINGS_DATA = {
  "paintings": []
};
