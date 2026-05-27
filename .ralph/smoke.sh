#!/usr/bin/env bash
# Smoke test for Hide-and-Seekachu. The Ralph loop runs this before every
# commit to catch obvious breakage (bad JS syntax, missing painting images).
#
# Usage: bash .ralph/smoke.sh
# Exit:  0 = OK, non-zero = something broken.

set -eu

echo "==> node --check on JS files"
node --check game.js
node --check paintings.js

echo "==> Checking that every painting image in paintings.js exists on disk"
node -e '
  global.window = {};
  require("./paintings.js");
  const data = global.window.PAINTINGS_DATA;
  if (!data || !Array.isArray(data.paintings)) {
    console.error("PAINTINGS_DATA missing or malformed");
    process.exit(1);
  }
  const fs = require("fs");
  let missing = 0;
  let count = 0;
  for (const p of data.paintings) {
    if (!p.id || !p.title || !p.artist || !Array.isArray(p.variants)) {
      console.error("Painting missing required fields:", JSON.stringify(p));
      missing++;
      continue;
    }
    for (const v of p.variants) {
      count++;
      if (!v.image || !fs.existsSync(v.image)) {
        console.error("Missing image file:", v.image, "(in", p.id + ")");
        missing++;
      }
      const b = v.pikachu_box;
      if (!b || typeof b.x !== "number" || typeof b.y !== "number"
          || typeof b.width !== "number" || typeof b.height !== "number") {
        console.error("Bad pikachu_box in", p.id, "->", v.image);
        missing++;
      }
    }
  }
  if (missing > 0) {
    console.error("FAIL:", missing, "issue(s)");
    process.exit(1);
  }
  console.log("OK:", data.paintings.length, "painting(s),", count, "variant(s)");
'

echo "==> Smoke OK"
