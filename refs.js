/* =========================================================================
   refs.js — shared by p. 1 and p. 2: the display order of the references.
   refOrder(pubs) returns publication indices (into CONTENT.publications) in
   the order the reference list shows them; a citation's visible number is
   1 + its position here, while #ref-N anchors keep the content.js index.
   ========================================================================= */

// "alpha": ACM-Reference-Format order (first author's surname, then the full
// author list, then year ascending, then title). "chrono": content.js order.
const REF_ORDER = "chrono";

window.refOrder = (pubs) => {
  const ids = pubs.map((_, i) => i);
  if (REF_ORDER !== "alpha") return ids;

  // Base sensitivity: case- and diacritic-insensitive ("Á" == "a").
  const cmp = new Intl.Collator("en", { sensitivity: "base" }).compare;
  const surname = (p) => p.authors.split(/,\s*/)[0].trim().split(/\s+/).pop();
  return ids.sort((a, b) => {
    const pa = pubs[a], pb = pubs[b];
    return cmp(surname(pa), surname(pb)) ||
      cmp(pa.authors, pb.authors) ||
      pa.year - pb.year ||
      cmp(pa.title, pb.title);
  });
};
