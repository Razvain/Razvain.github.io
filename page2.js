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
  // Short forms keep every cell on one line; the full name is the tooltip.
  const SHORT = { "Delft University of Technology": "TU Delft", "The Netherlands": "NL",
                  "Germany": "DE", "USA": "US", "Australia": "AU" };
  const short = (text = "") => {
    const s = text.replace(/Delft University of Technology|The Netherlands|Germany|USA|Australia/g, m => SHORT[m]);
    return s === text ? text : `<abbr title="${text}">${s}</abbr>`;
  };
  const educationList = $("#educationList");
  if (educationList) {
    // One table, a labelled group of rows per education group (degrees, programs).
    const rows = (CONTENT.education || []).map(group =>
      `<tr class="group-row"><th colspan="4">${group.label}</th></tr>` +
      (group.items || []).map(e =>
        `<tr><td>${e.period}</td><td>${e.degree}${footmarks(e.links)}</td>` +
        `<td>${short(e.institution)}</td><td>${short(e.location)}</td></tr>`).join("")).join("");
    educationList.innerHTML =
      `<figure class="paper-table edu-table"><figcaption><strong>Table 2.</strong> Degrees and selected programs.</figcaption>` +
      `<table><thead><tr><th>Period</th><th>Degree or program</th><th>Institution</th><th>Location</th></tr></thead>` +
      `<tbody>${rows}</tbody></table></figure>`;
  }

  // Appendices B–D: enumerated lists ("1.", "2.", …); each item has its title
  // and period on one line and its text below.
  const item = (title, meta, body) =>
    `<li><p class="entry-title"><b>${title}</b>${meta ? ` (${meta})` : ""}</p><p class="entry-body">${body}</p></li>`;
  const enumerate = (items) => `<ol class="paper-enum">${items.join("")}</ol>`;

  /* ============ Appendix B: Teaching ============ */

  const teachingList = $("#teachingList");
  if (teachingList) teachingList.innerHTML = enumerate((CONTENT.teaching || []).map(t =>
    item([t.position || t.role, t.course].filter(Boolean).join(", "), t.period, t.what)));

  /* ============ Appendix C: Supervision ============ */

  // A heading per group (MSc, BSc). Named students are a bulleted list; a group with
  // one unnamed cohort carries its period in the heading, its topic below.
  const supervisionList = $("#supervisionList");
  if (supervisionList) supervisionList.innerHTML = (CONTENT.supervision || []).map(group => {
    const items = group.items || [];
    if (items.length === 1 && !items[0].who)
      return `<h3 class="subsec-head">${group.label} <span class="subsec-meta">(${items[0].period})</span></h3>` +
        `<p class="entry-body">${cites(items[0].topic)}</p>`;
    return `<h3 class="subsec-head">${group.label}</h3>` +
      `<ul class="paper-enum bulleted">${items.map(s => item(s.who || s.period, s.who ? s.period : "", cites(s.topic))).join("")}</ul>`;
  }).join("");

  /* ============ Appendix D: Experience ============ */

  const experienceList = $("#experienceList");
  if (experienceList) experienceList.innerHTML = enumerate((CONTENT.experience || []).map(x =>
    item(x.position ? [x.position, x.place].filter(Boolean).join(", ") : x.role,
         [x.period, x.location].filter(Boolean).join("; "), x.what)));

  /* ============ Appendix E: Miscellany ============ */

  // Date in a narrow column beside each entry, as in §2 on p.1.
  const miscList = $("#miscList");
  if (miscList) (CONTENT.misc || []).forEach(m => {
    const li = document.createElement("li");
    const links = arrows(m.links);
    li.innerHTML = `<span class="proof-date">${m.date.replace(" & ", " &amp;<br>")}</span>` +
      `<span>${m.html}${links ? `&nbsp;<span class="proof-links">${links}</span>` : ""}</span>`;
    miscList.appendChild(li);
  });

})();
