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

  // Appendices B–E are bulleted lists: "• Head (period). Text."
  const item = (head, meta, body) =>
    `<li><span class="runin-head">${head}</span>${meta ? ` (${meta})` : ""}. ${body}</li>`;
  const list = (mount, items) => mount.insertAdjacentHTML("beforeend", `<ul class="paper-list">${items.join("")}</ul>`);

  /* ============ Appendix B: Teaching ============ */

  const teachingList = $("#teachingList");
  if (teachingList) list(teachingList, (CONTENT.teaching || []).map(t =>
    item([t.position || t.role, t.course].filter(Boolean).join(", "), t.period, t.what)));

  /* ============ Appendix C: Supervision ============ */

  const supervisionList = $("#supervisionList");
  if (supervisionList) (CONTENT.supervision || []).forEach(group => {
    supervisionList.insertAdjacentHTML("beforeend", `<h3 class="subsec-head">${group.label}</h3>`);
    // A named student leads the item; an unnamed cohort ends with its year.
    list(supervisionList, (group.items || []).map(s => s.who
      ? item(s.who, s.period, cites(s.topic))
      : `<li>${cites(s.topic).replace(/\.\s*$/, "")} (${s.period}).</li>`));
  });

  /* ============ Appendix D: Experience ============ */

  const experienceList = $("#experienceList");
  if (experienceList) list(experienceList, (CONTENT.experience || []).map(x =>
    item(x.position ? [x.position, x.place].filter(Boolean).join(", ") : x.role,
         [x.period, x.location].filter(Boolean).join("; "), x.what)));

  /* ============ Appendix E: Miscellany ============ */

  // "• Program Committee, …, Dublin, Ireland (2027).†"
  const miscList = $("#miscList");
  if (miscList) (CONTENT.misc || []).forEach(m => {
    const li = document.createElement("li");
    const links = arrows(m.links);
    // Skip the "(date)" when the text already names it ("… 26–27 April 2027.").
    li.innerHTML = (m.html.includes(m.date) ? m.html
      : `${m.html.replace(/\.\s*$/, "")} <span class="nowrap">(${m.date})</span>.`) +
      (links ? `&nbsp;<span class="proof-links">${links}</span>` : "");
    miscList.appendChild(li);
  });

})();
