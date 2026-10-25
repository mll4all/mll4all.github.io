# Medical Literacy through Language — website

A simple, no-build static website for your health-literacy non-profit. Five pages:

| Page | File | What it's for |
|------|------|----------------|
| Home | `index.html` | Landing page + 3 pillars |
| Who | `who.html` | Your story, team, values — **fill in yourself** |
| What | `what.html` | Programs & method — **fill in yourself** |
| Why | `why.html` | The case / mission — **fill in yourself** |
| Flashcards & Game | `flashcards.html` | Interactive root cards + quiz |

## How to edit text
Open any `.html` file in a text editor. Anything marked with a `✎` note or
`class="placeholder"` is meant to be replaced.

## How to change colors / branding
Edit the `:root { ... }` color variables at the top of `styles.css`.
The little "Rx" circle in the corner is in each HTML file as `<span class="mark">Rx</span>` —
change the text or swap in a logo `<img>`.

## How to add brochure terms to the flashcards
Open `roots.js` and add entries to the `ROOTS` list. Each one looks like:

```js
{ root: "cardi/o", meaning: "heart", origin: "Greek", type: "root", example: "cardiology" },
```

- `type` can be `"prefix"`, `"suffix"`, or `"root"` (this controls the filter buttons).
- Adding a term automatically updates the flashcards, the quiz, **and** the reference table.
- ~40 of the most common roots are already included to get you started.

## How to view it
Just double-click `index.html` — it opens in any browser, no server needed.

## How to publish it (free options)
- **GitHub Pages** — push this folder to a repo, enable Pages.
- **Netlify / Cloudflare Pages** — drag-and-drop this folder onto their dashboard.
- Any plain web host — upload all the files.
