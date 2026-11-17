/* =========================================================================
   Design 3 — The Manuscript
   Renders content.js as an academic paper: numbered citations with hover
   previews, a plotted Figure 1, live references.
   ========================================================================= */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============ Theme ============ */

  const stored = localStorage.getItem("theme");
  if (stored) document.documentElement.dataset.theme = stored;
  $("#themeToggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  });

  /* ============ Citation numbering ============ */

  // Reference order comes from refs.js (ACM: alphabetical by first author).
  // A cite's visible number is 1 + its rank in that order; data-ref and the
  // #ref-N anchors keep the content.js index, so deep links stay stable.
  const pubs = CONTENT.publications;
  const meName = CONTENT.name.trim();
  const order = refOrder(pubs);
  const rank = [];
  order.forEach((i, pos) => (rank[i] = pos));
  const pubsByTopic = {};
  pubs.forEach((p, i) => p.topics.forEach(t => (pubsByTopic[t] ??= []).push(i)));

  const citeGroup = (topic) => {
    const ids = (pubsByTopic[topic] || []).slice().sort((a, b) => rank[a] - rank[b]);
    if (!ids.length) return "";
    const links = ids.map(i =>
      `<a class="cite" href="#ref-${i}" data-ref="${i}">${rank[i] + 1}</a>`).join(", ");
    return `&nbsp;<sup class="cite-group">[${links}]</sup>`;
  };

  /* ============ Title block, abstract, keywords ============ */

  $("#paperTitle").textContent =
    "A Longitudinal Study of a Researcher in AI for Software Engineering";
  // acmsmall: "NAME, Affiliation" on one line (the caps come from CSS).
  const affil = (CONTENT.affiliation || "").trim();
  $("#paperAuthor").innerHTML =
    `<span class="author-name">${meName}</span>` + (affil ? `, ${affil}` : "");
  CONTENT.scholarLinks.forEach(l => {
    const a = document.createElement("a");
    a.href = l.url;
    a.textContent = l.label.toLowerCase();
    if (l.url.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
    $("#paperLinks").appendChild(a);
  });

  $("#abstractPhoto").src = CONTENT.photo;
  $("#abstractPhoto").alt = `Portrait of ${meName}`;
  // until the real portrait lands in assets/, fall back to the placeholder
  $("#abstractPhoto").addEventListener("error", () => {
    $("#abstractPhoto").src = "assets/photo.jpg";
  }, { once: true });

  $("#abstractText").innerHTML = CONTENT.abstract;

  $("#keywords").innerHTML =
    `<span class="fm-label">Additional Key Words and Phrases:</span> ` +
    Object.values(CONTENT.topics).map(t => t.label.toLowerCase())
      .concat(CONTENT.extraKeywords || [])
      .join(", ");

  /* ============ 1. Introduction (bio with live citations) ============ */

  const intro = $("#intro");
  CONTENT.bio.forEach(para => {
    const p = document.createElement("p");
    p.innerHTML = para.replace(/\s+/g, " ")
      .replace(/\[\[(\w+)\|([^\]]+)\]\]/g,
        (_, topic, text) => `<span class="topic-mention" data-topic="${topic}">${text}</span>${citeGroup(topic)}`);
    intro.appendChild(p);
  });

  /* ============ Figure 1: interests plotted on axes ============ */

  const SVG_NS = "http://www.w3.org/2000/svg";
  // Topic positions in data coordinates: x from theory (0) to practice (1),
  // y from code (0) to models (1).
  const FIG_POS = {
    agents:           { x: 0.72, y: 0.66 },
    evaluation:       { x: 0.48, y: 0.39 },
    interpretability: { x: 0.17, y: 0.71 },
    data:             { x: 0.29, y: 0.15 },
    completion:       { x: 0.74, y: 0.21 },
  };

  // A plain scatter plot in the style of a paper figure: framed axes, inward
  // ticks, a faint grid, filled markers with annotations, axis titles.
  const W = 560, H = 330;
  const P = { left: 74, right: 540, top: 16, bottom: 262 };   // plot area
  const px = (x) => P.left + x * (P.right - P.left);
  const py = (y) => P.bottom - y * (P.bottom - P.top);

  const fig = document.createElementNS(SVG_NS, "svg");
  fig.setAttribute("viewBox", `0 0 ${W} ${H}`);
  fig.setAttribute("width", W);

  const el = (tag, attrs, text) => {
    const n = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (text != null) n.textContent = text;
    return n;
  };

  const TICKS = [0, 0.25, 0.5, 0.75, 1];
  const grid = TICKS.slice(1, -1).map(t =>
    `M ${px(t)} ${P.top} V ${P.bottom} M ${P.left} ${py(t)} H ${P.right}`).join(" ");
  fig.appendChild(el("path", { class: "grid", d: grid }));
  const ticks = TICKS.map(t =>
    `M ${px(t)} ${P.bottom} v -5 M ${px(t)} ${P.top} v 5 M ${P.left} ${py(t)} h 5 M ${P.right} ${py(t)} h -5`).join(" ");
  fig.appendChild(el("path", { class: "axis", d: ticks }));
  fig.appendChild(el("rect", { class: "axis", x: P.left, y: P.top,
    width: P.right - P.left, height: P.bottom - P.top }));

  // Tick labels only at the ends of each (qualitative) scale, aligned to the
  // frame so the two scales don't collide at the origin; then axis titles.
  const label = (x, y, text, cls, anchor = "middle", rotate = null) => {
    const t = el("text", { class: cls, x, y, "text-anchor": anchor }, text);
    if (rotate) t.setAttribute("transform", `rotate(${rotate} ${x} ${y})`);
    fig.appendChild(t);
  };
  label(px(0), P.bottom + 18, "theory", "tick-label", "start");
  label(px(1), P.bottom + 18, "practice", "tick-label", "end");
  label(P.left - 8, py(0), "code", "tick-label", "start", -90);
  label(P.left - 8, py(1), "models", "tick-label", "end", -90);
  label((P.left + P.right) / 2, P.bottom + 44, "Research orientation", "axis-label");
  label(P.left - 30, (P.top + P.bottom) / 2, "Object of study", "axis-label", "middle", -90);

  const topicGroups = {};
  for (const [tid, t] of Object.entries(CONTENT.topics)) {
    const at = FIG_POS[tid] || { x: 0.5, y: 0.5 };
    const x = px(at.x), y = py(at.y);
    const g = el("g", { class: "topic" });
    g.dataset.topic = tid;
    g.appendChild(el("circle", { class: "mark", cx: x, cy: y, r: 4.5 }));
    g.appendChild(el("text", { class: "mark-label", x: x + 9, y: y - 7 }, t.label));
    g.appendChild(el("rect", { class: "mark-hit", x: x - 12, y: y - 22,
      width: 24 + t.label.length * 7, height: 34 }));
    fig.appendChild(g);
    topicGroups[tid] = g;
  }
  $("#figMount").appendChild(fig);

  // Local, cosmetic highlight of the marks themselves (used for hover preview).
  function setFigureLit(tid) {
    for (const [id, g] of Object.entries(topicGroups)) {
      g.classList.toggle("lit", !!tid && id === tid);
      g.classList.toggle("dim", !!tid && id !== tid);
    }
  }
  // The click/arc interaction is wired up in the "Attention arcs" section
  // below, once the news, artifacts, and references have been rendered.

  /* ============ 2. Notes added in proof ============ */

  const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };

  // Each note is a run-in paragraph, "Apr 2027. Serving on …", newest first.
  const newsList = $("#newsList");
  CONTENT.news.forEach(n => {
    const li = document.createElement("li");
    li.className = "attn-item attn-anchor";
    li.dataset.topics = (n.topics || []).join(" ");
    const links = (n.links || [])
      .map(u => `<a class="proof-link" href="${u}" target="_blank" rel="noopener" title="${host(u)}" aria-label="Open on ${host(u)}">↗</a>`)
      .join("");
    li.innerHTML = `<span class="proof-date">${n.date}</span><span>${n.html}${links ? `&nbsp;<span class="proof-links">${links}</span>` : ""}</span>`;
    newsList.appendChild(li);
  });

  /* ============ 3. Software artifacts ============ */


  // One table row per artifact: name with its type beneath, then the description.
  CONTENT.projects.forEach(p => {
    const tr = document.createElement("tr");
    tr.className = "attn-item attn-anchor";
    tr.dataset.topics = (p.topics || []).join(" ");
    const ext = p.url && p.url.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
    // Usage figure (e.g. downloads) on its own line under the type.
    const milestone = p.milestone
      ? `<span class="atype milestone" title="${p.milestoneTitle || ""}">${p.milestone}</span>` : "";
    tr.innerHTML =
      `<td><a href="${p.url}"${ext}><span class="aname">${p.name}</span></a>` +
      `<span class="atype">${p.tech}</span>${milestone}</td><td>${p.description}</td>`;
    $("#artifacts").appendChild(tr);
  });

  /* ============ 4. Acknowledgments ============ */

  const email = CONTENT.footerLinks.find(l => l.url.startsWith("mailto:"));
  $("#acks").innerHTML =
    `The author thanks supervisors Maliheh Izadi and Arie van Deursen and all coauthors ` +
    `for their guidance and collaboration. ${CONTENT.footerLine} ` +
    (email ? `Correspondence: <a href="${email.url}">${email.label}</a>.` : "");

  /* ============ References ============ */

  // Venue in ACM-Reference-Format, taken from the entry's own BibTeX, e.g.
  // "In Proceedings of the 46th IEEE/ACM International Conference on Software
  // Engineering (ICSE ’24)."; journals are set as their name; theses as
  // "Bachelor’s thesis. School."; unpublished work as "Under review."
  const bibField = (pub, key) =>
    (new RegExp(`\\b${key}\\s*=\\s*\\{([^}]*)\\}`, "i").exec(pub.bibtex || "") || [])[1] || "";
  const bibKind = (pub) => ((/@(\w+)/.exec(pub.bibtex || "") || [])[1] || "").toLowerCase();
  const expandVenue = (s) => s
    .replace(/\bProc\. of\b/g, "Proceedings of")
    .replace(/\bInt'l\b/g, "International")
    .replace(/\bConf\./g, "Conference");
  const venueOf = (pub) => {
    if (pub.venue === "Under review") return "Under review.";
    const kind = bibKind(pub);
    if (kind.includes("thesis")) {
      const level = /bsc|bachelor/i.test(pub.venue) ? "Bachelor’s" : /msc|master/i.test(pub.venue) ? "Master’s" : "PhD";
      return `${level} thesis. ${bibField(pub, "school") || pub.venue}.`;
    }
    if (kind === "article") return `<span class="r-venue">${bibField(pub, "journal") || pub.venue}</span>.`;
    // Conference: tag the abbreviation with the year, "(ICSE)" -> "(ICSE ’24)".
    const name = expandVenue(bibField(pub, "booktitle") || pub.venue)
      .replace(/\(([^()]+)\)(?![^]*\()/, `($1 ’${String(pub.year).slice(-2)})`);
    return `In <span class="r-venue">${name}</span>.`;
  };

  // Links are printed as the paper would print them: DOIs as https://doi.org/…,
  // anything else as its URL.
  const linkText = (url) => {
    const doi = /(?:doi\.org\/|\/doi\/(?:abs\/|pdf\/|full\/)?)(10\.[^?#\s]+)/.exec(url);
    return doi ? `https://doi.org/${doi[1]}` : url;
  };

  // ACM-Reference-Format, "Authors. Year. Title. Venue. URL", in refs.js order.
  const refsEl = $("#refs");
  order.forEach(i => {
    const pub = pubs[i];
    const li = document.createElement("li");
    li.id = `ref-${i}`;
    li.className = "attn-item attn-anchor";
    li.dataset.topics = pub.topics.join(" ");
    // "A and B"; "A, B, and C".
    const names = pub.authors.split(/,\s*/)
      .map(a => a === meName ? `<span class="me">${a}</span>` : a);
    const authors = names.length < 3 ? names.join(" and ")
      : names.slice(0, -1).join(", ") + ", and " + names[names.length - 1];
    const urls = [pub.page, ...Object.values(pub.links || {})].filter(Boolean);
    const links = urls.map(u =>
      `<a class="ref-link" href="${u}" target="_blank" rel="noopener">${linkText(u)}</a>`).join(" ");
    li.innerHTML =
      `${authors}. <span class="r-year">${pub.year}</span>. <span class="r-title">${pub.title}</span>. ` +
      venueOf(pub) + (links ? ` <span class="ref-links">${links}</span>` : "");
    refsEl.appendChild(li);
  });

  /* ============ Citation hover cards + click flash ============ */

  const card = $("#citeCard");
  document.addEventListener("mouseover", (e) => {
    const cite = e.target.closest("a.cite");
    if (!cite) { card.hidden = true; return; }
    const pub = pubs[+cite.dataset.ref];
    card.innerHTML =
      `<div class="cc-title">${pub.title}</div>` +
      `<div class="cc-meta">${pub.venue}, ${pub.year}. ${pub.authors}</div>`;
    card.hidden = false;
    const r = cite.getBoundingClientRect();
    card.style.left = Math.min(r.left, innerWidth - 360) + "px";
    card.style.top = (r.bottom + 8) + "px";
  });

  document.addEventListener("click", (e) => {
    const cite = e.target.closest("a.cite");
    if (!cite) return;
    e.preventDefault();
    const ref = $(`#ref-${cite.dataset.ref}`);
    ref.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    ref.classList.add("flash");
    setTimeout(() => ref.classList.remove("flash"), 2000);
  });

  // Arriving from another page with a #ref-N hash — e.g. a supervision entry on
  // p. 2 citing the paper it produced — scrolls to that reference and flashes
  // it red, the same cue an in-text citation click gives.
  function flashHashRef() {
    const m = /^#ref-(\d+)$/.exec(location.hash);
    const ref = m && document.getElementById(`ref-${m[1]}`);
    if (!ref) return;
    ref.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    ref.classList.add("flash");
    setTimeout(() => ref.classList.remove("flash"), 2000);
  }
  flashHashRef();
  addEventListener("hashchange", flashHashRef);

  /* ============ Attention arcs (Figure 1 → related work) ============
     Click a research-interest mark (or a highlighted phrase in the intro)
     to draw arcs from it to every related note, artifact, and reference,
     dimming the rest. Click again, click away, or press Esc to release. */

  const sheet = $("#sheet");
  const arcSvg = document.createElementNS(SVG_NS, "svg");
  arcSvg.id = "arcs";
  arcSvg.setAttribute("aria-hidden", "true");
  document.body.appendChild(arcSvg);

  let activeTopic = null, activeSource = null, pinned = false;

  const docRect = (el) => {
    const r = el.getBoundingClientRect();
    return {
      left: r.left + scrollX, right: r.right + scrollX,
      top: r.top + scrollY, bottom: r.bottom + scrollY,
      cx: r.left + r.width / 2 + scrollX, cy: r.top + r.height / 2 + scrollY,
    };
  };

  const relatedAnchors = (tid) =>
    [...document.querySelectorAll("#sheet .attn-anchor")]
      .filter(el => (el.dataset.topics || "").split(" ").includes(tid));

  function drawTopicArcs(tid, sourceEl) {
    activeTopic = tid;
    activeSource = sourceEl;
    arcSvg.setAttribute("width", document.documentElement.scrollWidth);
    arcSvg.setAttribute("height", document.documentElement.scrollHeight);
    arcSvg.innerHTML = "";

    // A figure point starts its arcs at the marker itself. A phrase in the text
    // starts under its LAST line fragment, so one that wraps across two lines
    // doesn't start from the centre of its tall, misleading union box.
    const marker = sourceEl.querySelector?.(".mark");
    let s;
    if (marker) {
      const r = marker.getBoundingClientRect();
      s = { cx: r.left + r.width / 2 + scrollX, y: r.top + r.height / 2 + scrollY };
    } else {
      const rects = sourceEl.getClientRects();
      const lr = rects.length ? rects[rects.length - 1] : sourceEl.getBoundingClientRect();
      s = { cx: lr.left + lr.width / 2 + scrollX, y: lr.bottom + scrollY + 2 };
    }
    const gutterX = Math.max(20, docRect(sheet).left - 46);

    // Thin, faint curves through the left gutter to every related item. They
    // fade in (slightly staggered) rather than being drawn on one by one.
    relatedAnchors(tid).forEach((el, i) => {
      const t = docRect(el);
      const m1 = s.y + (t.cy - s.y) * 0.28, m2 = s.y + (t.cy - s.y) * 0.72;
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", `M ${s.cx} ${s.y} C ${gutterX} ${m1}, ${gutterX} ${m2}, ${t.left - 6} ${t.cy}`);
      arcSvg.appendChild(path);
      if (!reducedMotion) {
        path.style.opacity = "0";
        path.style.transition = `opacity 0.18s ease ${i * 25}ms`;
        path.getBoundingClientRect();   // reflow so the transition takes
        path.style.opacity = "";
      }
    });

    document.querySelectorAll("#sheet .attn-item").forEach(el =>
      el.classList.toggle("related", (el.dataset.topics || "").split(" ").includes(tid)));
    document.querySelectorAll("#sheet a.cite").forEach(c =>
      c.classList.toggle("lit", !!pubs[+c.dataset.ref]?.topics.includes(tid)));
    document.body.classList.add("attention-active");
    setFigureLit(tid);
  }

  function clearTopicArcs() {
    arcSvg.innerHTML = "";
    document.querySelectorAll("#sheet .attn-item.related").forEach(el => el.classList.remove("related"));
    document.querySelectorAll("#sheet a.cite.lit").forEach(c => c.classList.remove("lit"));
    document.body.classList.remove("attention-active");
    setFigureLit(null);
    activeTopic = null;
    activeSource = null;
    pinned = false;
  }

  // Hover draws the arcs; click pins them so they persist after the
  // pointer leaves. Clicking a pinned mark again releases it.
  function togglePin(tid, sourceEl) {
    if (pinned && activeTopic === tid) { clearTopicArcs(); return; }
    drawTopicArcs(tid, sourceEl);
    pinned = true;
  }

  // Figure 1 marks: hover to trace, click to pin.
  for (const [tid, g] of Object.entries(topicGroups)) {
    g.addEventListener("mouseenter", () => { if (!pinned) drawTopicArcs(tid, g); });
    g.addEventListener("mouseleave", () => { if (!pinned) clearTopicArcs(); });
    g.addEventListener("click", (e) => { e.stopPropagation(); togglePin(tid, g); });
  }

  // Highlighted phrases in the intro do the same thing.
  document.querySelectorAll(".topic-mention").forEach(el => {
    el.addEventListener("mouseenter", () => { if (!pinned) drawTopicArcs(el.dataset.topic, el); });
    el.addEventListener("mouseleave", () => { if (!pinned) clearTopicArcs(); });
    el.addEventListener("click", (e) => { e.stopPropagation(); togglePin(el.dataset.topic, el); });
  });

  document.addEventListener("click", (e) => {
    if (activeTopic && !e.target.closest("#figMount") && !e.target.closest(".topic-mention"))
      clearTopicArcs();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeTopic) clearTopicArcs();
  });

  let arcResizeT;
  addEventListener("resize", () => {
    clearTimeout(arcResizeT);
    arcResizeT = setTimeout(() => {
      if (activeTopic) drawTopicArcs(activeTopic, activeSource);
    }, 150);
  });


})();
