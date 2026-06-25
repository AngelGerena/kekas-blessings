// ---------- Mobile navigation toggle ----------
(function () {
  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("navToggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll("#navLinks a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();

// ---------- Reveal on scroll ----------
(function () {
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || els.length === 0) {
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach(function (el) { io.observe(el); });
})();

// ---------- Header condense + parallax (skipped if reduced motion) ----------
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.getElementById("siteHeader");
  var hero = document.querySelector(".hero");
  var media = reduce ? [] : Array.prototype.slice.call(
    document.querySelectorAll(".split__media, .gallery-grid .g")
  );
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;

    if (header) header.classList.toggle("scrolled", y > 18);
    if (reduce) return;

    // Hero: image drifts slower than the page
    if (hero) {
      var py = Math.max(-70, -(y * 0.06));
      hero.style.setProperty("--py", py + "px");
    }

    // Section media: gentle background-position parallax (no layout shift)
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < media.length; i++) {
      var el = media[i];
      var r = el.getBoundingClientRect();
      if (r.bottom < -40 || r.top > vh + 40) continue;
      var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      var offset = -progress * 12; // percent
      el.style.backgroundPositionY = (50 + offset) + "%";
    }
  }

  function onScroll() {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
