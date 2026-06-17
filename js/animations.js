/**
 * KAMI SOLUTIONS — ANIMATION ENGINE
 * ────────────────────────────────────
 * Custom cursor · Magnetic buttons · Scroll reveals ·
 * Counter animation · Parallax · Page transitions
 */

const KamiAnimations = (() => {

  const cfg = KAMI_CONFIG;
  let raf   = null;

  // ─── Custom Cursor ───────────────────────────────────────────────

  function initCursor() {
    if (window.innerWidth <= 768) return;

    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let rafId = null;

    const lerp = (a, b, t) => a + (b - a) * t;

    const moveCursor = () => {
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';

      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';

      rafId = requestAnimationFrame(moveCursor);
    };

    moveCursor();

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    });

    // Cursor state changes
    document.addEventListener('mouseover', e => {
      const el = e.target;

      if (el.closest('a, button, [data-magnetic]')) {
        document.body.classList.add('cursor--btn');
        document.body.classList.remove('cursor--link', 'cursor--text');
      } else if (el.closest('p, span, li')) {
        document.body.classList.add('cursor--text');
        document.body.classList.remove('cursor--link', 'cursor--btn');
      } else if (el.closest('[href]')) {
        document.body.classList.add('cursor--link');
        document.body.classList.remove('cursor--btn', 'cursor--text');
      } else {
        document.body.classList.remove('cursor--link', 'cursor--btn', 'cursor--text');
      }
    });
  }

  // ─── Magnetic Buttons ────────────────────────────────────────────

  function initMagnetic() {
    if (window.innerWidth <= 768) return;

    const bindMagnetic = (el) => {
      el.addEventListener('mousemove', e => {
        const rect   = el.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = e.clientX - cx;
        const dy     = e.clientY - cy;
        const dist   = Math.sqrt(dx * dx + dy * dy);
        const strength = Math.max(0, 1 - dist / 120);
        const tx     = dx * strength * 0.35;
        const ty     = dy * strength * 0.35;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)';
        setTimeout(() => { el.style.transition = ''; }, 600);
      });
    };

    // Observe dynamically added magnetic buttons
    const observer = new MutationObserver(() => {
      document.querySelectorAll('[data-magnetic]:not([data-magnetic-bound])').forEach(el => {
        el.setAttribute('data-magnetic-bound', '1');
        bindMagnetic(el);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Bind existing ones
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.setAttribute('data-magnetic-bound', '1');
      bindMagnetic(el);
    });
  }

  // ─── Scroll Reveal ───────────────────────────────────────────────

  function initReveal() {
    const opts = {
      root:      null,
      rootMargin: '0px 0px -60px 0px',
      threshold:  0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, opts);

    const observe = () => {
      document.querySelectorAll(
        '.reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .line-accent'
      ).forEach(el => {
        if (!el.classList.contains('is-visible')) {
          observer.observe(el);
        }
      });
    };

    // Observe initial + dynamically added elements
    observe();

    const mutObs = new MutationObserver(observe);
    mutObs.observe(document.body, { childList: true, subtree: true });
  }

  // ─── Counter Animation ───────────────────────────────────────────

  function animateCounter(el, target, suffix, duration = 1800) {
    let start = null;
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
    const isFloat       = target.includes('.');
    const prefix        = target.match(/^[^0-9]*/)?.[0] || '';
    const mid           = target.match(/[0-9.]+/)?.[0] || '';
    const postfix       = target.slice(prefix.length + mid.length);

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 4);
      const current  = numericTarget * eased;

      el.textContent = prefix + (isFloat
        ? current.toFixed(1)
        : Math.floor(current)) + postfix;

      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target; // Snap to exact final value
    };

    requestAnimationFrame(step);
  }

  function initCounters() {
    const opts = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = el.dataset.counter;
        if (!target) return;
        animateCounter(el, target);
        observer.unobserve(el);
      });
    }, opts);

    const observe = () => {
      document.querySelectorAll('[data-counter]').forEach(el => {
        observer.observe(el);
      });
    };

    observe();
    new MutationObserver(observe).observe(document.body, { childList: true, subtree: true });
  }

  // ─── Hero Animations ─────────────────────────────────────────────

  function initHeroAnimations() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Headline line wraps
    const headline = hero.querySelector('.hero__headline');
    if (headline) {
      const lines = Array.from(headline.querySelectorAll('.hero-line-wrap'));
      lines.forEach((wrap, i) => {
        const inner = wrap.querySelector('.hero-line-inner');
        if (inner) {
          inner.style.setProperty('--delay', `${400 + i * 120}ms`);
        }
      });
    }
  }

  // ─── Parallax ────────────────────────────────────────────────────

  function initParallax() {
    const heroGlow = document.querySelector('.hero__glow');
    const heroWatermark = document.querySelector('.hero__watermark');
    if (!heroGlow && !heroWatermark) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (heroGlow) {
            heroGlow.style.transform = `translateY(${scrollY * 0.3}px)`;
          }
          if (heroWatermark) {
            heroWatermark.style.transform = `translateY(calc(-50% + ${scrollY * 0.15}px))`;
          }

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ─── Page Transitions ────────────────────────────────────────────

  function initPageTransitions() {
    const overlay = document.getElementById('page-overlay');
    if (!overlay) return;

    // Fade in on page load
    overlay.classList.remove('is-active');

    // Intercept internal link clicks
    document.addEventListener('click', e => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');

      // Skip: external, hash-only, no-transition, tel/mailto
      if (!href ||
          href.startsWith('http') ||
          href.startsWith('#') ||
          href.startsWith('tel:') ||
          href.startsWith('mailto:') ||
          link.dataset.noTransition !== undefined ||
          link.target === '_blank') {
        return;
      }

      e.preventDefault();
      overlay.classList.add('is-active');

      setTimeout(() => {
        window.location.href = href;
      }, 650);
    });
  }

  // ─── Page Loader ─────────────────────────────────────────────────

  function initLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('is-done');
        setTimeout(() => loader.remove(), 700);
      }, 800);
    });
  }

  // ─── Active Nav highlight on scroll (single-page sections) ───────

  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href*="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href').endsWith('#' + entry.target.id)
            );
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  // ─── Hover tilt on portfolio / service cards ──────────────────────

  function initCardTilt() {
    if (window.innerWidth <= 768) return;

    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect  = card.getBoundingClientRect();
        const cx    = rect.left + rect.width  / 2;
        const cy    = rect.top  + rect.height / 2;
        const dx    = (e.clientX - cx) / (rect.width  / 2);
        const dy    = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = `translateY(-6px) rotateY(${dx * 3}deg) rotateX(${-dy * 3}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ─── Main Init ───────────────────────────────────────────────────

  function init() {
    initCursor();
    initMagnetic();
    initReveal();
    initCounters();
    initHeroAnimations();
    initParallax();
    initPageTransitions();
    initLoader();
    initScrollSpy();

    // Card tilt — after dynamic content renders
    setTimeout(initCardTilt, 500);

    // Re-init card tilt on dynamic portfolio page
    document.addEventListener('kami:content-ready', () => {
      setTimeout(initCardTilt, 100);
    });
  }

  return { init };

})();
