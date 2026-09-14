/* =========================================================================
   Design 3 — The Manuscript
   Renders content.js as an academic paper: numbered citations with hover
   previews, a hand-plotted Figure 1, pencil marginalia, live references.
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

  // Reference order = publication order in content.js; cite numbers are 1-based.
  const pubs = CONTENT.publications;
  const meName = CONTENT.name.trim();
  const pubsByTopic = {};
  pubs.forEach((p, i) => p.topics.forEach(t => (pubsByTopic[t] ??= []).push(i)));

  const citeGroup = (topic) => {
    const ids = pubsByTopic[topic] || [];
    if (!ids.length) return "";
    const links = ids.map(i =>
      `<a class="cite" href="#ref-${i}" data-ref="${i}">${i + 1}</a>`).join(", ");
    return `&nbsp;<sup class="cite-group">[${links}]</sup>`;
  };

  /* ============ Title block, abstract, keywords ============ */

  const firstName = meName.split(/\s+/)[0];
  const lastName = meName.split(/\s+/).slice(-1)[0];
  $("#runningName").textContent = `${firstName[0]}. ${lastName} — personal pages`;
  $("#paperTitle").textContent =
    "A Longitudinal Study of a Researcher in AI for Software Engineering";
  $("#paperAuthor").innerHTML = `${meName}`;
  $("#paperAffil").textContent =
    CONTENT.role + (CONTENT.affiliation ? " · " + CONTENT.affiliation : "");
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

  $("#keywords").innerHTML = "<b>Keywords:</b> " +
    Object.values(CONTENT.topics).map(t => t.label.toLowerCase())
      .concat(CONTENT.extraKeywords || [])
      .join(" · ");

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
  // Hand-placed positions per topic id, in a 520x300 plot (x: theory→practice, y: models→code)
  const FIG_POS = {
    agents:           { x: 400, y: 110 },
    evaluation:       { x: 288, y: 178 },
    interpretability: { x: 138, y: 96 },
    data:             { x: 196, y: 238 },
    completion:       { x: 408, y: 224 },
  };

  const fig = document.createElementNS(SVG_NS, "svg");
  fig.setAttribute("viewBox", "0 0 560 320");
  fig.setAttribute("width", "560");

  // slightly wobbly hand-drawn axes
  const axes = document.createElementNS(SVG_NS, "path");
  axes.setAttribute("class", "axis");
  axes.setAttribute("d",
    "M 60 24 C 58 110, 61 200, 59 276 L 530 274 M 59 276 L 530 274" +
    " M 60 24 l -4 9 M 60 24 l 5 9 M 530 274 l -9 -4 M 530 274 l -9 5");
  fig.appendChild(axes);

  const label = (x, y, text, anchor = "middle", rotate = null) => {
    const t = document.createElementNS(SVG_NS, "text");
    t.setAttribute("class", "axis-label");
    t.setAttribute("x", x); t.setAttribute("y", y);
    t.setAttribute("text-anchor", anchor);
    if (rotate) t.setAttribute("transform", `rotate(${rotate} ${x} ${y})`);
    t.textContent = text;
    fig.appendChild(t);
  };
  label(48, 20, "models", "end");
  label(46, 262, "code", "end", -90);
  label(530, 292, "practice", "end");
  label(84, 292, "theory", "start");

  const topicGroups = {};
  for (const [tid, t] of Object.entries(CONTENT.topics)) {
    const pos = FIG_POS[tid] || { x: 100 + Math.random() * 380, y: 60 + Math.random() * 200 };
    const g = document.createElementNS(SVG_NS, "g");
    g.setAttribute("class", "topic");
    g.dataset.topic = tid;

    const s = 5;
    const mark = document.createElementNS(SVG_NS, "path");
    mark.setAttribute("class", "mark");
    mark.setAttribute("d",
      `M ${pos.x - s} ${pos.y - s} L ${pos.x + s} ${pos.y + s} M ${pos.x - s} ${pos.y + s} L ${pos.x + s} ${pos.y - s}`);
    g.appendChild(mark);

    const txt = document.createElementNS(SVG_NS, "text");
    txt.setAttribute("class", "mark-label");
    txt.setAttribute("x", pos.x + 11);
    txt.setAttribute("y", pos.y + 4);
    txt.textContent = t.label;
    g.appendChild(txt);

    const hit = document.createElementNS(SVG_NS, "rect");
    hit.setAttribute("class", "mark-hit");
    hit.setAttribute("x", pos.x - 12);
    hit.setAttribute("y", pos.y - 16);
    hit.setAttribute("width", 24 + t.label.length * 7.5);
    hit.setAttribute("height", 32);
    g.appendChild(hit);

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
  CONTENT.news.forEach(n => {
    const li = document.createElement("li");
    li.className = "attn-item attn-anchor";
    li.dataset.topics = (n.topics || []).join(" ");
    const links = (n.links || [])
      .map(u => `<a class="proof-link" href="${u}" target="_blank" rel="noopener" title="${host(u)}" aria-label="Open on ${host(u)}">↗</a>`)
      .join("");
    li.innerHTML = `<span class="proof-date">${n.date}</span><span>${n.html}${links ? `&nbsp;<span class="proof-links">${links}</span>` : ""}</span>`;
    $("#newsList").appendChild(li);
  });

  /* ============ 3. Software artifacts ============ */

  // Minimal, monochrome host marks (inherit the surrounding text colour).
  const HOST_ICON = {
    github: `<svg class="artifact-icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.02-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`,
    huggingface: `<svg class="artifact-icon hf" viewBox="0 0 32 30" aria-hidden="true"><g fill="#FFD21E" stroke="#FF9D00" stroke-width="0.6"><path d="M5.6 14.4c-1.9.1-3.1 1.6-2.8 3.4.2 1.2 1.3 1.9 2.4 1.6l3.3-.7-1.3-4.2z"/><path d="M26.4 14.4c1.9.1 3.1 1.6 2.8 3.4-.2 1.2-1.3 1.9-2.4 1.6l-3.3-.7 1.3-4.2z"/></g><path fill="#FFD21E" d="M16 5.6c5.6 0 10.2 4.4 10.2 9.9S21.6 25.4 16 25.4 5.8 21 5.8 15.5 10.4 5.6 16 5.6z"/><circle cx="10.7" cy="18" r="1.8" fill="#FF9D00" opacity="0.5"/><circle cx="21.3" cy="18" r="1.8" fill="#FF9D00" opacity="0.5"/><circle cx="12.5" cy="14.4" r="1.3" fill="#3A2E1E"/><circle cx="19.5" cy="14.4" r="1.3" fill="#3A2E1E"/><path fill="#3A2E1E" d="M12.9 18.2h6.2c0 1.8-1.4 3.2-3.1 3.2s-3.1-1.4-3.1-3.2z"/></svg>`,
  };
  const hostIcon = (url = "") =>
    /huggingface\.co/.test(url) ? HOST_ICON.huggingface :
    /github\.com/.test(url) ? HOST_ICON.github : "";

  CONTENT.projects.forEach(p => {
    const topics = (p.topics || []).join(" ");
    const dt = document.createElement("dt");
    dt.className = "attn-item attn-anchor";
    dt.dataset.topics = topics;
    const ext = p.url && p.url.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
    dt.innerHTML = `<a href="${p.url}"${ext}>${hostIcon(p.url)}<span class="aname">${p.name}</span></a><span class="tech">${p.tech}</span>`;
    const dd = document.createElement("dd");
    dd.className = "attn-item";
    dd.dataset.topics = topics;
    dd.textContent = p.description;
    $("#artifacts").appendChild(dt);
    $("#artifacts").appendChild(dd);
  });

  /* ============ 4. Acknowledgments ============ */

  const email = CONTENT.footerLinks.find(l => l.url.startsWith("mailto:"));
  $("#acks").innerHTML =
    `${CONTENT.footerLine} The author thanks supervisors Maliheh Izadi and Arie van Deursen, ` +
    `all coauthors, and Reviewer&nbsp;2, who was right about Section&nbsp;4.2 but has never been told. ` +
    (email ? `Correspondence: <a href="${email.url}">${email.label}</a>.` : "");

  /* ============ References ============ */

  // Label a publication-page link by its host (ACM/IEEE first, then arXiv, …).
  const pageLabel = (url) => {
    const u = url.toLowerCase();
    if (u.includes("acm.org")) return "acm";
    if (u.includes("ieee")) return "ieee";
    if (u.includes("arxiv.org")) return "arxiv";
    if (u.includes("openreview")) return "openreview";
    if (u.includes("doi.org")) return "doi";
    if (u.includes("tudelft") || u.includes("repository")) return "tu delft";
    return "page";
  };

  const refsEl = $("#refs");
  pubs.forEach((pub, i) => {
    const li = document.createElement("li");
    li.id = `ref-${i}`;
    li.className = "attn-item attn-anchor";
    li.dataset.topics = pub.topics.join(" ");
    const authors = pub.authors.split(/,\s*/)
      .map(a => a === meName ? `<span class="me">${a}</span>` : a).join(", ");
    const links = Object.entries(pub.links || {})
      .map(([k, v]) => `<a class="ref-link" href="${v}">${k}</a>`).join("");
    const pageLink = pub.page
      ? `<a class="ref-link ref-page" href="${pub.page}" target="_blank" rel="noopener">${pageLabel(pub.page)}</a>`
      : "";
    const tldrBtn = pub.tldr ? `<button class="tldr-btn">abstract</button>` : "";
    li.innerHTML =
      `${authors}. <span class="r-title">“${pub.title}.”</span> ` +
      `<span class="r-venue">${pub.type === "journal" ? "" : "In "}${pub.venue}</span>, ` +
      `<span class="r-year">${pub.year}</span>. ` +
      `<span class="ref-links">${pageLink}${links}${tldrBtn}</span>` +
      (pub.tldr ? `<div class="ref-tldr" hidden>${pub.tldr}</div>` : "");
    li.querySelector(".tldr-btn")?.addEventListener("click", (e) => {
      const panel = li.querySelector(".ref-tldr");
      panel.hidden = !panel.hidden;
      e.target.classList.toggle("open", !panel.hidden);
    });
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
      `<div class="cc-meta">${pub.venue} ${pub.year} · ${pub.authors}</div>`;
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

    const s = docRect(sourceEl);
    const gutterX = Math.max(20, docRect(sheet).left - 46);

    relatedAnchors(tid).forEach((el, i) => {
      const t = docRect(el);
      const sx = s.cx, sy = s.bottom + 2;
      const ex = t.left - 6, ey = t.cy;
      const m1 = sy + (ey - sy) * 0.28, m2 = sy + (ey - sy) * 0.72;

      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", `M ${sx} ${sy} C ${gutterX} ${m1}, ${gutterX} ${m2}, ${ex} ${ey}`);
      arcSvg.appendChild(path);

      const dS = document.createElementNS(SVG_NS, "circle");
      dS.setAttribute("cx", sx); dS.setAttribute("cy", sy); dS.setAttribute("r", 2.4);
      const dE = document.createElementNS(SVG_NS, "circle");
      dE.setAttribute("cx", ex); dE.setAttribute("cy", ey); dE.setAttribute("r", 2.4);
      arcSvg.appendChild(dS); arcSvg.appendChild(dE);

      if (!reducedMotion) {
        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        path.getBoundingClientRect(); // reflow so the transition takes
        path.style.transition = `stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 55}ms`;
        path.style.strokeDashoffset = "0";
        dE.style.opacity = "0";
        dE.style.transition = `opacity 0.2s ease ${i * 55 + 340}ms`;
        requestAnimationFrame(() => (dE.style.opacity = "1"));
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

  /* ============ Pencil marginalia ============ */

  const sheet = $("#sheet");
  const NOTES = [
    { anchor: "#intro p:nth-child(1)", dy: 0,
      html: `agents should <span class="tick">run</span> the tests,<br/>not just write them` },
    { anchor: "#fig1", dy: 30,
      html: `axes chosen after<br/>the data, obviously` },
    { anchor: "#artifacts", dy: 8,
      html: `code or it<br/>didn’t happen ✓` },
    { anchor: "#referencesSec", dy: 40,
      html: `reviewer 2 was,<br/>eventually, appeased` },
  ];

  const noteEls = [];
  NOTES.forEach(n => {
    const anchor = $(n.anchor);
    if (!anchor) return;
    const div = document.createElement("div");
    div.className = "margin-note";
    div.innerHTML = n.html;
    sheet.appendChild(div);
    noteEls.push({ div, anchor, dy: n.dy });
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
    for (const { div, anchor, dy } of noteEls)
      div.style.top = (topWithinSheet(anchor) + dy) + "px";
  }
  placeNotes();
  addEventListener("resize", placeNotes);
  document.fonts?.ready.then(placeNotes);

  const noteIO = new IntersectionObserver((entries) => {
    for (const e of entries)
      if (e.isIntersecting) { e.target.classList.add("in"); noteIO.unobserve(e.target); }
  }, { threshold: 0.6 });
  noteEls.forEach(({ div }) => noteIO.observe(div));

  /* ============ Paper tilt: the sheet rests under your hand ============ */

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

  /* ============ Colophon ============ */

  $("#colophon").textContent =
    "typeset in the browser · no frameworks · prints like a paper (try ⌘P) · " +
    CONTENT.colophon.toLowerCase().replace(/^hand-built.*?js\. /, "");

})();
