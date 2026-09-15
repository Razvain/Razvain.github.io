/* =========================================================================
   Design 3, page 3 — fieldwork (interactive world map) + hobbies.
   Map: world-map.svg (@svg-maps/world, MIT) — every country is a <path>
   with id = ISO alpha-2 code and a `name` attribute.
   ========================================================================= */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============ Theme / running head ============ */

  const stored = localStorage.getItem("theme");
  if (stored) document.documentElement.dataset.theme = stored;
  $("#themeToggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  });

  const parts = CONTENT.name.trim().split(/\s+/);
  $("#runningName").textContent = `${parts[0][0]}. ${parts[parts.length - 1]} — personal pages`;

  /* ============ Hobbies ============ */

  const hobbyList = $("#hobbyList");
  const hobbies = CONTENT.hobbies || [];
  hobbies.forEach((h, i) => {
    const cell = document.createElement("figure");
    cell.className = "interest";
    // An odd final entry would sit alone in a 2-col grid; span + center it
    // so it reads as a deliberate closing line rather than a stray cell.
    if (i === hobbies.length - 1 && hobbies.length % 2 === 1)
      cell.classList.add("interest-centered");
    const idx = `G.${i + 1}`;
    cell.innerHTML =
      `<span class="interest-idx">${idx}</span>` +
      `<h3 class="interest-name">${h.name}</h3>` +
      `<p class="interest-note">${h.note}</p>`;
    hobbyList.appendChild(cell);
  });

  /* ============ Fieldwork "sample size" counter ============ */

  (() => {
    const mount = $("#fieldStats");
    if (!mount) return;

    // Continent for each visited country (only need enough to count regions).
    const CONTINENT = {
      // Europe
      ro:"EU", nl:"EU", de:"EU", fr:"EU", al:"EU", at:"EU", be:"EU", ba:"EU",
      bg:"EU", hr:"EU", gr:"EU", hu:"EU", is:"EU", it:"EU", md:"EU", pt:"EU",
      rs:"EU", si:"EU", es:"EU", gb:"EU",
      // Asia
      kr:"AS", ge:"AS", qa:"AS", sg:"AS", tr:"AS",
      // Americas
      ca:"NA", us:"NA", br:"SA", pe:"SA",
      // Oceania
      au:"OC", fj:"OC",
    };
    const ids = (CONTENT.travels || []).map(t => t.id);
    const countries = ids.length;
    const continents = new Set(ids.map(i => CONTINENT[i]).filter(Boolean)).size;
    const pct = Math.round((countries / 195) * 100); // of the world's ~195 countries

    // Distribution across continents — the honest breakdown behind the map.
    const REGION = [
      ["EU", "Europe"], ["AS", "Asia"], ["NA", "N. America"],
      ["SA", "S. America"], ["OC", "Oceania"], ["AF", "Africa"],
    ];
    const NAME = {
      ro:"Romania", nl:"Netherlands", de:"Germany", fr:"France", al:"Albania",
      at:"Austria", be:"Belgium", ba:"Bosnia & Herzegovina", bg:"Bulgaria",
      hr:"Croatia", gr:"Greece", hu:"Hungary", is:"Iceland", it:"Italy",
      md:"Moldova", pt:"Portugal", rs:"Serbia", si:"Slovenia", es:"Spain",
      gb:"United Kingdom", kr:"South Korea", ge:"Georgia", qa:"Qatar",
      sg:"Singapore", tr:"Türkiye", ca:"Canada", us:"United States",
      br:"Brazil", pe:"Peru", au:"Australia", fj:"Fiji",
    };
    const counts = {}, byRegion = {};
    ids.forEach(i => {
      const c = CONTINENT[i];
      if (!c) return;
      counts[c] = (counts[c] || 0) + 1;
      (byRegion[c] = byRegion[c] || []).push(NAME[i] || i.toUpperCase());
    });
    Object.values(byRegion).forEach(a => a.sort((x, y) => x.localeCompare(y)));
    const regions = REGION.filter(([k]) => counts[k]);

    mount.innerHTML =
      `<div class="fw-headline">` +
        `<span class="fw-stat"><b data-to="${countries}">0</b> countries</span>` +
        `<span class="fw-sep">·</span>` +
        `<span class="fw-stat"><b data-to="${continents}">0</b> continents</span>` +
        `<span class="fw-sep">·</span>` +
        `<span class="fw-stat"><b data-to="${pct}">0</b>% of the world</span>` +
      `</div>` +
      `<div class="fw-dist" role="img" aria-label="Countries visited by continent: ` +
        regions.map(([k, l]) => `${l}, ${counts[k]}`).join("; ") + `">` +
        `<div class="fw-bar">` +
          regions.map(([k, l], idx) =>
            `<span class="fw-seg" style="flex-grow:${counts[k]};--i:${idx}" title="${l}: ${counts[k]}"></span>`
          ).join("") +
        `</div>` +
        `<div class="fw-key">` +
          regions.map(([k, l], idx) =>
            `<button type="button" class="fw-kv" data-region="${k}" ` +
              `aria-label="${l}: ${byRegion[k].join(", ")}">` +
              `<i style="--i:${idx}"></i>${l}&nbsp;<b>${counts[k]}</b></button>`
          ).join("") +
        `</div>` +
      `</div>`;

    // Hover/focus a continent to list the countries visited there.
    const tip = document.createElement("div");
    tip.className = "cite-card fw-tip";
    tip.hidden = true;
    document.body.appendChild(tip);
    const hideTip = () => { tip.hidden = true; };
    const showTip = (btn) => {
      const k = btn.dataset.region;
      const l = REGION.find(([rk]) => rk === k)[1];
      tip.innerHTML =
        `<div class="cc-title">${l}</div>` +
        `<ul class="fw-tip-list">` +
          byRegion[k].map(n => `<li>${n}</li>`).join("") +
        `</ul>`;
      tip.hidden = false;
      const r = btn.getBoundingClientRect();
      const tr = tip.getBoundingClientRect();
      let left = r.left + r.width / 2 - tr.width / 2;
      left = Math.max(8, Math.min(left, innerWidth - tr.width - 8));
      let top = r.top - tr.height - 8;
      if (top < 8) top = r.bottom + 8; // flip below if no room above
      tip.style.left = `${left}px`;
      tip.style.top = `${top}px`;
    };
    mount.querySelectorAll(".fw-kv").forEach(btn => {
      btn.addEventListener("mouseenter", () => showTip(btn));
      btn.addEventListener("mouseleave", hideTip);
      btn.addEventListener("focus", () => showTip(btn));
      btn.addEventListener("blur", hideTip);
    });

    const nums = [...mount.querySelectorAll(".fw-headline b")];
    function run() {
      if (reducedMotion) { nums.forEach(n => (n.textContent = n.dataset.to)); return; }
      const t0 = performance.now(), dur = 1100;
      (function tick(now) {
        const p = Math.min((now - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3); // ease-out
        nums.forEach(n => (n.textContent = Math.round(e * +n.dataset.to)));
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }
    const io = new IntersectionObserver((ents) => {
      for (const en of ents) if (en.isIntersecting) { run(); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(mount);
  })();

  /* ============ The map ============ */

  const travelsById = {};
  (CONTENT.travels || []).forEach(t => (travelsById[t.id] = t));

  const card = $("#travelCard");
  let pinned = null; // country path pinned by click/tap

  function showCard(path, x, y) {
    const name = path.getAttribute("name") || "Unknown territory";
    const t = travelsById[path.id];
    let html = `<div class="cc-title">${name}</div>`;
    if (t) {
      html = `<span class="tc-when">${t.when}</span>` + html +
        (t.note ? `<div class="cc-meta tc-note">${t.note}</div>` : "");
      if (t.photos?.length) {
        const shown = t.photos.slice(0, 3);
        const extra = t.photos.length - shown.length;
        html += `<div class="tc-photos">` +
          shown.map(p => isVideo(p)
            ? `<span class="tc-vid" aria-label="Video">▶</span>`
            : `<img src="${p}" alt="Photo from ${name}" loading="lazy" />`).join("") +
          (extra > 0 ? `<span class="tc-more">+${extra}</span>` : "") +
          `</div>`;
      }
    } else {
      html += `<div class="cc-meta">not yet; the author is accepting conference invitations.</div>`;
    }
    card.innerHTML = html;
    card.hidden = false;
    // keep the card on screen
    const cw = 340, ch = card.offsetHeight || 90;
    card.style.left = Math.min(x + 16, innerWidth - cw - 12) + "px";
    card.style.top = Math.min(y + 16, innerHeight - ch - 12) + "px";
  }

  function hideCard() {
    if (pinned) return;
    card.hidden = true;
  }

  /* ---- The photo plate: a large viewer for visited countries ---- */

  const overlay = document.createElement("div");
  overlay.className = "plate-overlay";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="plate" role="dialog" aria-modal="true">
      <div class="plate-head">
        <div class="plate-title"><span class="plate-no"></span><span class="plate-country"></span></div>
        <div>
          <span class="plate-when"></span>
          <button class="plate-close" aria-label="Close">esc ✕</button>
        </div>
      </div>
      <div class="plate-photo">
        <img alt="" hidden />
        <video class="plate-video" controls playsinline preload="metadata" hidden></video>
        <div class="no-photos" hidden></div>
        <button class="plate-nav prev" aria-label="Previous photo">‹</button>
        <button class="plate-nav next" aria-label="Next photo">›</button>
      </div>
      <div class="plate-caption">
        <span class="plate-note"></span>
        <span class="plate-counter"></span>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const plateEls = {
    no: overlay.querySelector(".plate-no"),
    country: overlay.querySelector(".plate-country"),
    when: overlay.querySelector(".plate-when"),
    img: overlay.querySelector(".plate-photo img"),
    video: overlay.querySelector(".plate-photo video"),
    empty: overlay.querySelector(".no-photos"),
    prev: overlay.querySelector(".plate-nav.prev"),
    next: overlay.querySelector(".plate-nav.next"),
    note: overlay.querySelector(".plate-note"),
    counter: overlay.querySelector(".plate-counter"),
  };

  let plate = null; // { travel, name, index }

  const isVideo = (p) => /\.(mov|mp4|m4v|webm)$/i.test(p);

  function renderPlate() {
    const { travel, name, index } = plate;
    const photos = travel.photos || [];
    plateEls.country.textContent = name;
    plateEls.when.textContent = travel.when || "";
    plateEls.note.textContent = travel.note || "";
    plateEls.video.pause();
    if (photos.length) {
      plateEls.empty.hidden = true;
      const src = photos[index];
      if (isVideo(photos[index])) {
        plateEls.img.hidden = true;
        plateEls.video.hidden = false;
        if (plateEls.video.getAttribute("src") !== src) plateEls.video.src = src;
        plateEls.counter.textContent = `clip ${index + 1} / ${photos.length}`;
      } else {
        plateEls.video.hidden = true;
        plateEls.video.removeAttribute("src");
        plateEls.img.hidden = false;
        plateEls.img.src = src;
        plateEls.img.alt = `Photo ${index + 1} from ${name}`;
        plateEls.counter.textContent = `photo ${index + 1} / ${photos.length}`;
      }
      // Preload the neighbouring photos (wrapping) so ‹ › / arrow navigation is instant.
      [index + 1, index - 1].forEach(d => {
        const p = photos[(d + photos.length) % photos.length];
        if (p && !isVideo(p)) { const im = new Image(); im.src = p; }
      });
    } else {
      plateEls.img.hidden = true;
      plateEls.video.hidden = true;
      plateEls.empty.hidden = false;
      plateEls.empty.textContent = "no photographs survived peer review.";
      plateEls.counter.textContent = "";
    }
    const many = photos.length > 1;
    plateEls.prev.toggleAttribute("disabled", !many);
    plateEls.next.toggleAttribute("disabled", !many);
  }

  function openPlate(travel, name) {
    const ids = (CONTENT.travels || []).map(t => t.id);
    plateEls.no.textContent = "Plate F." + (ids.indexOf(travel.id) + 2); // F.1 is the map
    plate = { travel, name, index: 0 };
    renderPlate();
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("open"));
    card.hidden = true;
  }

  function closePlate() {
    overlay.classList.remove("open");
    plateEls.video.pause();
    plate = null;
    setTimeout(() => { if (!plate) overlay.hidden = true; }, 250);
  }

  function stepPlate(delta) {
    if (!plate || !(plate.travel.photos || []).length) return;
    const n = plate.travel.photos.length;
    plate.index = (plate.index + delta + n) % n;
    renderPlate();
  }

  plateEls.prev.addEventListener("click", () => stepPlate(-1));
  plateEls.next.addEventListener("click", () => stepPlate(1));
  overlay.querySelector(".plate-close").addEventListener("click", closePlate);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closePlate(); });
  document.addEventListener("keydown", (e) => {
    if (!plate) return;
    if (e.key === "Escape") closePlate();
    if (e.key === "ArrowLeft") stepPlate(-1);
    if (e.key === "ArrowRight") stepPlate(1);
  });

  fetch("world-map.svg")
    .then(r => r.text())
    .then(svgText => {
      const mount = $("#mapMount");
      mount.innerHTML = svgText;
      const svg = mount.querySelector("svg");
      svg.setAttribute("role", "img");
      svg.removeAttribute("width");
      svg.removeAttribute("height");

      const paths = svg.querySelectorAll("path[id]");
      paths.forEach(p => {
        p.classList.add("country");
        if (travelsById[p.id]) {
          p.classList.add("visited");
          // Micro-states (Singapore, Qatar, …) are ~1px on a world map, so a
          // visited fill is invisible. Give them a thick round stroke so they
          // read as a clickable dot.
          // Micro-states are ~1px on a world map. A near-zero dot (Singapore)
          // gets the thick round-ish mark; one with a bit of discernible form
          // (Qatar) gets the thinner form-preserving stroke so its shape shows
          // rather than blobbing into a circle.
          try {
            const b = p.getBBox();
            const m = Math.max(b.width, b.height);
            if (m < 8) p.classList.add(m < 2 ? "tiny" : "tiny-form");
          } catch {}
          // Fiji is a wide scatter of tiny islands: emphasise the form, not a dot.
          if (p.id === "fj") p.classList.add("tiny-form");
        }
      });

      // Light them up one-by-one in a quick west-to-east sweep. Each visited
      // country's fade is nudged by a small per-country delay; capped so the
      // whole sequence stays snappy however many countries there are.
      if (!reducedMotion) {
        const visited = [...svg.querySelectorAll("path.visited")].map(p => {
          let x = 0; try { const b = p.getBBox(); x = b.x + b.width / 2; } catch {}
          return { p, x };
        }).sort((a, b) => a.x - b.x);
        const step = Math.min(55, 1000 / Math.max(1, visited.length - 1)); // total spread ≤ ~1s
        visited.forEach(({ p }, i) => {
          p.style.animationDelay = (0.1 + i * step / 1000) + "s";
          // Re-append in west-to-east order so visited pieces paint on top of
          // their neighbours — a country scaling up then isn't clipped by a
          // neighbour that happened to be drawn later in the source SVG.
          svg.appendChild(p);
        });
      }

      // Event delegation: hover moves the card, click pins it (works on touch)
      svg.addEventListener("pointermove", (e) => {
        if (pinned) return;
        const path = e.target.closest("path.country");
        if (path) showCard(path, e.clientX, e.clientY);
        else card.hidden = true;
      });
      svg.addEventListener("pointerleave", hideCard);
      svg.addEventListener("click", (e) => {
        const path = e.target.closest("path.country");
        if (!path) { pinned = null; card.hidden = true; return; }
        const t = travelsById[path.id];
        if (t) {
          // Visited: open the big photo plate
          pinned = null;
          svg.querySelectorAll(".pinned").forEach(el => el.classList.remove("pinned"));
          openPlate(t, path.getAttribute("name") || path.id.toUpperCase());
          return;
        }
        // Unvisited: pin/unpin the small card (useful on touch)
        if (pinned === path) { pinned = null; card.hidden = true; return; }
        pinned = null;
        showCard(path, e.clientX, e.clientY);
        pinned = path;
        svg.querySelectorAll(".pinned").forEach(el => el.classList.remove("pinned"));
        path.classList.add("pinned");
      });
      document.addEventListener("click", (e) => {
        if (pinned && !e.target.closest("#mapMount") && !e.target.closest("#travelCard")) {
          pinned = null;
          card.hidden = true;
          svg.querySelectorAll(".pinned").forEach(el => el.classList.remove("pinned"));
        }
      });

      // The map only now has its height, so the hobbies section (and the pencil
      // note anchored to it) has shifted down. Re-place the notes so they don't
      // land in a different spot depending on when the SVG finished loading.
      placeNotes();
    })
    .catch(() => {
      $("#mapMount").innerHTML =
        `<p style="text-align:center;color:var(--faint);font-style:italic">
           (map failed to load; world-map.svg missing)</p>`;
    });

  /* ============ Pencil marginalia ============ */

  const sheet = $("#sheet");
  const NOTES = [
    { anchor: "#fieldworkSec", dy: 60,
      html: `n = ${(CONTENT.travels || []).length} countries;<br/>results <span class="tick">generalize</span>` },
    { anchor: "#mapMount", mid: true,
      html: `the map is not the territory,<br/>but it’s close` },
  ];
  const noteEls = [];
  NOTES.forEach(n => {
    const anchor = $(n.anchor);
    if (!anchor) return;
    const div = document.createElement("div");
    div.className = "margin-note";
    div.innerHTML = n.html;
    sheet.appendChild(div);
    noteEls.push({ div, anchor, dy: n.dy || 0, mid: !!n.mid });
  });
  // Measure with layout offsets (offsetTop), not getBoundingClientRect: the
  // sheet plays a transform-based entrance animation on every page turn, and
  // rects read mid-animation are in transformed space. offsetTop is immune to
  // transforms, so notes land on their sections whenever this runs.
  function topWithinSheet(el) {
    let y = 0;
    for (let node = el; node && node !== sheet; node = node.offsetParent) y += node.offsetTop;
    return y;
  }
  function placeNotes() {
    for (const { div, anchor, dy, mid } of noteEls) {
      const base = topWithinSheet(anchor);
      // `mid` notes sit level with the vertical centre of their anchor (the
      // map); the rest sit `dy` px below the anchor's top.
      div.style.top = (mid ? base + anchor.offsetHeight / 2 - div.offsetHeight / 2
                           : base + dy) + "px";
    }
  }
  placeNotes();
  addEventListener("resize", placeNotes);
  document.fonts?.ready.then(placeNotes);
  const noteIO = new IntersectionObserver((entries) => {
    for (const e of entries)
      if (e.isIntersecting) { e.target.classList.add("in"); noteIO.unobserve(e.target); }
  }, { threshold: 0.6 });
  noteEls.forEach(({ div }) => noteIO.observe(div));

  /* ============ Paper tilt ============ */

  if (!reducedMotion && matchMedia("(pointer: fine)").matches) {
    let raf = null;
    addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const px = e.clientX / innerWidth - 0.5;
        const py = e.clientY / innerHeight - 0.5;
        sheet.style.transform = `rotateY(${px * 1.6}deg) rotateX(${-py * 1.1}deg)`;
        raf = null;
      });
    });
  }

  const signoffEl = $("#signoff");
  if (signoffEl && CONTENT.signoff) signoffEl.textContent = CONTENT.signoff;

  $("#colophon").textContent =
    "typeset in the browser · no frameworks · prints like a paper (try ⌘P)";

})();
