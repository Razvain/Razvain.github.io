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

  /* ============ Appendix A: Education (tables) ============ */

  // Each group is a booktabs-style table with its caption above, as in acmart.
  const footmarks = (links) => {
    const l = arrows(links);
    return l ? `&nbsp;<span class="proof-links">${l}</span>` : "";
  };
  const educationList = $("#educationList");
  if (educationList) {
    // One table, a labelled group of rows per education group (degrees, programs).
    const rows = (CONTENT.education || []).map(group =>
      `<tr class="group-row"><th colspan="3">${group.label}</th></tr>` +
      (group.items || []).map(e =>
        `<tr><td>${e.period}</td><td>${e.degree}${footmarks(e.links)}</td>` +
        `<td>${[e.institution, e.location].filter(Boolean).join(", ")}</td></tr>`).join("")).join("");
    educationList.innerHTML =
      `<figure class="paper-table"><figcaption><strong>Table 2.</strong> Degrees and selected programs.</figcaption>` +
      `<table><thead><tr><th>Period</th><th>Degree or program</th><th>Institution</th></tr></thead>` +
      `<tbody>${rows}</tbody></table></figure>`;
  }

  // Appendices B–D: one numbered subsection per entry, "B.1 Title (period)",
  // with its text as a paragraph below.
  const letter = (mount) => mount.closest("section")?.querySelector(".sec-no")?.textContent ?? "";
  const entry = (no, title, meta, body) =>
    `<h3 class="subsec-head"><span class="sec-no">${no}</span>${title}` +
    (meta ? ` <span class="subsec-meta">(${meta})</span>` : "") + `</h3><p class="entry-body">${body}</p>`;

  /* ============ Appendix B: Teaching ============ */

  const teachingList = $("#teachingList");
  if (teachingList) teachingList.innerHTML = (CONTENT.teaching || []).map((t, i) =>
    entry(`${letter(teachingList)}.${i + 1}`, [t.position || t.role, t.course].filter(Boolean).join(", "), t.period, t.what)).join("");

  /* ============ Appendix C: Supervision ============ */

  // One subsection per group (MSc, BSc); each student's name and period sit
  // on their own line with the topic below.
  const supervisionList = $("#supervisionList");
  if (supervisionList) supervisionList.innerHTML = (CONTENT.supervision || []).map((group, i) =>
    `<h3 class="subsec-head"><span class="sec-no">${letter(supervisionList)}.${i + 1}</span>${group.label}</h3>` +
    (group.items || []).map(s =>
      `<p class="entry-title">${s.who ? `<b>${s.who}</b> (${s.period})` : `<b>${s.period}</b>`}</p>` +
      `<p class="entry-body">${cites(s.topic)}</p>`).join("")).join("");

  /* ============ Appendix D: Experience ============ */

  const experienceList = $("#experienceList");
  if (experienceList) experienceList.innerHTML = (CONTENT.experience || []).map((x, i) =>
    entry(`${letter(experienceList)}.${i + 1}`, x.position ? [x.position, x.place].filter(Boolean).join(", ") : x.role,
          [x.period, x.location].filter(Boolean).join("; "), x.what)).join("");

  /* ============ Appendix E: Miscellany ============ */

  // Date in a narrow column beside each entry, as in §2 on p.1.
  const miscList = $("#miscList");
  if (miscList) (CONTENT.misc || []).forEach(m => {
    const li = document.createElement("li");
    const links = arrows(m.links);
    li.innerHTML = `<span class="proof-date">${m.date}</span>` +
      `<span>${m.html}${links ? `&nbsp;<span class="proof-links">${links}</span>` : ""}</span>`;
    miscList.appendChild(li);
  });

})();
