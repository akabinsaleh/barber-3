/* ============================================================
   BARBER PROTOTYPE 3 — Booking flow controller (bilingual)
   ============================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'bp3.booking';

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const s = JSON.parse(raw);
      const merged = Object.assign(defaultState(), s);
      /* Migrate older single-service state to the new array */
      if (!Array.isArray(merged.serviceIds)) {
        merged.serviceIds = merged.serviceId ? [merged.serviceId] : [];
      }
      delete merged.serviceId;
      return merged;
    } catch (e) { return defaultState(); }
  }
  function defaultState() {
    return { barberId: null, serviceIds: [], dateIso: null, hour: null, name: '', phone: '', notes: '', stepIndex: 0 };
  }
  function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {} }

  let state = loadState();

  function applyURLParams() {
    const params = new URLSearchParams(location.search);
    const b = params.get('barber');
    const s = params.get('service');
    if (b && BP3.findBarber(b)) state.barberId = b;
    if (s) {
      /* Accept comma-separated list of service ids */
      const ids = s.split(',').map(function (x) { return x.trim(); }).filter(function (x) { return !!BP3.findService(x); });
      if (ids.length) state.serviceIds = Array.from(new Set(ids));
    }
    if (b && BP3.findBarber(b) && state.stepIndex === 0) state.stepIndex = 1;
    saveState();
  }

  function canAdvance() {
    switch (state.stepIndex) {
      case 0: return !!state.barberId;
      case 1: return state.serviceIds.length > 0;
      case 2: return !!state.dateIso && state.hour !== null;
      case 3: return state.name.trim().length > 1 && validPhone(state.phone);
      default: return false;
    }
  }
  function validPhone(p) {
    const digits = (p || '').replace(/[^\d]/g, '');
    return digits.length >= 7;
  }

  /* ---------- Selection helpers ---------- */
  function selectedServices() {
    return state.serviceIds.map(BP3.findService).filter(Boolean);
  }
  function totalPrice() {
    return selectedServices().reduce(function (sum, s) { return sum + s.price; }, 0);
  }
  function totalDuration() {
    return selectedServices().reduce(function (sum, s) { return sum + s.duration; }, 0);
  }

  /* ---------- Step renderers ---------- */
  function renderStep1Barber() {
    const wrap = document.createElement('div');
    wrap.className = 'grid grid-cols-12 gap-4 md:gap-5';
    const tones = {
      amber:  'background: radial-gradient(ellipse 80% 60% at 30% 20%, rgba(232,168,124,0.42), transparent 65%), linear-gradient(140deg, #1a1612 0%, #050505 100%);',
      cobalt: 'background: radial-gradient(ellipse 80% 60% at 30% 20%, rgba(91,141,239,0.38), transparent 65%), linear-gradient(140deg, #0e121a 0%, #050505 100%);',
      signal: 'background: radial-gradient(ellipse 80% 60% at 30% 20%, rgba(200,232,112,0.30), transparent 65%), linear-gradient(140deg, #131613 0%, #050505 100%);',
      mono:   'background: radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255,255,255,0.10), transparent 65%), linear-gradient(140deg, #141414 0%, #050505 100%);'
    };
    const yr = BP3.t('bpg.years');
    BP3.BARBERS.forEach(function (b) {
      const isSel = state.barberId === b.id;
      const specialties = BP3.L(b.specialties);
      wrap.innerHTML += `
        <button type="button" class="bento-cell col-span-12 sm:col-span-6 lg:col-span-4 choice bezel ${isSel ? 'selected' : ''}" data-barber="${b.id}">
          <div class="bezel-core p-3">
            <div class="monogram" style="${tones[b.tone] || tones.mono}">
              <div class="monogram-letter">${esc(b.letter)}</div>
              <div class="monogram-tag">
                <div>
                  <div class="name">${esc(BP3.L(b.name))}</div>
                  <div class="role">${esc(BP3.L(b.role))}</div>
                </div>
                <div class="yr" data-ltr>${b.years} ${esc(yr)}</div>
              </div>
            </div>
            <div class="p-5 pt-6">
              <div class="monogram-rating-bar !mt-0 !pt-0 !border-0 mb-4">${BP3.renderRating(b.rating, b.reviews)}</div>
              <div class="flex flex-wrap gap-2">
                ${specialties.map(function (s) {
                  return `<span class="text-[10px] tracking-[0.18em] uppercase text-faint border hairline rounded-full px-2.5 py-1">${esc(s)}</span>`;
                }).join('')}
              </div>
            </div>
          </div>
        </button>`;
    });
    wrap.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-barber]');
      if (!btn) return;
      state.barberId = btn.getAttribute('data-barber');
      saveState();
      wrap.querySelectorAll('[data-barber]').forEach(function (b) {
        b.classList.toggle('selected', b.getAttribute('data-barber') === state.barberId);
      });
      updateBookBar();
    });
    return wrap;
  }

  function renderStep2Service() {
    const wrap = document.createElement('div');
    wrap.className = 'space-y-6';

    /* Small hint that this step is multi-select */
    const hint = document.createElement('div');
    hint.className = 'flex items-center justify-between flex-wrap gap-3';
    hint.innerHTML = `
      <span class="font-mono-tag text-[11px] tracking-[0.14em] uppercase text-faint">
        ${esc(BP3.getLang() === 'ar' ? 'يمكنك اختيار أكثر من خدمة' : 'Pick one or more services')}
      </span>
      <span id="svc-running" class="font-mono-tag text-xs text-dim tracking-[0.14em]" data-ltr></span>
    `;
    wrap.appendChild(hint);

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-12 gap-4 md:gap-5';
    const tierKey = { core: 'tier.core', premium: 'tier.premium', signature: 'tier.signature' };
    BP3.SERVICES.forEach(function (s) {
      const isSel = state.serviceIds.indexOf(s.id) !== -1;
      grid.innerHTML += `
        <button type="button" class="bento-cell col-span-12 md:col-span-6 lg:col-span-4 choice bezel ${isSel ? 'selected' : ''}" data-service="${s.id}">
          <div class="bezel-core p-6 md:p-7 min-h-[220px] h-full flex flex-col justify-between">
            <div class="flex items-start justify-between gap-3">
              <span class="eyebrow">${BP3.t(tierKey[s.tier] || 'tier.core')}</span>
              <span class="font-mono-tag text-xs text-dim tracking-[0.14em] whitespace-nowrap" data-ltr>${BP3.formatDuration(s.duration).toUpperCase()} · ${BP3.formatPrice(s.price)}</span>
            </div>
            <div>
              <h3 class="font-display text-2xl md:text-3xl mt-8">${esc(BP3.L(s.name))}</h3>
              <p class="text-dim text-sm leading-relaxed mt-3">${esc(BP3.L(s.description))}</p>
            </div>
          </div>
        </button>`;
    });
    wrap.appendChild(grid);

    function updateRunning() {
      const running = wrap.querySelector('#svc-running');
      if (!running) return;
      const n = state.serviceIds.length;
      if (!n) { running.textContent = ''; return; }
      const lang = BP3.getLang();
      const totalLabel = lang === 'ar' ? `${n} مختارة · ${BP3.formatPrice(totalPrice())} · ${BP3.formatDuration(totalDuration())}` :
                                          `${n} selected · ${BP3.formatPrice(totalPrice())} · ${BP3.formatDuration(totalDuration())}`;
      running.textContent = totalLabel;
    }
    updateRunning();

    grid.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-service]');
      if (!btn) return;
      const id = btn.getAttribute('data-service');
      const idx = state.serviceIds.indexOf(id);
      if (idx === -1) state.serviceIds.push(id);
      else state.serviceIds.splice(idx, 1);
      saveState();
      btn.classList.toggle('selected', state.serviceIds.indexOf(id) !== -1);
      updateRunning();
      updateBookBar();
    });

    return wrap;
  }

  function renderStep3When() {
    const wrap = document.createElement('div');
    wrap.className = 'space-y-10';
    const dates = BP3.buildDates();

    const dateBlock = document.createElement('div');
    dateBlock.innerHTML = `<div class="field-label mb-4">${esc(BP3.t('bk.pick_day'))}</div>`;
    const strip = document.createElement('div');
    strip.className = 'date-strip';
    dates.forEach(function (d) {
      const isSel = state.dateIso === d.iso;
      strip.innerHTML += `
        <button type="button" class="date-card ${isSel ? 'selected' : ''}" data-date="${d.iso}">
          <span class="dow">${esc(d.dow)}</span>
          <span class="day" data-ltr>${d.day}</span>
          <span class="mon">${esc(d.mon)}</span>
        </button>`;
    });
    dateBlock.appendChild(strip);
    wrap.appendChild(dateBlock);

    const slotBlock = document.createElement('div');
    slotBlock.id = 'slot-block';
    slotBlock.innerHTML = renderSlots(state.barberId, state.dateIso);
    wrap.appendChild(slotBlock);

    strip.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-date]');
      if (!btn) return;
      state.dateIso = btn.getAttribute('data-date');
      state.hour = null;
      saveState();
      strip.querySelectorAll('.date-card').forEach(function (c) {
        c.classList.toggle('selected', c.getAttribute('data-date') === state.dateIso);
      });
      slotBlock.innerHTML = renderSlots(state.barberId, state.dateIso);
      attachSlotHandler(slotBlock);
      updateBookBar();
    });

    attachSlotHandler(slotBlock);

    function attachSlotHandler(container) {
      container.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-hour]');
        if (!btn || btn.disabled) return;
        state.hour = parseInt(btn.getAttribute('data-hour'), 10);
        saveState();
        container.querySelectorAll('[data-hour]').forEach(function (s) {
          s.classList.toggle('selected', parseInt(s.getAttribute('data-hour'), 10) === state.hour);
        });
        updateBookBar();
      });
    }

    return wrap;
  }

  function renderSlots(barberId, isoDate) {
    if (!isoDate) {
      return `<div class="field-label mb-4">${esc(BP3.t('bk.pick_day_first'))}</div>
        <div class="bezel"><div class="bezel-core p-10 text-center text-faint text-sm">${esc(BP3.t('bk.no_day'))}</div></div>`;
    }
    const slots = BP3.slotsFor(barberId, isoDate);
    const free = slots.filter(function (s) { return !s.taken; }).length;
    return `
      <div class="flex items-end justify-between mb-4 flex-wrap gap-2">
        <div class="field-label">${esc(BP3.t('bk.pick_time_on'))} ${esc(BP3.formatDateLong(isoDate))}</div>
        <span class="font-mono-tag text-xs text-dim tracking-[0.14em]" data-ltr>${free} ${esc(BP3.t('bk.slots_label'))} ${slots.length} ${esc(BP3.t('bk.of_open'))}</span>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
        ${slots.map(function (s) {
          const sel = state.hour === s.hour ? 'selected' : '';
          return `<button type="button" class="slot ${sel}" data-hour="${s.hour}" ${s.taken ? 'disabled' : ''}>${s.time12}</button>`;
        }).join('')}
      </div>`;
  }

  function renderStep4Details() {
    const wrap = document.createElement('div');
    wrap.className = 'grid grid-cols-12 gap-6 md:gap-10';

    wrap.innerHTML = `
      <div class="col-span-12 lg:col-span-7 space-y-6">
        <div class="field">
          <label class="field-label" for="f-name">${esc(BP3.t('bk.label.name'))}</label>
          <input id="f-name" class="field-input" type="text" autocomplete="name" placeholder="${esc(BP3.t('bk.ph.name'))}" value="${esc(state.name)}" />
        </div>
        <div class="field">
          <label class="field-label" for="f-phone">${esc(BP3.t('bk.label.phone'))}</label>
          <input id="f-phone" class="field-input" type="tel" autocomplete="tel" inputmode="tel" placeholder="${esc(BP3.t('bk.ph.phone'))}" value="${esc(state.phone)}" dir="ltr" />
        </div>
        <div class="field">
          <label class="field-label" for="f-notes">${esc(BP3.t('bk.label.notes'))} <span class="text-faint normal-case tracking-normal">${esc(BP3.t('bk.label.optional'))}</span></label>
          <textarea id="f-notes" class="field-input" rows="3" placeholder="${esc(BP3.t('bk.ph.notes'))}">${esc(state.notes)}</textarea>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-5">
        <div class="bezel">
          <div class="bezel-core p-7 md:p-8">
            <div class="flex items-start justify-between">
              <span class="eyebrow">${esc(BP3.t('bk.summary.title'))}</span>
              <span class="font-mono-tag text-xs text-faint tracking-[0.14em]">${esc(BP3.t('bk.summary.draft'))}</span>
            </div>
            <div id="summary" class="mt-8 space-y-5"></div>
          </div>
        </div>
      </div>
    `;

    setTimeout(function () { renderSummary(document.getElementById('summary')); }, 0);

    wrap.addEventListener('input', function (e) {
      const t = e.target;
      if (t.id === 'f-name') { state.name = t.value; }
      else if (t.id === 'f-phone') { state.phone = formatPhone(t.value); t.value = state.phone; }
      else if (t.id === 'f-notes') { state.notes = t.value; }
      saveState();
      updateBookBar();
      renderSummary(document.getElementById('summary'));
    });

    return wrap;
  }

  /* Saudi-style mobile: +966 5x xxx xxxx */
  function formatPhone(raw) {
    const digits = (raw || '').replace(/\D/g, '');
    if (!digits.length) return '';
    let body = digits;
    let prefix = '';
    if (body.startsWith('966')) { prefix = '+966 '; body = body.slice(3); }
    else if (body.startsWith('0')) { prefix = '0'; body = body.slice(1); }
    body = body.slice(0, 9);
    if (body.length === 0) return prefix.trim();
    if (body.length <= 2) return prefix + body;
    if (body.length <= 5) return prefix + body.slice(0, 2) + ' ' + body.slice(2);
    if (body.length <= 9) return prefix + body.slice(0, 2) + ' ' + body.slice(2, 5) + ' ' + body.slice(5);
    return prefix + body;
  }

  function renderSummary(target) {
    if (!target) return;
    const b = state.barberId ? BP3.findBarber(state.barberId) : null;
    const services = selectedServices();
    const when = state.dateIso && state.hour !== null
      ? `${BP3.formatDateLong(state.dateIso)} · ${BP3.formatTime12(state.hour, 0)}`
      : '—';

    const servicesBlock = services.length
      ? services.map(function (s) {
          return `<div class="flex items-center justify-between gap-3 py-1.5">
            <span class="text-ink text-sm">${esc(BP3.L(s.name))}</span>
            <span class="font-mono-tag text-xs text-dim" data-ltr>${BP3.formatPrice(s.price)}</span>
          </div>`;
        }).join('')
      : `<span class="text-faint text-sm">—</span>`;

    target.innerHTML = `
      <div class="grid grid-cols-2 gap-y-4 gap-x-3 text-sm">
        <div class="text-faint text-[10px] tracking-[0.18em] uppercase">${esc(BP3.t('bk.summary.barber'))}</div>
        <div class="text-right text-ink">${b ? esc(BP3.L(b.name)) : '<span class="text-faint">—</span>'}</div>

        <div class="text-faint text-[10px] tracking-[0.18em] uppercase">${esc(BP3.t('bk.summary.when'))}</div>
        <div class="text-right text-ink">${when === '—' ? '<span class="text-faint">—</span>' : esc(when)}</div>

        <div class="text-faint text-[10px] tracking-[0.18em] uppercase">${esc(BP3.t('bk.summary.duration'))}</div>
        <div class="text-right text-dim font-mono-tag" data-ltr>${services.length ? BP3.formatDuration(totalDuration()) : '—'}</div>
      </div>

      <div class="border-t hairline mt-5 pt-5">
        <div class="text-[10px] tracking-[0.18em] uppercase text-faint mb-2">${esc(BP3.t('bk.summary.service'))}</div>
        ${servicesBlock}
      </div>

      <div class="border-t hairline mt-5 pt-5 flex justify-between items-center">
        <span class="text-[10px] tracking-[0.2em] uppercase text-faint">${esc(BP3.t('bk.summary.total'))}</span>
        <span class="font-display text-3xl" data-ltr>${services.length ? BP3.formatPrice(totalPrice()) : (BP3.getLang() === 'ar' ? '0 ر.س' : 'SAR 0')}</span>
      </div>
    `;
  }

  /* ---------- Master render ---------- */
  function renderAll() {
    renderStepRail();
    const host = document.getElementById('step-host');
    host.innerHTML = '';
    let stepEl;
    switch (state.stepIndex) {
      case 0: stepEl = renderStep1Barber(); break;
      case 1: stepEl = renderStep2Service(); break;
      case 2: stepEl = renderStep3When(); break;
      case 3: stepEl = renderStep4Details(); break;
    }
    host.appendChild(stepEl);
    updateBookBar();
    renderStepHeader();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderStepRail() {
    const rail = document.getElementById('step-rail');
    if (!rail) return;
    const items = [
      { n: '01', key: 'bk.step.barber'  },
      { n: '02', key: 'bk.step.service' },
      { n: '03', key: 'bk.step.when'    },
      { n: '04', key: 'bk.step.details' }
    ];
    rail.innerHTML = items.map(function (it, i) {
      const cls = i === state.stepIndex ? 'active' : (i < state.stepIndex ? 'done' : '');
      return `<div class="step ${cls}">
        <div class="n">${it.n}</div>
        <div class="t">${esc(BP3.t(it.key))}</div>
      </div>`;
    }).join('');
  }

  function renderStepHeader() {
    const h = document.getElementById('step-header');
    if (!h) return;
    const titleKeys = ['bk.title.barber','bk.title.service','bk.title.when','bk.title.details'];
    const subKeys   = ['bk.sub.barber','bk.sub.service','bk.sub.when','bk.sub.details'];
    const eyebrow   = `${BP3.t('bk.step')} ${String(state.stepIndex + 1).padStart(2,'0')} / 04`;
    h.innerHTML = `
      <span class="eyebrow">${esc(eyebrow)}</span>
      <h1 class="font-display mt-6 leading-[0.92]" style="font-size: clamp(2.25rem, 6vw, 5rem);">${esc(BP3.t(titleKeys[state.stepIndex]))}</h1>
      <p class="mt-5 text-dim max-w-[520px] leading-relaxed">${esc(BP3.t(subKeys[state.stepIndex]))}</p>
    `;
  }

  function updateBookBar() {
    const bar = document.getElementById('book-bar');
    if (!bar) return;
    const b = state.barberId ? BP3.findBarber(state.barberId) : null;
    const services = selectedServices();
    const total = services.length ? BP3.formatPrice(totalPrice()) : '—';
    const lang = BP3.getLang();

    let summary = '';
    if (state.stepIndex === 0) summary = b ? BP3.L(b.name) : BP3.t('bk.bar.no_barber');
    else if (state.stepIndex === 1) {
      if (!services.length) summary = BP3.t('bk.bar.no_service');
      else if (services.length === 1) summary = `${BP3.L(services[0].name)} · ${total}`;
      else summary = `${services.length} ${lang === 'ar' ? 'خدمات' : 'services'} · ${total}`;
    }
    else if (state.stepIndex === 2) {
      summary = (state.dateIso && state.hour !== null)
        ? `${BP3.formatDateLong(state.dateIso).split(',')[0]} · ${BP3.formatTime12(state.hour, 0)}`
        : BP3.t('bk.bar.slot');
    } else if (state.stepIndex === 3) {
      summary = `${total} · ${BP3.t('bk.bar.confirm_now')}`;
    }

    const labels = [BP3.t('bk.bar.barber'), BP3.t('bk.bar.service'), BP3.t('bk.bar.slot'), BP3.t('bk.bar.confirm')];
    const nextLabel = state.stepIndex === 3 ? BP3.t('bk.bar.confirm') : BP3.t('bk.bar.continue');

    bar.innerHTML = `
      <div class="flex items-center gap-3 min-w-0">
        <button type="button" id="back-btn" class="cta-ghost !py-2 !px-3 !text-xs" ${state.stepIndex === 0 ? 'disabled' : ''}>
          <span class="nub !w-6 !h-6 -ml-1" aria-hidden="true">
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M10 6 H2 M6 2 L2 6 L6 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          ${esc(BP3.t('bk.bar.back'))}
        </button>
        <div class="summary min-w-0">
          <span class="text-[10px] tracking-[0.18em] uppercase text-faint">${esc(labels[state.stepIndex] || '')}</span>
          <strong>${esc(summary)}</strong>
        </div>
      </div>
      <button type="button" id="next-btn" class="cta" ${canAdvance() ? '' : 'disabled'}>
        ${esc(nextLabel)}
        <span class="nub" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10 L10 2 M4 2 H10 V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </button>
    `;

    document.getElementById('back-btn').addEventListener('click', goBack);
    document.getElementById('next-btn').addEventListener('click', goNext);
  }

  function goBack() {
    if (state.stepIndex === 0) return;
    state.stepIndex -= 1;
    saveState();
    renderAll();
  }

  function goNext() {
    if (!canAdvance()) return;
    if (state.stepIndex < 3) {
      state.stepIndex += 1;
      saveState();
      renderAll();
    } else {
      submit();
    }
  }

  function submit() {
    const finalBooking = {
      barberId: state.barberId,
      serviceIds: state.serviceIds.slice(),
      /* keep legacy single-id key so any older renderer still works */
      serviceId: state.serviceIds[0] || null,
      dateIso: state.dateIso,
      hour: state.hour,
      name: state.name.trim(),
      phone: state.phone,
      notes: state.notes.trim(),
      code: BP3.genConfirmationCode(),
      createdAt: new Date().toISOString(),
      lang: BP3.getLang()
    };

    /* Append to the admin orders list */
    try {
      const list = JSON.parse(localStorage.getItem('bp3.orders.v2') || '[]');
      list.unshift(finalBooking);
      localStorage.setItem('bp3.orders.v2', JSON.stringify(list.slice(0, 100)));
    } catch (e) {}

    try {
      localStorage.setItem('bp3.confirmed', JSON.stringify(finalBooking));
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    location.href = 'confirmation.html';
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function start() {
    if (!window.BP3) { console.error('BP3 data module not loaded'); return; }
    applyURLParams();
    renderAll();
  }

  if (document.readyState !== 'loading') start();
  else document.addEventListener('DOMContentLoaded', start);

  /* Re-render whole flow when language toggles */
  document.addEventListener('bp3:langchange', function () { renderAll(); });
})();
