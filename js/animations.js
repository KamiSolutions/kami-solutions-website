/**
 * Behaviour: clock, reveal, counters, work accordion, offerings rail,
 * mobile menu, and the hero pipeline simulation.
 */
(function () {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Live Johannesburg clock
  function initClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Africa/Johannesburg' });
    const tick = () => { el.textContent = 'Johannesburg · ' + fmt.format(new Date()) + ' SAST'; };
    tick(); setInterval(tick, 1000);
  }

  // Scroll reveal + counters
  function countUp(el) {
    const m = String(el.dataset.count).match(/^(\d+)(.*)$/);
    if (!m || reduce) return;
    const target = parseInt(m[1], 10), suffix = m[2], t0 = performance.now(), dur = 1400;
    const step = now => {
      const p = Math.min(1, (now - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    };
    el.textContent = '0';
    requestAnimationFrame(step);
  }

  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('is-in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        $$('[data-count]', e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(i => io.observe(i));
  }

  // Work accordion
  function initAccordion() {
    document.addEventListener('click', e => {
      const head = e.target.closest('.work-row__head');
      if (!head) return;
      const row = head.closest('.work-row');
      const open = row.classList.toggle('is-open');
      head.setAttribute('aria-expanded', String(open));
    });
  }

  // Offerings rail: segmented progress, buttons, mouse drag
  function initRail() {
    const rail = document.getElementById('rail');
    if (!rail) return;
    const segs = $$('.seg'), prev = $('#rail-prev'), next = $('#rail-next');
    const cards = $$('.card', rail);
    const stride = () => cards[0].getBoundingClientRect().width + 20;

    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const idx = Math.round(rail.scrollLeft / stride());
      segs.forEach((s, i) => s.classList.toggle('on', i <= idx));
      if (prev) prev.disabled = rail.scrollLeft <= 4;
      if (next) next.disabled = rail.scrollLeft >= max - 4;
    };
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    prev && prev.addEventListener('click', () => rail.scrollBy({ left: -stride(), behavior: 'smooth' }));
    next && next.addEventListener('click', () => rail.scrollBy({ left:  stride(), behavior: 'smooth' }));

    let down = false, startX = 0, startLeft = 0, moved = 0;
    rail.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = 0; startX = e.clientX; startLeft = rail.scrollLeft;
    });
    window.addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - startX; moved = Math.max(moved, Math.abs(dx));
      if (moved > 5) rail.classList.add('is-dragging');
      rail.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', () => { if (!down) return; down = false; setTimeout(() => rail.classList.remove('is-dragging'), 0); });
    rail.addEventListener('click', e => { if (moved > 5) { e.preventDefault(); moved = 0; } }, true);
    update();
  }

  // Mobile menu
  function initMenu() {
    const btn = $('.burger'), menu = $('#menu');
    if (!btn || !menu) return;
    const set = open => {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.hidden = !open;
      document.body.classList.toggle('no-scroll', open);
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
    window.addEventListener('resize', () => { if (innerWidth > 960) set(false); });
  }

  // Hero pipeline simulation (modelled on a real booking-pipeline architecture)
  function initPipeline() {
    const root = document.getElementById('pipeline');
    if (!root) return;
    const steps = $$('.pipe__step', root), chips = $$('.pipe__chip', root), log = $('.pipe__log', root);
    const lines = [
      'inbound email parsed · gear list detected',
      'agent extracted 14 line items',
      'inventory checked · quote drafted',
      'draft queued · awaiting operator approval',
      'approved by operator · reply sent',
    ];
    const states = ['RECEIVED', 'PROCESSING', 'DRAFTED', 'PENDING_APPROVAL', 'SENT'];
    let i = -1, timer = null;

    const show = n => {
      steps.forEach((s, k) => {
        s.classList.toggle('is-active', k === n);
        s.classList.toggle('is-done', k < n);
      });
      chips.forEach((c, k) => { c.textContent = k <= n ? states[k] : 'IDLE'; });
      const upto = Math.max(0, n);
      log.innerHTML = lines.slice(Math.max(0, upto - 3), upto + 1).map(l => `<div>${l}</div>`).join('');
    };
    const tick = () => { i = (i + 1) % (steps.length + 1); if (i === steps.length) { show(-1); log.innerHTML = '<div>ready for next enquiry</div>'; return; } show(i); };

    if (reduce) { show(steps.length - 1); return; }
    const start = () => { if (!timer) { tick(); timer = setInterval(tick, 1700); } };
    const stop  = () => { clearInterval(timer); timer = null; };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? start() : stop())).observe(root);
    } else start();
  }

  function init() {
    document.documentElement.classList.add('js');
    initClock(); initReveal(); initAccordion(); initRail(); initMenu(); initPipeline();
  }

  window.KamiAnim = { init };
})();
