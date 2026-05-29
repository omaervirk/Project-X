/* Project-X — progressive enhancement, vanilla JS, no dependencies */
(function () {
  "use strict";

  /* ---- Theme toggle (persisted, respects system preference) ---- */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("px-theme"); } catch (e) {}
  var prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(stored || (prefersDark ? "dark" : "light"));

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("px-theme", theme); } catch (e) {}
    var toggle = document.getElementById("theme-toggle");
    if (toggle) toggle.setAttribute("aria-pressed", String(theme === "dark"));
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
      if (e.target.tagName === "A") {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(
    ".card, .section-head, .showcase-copy, .showcase-preview, .faq details, .cta-inner"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Animated stat counters ---- */
  var counters = document.querySelectorAll(".stat-num[data-count]");
  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var start = 0, duration = 1200, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / duration, 1);
      el.textContent = Math.floor(start + (target - start) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && counters.length) {
    var cObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); cObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cObserver.observe(el); });
  }

  /* ---- CTA form (client-side validation only) ---- */
  var form = document.getElementById("cta-form");
  var note = document.getElementById("cta-note");
  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("email");
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (valid) {
        note.style.color = "var(--accent)";
        note.textContent = "Thanks! We'll be in touch at " + input.value.trim() + ".";
        form.reset();
      } else {
        note.style.color = "#ff5f57";
        note.textContent = "Please enter a valid email address.";
        input.focus();
      }
    });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
