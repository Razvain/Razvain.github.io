/* =========================================================================
   Light image deterrent — blocks casual right-click-save and drag-save on
   images. This is a speed bump only: it does NOT (and cannot) prevent
   DevTools, direct asset URLs, or screenshots. Real protection comes from
   the baked-in watermark and from not publishing full-resolution originals.
   ========================================================================= */
(() => {
  "use strict";
  const isImage = (el) =>
    el && el.closest && el.closest("img, .plate-photo, .photo-frame, .tc-photos");

  addEventListener("contextmenu", (e) => {
    if (isImage(e.target)) e.preventDefault();
  });
  addEventListener("dragstart", (e) => {
    if (e.target && e.target.tagName === "IMG") e.preventDefault();
  });
})();
