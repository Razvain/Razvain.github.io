/* =========================================================================
   Design 3, page 2 — appendices: teaching, supervision, miscellany.
   ========================================================================= */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };
  const arrows = (links) => (links || [])
    .map(u => `<a class="proof-link" href="${u}" target="_blank" rel="noopener" title="${host(u)}" aria-label="Open on ${host(u)}">↗</a>`)
    .join("");

  /* ============ Theme (shared with p. 1) ============ */

  const stored = localStorage.getItem("theme");
  if (stored) document.documentElement.dataset.theme = stored;
  $("#themeToggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  });

  /* ============ Running head, page foot ============ */

  $("#runningName").textContent = CONTENT.name.trim();

  // Publication date in the page foot: always "now".
  const now = new Date();
  document.querySelectorAll(".pubdate").forEach(el =>
    (el.textContent = now.toLocaleDateString("en-US", { month: "long", year: "numeric" })));

  /* ============ Citations into p. 1's references ============ */

  // `[[cite:TITLE-PREFIX]]` in content.js becomes a citation to the paper whose
  // title starts with that prefix, numbered by its place in p. 1's reference
  // list (refs.js) and linking to its stable #ref-N anchor there.
  const pubs = CONTENT.publications;
  const order = refOrder(pubs);
  const cites = (html) => html.replace(/\[\[cite:([^\]]+)\]\]/g, (m, prefix) => {
    const i = pubs.findIndex(p => p.title.startsWith(prefix));
    if (i < 0) return m;
    return `<sup class="cite-group">[<a class="cite" href="index.html#ref-${i}">${order.indexOf(i) + 1}</a>]</sup>`;
  });

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
        dd.innerHTML = cites(s.topic);
        supervisionList.appendChild(dd);
      } else {
        // No student named (e.g. the BSc cohort): description sits inline with
        // the year, no empty name row above it.
        dt.innerHTML = `<span class="period">${s.period}</span><span class="sup-name sup-desc">${cites(s.topic)}</span>`;
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

  /* ============ Colophon ============ */

  $("#colophon").textContent =
    "typeset in the browser · no frameworks · prints like a paper (try ⌘P)";

})();
