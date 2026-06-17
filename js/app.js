/**
 * KAMI SOLUTIONS — APP BOOTSTRAP
 * ───────────────────────────────
 * Applies the theme, loads fonts, then initialises
 * the component and animation engines.
 */

const KamiApp = (() => {

  const cfg = KAMI_CONFIG;

  // ─── Theme Engine ─────────────────────────────────────────────────
  // Reads the active theme from config and applies it to :root.

  function applyTheme() {
    const themeName = cfg.theme.current;
    const colors    = cfg.theme.presets[themeName] || cfg.theme.presets['black-gold'];

    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      // Convert camelCase keys → CSS custom property names
      // e.g. bgPrimary → --bg-primary
      const cssKey = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(cssKey, value);
    });
  }

  // ─── Typography Engine ────────────────────────────────────────────
  // Dynamically loads Google Fonts and applies font families to :root.

  function applyTypography() {
    const typo = cfg.typography;
    const root = document.documentElement;

    root.style.setProperty('--font-heading', typo.heading.css);
    root.style.setProperty('--font-body',    typo.body.css);
    root.style.setProperty('--font-accent',  typo.accent.css);

    if (typo.loadGoogleFonts) {
      const families = [
        `${typo.heading.family}:ital,wght@0,${typo.heading.weights};1,${typo.heading.weights}`,
        `${typo.body.family}:wght@${typo.body.weights}`,
        `${typo.accent.family}:wght@${typo.accent.weights}`,
      ].map(f => encodeURIComponent(f)).join('&family=');

      const link = document.createElement('link');
      link.rel  = 'preconnect';
      link.href = 'https://fonts.googleapis.com';
      document.head.appendChild(link);

      const link2 = document.createElement('link');
      link2.rel  = 'preconnect';
      link2.href = 'https://fonts.gstatic.com';
      link2.crossOrigin = 'anonymous';
      document.head.appendChild(link2);

      const fontLink = document.createElement('link');
      fontLink.rel  = 'stylesheet';
      fontLink.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
      document.head.appendChild(fontLink);
    }
  }

  // ─── SEO ──────────────────────────────────────────────────────────

  function applySEO() {
    const seo  = cfg.seo;
    const page = document.body.dataset.page;

    // Default meta description if not already set
    if (!document.querySelector('meta[name="description"]')) {
      const meta = document.createElement('meta');
      meta.name    = 'description';
      meta.content = seo.defaultDescription;
      document.head.appendChild(meta);
    }

    // OG tags
    const ogTags = [
      ['og:site_name', cfg.company.name],
      ['og:type',      'website'],
      ['og:image',     seo.ogImage],
    ];

    ogTags.forEach(([prop, content]) => {
      if (!document.querySelector(`meta[property="${prop}"]`)) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', prop);
        meta.content = content;
        document.head.appendChild(meta);
      }
    });
  }

  // ─── Favicon ──────────────────────────────────────────────────────

  function applyFavicon() {
    if (document.querySelector('link[rel="icon"]')) return;

    // Generate SVG favicon from company initials
    const initial = cfg.company.shortName.slice(0, 1);
    const accent  = getComputedStyle(document.documentElement)
                      .getPropertyValue('--accent').trim() || '#D4AF37';

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" fill="#050505" rx="6"/>
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
        font-family="monospace" font-weight="700" font-size="18"
        fill="${accent}">${initial}</text>
    </svg>`;

    const link = document.createElement('link');
    link.rel  = 'icon';
    link.type = 'image/svg+xml';
    link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    document.head.appendChild(link);
  }

  // ─── Init ─────────────────────────────────────────────────────────

  function init() {
    // 1. Apply design tokens before render
    applyTheme();
    applyTypography();
    applySEO();
    applyFavicon();

    // 2. Render components once DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        KamiComponents.init();
        KamiAnimations.init();
      });
    } else {
      KamiComponents.init();
      KamiAnimations.init();
    }
  }

  return { init };

})();

// Boot
KamiApp.init();
