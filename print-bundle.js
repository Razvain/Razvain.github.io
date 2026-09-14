/* =========================================================================
   print-bundle.js — make ⌘P print all three manuscript pages in order, each
   scaled to fit exactly one physical page, no matter which one you're viewing.

   The three pages are separate documents, so a normal print only covers the
   current one. Here we render the other two in off-screen iframes, clone their
   rendered <article id="sheet"> into a hidden, print-only container in page
   order (1 → 2 → 3), then measure each and set a per-sheet scale so it fits a
   single printed page. @media print swaps the live page out for the bundle;
   if the bundle isn't ready yet, printing falls back to the current page.
   ========================================================================= */
(() => {
  "use strict";

  // Iframes just render their own content — only the top-level page bundles.
  if (window.top !== window.self) return;
  if (!("closest" in Element.prototype)) return;

  const PAGES = ["index.html", "page-2.html", "page-3.html"];
  const path = location.pathname;
  let current = path.slice(path.lastIndexOf("/") + 1);
  if (!current) current = "index.html";

  const cleanClone = (node) => {
    const c = node.cloneNode(true);
    c.removeAttribute("id");
    c.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
    c.style.transform = "";           // drop any resting paper-tilt transform
    // Drop transient page-turn animation state (its keyframes would otherwise
    // run on the static print clone).
    c.classList.remove("is-entering", "is-leaving");
    return c;
  };

  let started = false;
  function build() {
    if (started) return;
    started = true;

    const bundle = document.createElement("div");
    bundle.id = "print-bundle";
    bundle.setAttribute("aria-hidden", "true");
    const slots = PAGES.map((page) => {
      const slot = document.createElement("div");
      slot.className = "print-sheet";
      bundle.appendChild(slot);
      return { page, slot };
    });
    document.body.appendChild(bundle);

    let pending = 0;
    const finish = () => {
      if (pending > 0) return;
      document.documentElement.classList.add("print-bundle-ready");
    };

    slots.forEach(({ page, slot }) => {
      pending++;
      if (page === current) {
        // Clone the live page, but wait first so its own async content (the
        // page-3 map) has rendered before we snapshot it.
        const wait = /page-3/.test(page) ? 900 : 120;
        setTimeout(() => {
          const live = document.getElementById("sheet");
          if (live) slot.appendChild(cleanClone(live));
          pending--;
          finish();
        }, wait);
        return;
      }
      const frame = document.createElement("iframe");
      frame.className = "print-src-frame";
      frame.setAttribute("aria-hidden", "true");
      frame.setAttribute("tabindex", "-1");
      frame.src = page;
      frame.addEventListener("load", () => {
        // Give the page's own scripts time to render (the map SVG on page 3).
        const wait = /page-3/.test(page) ? 800 : 350;
        setTimeout(() => {
          try {
            const s = frame.contentDocument &&
                      frame.contentDocument.getElementById("sheet");
            if (s) slot.appendChild(cleanClone(s));
          } catch (e) { /* a page that failed to render is skipped */ }
          frame.remove();
          pending--;
          finish();
        }, wait);
      });
      document.body.appendChild(frame);
    });

    if (pending === 0) finish();
  }

  // Build as early as possible so it's ready before anyone prints.
  if (document.readyState !== "loading") build();
  else addEventListener("DOMContentLoaded", build);
  addEventListener("beforeprint", build); // last-ditch if somehow not started
})();
