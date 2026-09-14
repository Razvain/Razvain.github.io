/* =========================================================================
   Design 3, page 2 — appendices: teaching, supervision, miscellany.
   ========================================================================= */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };
  const arrows = (links) => (links || [])
    .map(u => `<a class="proof-link" href="${u}" target="_blank" rel="noopener" title="${host(u)}" aria-label="Open on ${host(u)}">↗</a>`)
    .join("");

  /* ============ Theme (shared with p. 1) ============ */

  const stored = localStorage.getItem("theme");
  if (stored) document.documentElement.dataset.theme = stored;
  else if (matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.dataset.theme = "dark";
  $("#themeToggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  });

  /* ============ Running head ============ */

  const meName = CONTENT.name.trim();
  const parts = meName.split(/\s+/);
  $("#runningName").textContent = `${parts[0][0]}. ${parts[parts.length - 1]} — personal pages`;

  /* ============ Appendix A: Education ============ */

  const educationList = $("#educationList");
  if (educationList) (CONTENT.education || []).forEach(group => {
    const head = document.createElement("dt");
    head.className = "sup-group";
    head.innerHTML = `<span class="period"></span><span>${group.label}</span>`;
    educationList.appendChild(head);
    (group.items || []).forEach(e => {
      const dt = document.createElement("dt");
      dt.className = "sup-item";
      const links = arrows(e.links);
      const linkWrap = links ? `&nbsp;<span class="proof-links">${links}</span>` : "";
      const loc = e.location ? `<span class="exp-loc">${e.location}</span>` : "";
      const inst = e.institution ? `<span class="subline">${e.institution}</span>` : "";
      dt.innerHTML = `<span class="period">${e.period}</span>` +
        `<span class="sup-name stack-body">` +
          `<span class="exp-role"><span>${e.degree}${linkWrap}</span>${loc}</span>` +
          inst +
        `</span>`;
      educationList.appendChild(dt);
    });
  });

  /* ============ Appendix B: Teaching ============ */

  const teachingList = $("#teachingList");
  if (teachingList) (CONTENT.teaching || []).forEach(t => {
    const dt = document.createElement("dt");
    const course = t.course ? `<span class="t-course"> · ${t.course}</span>` : "";
    dt.innerHTML = `<span class="period">${t.period}</span><span>${t.position || t.role}${course}</span>`;
    const dd = document.createElement("dd");
    dd.textContent = t.what;
    teachingList.appendChild(dt);
    teachingList.appendChild(dd);
  });

  /* ============ Appendix C: Supervision ============ */

  const supervisionList = $("#supervisionList");
  if (supervisionList) (CONTENT.supervision || []).forEach(group => {
    const head = document.createElement("dt");
    head.className = "sup-group";
    head.innerHTML = `<span class="period"></span><span>${group.label}</span>`;
    supervisionList.appendChild(head);
    (group.items || []).forEach(s => {
      const dt = document.createElement("dt");
      dt.className = "sup-item";
      if (s.who) {
        // Named student: name on its own row, description beneath it.
        dt.innerHTML = `<span class="period">${s.period}</span><span class="sup-name">${s.who}</span>`;
        supervisionList.appendChild(dt);
        const dd = document.createElement("dd");
        dd.className = "sup-dd";
        dd.innerHTML = s.topic;
        supervisionList.appendChild(dd);
      } else {
        // No student named (e.g. the BSc cohort): description sits inline with
        // the year, no empty name row above it.
        dt.innerHTML = `<span class="period">${s.period}</span><span class="sup-name sup-desc">${s.topic}</span>`;
        supervisionList.appendChild(dt);
      }
    });
  });

  /* ============ Appendix D: Experience ============ */

  const experienceList = $("#experienceList");
  if (experienceList) (CONTENT.experience || []).forEach(x => {
    const dt = document.createElement("dt");
    const loc = x.location ? `<span class="exp-loc">${x.location}</span>` : "";
    const place = x.place ? `<span class="t-course"> · ${x.place}</span>` : "";
    const title = x.position ? `${x.position}${place}` : x.role;
    dt.innerHTML = `<span class="period">${x.period}</span><span class="exp-role"><span>${title}</span>${loc}</span>`;
    const dd = document.createElement("dd");
    dd.textContent = x.what;
    experienceList.appendChild(dt);
    experienceList.appendChild(dd);
  });

  /* ============ Appendix E: Miscellany ============ */

  const miscList = $("#miscList");
  if (miscList) (CONTENT.misc || []).forEach(m => {
    const li = document.createElement("li");
    const links = arrows(m.links);
    li.innerHTML = `<span class="proof-date">${m.date}</span><span>${m.html}${links ? `&nbsp;<span class="proof-links">${links}</span>` : ""}</span>`;
    miscList.appendChild(li);
  });

  /* ============ Pencil marginalia ============ */

  const sheet = $("#sheet");
  const NOTES = [
    { anchor: "#supervisionSec", dy: 6,
      html: `the students did<br/>the hard parts` },
    { anchor: "#miscSec", dy: 30,
      html: `the quiet<br/><span class="tick">upkeep</span>` },
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

  /* ============ Colophon ============ */

  $("#colophon").textContent =
    "typeset in the browser · no frameworks · prints like a paper (try ⌘P)";

})();
