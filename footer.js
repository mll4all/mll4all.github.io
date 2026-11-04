/* ===========================================================
   footer.js — the site footer, defined ONCE.
   Every page includes it with:  <script src="footer.js"></script>
   placed where the footer should appear (end of <body>).
   The copyright year fills in automatically.
   =========================================================== */
(function () {
  const html = `
  <footer>
    <div class="container">
      <div>
        <div class="brand"><span class="mark">Rx</span> Medical Literacy through Language</div>
        <small>A non-profit health-literacy initiative.</small>
      </div>
      <div>
        <small>
          Any questions? Contact us!<br>
          <a href="mailto:mll4all.sd@gmail.com">mll4all.sd@gmail.com</a><br>
          © ${new Date().getFullYear()} Medical Literacy through Language
        </small>
      </div>
    </div>
  </footer>`;

  document.currentScript.insertAdjacentHTML("beforebegin", html);
})();
