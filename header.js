/* ===========================================================
   header.js — the site navigation, defined ONCE.
   Every page includes it with:  <script src="header.js"></script>
   placed where the nav should appear (first thing inside <body>).

   To add/rename/remove a menu item, edit the NAV_LINKS list below.
   The current page is highlighted automatically.
   Works when double-clicking the files (no server needed).
   =========================================================== */
(function () {
  const NAV_LINKS = [
    { href: "index.html",      label: "Home" },
    { href: "who.html",        label: "Who" },
    { href: "what.html",       label: "What" },
    { href: "why.html",        label: "Why" },
    { href: "gallery.html",    label: "Gallery" },
    { href: "flashcards.html", label: "Flashcards &amp; Game" },
  ];

  // Which page are we on? ("" or "/" means the home page)
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const links = NAV_LINKS.map(l =>
    '<a href="' + l.href + '"' +
    (l.href === current ? ' class="active"' : '') + '>' + l.label + '</a>'
  ).join("\n        ");

  const html = `
  <nav class="nav">
    <div class="container">
      <a class="brand" href="index.html"><span class="mark">Rx</span><span>Medical Literacy through Language</span></a>
      <button class="nav-toggle" aria-label="Menu">☰</button>
      <div class="nav-links">
        ${links}
      </div>
    </div>
  </nav>`;

  // Insert right where the <script> tag sits, so there is no flash of missing nav
  const me = document.currentScript;
  me.insertAdjacentHTML("beforebegin", html);

  // Mobile menu toggle (self-contained, no dependency on game.js)
  const toggle = me.previousElementSibling.querySelector(".nav-toggle");
  const menu   = me.previousElementSibling.querySelector(".nav-links");
  toggle.addEventListener("click", () => menu.classList.toggle("open"));
})();
