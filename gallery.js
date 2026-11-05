/* ===========================================================
   gallery.js — builds the gallery from the WORKSHOPS list below.

   ➜ TO EDIT:  change titles/dates/descriptions, or add/remove photos.
     Each workshop should have 3–5 photos. Put image files in the
     matching folder (e.g. img/gallery/workshop-1/) and list them here.
     `alt` describes the photo for screen readers (please keep it filled in).
     `caption` is optional and shows in the enlarged view.
   ➜ TO ADD A WORKSHOP: copy one object and give it a new id and folder.
   Photos whose files aren't found yet show a "add photo" placeholder.
   =========================================================== */

const WORKSHOPS = [
  {
    id: "workshop-1",
    title: "4S Ranch Community Library",
    meta: "Local Community workshop on August 15th, 2026",
    
    photos: [
      { src: "gallery/4S-Library-Workshop/4SLib-1.jpg", alt: "Workshop attendees at 4S Ranch Community Library", caption: "" },
      { src: "gallery/4S-Library-Workshop/4SLib-2.jpg", alt: "MLL volunteers presenting the Medical Decoder Guide", caption: "" },
      { src: "gallery/4S-Library-Workshop/4SLib-3.jpg", alt: "Participants breaking a medical term into its roots", caption: "" },
      { src: "gallery/4S-Library-Workshop/4SLib-4.jpg", alt: "Participants working with the flashcards", caption: "" },
      { src: "gallery/4S-Library-Workshop/4SLib-5.jpg", alt: "The MLL team after the workshop", caption: "" }
    ]
  },
  {
    id: "workshop-2",
    title: "UCSD Public Health Investigators Camp",
    meta: "Ourworkshop during USCD YAC Public Health Investigators Camp on August 29th, 2026",
    
    photos: [
      { src: "gallery/UCSD-YAC-Public-Health-Workshop/UCSD-YAC-1.jpg", alt: "Students at the UCSD Public Health Investigators camp", caption: "" },
      { src: "gallery/UCSD-YAC-Public-Health-Workshop/UCSD-YAC-2.jpg", alt: "An MLL volunteer explaining Greek and Latin roots", caption: "" },
      { src: "gallery/UCSD-YAC-Public-Health-Workshop/UCSD-YAC-3.jpg", alt: "Students practicing medical term decoding", caption: "" },
      { src: "gallery/UCSD-YAC-Public-Health-Workshop/UCSD-YAC-4.jpg", alt: "Group photo from the camp workshop", caption: "" },
      { src: "gallery/UCSD-YAC-Public-Health-Workshop/UCSD-YAC-5.jpg", alt: "Group photo from the camp workshop", caption: "" },
      { src: "gallery/UCSD-YAC-Public-Health-Workshop/UCSD-YAC-6.jpg", alt: "Group photo from the camp workshop", caption: "" }
    ]
  },
  {
    id: "workshop-3",
    title: "Grace Academy Summer Camp",
    meta: "MLL Workshop At Grace Academy Summer Camp on July 6th, 2026",
    
    photos: [
      { src: "gallery/Grace-Academy-Summer-Camp/Grace-1.jpg", Grace-1alt: "Workshop 3 — describe this photo", caption: "" },
      { src: "gallery/Grace-Academy-Summer-Camp/Grace-2.jpg", alt: "Workshop 3 — describe this photo", caption: "" },
      { src: "gallery/Grace-Academy-Summer-Camp/Grace-3.jpg", alt: "Workshop 3 — describe this photo", caption: "" }
    ]
  },
  {
    id: "workshop-4",
    title: "Victory Bell Education and Research Center",
    meta: "MLL and AI Odysses Workshop at Victory Bell on August 22nd, 2026",
   
    photos: [
      { src: "gallery/AI-Odyssey-Workshop/AI-Odyssey.jpg", alt: "Workshop 4 — describe this photo", caption: "" }
    ]
  }
];

(function () {
  const root = document.getElementById("gallery-root");
  const jump = document.getElementById("gallery-jump");
  if (!root) return;

  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Build page ---------- */
  jump.innerHTML = WORKSHOPS.map(w =>
    '<a class="chip" href="#' + esc(w.id) + '">' + esc(w.title) + '</a>').join("");

  root.innerHTML = WORKSHOPS.map(w => `
    <article class="workshop" id="${esc(w.id)}">
      <h2>${esc(w.title)}</h2>
      <p class="meta">${esc(w.meta)}</p>
      <p class="desc">${esc(w.description)}</p>
      <div class="photo-grid">
        ${w.photos.map((p, i) => `
          <button type="button" class="photo" data-w="${esc(w.id)}" data-i="${i}"
                  aria-label="Enlarge photo ${i + 1} of ${w.photos.length}: ${esc(p.alt)}">
            <img src="${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy">
          </button>`).join("")}
      </div>
    </article>`).join("");

  /* Missing image → friendly placeholder, not a broken icon */
  root.querySelectorAll(".photo img").forEach(img => {
    const markMissing = () => {
      const btn = img.closest(".photo");
      btn.classList.add("missing");
      btn.disabled = true;
      btn.removeAttribute("aria-label");
      btn.innerHTML = '<span class="missing-note"><b>Photo coming soon</b><code>' +
        esc(img.getAttribute("src")) + '</code></span>';
    };
    img.addEventListener("error", markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  });

  /* ---------- Lightbox ---------- */
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCap = document.getElementById("lb-cap");
  let current = null, idx = 0, opener = null;

  function show() {
    const p = current.photos[idx];
    lbImg.src = p.src;
    lbImg.alt = p.alt;
    lbCap.textContent = (p.caption ? p.caption + " — " : "") +
      current.title + " (" + (idx + 1) + " / " + current.photos.length + ")";
  }
  function open(wid, i, trigger) {
    current = WORKSHOPS.find(w => w.id === wid);
    idx = i; opener = trigger;
    show();
    lb.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    document.getElementById("lb-close").focus();
  }
  function close() {
    lb.classList.add("hidden");
    document.body.style.overflow = "";
    if (opener) opener.focus();
  }
  function step(d) {
    idx = (idx + d + current.photos.length) % current.photos.length;
    show();
  }

  root.addEventListener("click", e => {
    const b = e.target.closest(".photo");
    if (b && !b.disabled) open(b.dataset.w, +b.dataset.i, b);
  });
  document.getElementById("lb-close").addEventListener("click", close);
  document.getElementById("lb-prev").addEventListener("click", () => step(-1));
  document.getElementById("lb-next").addEventListener("click", () => step(1));
  lb.addEventListener("click", e => { if (e.target === lb) close(); });

  document.addEventListener("keydown", e => {
    if (lb.classList.contains("hidden")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
})();
