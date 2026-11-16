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
  if (educationList) (CONTENT.education || []).forEach((group, k) => {
    const what = group.label.replace(/^Selected\s+/i, "").replace(/s$/, "");   // "Degrees" -> "Degree"
    const rows = (group.items || []).map(e =>
      `<tr><td>${e.period}</td><td>${e.degree}${footmarks(e.links)}</td>` +
      `<td>${[e.institution, e.location].filter(Boolean).join(", ")}</td></tr>`).join("");
    educationList.insertAdjacentHTML("beforeend",
      `<figure class="paper-table"><figcaption><strong>Table ${k + 1}.</strong> ${group.label}.</figcaption>` +
      `<table><thead><tr><th>Period</th><th>${what}</th><th>Institution</th></tr></thead>` +
      `<tbody>${rows}</tbody></table></figure>`);
  });

  // Appendices B–D are run-in paragraphs: "Head (period). Text."
  const runin = (head, meta, body) =>
    `<p class="runin"><span class="runin-head">${head}</span>${meta ? ` (${meta})` : ""}. ${body}</p>`;

  /* ============ Appendix B: Teaching ============ */

  const teachingList = $("#teachingList");
  if (teachingList) (CONTENT.teaching || []).forEach(t => {
    const head = [t.position || t.role, t.course].filter(Boolean).join(", ");
    teachingList.insertAdjacentHTML("beforeend", runin(head, t.period, t.what));
  });

  /* ============ Appendix C: Supervision ============ */

  const supervisionList = $("#supervisionList");
  if (supervisionList) (CONTENT.supervision || []).forEach(group => {
    supervisionList.insertAdjacentHTML("beforeend", `<h3 class="subsec-head">${group.label}</h3>`);
    (group.items || []).forEach(s => {
      // A named student leads the paragraph; an unnamed cohort is led by its year.
      supervisionList.insertAdjacentHTML("beforeend", s.who
        ? runin(s.who, s.period, cites(s.topic))
        : `<p class="runin"><span class="runin-head">${s.period}.</span> ${cites(s.topic)}</p>`);
    });
  });

  /* ============ Appendix D: Experience ============ */

  const experienceList = $("#experienceList");
  if (experienceList) (CONTENT.experience || []).forEach(x => {
    const head = x.position ? [x.position, x.place].filter(Boolean).join(", ") : x.role;
    experienceList.insertAdjacentHTML("beforeend",
      runin(head, [x.period, x.location].filter(Boolean).join("; "), x.what));
  });

  /* ============ Appendix E: Miscellany ============ */

  const miscList = $("#miscList");
  if (miscList) (CONTENT.misc || []).forEach(m => {
    const li = document.createElement("li");
    const links = arrows(m.links);
    li.innerHTML = `<span class="proof-date">${m.date}</span><span>${m.html}${links ? `&nbsp;<span class="proof-links">${links}</span>` : ""}</span>`;
    miscList.appendChild(li);
  });


})();
