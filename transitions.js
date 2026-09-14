/* =========================================================================
   Page transitions between manuscript pages — deliberately minimal.
   Loaded synchronously in <head> so the incoming page can hide its sheet
   before first paint (no flash), then fade gently into place.
   A flag in sessionStorage marks that we arrived via an in-site page turn
   (rather than a fresh visit or a reload), so the entrance only plays then.
   ========================================================================= */

(() => {
  "use strict";

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LEAVE_MS = 200; // fade-out before navigating

  // Did the previous page hand off to us? If so, queue the entrance — before
  // first paint, so the sheet starts hidden and never flashes in un-animated.
  const entering = sessionStorage.getItem("manuscript-nav");
  sessionStorage.removeItem("manuscript-nav");
  if (entering && !reducedMotion) document.documentElement.dataset.enter = "1";

  addEventListener("DOMContentLoaded", () => {
    const sheet = document.getElementById("sheet");
    if (!sheet) return;

    // Entrance: fade up into place, then drop the class so the paper-tilt
    // transform can take back over (the animation would otherwise pin it).
    if (document.documentElement.dataset.enter) {
      sheet.classList.add("is-entering");
      sheet.addEventListener("animationend", function done(e) {
        if (e.target !== sheet) return;
        sheet.classList.remove("is-entering");
        delete document.documentElement.dataset.enter;
        sheet.removeEventListener("animationend", done);
      });
    }

    // Exit: fade the sheet out (opacity only — no transform, so it never
    // fights the tilt), then navigate.
    document.querySelectorAll("a[data-nav]").forEach(a => {
      a.addEventListener("click", (e) => {
        if (reducedMotion) return;                        // plain navigation
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // new-tab
        e.preventDefault();
        sessionStorage.setItem("manuscript-nav", "1");
        sheet.style.transform = "";        // clear any resting tilt for a clean fade
        sheet.classList.add("is-leaving");
        setTimeout(() => { location.href = a.href; }, LEAVE_MS);
      });
    });

    // Returning via the back/forward cache: undo any left-over exit state.
    addEventListener("pageshow", (e) => {
      if (e.persisted) sheet.classList.remove("is-leaving");
    });
  });
})();
