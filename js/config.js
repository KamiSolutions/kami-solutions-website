/**
 * KAMI SOLUTIONS — MASTER CONFIGURATION
 * ──────────────────────────────────────
 * This is the single source of truth for the entire website.
 * Edit this file to rebrand, update content, or switch themes
 * without touching any other file.
 */

const KAMI_CONFIG = {

  // ─── COMPANY ───────────────────────────────────────────────────
  company: {
    name:        'Kami Solutions',
    shortName:   'KAMI',
    tagline:     'Websites. Systems. Design. Growth.',
    description: 'Premium African creative technology studio building digital infrastructure for ambitious businesses.',
    founded:     '2023',
    location:    'Johannesburg, South Africa',
  },

  // ─── CONTACT ───────────────────────────────────────────────────
  contact: {
    email:            'hello@kamisolutions.co.za',
    phone:            '+27 72 000 0000',
    whatsapp:         '27720000000',
    whatsappMessage:  "Hi Kami Solutions, I'd like to discuss a project.",
    address:          'Johannesburg, South Africa',
  },

  // ─── SOCIAL ────────────────────────────────────────────────────
  social: {
    instagram: 'https://instagram.com/kamisolutions',
    linkedin:  'https://linkedin.com/company/kamisolutions',
    twitter:   'https://twitter.com/kamisolutions',
    behance:   'https://behance.net/kamisolutions',
  },

  // ─── THEME ENGINE ──────────────────────────────────────────────
  // Change 'current' to switch the entire site theme.
  // Options: 'black-gold' | 'black-white' | 'dark-blue' | 'custom'

  theme: {
    current: 'black-gold',

    presets: {
      'black-gold': {
        bgPrimary:     '#050505',
        bgSecondary:   '#0E0E0E',
        bgSurface:     '#111111',
        bgCard:        '#0A0A0A',
        accent:        '#D4AF37',
        accentLight:   '#F0D77A',
        accentDim:     'rgba(212, 175, 55, 0.12)',
        textPrimary:   '#FFFFFF',
        textSecondary: '#B0B0B0',
        textMuted:     '#444444',
        border:        'rgba(255, 255, 255, 0.06)',
        borderAccent:  'rgba(212, 175, 55, 0.3)',
        shadow:        '0 32px 64px rgba(0, 0, 0, 0.8)',
        shadowAccent:  '0 0 60px rgba(212, 175, 55, 0.12)',
      },

      'black-white': {
        bgPrimary:     '#080808',
        bgSecondary:   '#111111',
        bgSurface:     '#161616',
        bgCard:        '#0D0D0D',
        accent:        '#FFFFFF',
        accentLight:   '#F0F0F0',
        accentDim:     'rgba(255, 255, 255, 0.06)',
        textPrimary:   '#FFFFFF',
        textSecondary: '#999999',
        textMuted:     '#444444',
        border:        'rgba(255, 255, 255, 0.08)',
        borderAccent:  'rgba(255, 255, 255, 0.3)',
        shadow:        '0 32px 64px rgba(0, 0, 0, 0.9)',
        shadowAccent:  '0 0 60px rgba(255, 255, 255, 0.05)',
      },

      'dark-blue': {
        bgPrimary:     '#020408',
        bgSecondary:   '#060D1A',
        bgSurface:     '#0A1628',
        bgCard:        '#050C18',
        accent:        '#4F9CF9',
        accentLight:   '#82BCFF',
        accentDim:     'rgba(79, 156, 249, 0.10)',
        textPrimary:   '#E8F0FF',
        textSecondary: '#8899BB',
        textMuted:     '#445566',
        border:        'rgba(79, 156, 249, 0.08)',
        borderAccent:  'rgba(79, 156, 249, 0.35)',
        shadow:        '0 32px 64px rgba(0, 0, 0, 0.8)',
        shadowAccent:  '0 0 60px rgba(79, 156, 249, 0.12)',
      },

      // Fully customisable — override any value:
      'custom': {
        bgPrimary:     '#050505',
        bgSecondary:   '#0E0E0E',
        bgSurface:     '#111111',
        bgCard:        '#0A0A0A',
        accent:        '#D4AF37',
        accentLight:   '#F0D77A',
        accentDim:     'rgba(212, 175, 55, 0.12)',
        textPrimary:   '#FFFFFF',
        textSecondary: '#B0B0B0',
        textMuted:     '#444444',
        border:        'rgba(255, 255, 255, 0.06)',
        borderAccent:  'rgba(212, 175, 55, 0.3)',
        shadow:        '0 32px 64px rgba(0, 0, 0, 0.8)',
        shadowAccent:  '0 0 60px rgba(212, 175, 55, 0.12)',
      },
    },
  },

  // ─── TYPOGRAPHY ENGINE ─────────────────────────────────────────
  // Change fonts here — Google Fonts are loaded automatically.

  typography: {
    loadGoogleFonts: true,

    heading: {
      family:  'Cormorant Garamond',
      weights: '300;400;500;600;700',
      css:     '"Cormorant Garamond", "Georgia", serif',
    },

    body: {
      family:  'Inter',
      weights: '300;400;500;600',
      css:     '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },

    accent: {
      family:  'Space Mono',
      weights: '400;700',
      css:     '"Space Mono", "Courier New", monospace',
    },
  },

  // ─── NAVIGATION ────────────────────────────────────────────────
  navigation: {
    links: [
      { label: 'About',    href: 'about.html' },
      { label: 'Services', href: 'services.html' },
      { label: 'Work',     href: 'portfolio.html' },
      { label: 'Contact',  href: 'contact.html' },
    ],
    cta: { label: 'Book Consultation', href: 'contact.html' },
  },

  // ─── HOMEPAGE ──────────────────────────────────────────────────
  hero: {
    label:       'Creative Technology Studio',
    headline:    ['Digital', 'Infrastructure', 'For Ambitious', 'Businesses.'],
    subheadline: 'We design websites, software, systems, and brands that help African companies scale.',
    cta: [
      { label: 'Book A Consultation', href: 'contact.html',   primary: true },
      { label: 'View Our Work',       href: 'portfolio.html', primary: false },
    ],
    stats: [
      { value: '50+', label: 'Projects Delivered' },
      { value: '35+', label: 'Clients Served'     },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '3+',  label: 'Years of Excellence' },
    ],
  },

  // ─── SERVICES ──────────────────────────────────────────────────
  services: [
    {
      id:           'websites',
      icon:         '◻',
      number:       '01',
      title:        'Website Development',
      shortTitle:   'Websites',
      tagline:      'Your digital storefront, perfected.',
      description:  'We build fast, beautiful, conversion-optimised websites that command attention and drive business growth. From landing pages to complex web applications.',
      features: [
        'Custom UI/UX Design',
        'Mobile-First Development',
        'Performance Optimised',
        'SEO Architecture',
        'CMS Integration',
        'E-Commerce Solutions',
      ],
      startingPrice: 'From R15,000',
      deliveryTime:  '2–4 weeks',
    },
    {
      id:           'software',
      icon:         '⬡',
      number:       '02',
      title:        'Software Development',
      shortTitle:   'Software',
      tagline:      'Systems that scale with your ambition.',
      description:  'Custom software solutions engineered to solve your specific business challenges. We build tools your team will actually use and your customers will love.',
      features: [
        'Custom Web Applications',
        'API Development & Integration',
        'Database Architecture',
        'Cloud Deployment',
        'Ongoing Maintenance',
        'Technical Consulting',
      ],
      startingPrice: 'From R30,000',
      deliveryTime:  '4–12 weeks',
    },
    {
      id:           'dashboards',
      icon:         '▦',
      number:       '03',
      title:        'Dashboards & Portals',
      shortTitle:   'Dashboards',
      tagline:      'Turn your data into decisions.',
      description:  'Real-time dashboards and business portals that give you complete visibility into your operations. Track KPIs, manage teams, and make data-driven decisions.',
      features: [
        'Real-Time Analytics',
        'Custom KPI Tracking',
        'Role-Based Access Control',
        'Data Visualisation',
        'Report Generation',
        'Multi-Platform Access',
      ],
      startingPrice: 'From R25,000',
      deliveryTime:  '3–8 weeks',
    },
    {
      id:           'branding',
      icon:         '◈',
      number:       '04',
      title:        'Brand Identity Design',
      shortTitle:   'Branding',
      tagline:      'Brands that command respect.',
      description:  'Strategic brand identity that communicates your values, positions you in the market, and creates the emotional connection your customers need to choose you.',
      features: [
        'Brand Strategy & Positioning',
        'Logo Design System',
        'Typography & Colour',
        'Brand Guidelines',
        'Stationery Design',
        'Brand Voice & Messaging',
      ],
      startingPrice: 'From R8,000',
      deliveryTime:  '1–3 weeks',
    },
    {
      id:           'graphic-design',
      icon:         '◇',
      number:       '05',
      title:        'Graphic Design',
      shortTitle:   'Design',
      tagline:      'Every pixel tells your story.',
      description:  'From social media content to print collateral, we create visual communication that keeps your brand consistent and compelling across every touchpoint.',
      features: [
        'Social Media Design',
        'Marketing Collateral',
        'Pitch Decks & Presentations',
        'Print Design',
        'Digital Advertising',
        'Motion Graphics',
      ],
      startingPrice: 'From R2,500',
      deliveryTime:  '3–7 days',
    },
    {
      id:           'automation',
      icon:         '⟳',
      number:       '06',
      title:        'Business Automation',
      shortTitle:   'Automation',
      tagline:      'Work smarter. Scale faster.',
      description:  'Automate repetitive tasks and build intelligent workflows that save time, reduce errors, and free your team to focus on what actually grows your business.',
      features: [
        'Workflow Automation',
        'CRM Integration',
        'Email & Communication Flows',
        'Inventory & Order Management',
        'Reporting Automation',
        'Custom Integrations',
      ],
      startingPrice: 'From R10,000',
      deliveryTime:  '1–4 weeks',
    },
  ],

  // ─── PORTFOLIO ─────────────────────────────────────────────────
  portfolio: [
    {
      id:          'logistics-dashboard',
      title:       'Logistics Management Dashboard',
      client:      'FreightPro Africa',
      category:    'Dashboard',
      tags:        ['Software', 'Dashboard', 'UX Design'],
      year:        '2024',
      cardBg:      'linear-gradient(135deg, #0D1A0D 0%, #0A1F0A 100%)',
      accentColor: '#4CAF50',
      challenge:   'FreightPro Africa was managing 200+ daily deliveries across 5 provinces using spreadsheets and WhatsApp. Visibility was poor, errors were frequent, and scaling felt impossible.',
      solution:    'We designed and built a real-time logistics dashboard giving dispatchers, drivers, and management complete visibility into every shipment — with live status updates, route optimisation, and intelligent exception alerts.',
      process:     'User interviews with dispatchers and drivers revealed the critical pain points: status uncertainty and communication delays. We built a role-based system where each user type sees exactly what they need — nothing more.',
      outcome:     '67% reduction in delivery errors. The dispatch team now handles 3× more shipments with the same headcount. Management has real-time KPIs they previously couldn\'t access.',
      stats: [
        { value: '67%',  label: 'Error Reduction'       },
        { value: '3×',   label: 'Team Efficiency'        },
        { value: '200+', label: 'Daily Deliveries Tracked' },
      ],
    },
    {
      id:          'construction-website',
      title:       'Construction Company Website',
      client:      'Zenith Build',
      category:    'Website',
      tags:        ['Website', 'Branding', 'UX Design'],
      year:        '2024',
      cardBg:      'linear-gradient(135deg, #1A1208 0%, #1F1A08 100%)',
      accentColor: '#D4AF37',
      challenge:   'Zenith Build was losing tenders to competitors with more polished digital presences, despite having superior build quality and two decades of experience.',
      solution:    'A premium, photography-driven website that positioned Zenith as the preferred construction partner for commercial developers. Project case studies, certifications showcased, and a streamlined tender enquiry system.',
      process:     'Architecture-inspired grid layouts, bold typographic hierarchy, and a clear focus on project photography. Copy was written to address the specific concerns of commercial developers: reliability, quality, and timeline adherence.',
      outcome:     'Enquiries from commercial developers increased 180% in the first 3 months. Zenith secured their largest contract to date within 6 weeks of launch.',
      stats: [
        { value: '180%',    label: 'Enquiry Increase'    },
        { value: '6 weeks', label: 'To Largest Contract' },
        { value: '#1',      label: 'Google Local Ranking' },
      ],
    },
    {
      id:          'haircare-ecommerce',
      title:       'Haircare E-Commerce Store',
      client:      'Roots & Crown',
      category:    'E-Commerce',
      tags:        ['Website', 'E-Commerce', 'Branding'],
      year:        '2023',
      cardBg:      'linear-gradient(135deg, #150A1A 0%, #1A0D20 100%)',
      accentColor: '#9B59B6',
      challenge:   'Roots & Crown was selling exclusively through Instagram DMs — manually processing every order with no inventory management, no payment system, and no customer data.',
      solution:    'A full e-commerce platform with product catalogues, integrated payment gateway, order management, customer accounts, and automated email flows for abandoned carts and order tracking.',
      process:     'Brand identity work came first — creating a visual system worthy of the product quality. The store was then built to showcase the range with rich product storytelling, ingredient transparency, and an educational content hub.',
      outcome:     'First-month revenue through the website exceeded their average monthly Instagram revenue by 240%. Customer retention improved dramatically through automated follow-up sequences.',
      stats: [
        { value: '240%', label: 'Revenue Increase' },
        { value: '500+', label: 'Orders Month 1'   },
        { value: '4.9★', label: 'Customer Rating'  },
      ],
    },
    {
      id:          'property-portal',
      title:       'Property Management Portal',
      client:      'Meridian Property Group',
      category:    'Portal',
      tags:        ['Software', 'Portal', 'Dashboard'],
      year:        '2024',
      cardBg:      'linear-gradient(135deg, #080D1A 0%, #0A1020 100%)',
      accentColor: '#4F9CF9',
      challenge:   'Meridian was managing 300+ residential units across 12 properties using outdated software, spreadsheets, and paper records. Lease tracking, maintenance requests, and tenant communication were constant pain points.',
      solution:    'A comprehensive property management portal with separate tenant and landlord interfaces. Lease management, maintenance ticketing, payment tracking, and automated rent reminders — all in one platform.',
      process:     'We mapped every existing workflow to find the inefficiencies. The new system consolidated 4 separate tools into a single platform, with an onboarding process designed to minimise learning curve for existing staff.',
      outcome:     'Administrative workload reduced by 55%. Maintenance resolution time dropped from 11 days to 3. Late rent payments decreased 70% through automated reminders.',
      stats: [
        { value: '55%',  label: 'Admin Time Saved'      },
        { value: '70%',  label: 'Fewer Late Payments'   },
        { value: '300+', label: 'Units Managed'         },
      ],
    },
  ],

  // ─── TEAM ──────────────────────────────────────────────────────
  team: [
    {
      name:     'Timothy Musama',
      role:     'Founder & Creative Director',
      bio:      'Designer, developer, and strategist. Timothy founded Kami Solutions with a clear vision: build the studio he wished existed in Africa when he was starting out.',
      image:    null,
      linkedin: '#',
    },
  ],

  // ─── TESTIMONIALS ──────────────────────────────────────────────
  testimonials: [
    {
      quote:   "Kami Solutions didn't just build us a website — they built us a competitive weapon. Within 90 days we landed a project three times larger than anything we'd previously secured.",
      author:  'Sipho Ndlovu',
      role:    'CEO',
      company: 'Zenith Build',
    },
    {
      quote:   'The dashboard they built changed how we operate. We went from reactive to proactive almost overnight. Our clients notice the difference, and so does our bottom line.',
      author:  'Amara Osei',
      role:    'Operations Director',
      company: 'FreightPro Africa',
    },
    {
      quote:   "I was nervous about the investment, but the results spoke for themselves. Our first month online outperformed 12 months of Instagram selling. These people understand business.",
      author:  'Lerato Dlamini',
      role:    'Founder',
      company: 'Roots & Crown',
    },
  ],

  // ─── ABOUT ─────────────────────────────────────────────────────
  about: {
    mission: 'To build the digital infrastructure that allows African businesses to compete at the highest level — locally and globally.',
    vision:  'An Africa where technology is not a barrier but a multiplier. Where ambitious businesses have access to world-class digital capability without leaving the continent.',
    values: [
      {
        title:       'Excellence Without Compromise',
        description: 'We hold ourselves to international standards. Every pixel, every line of code, every strategy is executed at the highest level — regardless of project size.',
      },
      {
        title:       'Partnership Over Transactions',
        description: "We don't complete projects and disappear. We invest in your success because your growth is our portfolio. Long-term relationships are how we measure our own performance.",
      },
      {
        title:       'Africa-First Thinking',
        description: 'We build with deep understanding of the African business landscape, infrastructure constraints, and consumer behaviour. Global standards. Local intelligence.',
      },
      {
        title:       'Simplicity Through Complexity',
        description: 'The best solutions are invisible. We handle the technical complexity so you experience effortless results. Sophistication that never shows its seams.',
      },
    ],
    story: [
      "Kami Solutions was born from a simple observation: African businesses were consistently underserved by generic digital agencies that didn't understand the market, the culture, or the ambition.",
      "We set out to build a different kind of studio. One that combines the design standards of London and New York with on-the-ground understanding of the African business environment.",
      "Today we work with companies across industries — from logistics to retail, construction to property — helping them build the digital foundations they need to compete and scale.",
    ],
  },

  // ─── FOOTER ────────────────────────────────────────────────────
  footer: {
    tagline: 'Building digital infrastructure for ambitious African businesses.',
    columns: [
      {
        heading: 'Company',
        links: [
          { label: 'About Us',  href: 'about.html'     },
          { label: 'Services',  href: 'services.html'  },
          { label: 'Our Work',  href: 'portfolio.html' },
          { label: 'Contact',   href: 'contact.html'   },
        ],
      },
      {
        heading: 'Services',
        links: [
          { label: 'Website Development', href: 'services.html#websites'     },
          { label: 'Software Development', href: 'services.html#software'    },
          { label: 'Dashboards & Portals', href: 'services.html#dashboards'  },
          { label: 'Brand Identity',       href: 'services.html#branding'    },
          { label: 'Graphic Design',       href: 'services.html#graphic-design' },
          { label: 'Automation',           href: 'services.html#automation'  },
        ],
      },
    ],
    legal: {
      links: [
        { label: 'Privacy Policy',   href: '#' },
        { label: 'Terms of Service', href: '#' },
      ],
    },
  },

  // ─── SEO ───────────────────────────────────────────────────────
  seo: {
    titleSuffix:        '| Kami Solutions',
    defaultDescription: 'Kami Solutions is a premium African creative technology studio. We build websites, software, dashboards, and brand identities for ambitious businesses.',
    defaultKeywords:    'web design South Africa, software development Africa, brand identity, digital agency Johannesburg, website development, business automation',
    ogImage:            'assets/images/og-image.jpg',
  },

};
