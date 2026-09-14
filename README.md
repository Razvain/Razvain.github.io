# Personal Website — two candidate designs

Two complete designs share this folder (and share `content.js`, so you
edit your info once). A floating pill on each page links to the other.

| | Design 1 (root `/`) | Design 3 (`/design-3-manuscript/`) |
|---|---|---|
| Concept | **Attention-map bio** — hover phrases, arcs connect your work | **The manuscript** — your page typeset as an academic paper: live citations with hover previews, pencil marginalia, a hand-plotted Figure 1; p. 2 holds the appendices (teaching, supervision, miscellany); p. 3 holds fieldwork — an interactive world travel map (hover a country for dates, notes, photos) — and hobbies. Pages turn with a physical page-lift animation off a paper stack. Map data: `travels` in content.js (ISO country codes); world map from @svg-maps/world (MIT). |
| Aesthetic | Light academic (paper, serif) | LaTeX-paper on a desk (STIX serif, annotation-red pen) |
| Motion | Attention arcs, z-dolly reveals, tilt cards | Citation cards, marginalia fade-in, subtle paper tilt; prints like a real paper |

(`/design-2-graph/`, a dark 3D force-graph concept, was rejected — kept on
disk but no longer linked; delete the folder freely.)

Once you pick one: keep its files, delete the others, and remove the
`.design-pill` link. If you pick Design 3, move its files to the root and
change `../content.js` references to local ones.

## Design 1 — "Attention-Map Bio"

A minimal academic personal site with an interactive twist: hovering the
highlighted phrases in the bio draws animated *attention arcs* to every
publication, news item, and project related to that topic (click to pin,
`Esc` or click elsewhere to release). Subtle 3D: sections dolly in on a
z-axis as you scroll, and project cards tilt in 3D under the cursor.

Zero build step, zero dependencies — plain HTML/CSS/JS.

## Editing

**Everything you'd ever change lives in [`content.js`](content.js):**
name, bio, topics, news, publications (with BibTeX), projects, links.
Search for `TODO` — those are the placeholders to replace.

To add a new topic: define it in `topics`, mark a phrase in `bio` as
`[[topic-id|display text]]`, and tag items with that id in their `topics`
array. The arcs wire themselves up.

## Design 2 — "Living Dependency Graph"

The hero is a real-time 3D force-directed graph (Three.js from CDN, still
no build step): you at the center (photo node), topics as glowing hubs,
publications, projects, and coauthors as satellites. Drag rotates it,
hovering a node highlights its neighborhood and dims the rest, clicking a
node flies you to the matching entry on the page. Below the fold: an About
section **with your photo**, publications, and projects.

**Your photo:** drop an image into `assets/` (square crop looks best,
≥480px) and point the `photo:` field in `content.js` at it. It feeds both
the central graph node and the About portrait.

## Running locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Deploying

It's a static site — drop the folder on GitHub Pages, Netlify, Vercel,
or your university web space as-is.
