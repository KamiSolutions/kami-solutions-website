/**
 * Renders shared chrome (header, footer) and config-driven sections.
 * All content comes from KAMI_CONFIG (js/config.js).
 */
(function () {
  const cfg  = KAMI_CONFIG;
  const page = document.body.dataset.page;
  const $    = (sel, root = document) => root.querySelector(sel);
  const mount = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; return el; };

  const arrow = '<span class="btn__arrow" aria-hidden="true">↗</span>';

  // ── Header / menu ────────────────────────────────────────────
  function renderTop() {
    const links = cfg.navigation.map(n => `
      <li><a href="${n.href}" ${n.page === page ? 'aria-current="page"' : ''}>
        <span class="nav__kicker">${n.kicker}</span><span class="nav__label">${n.label}</span>
      </a></li>`).join('');

    const menuLinks = cfg.navigation.map((n, i) => `
      <a href="${n.href}"><span class="mono">0${i + 1}</span>${n.label}</a>`).join('');

    mount('site-top', `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="utility"><div class="container utility__inner">
        <span class="mono utility__left">Kami Solutions® — Creative technology studio</span>
        <span class="mono utility__mid" id="clock">Johannesburg</span>
        <span class="mono utility__status"><i class="dot"></i>Open for projects</span>
      </div></div>
      <header class="site-header"><div class="container header__inner">
        <a class="logo" href="index.html" aria-label="Kami Solutions, home">kami<sup>®</sup></a>
        <nav class="nav" aria-label="Primary"><ul>${links}</ul></nav>
        <a class="btn btn-gold header__cta" href="contact.html">Start a project ${arrow}</a>
        <button class="burger" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><span></span><span></span></button>
      </div></header>
      <div class="menu" id="menu" hidden>
        <nav class="menu__links" aria-label="Mobile">${menuLinks}</nav>
        <div class="menu__foot">
          <span class="mono">Get in touch</span>
          <a href="mailto:${cfg.contact.email}">${cfg.contact.email}</a>
          <a href="tel:${cfg.contact.phoneHref}">${cfg.contact.phone}</a>
        </div>
      </div>`);
  }

  // ── Footer + floating pills ──────────────────────────────────
  function renderBottom() {
    const c = cfg.contact, s = cfg.social;
    const wa = `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.whatsappMessage)}`;

    mount('site-bottom', `
      <footer class="site-footer"><div class="container">
        <div class="footer__grid">
          <div class="footer__col">
            <a class="logo" href="index.html" aria-label="Kami Solutions, home">kami<sup>®</sup></a>
            <p class="footer__blurb">${cfg.company.description}</p>
          </div>
          <div class="footer__col">
            <h4 class="mono kicker">Studio</h4>
            <ul>${cfg.navigation.map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
          </div>
          <div class="footer__col">
            <h4 class="mono kicker">Offerings</h4>
            <ul>${cfg.services.map(sv => `<li><a href="services.html#${sv.id}">${sv.title}</a></li>`).join('')}</ul>
          </div>
          <div class="footer__col">
            <h4 class="mono kicker">Connect</h4>
            <ul>
              <li><a href="mailto:${c.email}">${c.email}</a></li>
              <li><a href="tel:${c.phoneHref}">${c.phone}</a></li>
              <li><a href="${wa}" target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a href="${s.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href="${s.github}" target="_blank" rel="noopener">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__legal">
          <span class="mono">© ${new Date().getFullYear()} Kami Solutions</span>
          <span class="mono">${c.address}</span>
        </div>
        <div class="footer__word" aria-hidden="true">KAMI</div>
      </div></footer>
      ${page === 'contact' ? '' : `
      <div class="float">
        <a class="float__alt" href="${wa}" target="_blank" rel="noopener">WhatsApp</a>
        <a class="float__primary" href="contact.html">Start a project</a>
      </div>`}`);
  }

  // ── Home: stats + marquee ────────────────────────────────────
  function renderStats() {
    mount('stats', cfg.hero.stats.map((s, i) => `
      <div class="stat reveal" style="--d:${i * 80}ms">
        <span class="stat__num" data-count="${s.value}">${s.value}</span>
        <span class="stat__label mono">${s.label}</span>
      </div>`).join(''));
  }

  function renderMarquee() {
    const items = cfg.stack.map(t => `<span class="marquee__item">${t}</span>`).join('');
    mount('marquee-track', items + items);
  }

  // ── Work rows ────────────────────────────────────────────────
  function renderWork() {
    const el = document.getElementById('work-list');
    if (!el) return;
    const limit = parseInt(el.dataset.limit || cfg.portfolio.length, 10);
    const openFirst = el.dataset.open === 'first';

    el.innerHTML = cfg.portfolio.slice(0, limit).map((p, i) => {
      const open = openFirst && i === 0;
      const links = [
        p.live ? `<a class="btn btn-line" href="${p.live}" target="_blank" rel="noopener">Live site ${arrow}</a>` : '',
        p.repo ? `<a class="btn btn-line" href="${p.repo}" target="_blank" rel="noopener">Source code ${arrow}</a>` : '',
      ].join('');
      return `
      <article class="work-row reveal ${open ? 'is-open' : ''}" id="${p.id}">
        <button class="work-row__head" aria-expanded="${open}" aria-controls="${p.id}-body">
          <span class="work-row__idx">${String(i + 1).padStart(2, '0')}</span>
          <span class="work-row__title">${p.title}</span>
          <span class="work-row__tagcell"><span class="tag">${p.category}</span></span>
          <span class="work-row__year">${p.year || ''}</span>
          <span class="work-row__icon" aria-hidden="true"></span>
        </button>
        <div class="work-row__body" id="${p.id}-body" role="region" aria-label="${p.title} details">
          <div class="work-row__inner"><div class="work-row__content">
            <div class="work-row__meta">
              <span class="work-row__client mono">${[p.client, p.year].filter(Boolean).join(' · ')}</span>
              <div class="work-row__stats">${p.stats.map(s => `<div class="work-row__stat"><span class="mono">${s.label}</span><b>${s.value}</b></div>`).join('')}</div>
              <div class="work-row__tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
              ${links ? `<div class="work-row__links">${links}</div>` : ''}
            </div>
            <div class="work-row__cols">
              <div><h4 class="mono kicker">The challenge</h4><p>${p.challenge}</p></div>
              <div><h4 class="mono kicker">The solution</h4><p>${p.solution}</p></div>
              <div><h4 class="mono kicker">How it was built</h4><p>${p.process}</p></div>
              <div><h4 class="mono kicker">The outcome</h4><p>${p.outcome}</p></div>
            </div>
          </div></div>
        </div>
      </article>`;
    }).join('');
  }

  // ── Services: rail (home) + list (services page) ─────────────
  function renderRail() {
    const rail = document.getElementById('rail');
    if (!rail) return;
    rail.innerHTML = cfg.services.map(s => `
      <a class="card" href="services.html#${s.id}" draggable="false">
        <div class="card__top"><span class="mono kicker">Offering ${s.number}</span><span class="mono">${s.deliveryTime}</span></div>
        <div class="card__num" aria-hidden="true">${s.number}</div>
        <h3 class="h3 card__title">${s.title}</h3>
        <p class="card__tagline">${s.tagline}</p>
        <p class="card__desc">${s.description}</p>
        <ul class="card__list">${s.features.slice(0, 4).map(f => `<li>${f}</li>`).join('')}</ul>
        <div class="card__foot"><span class="card__price">${s.startingPrice}</span><span class="btn__arrow" aria-hidden="true">↗</span></div>
      </a>`).join('');
    mount('rail-segs', cfg.services.map(() => '<span class="seg"></span>').join(''));
  }

  function renderServicesPage() {
    mount('services-list', cfg.services.map(s => `
      <section class="svc" id="${s.id}">
        <div class="svc__side reveal">
          <span class="svc__num mono kicker">Offering ${s.number}</span>
          <h2 class="h2">${s.title}</h2>
          <div class="svc__facts"><span class="tag">${s.startingPrice}</span><span class="tag">${s.deliveryTime}</span></div>
        </div>
        <div class="reveal">
          <p class="h3 svc__tagline">${s.tagline}</p>
          <p class="lede">${s.description}</p>
          <ul class="svc__features">${s.features.map(f => `<li>${f}</li>`).join('')}</ul>
          <a class="btn btn-gold svc__go" href="contact.html?service=${s.id}">Start this project ${arrow}</a>
        </div>
      </section>`).join(''));

    mount('process-steps', cfg.process.map((p, i) => `
      <div class="step reveal" style="--d:${i * 80}ms"><span class="mono">${p.n}</span><h3 class="h3">${p.title}</h3><p>${p.text}</p></div>`).join(''));
  }

  // ── About ────────────────────────────────────────────────────
  function renderAbout() {
    mount('about-story', cfg.about.story.map(t => `<p class="reveal">${t}</p>`).join(''));
    mount('about-mv', `
      <div class="mv__card reveal"><span class="mono kicker">Mission</span><p>${cfg.about.mission}</p></div>
      <div class="mv__card reveal" style="--d:100ms"><span class="mono kicker">Vision</span><p>${cfg.about.vision}</p></div>`);
    mount('about-values', cfg.about.values.map((v, i) => `
      <div class="value reveal"><span class="mono">0${i + 1}</span><h3 class="h3">${v.title}</h3><p>${v.description}</p></div>`).join(''));
    mount('about-why', cfg.about.why.map((w, i) => `
      <div class="row reveal"><span class="mono gold">0${i + 1}</span><h3 class="h3">${w.title}</h3><p>${w.text}</p></div>`).join(''));
    mount('about-team', cfg.team.map(m => `
      <div class="person reveal">
        <div class="person__mark" aria-hidden="true">${m.initials}</div>
        <div>
          <h3 class="h2">${m.name}</h3>
          <span class="mono kicker" style="margin-top:14px">${m.role}</span>
          <p class="person__bio lede">${m.bio}</p>
          <div class="person__links">
            <a class="btn btn-line" href="${cfg.social.linkedin}" target="_blank" rel="noopener">LinkedIn ${arrow}</a>
            <a class="btn btn-line" href="${cfg.social.github}" target="_blank" rel="noopener">GitHub ${arrow}</a>
          </div>
        </div>
      </div>`).join(''));
  }

  function renderApproach() {
    mount('approach', cfg.approach.map((a, i) => `
      <div class="row reveal"><span class="mono gold">0${i + 1}</span><h3 class="h3">${a.title}</h3><p>${a.text}</p></div>`).join(''));
  }

  // ── Contact ──────────────────────────────────────────────────
  function renderContact() {
    const c = cfg.contact, s = cfg.social;
    const wa = `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.whatsappMessage)}`;
    mount('contact-list', `
      <div class="contact-item"><span class="mono">Email</span><a href="mailto:${c.email}">${c.email}</a></div>
      <div class="contact-item"><span class="mono">Phone</span><a href="tel:${c.phoneHref}">${c.phone}</a></div>
      <div class="contact-item"><span class="mono">WhatsApp</span><a href="${wa}" target="_blank" rel="noopener">Chat on WhatsApp ↗</a></div>
      <div class="contact-item"><span class="mono">Location</span><p>${c.address}</p></div>
      <div class="contact-item"><span class="mono">Elsewhere</span>
        <a href="${s.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a> &nbsp; <a href="${s.github}" target="_blank" rel="noopener">GitHub ↗</a></div>`);

    const form = document.getElementById('contact-form-mount');
    if (form) {
      const opts = cfg.services.map(s => `<option value="${s.id}">${s.title}</option>`).join('');
      form.innerHTML = `
        <form class="form" id="contact-form" novalidate>
          <div class="form__row">
            <div class="field"><label for="name">Full name *</label><input id="name" name="name" type="text" autocomplete="name" placeholder="Your full name" required><span class="field__err">Please enter your name.</span></div>
            <div class="field"><label for="company">Company</label><input id="company" name="company" type="text" autocomplete="organization" placeholder="Your company"></div>
          </div>
          <div class="form__row">
            <div class="field"><label for="email">Email *</label><input id="email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required><span class="field__err">Please enter a valid email.</span></div>
            <div class="field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="+27 XX XXX XXXX"></div>
          </div>
          <div class="form__row">
            <div class="field"><label for="service">Service</label><select id="service" name="service"><option value="">Select a service</option>${opts}<option value="multiple">Multiple services</option><option value="unsure">Not sure yet</option></select></div>
            <div class="field"><label for="budget">Budget</label><select id="budget" name="budget"><option value="">Select a range</option><option value="R5,000 – R15,000">R5,000 – R15,000</option><option value="R15,000 – R30,000">R15,000 – R30,000</option><option value="R30,000 – R60,000">R30,000 – R60,000</option><option value="R60,000+">R60,000+</option><option value="Prefer to discuss">Prefer to discuss</option></select></div>
          </div>
          <div class="field"><label for="message">Project description *</label><textarea id="message" name="message" placeholder="What are you trying to achieve? What does success look like?" required></textarea><span class="field__err">Tell us a little about the project.</span></div>
          <div><button class="btn btn-gold" type="submit">Send message ${arrow}</button></div>
          <p class="form__note">Sending opens your email app with the message ready to go, addressed to ${c.email}.</p>
        </form>
        <div class="form-success" id="form-success" role="status">
          <h3 class="h3">Almost there.</h3>
          <p class="lede" style="margin-top:12px">Your email app should have opened with your message ready to send. If it didn't, email <a class="gold" href="mailto:${c.email}">${c.email}</a> directly and I'll reply within 24 hours.</p>
        </div>`;

      const sel = new URLSearchParams(location.search).get('service');
      if (sel) { const s = form.querySelector('#service'); if (s) s.value = sel; }
      initForm(form);
    }

    mount('next-steps', cfg.next.map((n, i) => `
      <div class="next__card reveal" style="--d:${i * 80}ms"><span class="mono kicker">${n.label}</span><div><h3 class="h3">${n.title}</h3><p>${n.text}</p></div></div>`).join(''));
  }

  function initForm(root) {
    const form = root.querySelector('#contact-form');
    const ok   = root.querySelector('#form-success');
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(f => {
        const bad = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
        f.closest('.field').classList.toggle('has-error', bad);
        if (bad) valid = false;
      });
      if (!valid) return;

      const d = Object.fromEntries(new FormData(form).entries());
      const body = [
        `Name: ${d.name}`, d.company && `Company: ${d.company}`, `Email: ${d.email}`,
        d.phone && `Phone: ${d.phone}`, d.service && `Service: ${d.service}`, d.budget && `Budget: ${d.budget}`,
        '', d.message,
      ].filter(v => v !== undefined && v !== '' && v !== false).join('\n');

      window.location.href = `mailto:${cfg.contact.email}?subject=${encodeURIComponent('Project enquiry from ' + d.name)}&body=${encodeURIComponent(body)}`;
      form.style.display = 'none';
      ok.classList.add('is-visible');
    });
  }

  function init() {
    renderTop(); renderBottom();
    renderStats(); renderMarquee(); renderWork(); renderRail();
    renderServicesPage(); renderAbout(); renderApproach(); renderContact();
  }

  window.KamiComponents = { init };
})();
