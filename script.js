/* Project-X — progressive enhancement, vanilla JS, no dependencies.
   Honors ui-ux-pro-max rules (reduced-motion aware, 150-300ms motion,
   transform/opacity, count-up on scroll) within the frontend-design
   "engineering blueprint" aesthetic (staggered load, console reveal). */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Theme (dark default; persisted; respects system pref) ---- */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("px-theme"); } catch (e) {}
  var prefersLight = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(stored || (prefersLight ? "light" : "dark"));

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("px-theme", theme); } catch (e) {}
    var t = document.getElementById("theme-toggle");
    if (t) t.setAttribute("aria-pressed", String(theme === "dark"));
  }

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---- Mobile nav ---- */
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Hero accent underline draw ---- */
  var heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    if (prefersReduced) heroTitle.classList.add("lit");
    else requestAnimationFrame(function () { heroTitle.classList.add("lit"); });
  }

  /* ---- Console deploy-log staggered reveal ---- */
  var consoleLines = document.querySelectorAll("#console-body p");
  if (consoleLines.length && !prefersReduced) {
    consoleLines.forEach(function (line, i) {
      line.style.animationDelay = (700 + i * 380) + "ms";
      line.classList.add("reveal-line");
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(
    ".card, .section-head, .testimonial, .metric, .badge, .cta-inner, .logo-grid"
  );
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Animated metric counters (count-up on scroll) ---- */
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var decimals = parseInt(el.getAttribute("data-decimals"), 10) || 0;
    if (prefersReduced) { el.textContent = target.toFixed(decimals); return; }
    var duration = 1500, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / duration, 1);
      el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && counters.length) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); cObs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cObs.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---- CTA form (client-side validation) ---- */
  var form = document.getElementById("cta-form");
  var note = document.getElementById("cta-note");
  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("email");
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (valid) {
        note.style.color = "var(--ok)";
        note.textContent = "✓ thanks — we'll reach out at " + input.value.trim();
        form.reset();
      } else {
        note.style.color = "var(--accent-2)";
        note.textContent = "! please enter a valid work email";
        input.focus();
      }
    });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
