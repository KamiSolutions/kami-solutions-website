/**
 * KAMI SOLUTIONS — COMPONENT RENDERER
 * ──────────────────────────────────────
 * Reads KAMI_CONFIG and renders all shared and page-specific
 * HTML sections. Changing config.js updates everything here.
 */

const KamiComponents = (() => {

  const cfg = KAMI_CONFIG;

  // ─── Helpers ────────────────────────────────────────────────────

  function qs(sel, ctx = document) { return ctx.querySelector(sel); }
  function inject(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function initials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }

  function currentPage() {
    return document.body.dataset.page || '';
  }

  function activeLink(href) {
    const path = window.location.pathname;
    return path.endsWith(href) ? 'is-active' : '';
  }

  // ─── Navigation ─────────────────────────────────────────────────

  function renderNav() {
    const links = cfg.navigation.links.map(l => `
      <li>
        <a href="${l.href}" class="nav__link ${activeLink(l.href)}">${l.label}</a>
      </li>
    `).join('');

    const mobileLinks = cfg.navigation.links.map(l => `
      <li>
        <a href="${l.href}" class="mobile-menu__link">${l.label}</a>
      </li>
    `).join('');

    const html = `
      <div class="nav" id="nav">
        <div class="container">
          <div class="nav__inner">
            <a href="index.html" class="nav__logo">
              <span class="nav__logo-main">${cfg.company.shortName}</span>
              <span class="nav__logo-sub">SOLUTIONS</span>
            </a>

            <ul class="nav__links">${links}</ul>

            <div class="nav__right">
              <a href="${cfg.navigation.cta.href}" class="btn btn-primary btn-sm nav__cta" data-magnetic>
                ${cfg.navigation.cta.label}
              </a>
              <button class="nav__hamburger" id="nav-hamburger" aria-label="Open Menu" aria-expanded="false">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
        <ul class="mobile-menu__links">${mobileLinks}</ul>
        <div class="mobile-menu__footer">
          <span class="mobile-menu__contact">${cfg.contact.email}</span>
          <a href="${cfg.navigation.cta.href}" class="btn btn-primary btn-sm">${cfg.navigation.cta.label}</a>
        </div>
      </div>
    `;

    inject('nav-root', html);
    initNavBehavior();
  }

  function initNavBehavior() {
    const nav       = qs('#nav');
    const hamburger = qs('#nav-hamburger');
    const mobileMenu = qs('#mobile-menu');

    if (!nav || !hamburger || !mobileMenu) return;

    // Scroll class
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', open);
      mobileMenu.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on mobile link click
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Footer ─────────────────────────────────────────────────────

  function renderFooter() {
    const year = new Date().getFullYear();

    const columns = cfg.footer.columns.map(col => `
      <div class="footer__col">
        <span class="footer__col-heading">${col.heading}</span>
        <ul class="footer__col-links">
          ${col.links.map(l => `
            <li><a href="${l.href}" class="footer__col-link">${l.label}</a></li>
          `).join('')}
        </ul>
      </div>
    `).join('');

    const social = Object.entries(cfg.social).map(([platform, url]) => `
      <a href="${url}" class="footer__social-link" target="_blank" rel="noopener" aria-label="${platform}">
        ${platform.slice(0, 2).toUpperCase()}
      </a>
    `).join('');

    const legalLinks = cfg.footer.legal.links.map(l =>
      `<a href="${l.href}" class="footer__legal-link">${l.label}</a>`
    ).join('');

    const html = `
      <div class="footer">
        <div class="container">
          <div class="footer__top">
            <div class="footer__brand">
              <span class="footer__logo-text">${cfg.company.shortName} SOLUTIONS</span>
              <p class="footer__tagline">${cfg.footer.tagline}</p>
              <div class="footer__social">${social}</div>
            </div>
            ${columns}
          </div>
          <div class="footer__bottom">
            <p class="footer__copy">© ${year} ${cfg.company.name}. All rights reserved.</p>
            <div class="footer__legal">${legalLinks}</div>
          </div>
        </div>
      </div>
    `;

    inject('footer-root', html);
  }

  // ─── Homepage: Stats ─────────────────────────────────────────────

  function renderStats() {
    const el = document.getElementById('stats-grid');
    if (!el) return;

    el.className = 'stats-grid';
    el.innerHTML = cfg.hero.stats.map((s, i) => `
      <div class="stat-item reveal reveal-d${i + 1}">
        <span class="stat-item__value" data-counter="${s.value}">${s.value}</span>
        <span class="stat-item__label">${s.label}</span>
      </div>
    `).join('');
  }

  // ─── Homepage: Services Preview ──────────────────────────────────

  function renderServicesPreview() {
    const el = document.getElementById('services-preview-grid');
    if (!el) return;

    el.innerHTML = cfg.services.map((s, i) => `
      <a href="services.html#${s.id}" class="service-card reveal reveal-d${Math.min(i + 1, 6)}">
        <div class="service-card__header">
          <span class="service-card__icon">${s.icon}</span>
          <span class="service-card__number">${s.number}</span>
        </div>
        <h3 class="service-card__title">${s.title}</h3>
        <p class="service-card__tagline">${s.tagline}</p>
        <p class="service-card__desc">${s.description}</p>
        <div class="service-card__footer">
          <span class="service-card__price">${s.startingPrice}</span>
          <span class="service-card__arrow">↗</span>
        </div>
      </a>
    `).join('');
  }

  // ─── Homepage: Work Preview ──────────────────────────────────────

  function renderWorkPreview() {
    const el = document.getElementById('work-preview-grid');
    if (!el) return;

    el.innerHTML = cfg.portfolio.slice(0, 2).map((p, i) => `
      <a href="portfolio.html" class="portfolio-card reveal reveal-d${i + 1}" data-project="${p.id}">
        <div class="portfolio-card__bg" style="background: ${p.cardBg};"></div>
        <div class="portfolio-card__overlay"></div>
        <div class="portfolio-card__content">
          <div class="portfolio-card__top">
            <span class="portfolio-card__category">${p.category}</span>
            <span class="portfolio-card__year">${p.year}</span>
          </div>
          <div class="portfolio-card__bottom">
            <span class="portfolio-card__client">${p.client}</span>
            <h3 class="portfolio-card__title">${p.title}</h3>
            <div class="portfolio-card__tags">
              ${p.tags.map(t => `<span class="portfolio-card__tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      </a>
    `).join('');
  }

  // ─── Homepage: Testimonials ──────────────────────────────────────

  function renderTestimonials() {
    const el = document.getElementById('testimonials-grid');
    if (!el) return;

    el.className = 'testimonials-grid';
    el.innerHTML = cfg.testimonials.map((t, i) => `
      <div class="testimonial-card reveal reveal-d${i + 1}">
        <span class="testimonial-card__mark">"</span>
        <p class="testimonial-card__quote">${t.quote}</p>
        <div class="testimonial-card__author">
          <div class="testimonial-card__avatar">${initials(t.author)}</div>
          <div>
            <p class="testimonial-card__name">${t.author}</p>
            <p class="testimonial-card__role">${t.role}, ${t.company}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ─── Services Page ────────────────────────────────────────────────

  function renderServicesPage() {
    const el = document.getElementById('services-page-grid');
    if (!el) return;

    el.innerHTML = cfg.services.map((s, i) => `
      <div class="service-card service-card--large reveal reveal-d${Math.min(i % 2 + 1, 2)}" id="${s.id}">
        <div class="service-card__header">
          <span class="service-card__icon">${s.icon}</span>
          <span class="service-card__number">${s.number}</span>
        </div>
        <h2 class="service-card__title">${s.title}</h2>
        <p class="service-card__tagline">${s.tagline}</p>
        <p class="service-card__desc">${s.description}</p>
        <ul class="service-card__features">
          ${s.features.map(f => `<li class="service-card__feature">${f}</li>`).join('')}
        </ul>
        <div class="service-card__footer">
          <span class="service-card__price">${s.startingPrice}</span>
          <span class="service-card__time">${s.deliveryTime}</span>
        </div>
      </div>
    `).join('');
  }

  // ─── Portfolio Page ───────────────────────────────────────────────

  function renderPortfolioPage() {
    const gridEl     = document.getElementById('portfolio-grid');
    const filtersEl  = document.getElementById('portfolio-filters');
    const panelEl    = document.getElementById('case-study-panel');
    const backdropEl = document.getElementById('panel-backdrop');

    if (!gridEl) return;

    // Build category list
    const categories = ['All', ...new Set(cfg.portfolio.map(p => p.category))];

    if (filtersEl) {
      filtersEl.innerHTML = categories.map((cat, i) => `
        <button class="filter-btn ${i === 0 ? 'is-active' : ''}" data-filter="${cat}">
          ${cat}
        </button>
      `).join('');
    }

    // Build cards
    gridEl.innerHTML = cfg.portfolio.map((p, i) => `
      <div class="portfolio-card reveal reveal-d${i % 2 + 1}" data-category="${p.category}" data-project="${p.id}">
        <div class="portfolio-card__bg" style="background: ${p.cardBg};"></div>
        <div class="portfolio-card__overlay"></div>
        <div class="portfolio-card__content">
          <div class="portfolio-card__top">
            <span class="portfolio-card__category">${p.category}</span>
            <span class="portfolio-card__year">${p.year}</span>
          </div>
          <div class="portfolio-card__bottom">
            <span class="portfolio-card__client">${p.client}</span>
            <h3 class="portfolio-card__title">${p.title}</h3>
            <div class="portfolio-card__tags">
              ${p.tags.map(t => `<span class="portfolio-card__tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Filter behavior
    if (filtersEl) {
      filtersEl.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filter = btn.dataset.filter;
        gridEl.querySelectorAll('.portfolio-card').forEach(card => {
          const match = filter === 'All' || card.dataset.category === filter;
          card.style.opacity   = match ? '1' : '0.2';
          card.style.transform = match ? '' : 'scale(0.97)';
          card.style.transition = 'opacity 350ms ease, transform 350ms ease';
          card.style.pointerEvents = match ? 'auto' : 'none';
        });
      });
    }

    // Case study panel
    if (panelEl && backdropEl) {
      const openPanel = (id) => {
        const project = cfg.portfolio.find(p => p.id === id);
        if (!project) return;

        panelEl.innerHTML = buildCaseStudyHTML(project);
        panelEl.classList.add('is-open');
        backdropEl.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        panelEl.querySelector('.case-study-panel__close').addEventListener('click', closePanel);
      };

      const closePanel = () => {
        panelEl.classList.remove('is-open');
        backdropEl.classList.remove('is-open');
        document.body.style.overflow = '';
      };

      gridEl.addEventListener('click', e => {
        const card = e.target.closest('.portfolio-card');
        if (card) openPanel(card.dataset.project);
      });

      backdropEl.addEventListener('click', closePanel);
    }
  }

  function buildCaseStudyHTML(p) {
    const stats = p.stats.map(s => `
      <div class="case-study-panel__stat">
        <span class="case-study-panel__stat-value">${s.value}</span>
        <span class="case-study-panel__stat-label">${s.label}</span>
      </div>
    `).join('');

    const tags = p.tags.map(t =>
      `<span class="badge badge-muted" style="margin-right:6px;margin-bottom:6px;">${t}</span>`
    ).join('');

    return `
      <button class="case-study-panel__close" aria-label="Close">✕</button>
      <span class="text-label case-study-panel__category">${p.category}</span>
      <h2 class="case-study-panel__title">${p.title}</h2>
      <span class="case-study-panel__client">${p.client} · ${p.year}</span>
      <div class="case-study-panel__thumb" style="background:${p.cardBg};"></div>
      <div class="case-study-panel__stats">${stats}</div>
      <div style="margin-bottom:24px;">${tags}</div>
      <div class="case-study-section">
        <span class="case-study-section__heading">The Challenge</span>
        <p class="case-study-section__body">${p.challenge}</p>
      </div>
      <div class="case-study-section">
        <span class="case-study-section__heading">Our Solution</span>
        <p class="case-study-section__body">${p.solution}</p>
      </div>
      <div class="case-study-section">
        <span class="case-study-section__heading">Our Process</span>
        <p class="case-study-section__body">${p.process}</p>
      </div>
      <div class="case-study-section">
        <span class="case-study-section__heading">The Outcome</span>
        <p class="case-study-section__body">${p.outcome}</p>
      </div>
    `;
  }

  // ─── About Page ───────────────────────────────────────────────────

  function renderAboutPage() {
    const storyEl  = document.getElementById('about-story-content');
    const valuesEl = document.getElementById('about-values-grid');
    const teamEl   = document.getElementById('about-team-grid');
    const missionEl = document.getElementById('about-mission-grid');

    if (storyEl) {
      storyEl.innerHTML = cfg.about.story.map(para => `
        <p class="about-story__p reveal">${para}</p>
      `).join('');
    }

    if (valuesEl) {
      valuesEl.innerHTML = cfg.about.values.map((v, i) => `
        <div class="value-card reveal reveal-d${i % 2 + 1}">
          <span class="value-card__number">0${i + 1}</span>
          <h3 class="value-card__title">${v.title}</h3>
          <p class="value-card__desc">${v.description}</p>
        </div>
      `).join('');
    }

    if (teamEl) {
      teamEl.innerHTML = cfg.team.map(member => `
        <div class="team-card reveal">
          <div class="team-card__avatar">
            ${member.image
              ? `<img src="${member.image}" alt="${member.name}">`
              : initials(member.name)
            }
          </div>
          <h3 class="team-card__name">${member.name}</h3>
          <span class="team-card__role">${member.role}</span>
          <p class="team-card__bio">${member.bio}</p>
        </div>
      `).join('');
    }

    if (missionEl) {
      missionEl.innerHTML = `
        <div class="mission-block reveal reveal-d1">
          <span class="mission-block__heading">Our Mission</span>
          <p class="mission-block__text">${cfg.about.mission}</p>
        </div>
        <div class="mission-block reveal reveal-d2">
          <span class="mission-block__heading">Our Vision</span>
          <p class="mission-block__text">${cfg.about.vision}</p>
        </div>
      `;
    }
  }

  // ─── Contact Page ─────────────────────────────────────────────────

  function renderContactPage() {
    const infoEl = document.getElementById('contact-info');
    const formEl = document.getElementById('contact-form-container');

    if (infoEl) {
      const waUrl = `https://wa.me/${cfg.contact.whatsapp}?text=${encodeURIComponent(cfg.contact.whatsappMessage)}`;

      infoEl.innerHTML = `
        <div class="contact-info">
          <div class="contact-info-item">
            <span class="contact-info-item__label">Email</span>
            <p class="contact-info-item__value">
              <a href="mailto:${cfg.contact.email}">${cfg.contact.email}</a>
            </p>
          </div>
          <div class="contact-info-item">
            <span class="contact-info-item__label">Phone</span>
            <p class="contact-info-item__value">
              <a href="tel:${cfg.contact.phone}">${cfg.contact.phone}</a>
            </p>
          </div>
          <div class="contact-info-item">
            <span class="contact-info-item__label">Location</span>
            <p class="contact-info-item__value">${cfg.contact.address}</p>
          </div>
          <div class="contact-info-item">
            <span class="contact-info-item__label">WhatsApp</span>
            <a href="${waUrl}" target="_blank" rel="noopener" class="contact-whatsapp">
              ↗ Chat on WhatsApp
            </a>
          </div>
        </div>
      `;
    }

    if (formEl) {
      const serviceOptions = cfg.services.map(s =>
        `<option value="${s.id}">${s.title}</option>`
      ).join('');

      formEl.innerHTML = `
        <form class="contact-form" id="contact-form" novalidate>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label" for="name">Full Name *</label>
              <input type="text" id="name" name="name" class="form-input" placeholder="Your full name" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="company">Company / Business</label>
              <input type="text" id="company" name="company" class="form-input" placeholder="Your company name">
            </div>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label" for="email">Email Address *</label>
              <input type="email" id="email" name="email" class="form-input" placeholder="hello@yourcompany.com" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" class="form-input" placeholder="+27 XX XXX XXXX">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="service">Service Required</label>
            <select id="service" name="service" class="form-select">
              <option value="" disabled selected>Select a service</option>
              ${serviceOptions}
              <option value="multiple">Multiple Services</option>
              <option value="unsure">Not sure yet</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="budget">Approximate Budget</label>
            <select id="budget" name="budget" class="form-select">
              <option value="" disabled selected>Select a budget range</option>
              <option value="5k-15k">R5,000 – R15,000</option>
              <option value="15k-30k">R15,000 – R30,000</option>
              <option value="30k-60k">R30,000 – R60,000</option>
              <option value="60k+">R60,000+</option>
              <option value="discuss">Prefer to discuss</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="message">Project Description *</label>
            <textarea id="message" name="message" class="form-textarea" placeholder="Tell us about your project. What are you trying to achieve? What does success look like?" required></textarea>
          </div>
          <div class="form-submit">
            <button type="submit" class="btn btn-primary w-full" style="width:100%;justify-content:center;" data-magnetic>
              Send Message <span class="btn-arrow">→</span>
            </button>
          </div>
          <p class="contact-form__response-note">We respond within 24 hours — usually much faster.</p>
        </form>
        <div class="form-success" id="form-success">
          <div class="form-success__icon">✓</div>
          <h3 class="display-sm">Message Received</h3>
          <p class="text-second" style="font-size:15px;line-height:1.7;">
            Thank you for reaching out. We've received your message and will respond within 24 hours.
          </p>
        </div>
      `;

      initContactForm();
    }
  }

  function initContactForm() {
    const form    = document.getElementById('contact-form');
    const success = document.getElementById('form-success');

    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      // Simple validation
      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        const empty = !field.value.trim();
        field.style.borderColor = empty ? 'rgba(255,80,80,0.5)' : '';
        if (empty) valid = false;
      });

      if (!valid) return;

      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Sending...';
      btn.style.opacity = '0.7';

      // Simulate send (replace with real API call)
      setTimeout(() => {
        form.style.display = 'none';
        success.classList.add('is-visible');
      }, 1200);
    });
  }

  // ─── Page Router ─────────────────────────────────────────────────

  function init() {
    renderNav();
    renderFooter();

    const page = currentPage();

    if (page === 'home') {
      renderStats();
      renderServicesPreview();
      renderWorkPreview();
      renderTestimonials();
    }

    if (page === 'services') {
      renderServicesPage();
    }

    if (page === 'portfolio') {
      renderPortfolioPage();
    }

    if (page === 'about') {
      renderAboutPage();
    }

    if (page === 'contact') {
      renderContactPage();
    }
  }

  return { init };

})();
