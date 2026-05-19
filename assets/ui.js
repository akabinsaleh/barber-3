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
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
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
