# Image-Prompt Templates

Use these prompts with an image model that supports image input + inpainting (ChatGPT image gen, Google Gemini, Midjourney with `--iw` and image refs, or any SDXL/Flux UI). Workflow per painting:

1. Download a high-resolution version from [Wikimedia Commons](https://commons.wikimedia.org).
2. Drop the image into the model and use one of the prompts below.
3. Generate 3–5 variants per painting, each with Pikachu in a **different** spot.
4. Save as `images/<painting-slug>-1.png`, `-2.png`, etc.
5. Use the coordinate-picker tool to grab Pikachu's box and paste it into `paintings.json`.

## The base template

If you only want to remember one prompt, this is the shape:

> Take this image of **[painting title]** by **[artist]** and add a small Pikachu hidden in **[specific location]**. Paint Pikachu in **[artist]'s style** — matching the brushwork, colour palette, lighting, and era. He should be small enough to require searching (roughly **3–6%** of the image width), partially blended into the surroundings, but still recognisable as Pikachu (yellow body, black-tipped ears, red cheeks, lightning-bolt tail). Do not change **anything else** in the image. Keep the original composition, colours, and dimensions intact.

## Tips that matter

- **Be specific about the hiding spot.** "Hidden in the painting" gives mush. "Curled up on the lowest rooftop of the village, behind the church steeple" gives results.
- **Style-match instructions** are the make-or-break. Always name the brushwork (impasto / sfumato / woodblock / etc.), the palette, and the era.
- **Lock the rest.** Phrases like "do not change anything else", "preserve original composition", and "same dimensions" prevent the model from repainting the whole canvas.
- **Size cue.** Asking for "3–6% of image width" stops the model from making Pikachu enormous. For an older child, go smaller (2–3%); for a younger child, larger (6–10%).
- **Iterate.** First pass is rarely the final. Regenerate with stronger style words ("rougher brushstrokes", "more muted", "less cartoonish") until he blends.
- **Tell the model not to add a signature, watermark, or border.**

---

## 1. Mona Lisa — Leonardo da Vinci (~1503)

**Style notes:** Italian High Renaissance. Sfumato (soft, smoky transitions, no hard outlines). Oil on poplar. Muted earthy palette — olive greens, warm browns, soft golds. Hazy atmospheric background.

Pick one location per generation:

- behind her left shoulder in the misty blue mountains, tiny and atmospheric
- sitting on the winding path on the right side of the background
- peeking out from the folds of her dark sleeve near her hands
- on the parapet ledge behind her, blended into the stone
- hiding among the rocky cliffs on the left side of the background

**Prompt:**

> Take this image of the Mona Lisa by Leonardo da Vinci and add a small Pikachu **[LOCATION]**. Paint Pikachu in Leonardo's sfumato oil style: no hard outlines, soft smoky transitions, muted earthy palette of olive greens, warm browns and soft golds, atmospheric haze, Italian Renaissance brushwork on poplar panel. He should be small (about 4% of the image width), partially blended into the surroundings, but still recognisable (yellow body, black-tipped ears, red cheeks, lightning-bolt tail). Do not change anything else in the painting — keep the composition, her pose, expression, the original colours, and the dimensions identical. No signature, no watermark, no border.

## 2. The Starry Night — Vincent van Gogh (1889)

**Style notes:** Post-Impressionist. Thick impasto, swirling visible brushstrokes. Vivid cobalt blue, golden yellow, soft white. Every surface flows in curved lines.

Locations:

- curled up on the rooftop of the small village below, painted with the same yellow strokes
- nestled in the dark flame of the cypress tree on the left
- riding one of the swirling sky currents to the left of the moon
- peeking out from the church bell tower window
- floating among the largest yellow stars in the upper right

**Prompt:**

> Take this image of The Starry Night by Vincent van Gogh and add a small Pikachu **[LOCATION]**. Paint Pikachu in Van Gogh's post-impressionist style: thick visible impasto brushstrokes, swirling curved lines, vivid cobalt blue and golden yellow palette, every contour made of short directional strokes. He should be small (about 5% of the image width), built from the same swirling brushwork as the rest of the painting, but still recognisable (yellow body, black-tipped ears, red cheeks, lightning-bolt tail). Do not change anything else — keep the sky swirls, cypress, village, moon, stars and dimensions identical. No signature, no watermark, no border.

## 3. The Great Wave off Kanagawa — Katsushika Hokusai (~1831)

**Style notes:** Japanese ukiyo-e woodblock print. Bold black outlines. Flat colour fills. Prussian blue, cream, pale beige. Stylised, no shading.

Locations:

- crouched inside the foam claws at the top of the great wave
- tucked into one of the long fishing boats, between the rowers
- standing tiny against the slope of Mount Fuji in the distance
- riding the small wave on the right side of the painting
- floating in the trough between the two main waves

**Prompt:**

> Take this image of The Great Wave off Kanagawa by Hokusai and add a small Pikachu **[LOCATION]**. Render Pikachu in ukiyo-e Japanese woodblock-print style: bold black outlines, flat colour fills with no shading or gradients, Prussian blue and cream palette, stylised shapes consistent with Edo-period printmaking. He should be small (about 4% of the image width), drawn as if printed from the same woodblock, but still recognisable (yellow body, black-tipped ears, red cheeks, lightning-bolt tail). Do not change anything else — keep the wave, boats, Mount Fuji, composition and dimensions identical. No signature, no watermark, no border.

## 4. Girl with a Pearl Earring — Johannes Vermeer (~1665)

**Style notes:** Dutch Golden Age. Oil on canvas. Dramatic chiaroscuro — single soft light source from the left, deep dark background. Smooth blended brushwork. Cool blues, warm ochres, ivory skin.

Locations:

- emerging from the deep shadow behind her right shoulder
- nestled in the folds of the blue turban above her ear
- as a tiny reflection caught in the surface of the pearl earring
- on her left shoulder, lit softly by the same window light
- low in the dark background near her elbow

**Prompt:**

> Take this image of Girl with a Pearl Earring by Vermeer and add a small Pikachu **[LOCATION]**. Paint Pikachu in Vermeer's Dutch Golden Age oil style: dramatic chiaroscuro lighting from the upper left, smooth blended brushwork with no visible strokes, cool blues and warm ochres, deep velvety dark background. He should be small (about 4% of the image width), softly lit and partially in shadow so he blends into the gloom, but still recognisable (yellow body, black-tipped ears, red cheeks, lightning-bolt tail). Do not change anything else — keep her face, turban, earring, the lighting, colours, and dimensions identical. No signature, no watermark, no border.

## 5. American Gothic — Grant Wood (1930)

> **Heads up:** *American Gothic* is technically still under US copyright (Grant Wood died in 1942). For a personal home game this is fine, but if you'd prefer something cleanly public-domain, swap in **The Scream** by Munch (PD since 2015) or **A Sunday on La Grande Jatte** by Seurat (1886, PD). I've left American Gothic here as you suggested it.

**Style notes:** American Regionalism. Sharp, almost flat realism. Muted earthy palette — browns, ochres, dusty greens, off-white. Strong vertical lines mirroring the pitchfork and gothic window.

Locations:

- peeking out from behind the white house wall near the gothic window
- standing tiny in the field beyond, between the man and woman
- perched on the porch roof in the upper background
- hidden in the print pattern of the woman's apron
- behind the pitchfork tines, blending into the man's overalls

**Prompt:**

> Take this image of American Gothic by Grant Wood and add a small Pikachu **[LOCATION]**. Paint Pikachu in Grant Wood's American Regionalist style: sharp flat realism, muted earthy palette of browns, ochres and dusty greens, smooth surfaces with subtle modelling, strong vertical compositional lines. He should be small (about 4% of the image width), painted with the same crisp brushwork, but still recognisable (yellow body, black-tipped ears, red cheeks, lightning-bolt tail). Do not change anything else — keep the man, woman, pitchfork, house and dimensions identical. No signature, no watermark, no border.

---

## When the model gives you a bad result

Common fixes, in order of how often they work:

1. **Pikachu too cartoonish / too modern.** Add: "render with the same paint medium and brushwork as the rest of the canvas, as if painted by [artist] himself, not as a sticker or overlay."
2. **Pikachu too big.** Add: "no larger than [X]% of the image width" and reduce until it feels right.
3. **Model repainted the whole canvas.** Re-issue the prompt with the original image as a strict reference and emphasise: "preserve the original painting pixel-for-pixel except for the area where Pikachu is added."
4. **Pikachu unrecognisable.** Add: "keep his ears, cheeks and tail visible and clear, even if stylised."
5. **Wrong location.** Be more concrete: "exactly on the rooftop of the leftmost house" beats "in the village".

## Crediting paintings

When you add a painting to `paintings.json`, also note the Wikimedia Commons source URL in a comment somewhere (or in the README) — it makes it easy to find a higher-res replacement later, and is good practice.
