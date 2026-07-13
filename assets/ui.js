/* ============================================================
   BARBER PROTOTYPE 3 — Shared UI Behavior
   - Nav burger / overlay
   - Scroll reveal via IntersectionObserver
   - Active nav link highlight
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initNav();
    initReveal();
    highlightActiveNav();
  });

  function initNav() {
    const burger = document.querySelector('[data-burger]');
    const overlay = document.querySelector('[data-overlay]');
    if (!burger || !overlay) return;

    function close() {
      burger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
    }
    function open() {
      burger.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      burger.setAttribute('aria-expanded', 'true');
    }

    burger.addEventListener('click', function () {
      if (burger.classList.contains('open')) close(); else open();
    });

    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.classList.contains('open')) close();
    });
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible', 'is-settled'); });
      return;
    }

    // Fire slightly *before* the element fully enters view so the motion
    // feels anticipatory, not late. Two thresholds give the observer a chance
    // to catch fast scrolls without doing any work on the scroll thread.
    const io = new IntersectionObserver(function (entries) {
      // Batch DOM writes in a single frame to avoid layout thrash on long pages.
      const toReveal = [];
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          toReveal.push(entry.target);
          io.unobserve(entry.target);
        }
      });
      if (!toReveal.length) return;
      requestAnimationFrame(function () {
        toReveal.forEach(function (el) { el.classList.add('is-visible'); });
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: [0, 0.05] });

    els.forEach(function (el) { io.observe(el); });

    // After each element finishes transitioning, drop will-change so the
    // browser can release its compositor layer. Keeps memory + paint cheap
    // on long scroll pages.
    document.addEventListener('transitionend', function (e) {
      const t = e.target;
      if (t && t.classList && t.classList.contains('reveal') && t.classList.contains('is-visible')) {
        t.classList.add('is-settled');
      }
    }, { passive: true });
  }

  function highlightActiveNav() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      const target = (a.getAttribute('href') || '').toLowerCase();
      if (target === path || (path === '' && target === 'index.html')) {
        a.classList.add('active');
      }
    });
  }
})();
