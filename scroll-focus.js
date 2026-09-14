/* =========================================================================
   scroll-focus.js — shared by all manuscript pages.
   One-time scroll reveal: content below the fold starts hidden and rises
   gently into place the first time it scrolls into view, then stays. What
   is already on screen at load is left as-is (the page-turn handles that).
   ========================================================================= */

(() => {
  "use strict";

  // Respect reduced-motion: leave everything visible, nothing animates.
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  addEventListener("DOMContentLoaded", () => {
    const sheet = document.getElementById("sheet");
    if (!sheet) return;

    // Top-level content blocks only (not the running head, colophon, the
    // pencil marginalia, or figures nested inside a section).
    const blocks = [...sheet.children].filter(el =>
      el.matches(".titleblock, .abstract, .paper-section, .fig, .page-nav"));
    if (!blocks.length) return;

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    for (const el of blocks) {
      // Anything already on screen at load stays put; only the blocks you
      // have to scroll down to are hidden and revealed on arrival.
      const top = el.getBoundingClientRect().top;
      if (top < innerHeight * 0.92) continue;
      el.classList.add("reveal");
      io.observe(el);
    }
  });
})();
