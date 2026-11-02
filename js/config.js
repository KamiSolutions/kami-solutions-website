/**
 * KAMI SOLUTIONS — CONTENT CONFIG
 * Single source of truth for copy, services, projects and contact details.
 * Edit this file to update the site; layout lives in css/ and js/components.js.
 */

const KAMI_CONFIG = {

  company: {
    name:        'Kami Solutions',
    tagline:     'Websites. Systems. Design. Growth.',
    description: 'Johannesburg-based creative technology studio building AI-powered systems, cloud platforms, and polished web and mobile products.',
    location:    'Johannesburg, South Africa',
  },

  contact: {
    email:            'musmatimothy@gmail.com',
    phone:            '+27 68 199 2586',
    phoneHref:        '+27681992586',
    whatsapp:         '27681992586',
    whatsappMessage:  "Hi Kami Solutions, I'd like to discuss a project.",
    address:          'Johannesburg, South Africa',
  },

  social: {
    linkedin: 'https://www.linkedin.com/in/timothy-musama-b164a7367/',
    github:   'https://github.com/KamiSolutions',
  },

  navigation: [
    { kicker: 'Studio',    label: 'About',    href: 'about.html',     page: 'about'     },
    { kicker: 'Selected',  label: 'Work',     href: 'portfolio.html', page: 'portfolio' },
    { kicker: 'Offerings', label: 'Services', href: 'services.html',  page: 'services'  },
    { kicker: 'Say hello', label: 'Contact',  href: 'contact.html',   page: 'contact'   },
  ],

  hero: {
    subheadline: 'We design websites, software, systems, and brands that help African companies scale.',
    stats: [
      { value: '9',    label: 'Microservices in production' },
      { value: '400+', label: 'Automated tests'             },
      { value: '70%+', label: 'Test coverage'               },
      { value: '6',    label: 'Products built'              },
    ],
  },

  stack: [
    'Python', 'FastAPI', 'Django REST', 'PostgreSQL', 'AWS', 'Docker',
    'GitHub Actions', 'Claude AI', 'React', 'TypeScript', 'React Native',
    'Expo', 'Next.js', 'Nginx',
  ],

  services: [
    {
      id: 'websites', number: '01',
      title: 'Website Development',
      tagline: 'Your digital storefront, perfected.',
      description: 'We build fast, beautiful, conversion-optimised websites that command attention and drive business growth. From landing pages to complex web applications.',
      features: ['Custom UI/UX Design', 'Mobile-First Development', 'Performance Optimised', 'SEO Architecture', 'CMS Integration', 'E-Commerce Solutions'],
      startingPrice: 'From R15,000', deliveryTime: '2–4 weeks',
    },
    {
      id: 'software', number: '02',
      title: 'Software Development',
      tagline: 'Systems that scale with your ambition.',
      description: 'Custom software solutions engineered to solve your specific business challenges. We build tools your team will actually use and your customers will love.',
      features: ['Custom Web Applications', 'API Development & Integration', 'Database Architecture', 'Cloud Deployment', 'Ongoing Maintenance', 'Technical Consulting'],
      startingPrice: 'From R30,000', deliveryTime: '4–12 weeks',
    },
    {
      id: 'dashboards', number: '03',
      title: 'Dashboards & Portals',
      tagline: 'Turn your data into decisions.',
      description: 'Real-time dashboards and business portals that give you complete visibility into your operations. Track KPIs, manage teams, and make data-driven decisions.',
      features: ['Real-Time Analytics', 'Custom KPI Tracking', 'Role-Based Access Control', 'Data Visualisation', 'Report Generation', 'Multi-Platform Access'],
      startingPrice: 'From R25,000', deliveryTime: '3–8 weeks',
    },
    {
      id: 'branding', number: '04',
      title: 'Brand Identity Design',
      tagline: 'Brands that command respect.',
      description: 'Strategic brand identity that communicates your values, positions you in the market, and creates the emotional connection your customers need to choose you.',
      features: ['Brand Strategy & Positioning', 'Logo Design System', 'Typography & Colour', 'Brand Guidelines', 'Stationery Design', 'Brand Voice & Messaging'],
      startingPrice: 'From R8,000', deliveryTime: '1–3 weeks',
    },
    {
      id: 'graphic-design', number: '05',
      title: 'Graphic Design',
      tagline: 'Every pixel tells your story.',
      description: 'From social media content to print collateral, we create visual communication that keeps your brand consistent and compelling across every touchpoint.',
      features: ['Social Media Design', 'Marketing Collateral', 'Pitch Decks & Presentations', 'Print Design', 'Digital Advertising', 'Motion Graphics'],
      startingPrice: 'From R2,500', deliveryTime: '3–7 days',
    },
    {
      id: 'automation', number: '06',
      title: 'Business Automation',
      tagline: 'Work smarter. Scale faster.',
      description: 'Automate repetitive tasks and build intelligent workflows that save time, reduce errors, and free your team to focus on what actually grows your business.',
      features: ['Workflow Automation', 'CRM Integration', 'Email & Communication Flows', 'Inventory & Order Management', 'Reporting Automation', 'Custom Integrations'],
      startingPrice: 'From R10,000', deliveryTime: '1–4 weeks',
    },
  ],

  process: [
    { n: '01', title: 'Discover', text: 'We learn your business, your users, and what success looks like before a single screen is drawn.' },
    { n: '02', title: 'Design',   text: 'Flows, interface, and architecture agreed up front, so building is fast and surprises are rare.' },
    { n: '03', title: 'Build',    text: 'Typed, tested, reviewed code shipped in small increments you can see and use along the way.' },
    { n: '04', title: 'Launch',   text: 'Deployment, monitoring, handover, and ongoing support, so it keeps working after day one.' },
  ],

  portfolio: [
    {
      id:       'ai-booking-platform',
      title:    'AI Booking & Quoting Platform',
      client:   'Confidential client · delivered via Injozi',
      category: 'AI Platform',
      tags:     ['AI', 'FastAPI', 'AWS'],
      year:     '2026',
      challenge: 'A production business operating across multiple South African cities received booking requests as unstructured emails. Turning each one into an accurate quote was slow, manual, and error-prone.',
      solution:  'An AI-assisted workflow: inbound email, structured extraction, a live inventory and availability check, an AI-drafted quote and reply, then human review and approval before anything is sent. The AI drafts; people decide.',
      process:   'Nine independently deployable FastAPI microservices with their own PostgreSQL databases, a workflow state machine with retries and quarantine, a multi-agent Claude pipeline with RAG, and a React and TypeScript approval dashboard. AWS infrastructure covers EC2, RDS, S3, SES, SQS, Secrets Manager and CloudWatch, with CI/CD on GitHub Actions.',
      outcome:   'Running in staging on AWS and approaching production launch. Every draft passes human approval and leaves a full audit trail. The project is under NDA, so a walkthrough is available on request.',
      stats: [
        { value: '9',    label: 'Microservices'   },
        { value: '400+', label: 'Automated tests' },
        { value: '70%+', label: 'Test coverage'   },
      ],
    },
    {
      id:       'motorcloud-business',
      title:    'MotorCloud Business',
      client:   'Mkhwany Holdings',
      category: 'Mobile App',
      tags:     ['React Native', 'TypeScript', 'UX Design'],
      year:     '',
      challenge: 'Vehicle businesses needed a mobile-first way to manage their operations as part of the wider MotorCloud ecosystem, alongside its Django API and Angular web app.',
      solution:  'A React Native application with a full UX design: user journey, screen flows, and every core page, built to the same brand standards as the rest of the ecosystem.',
      process:   'Strict TypeScript, Context API state management, and an iOS build chain. I also contributed to platform security testing, covering dependency scanning, security-header inspection, and JWT inspection.',
      outcome:   'A typed, well-tested codebase with 95% test coverage. The repository is private and available for review on request.',
      stats: [
        { value: '95%', label: 'Test coverage'         },
        { value: '3',   label: 'Apps in the ecosystem' },
        { value: 'TS',  label: 'Strict TypeScript'     },
      ],
    },
    {
      id:       'nexus-portal',
      title:    'Nexus Portal',
      client:   'Personal project',
      category: 'Platform',
      tags:     ['React Native', 'Expo', 'FastAPI'],
      year:     '2026',
      challenge: 'Multi-subsidiary organisations juggle financial approvals, HR leave, fleet tracking, leases, and claims across disconnected tools.',
      solution:  'A single cross-platform management portal that runs on Android, iOS, and Web from one React Native codebase, with role-based access control throughout.',
      process:   'Eighteen screens, a complete TypeScript type system with 25+ interfaces, and a semantic design system built on Expo and Expo Router. I am now extending it with an async FastAPI microservices backend and multi-tenant support.',
      outcome:   'A working front end across three platforms, with the backend in active development.',
      stats: [
        { value: '18',  label: 'Screens'               },
        { value: '25+', label: 'TypeScript interfaces' },
        { value: '3',   label: 'Platforms'             },
      ],
      repo: 'https://github.com/KamiSolutions/nexus-portal',
    },
    {
      id:       'nailtry',
      title:    'NailTry',
      client:   'Personal project',
      category: 'Mobile App',
      tags:     ['React Native', 'Expo', 'Django'],
      year:     '',
      challenge: 'Clients struggle to discover nail styles and book technicians in one place.',
      solution:  'A React Native and Expo app that connects clients with nail technicians for style discovery and appointment booking, backed by a Django REST API.',
      process:   'Authentication, booking management, status tracking, skeleton loaders, and production-grade error handling, all in strict TypeScript with Context API state.',
      outcome:   'A complete booking flow from discovery to confirmed appointment. The source is public on GitHub.',
      stats: [
        { value: 'RN',  label: 'React Native + Expo' },
        { value: 'DRF', label: 'Django REST API'     },
        { value: 'TS',  label: 'Strict TypeScript'   },
      ],
      repo: 'https://github.com/KamiSolutions/Nail-app',
    },
    {
      id:       'admin-dashboard',
      title:    'Admin Dashboard',
      client:   'Personal project',
      category: 'Dashboard',
      tags:     ['Next.js 15', 'TypeScript', 'PostgreSQL'],
      year:     '',
      challenge: 'Internal teams need a secure, fast admin interface without starting from scratch every time.',
      solution:  'A Next.js 15 admin dashboard with authentication, a component library, and a PostgreSQL data layer.',
      process:   'Built with TypeScript, Tailwind CSS, Shadcn UI, and Auth.js.',
      outcome:   'A reusable foundation for admin tools. The source is public on GitHub.',
      stats: [
        { value: '15', label: 'Next.js version' },
        { value: 'TS', label: 'TypeScript'      },
        { value: 'PG', label: 'PostgreSQL'      },
      ],
      repo: 'https://github.com/KamiSolutions/admin-dashboard',
    },
    {
      id:       'cleanx-website',
      title:    'CleanX Website',
      client:   'Personal project',
      category: 'Website',
      tags:     ['HTML', 'CSS', 'JavaScript'],
      year:     '',
      challenge: 'A cleaning business needed a credible, fast multi-page web presence.',
      solution:  'A multi-page business website in HTML, CSS, and JavaScript, deployed on Vercel.',
      process:   'Hand-written semantic markup, responsive layouts, and zero framework overhead.',
      outcome:   'A live site you can visit today.',
      stats: [
        { value: 'Live',  label: 'On Vercel'          },
        { value: 'Multi', label: 'Page site'          },
        { value: '0',     label: 'Framework overhead' },
      ],
      repo: 'https://github.com/KamiSolutions/valoworx-html',
      live: 'https://valoworx-html.vercel.app',
    },
  ],

  team: [
    {
      name:     'Timothy Musama',
      initials: 'TM',
      role:     'Founder & Lead Engineer',
      bio:      'Full-stack developer at Injozi building AI-powered backend systems, AWS infrastructure, and React and React Native products. Timothy founded Kami Solutions to design and ship polished, production-grade software for ambitious businesses.',
    },
  ],

  about: {
    mission: 'To build the digital infrastructure that allows African businesses to compete at the highest level, locally and globally.',
    vision:  'An Africa where technology is not a barrier but a multiplier. Where ambitious businesses have access to world-class digital capability without leaving the continent.',
    values: [
      { title: 'Excellence Without Compromise', description: 'We hold ourselves to international standards. Every pixel, every line of code, every strategy is executed at the highest level, regardless of project size.' },
      { title: 'Partnership Over Transactions', description: "We don't complete projects and disappear. We invest in your success because your growth is our portfolio. Long-term relationships are how we measure our own performance." },
      { title: 'Africa-First Thinking',         description: 'We build with deep understanding of the African business landscape, infrastructure constraints, and consumer behaviour. Global standards. Local intelligence.' },
      { title: 'Simplicity Through Complexity', description: 'The best solutions are invisible. We handle the technical complexity so you experience effortless results. Sophistication that never shows its seams.' },
    ],
    story: [
      'Kami Solutions is a Johannesburg creative technology studio founded by developer Timothy Musama. It exists to give ambitious African businesses the engineering and design quality they would expect from a global product team.',
      'The work spans AI-assisted automation, cloud-native backends, and web and mobile products, from an enterprise booking platform built on a multi-agent Claude pipeline to cross-platform management portals.',
      'Every build follows the same standards: security first, clean architecture, automated testing, and human-in-the-loop AI wherever a wrong answer would be costly.',
    ],
    why: [
      { title: 'International Standards',      text: "We measure our work against the best agencies in London, New York, and Tokyo, not just what's available locally. Every project receives the full force of our design thinking and technical execution." },
      { title: 'African Market Fluency',       text: 'We understand the nuances of building for African markets: connectivity constraints, mobile-first users, payment landscapes, and the cultural context your brand needs to resonate deeply.' },
      { title: 'Results-Oriented Partnership', text: "We don't deliver projects and disappear. We build long-term relationships, track outcomes, and stay invested in your success. Your growth is our most important metric." },
      { title: 'End-to-End Capability',        text: "From brand strategy to software development, graphic design to automation, we're a complete creative technology partner. No handoffs, no miscommunication, no dilution of vision." },
    ],
  },

  approach: [
    { title: 'Strategy First',  text: 'Before we design anything, we understand your business model, your customers, and what success actually looks like. Every creative decision flows from business logic.' },
    { title: 'Obsessive Craft', text: 'We hold ourselves to an international standard of craft. Typography, spacing, interaction design, code quality: every layer receives the same level of attention.' },
    { title: 'Tracked Results', text: "We don't just launch and move on. We track the metrics that matter (revenue, enquiries, efficiency gains) and use that data to keep improving the work." },
  ],

  next: [
    { label: 'Within 24 hours',   title: 'We read everything', text: "Every message is read by a real person. We'll review your project details carefully before responding. No auto-replies, no generic responses." },
    { label: 'Consultation call', title: 'We schedule a call', text: 'A focused 30–60 minute call where we dig into your business, your goals, and what success looks like. No sales pitch, just honest conversation.' },
    { label: 'Proposal',          title: 'You receive a proposal', text: "A detailed proposal covering scope, timeline, investment, and exactly what you'll receive. Clear, transparent, no surprises." },
  ],
};
