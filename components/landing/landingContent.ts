// ─── Landing Page Content Configuration ──────────────────────────────────────
// All user-visible text for the landing page lives here.
// Set `visible: false` on any section to hide it entirely from page.tsx.

export type TreeNode = {
  id: string
  name: string
  type: 'dir' | 'file'
  comment?: string
  children?: TreeNode[]
}

export type TerminalToken = {
  text: string
  color?: 'muted' | 'primary' | 'secondary' | 'text'
}

export type TerminalLine = {
  tokens: TerminalToken[]
  blank?: boolean
}

type Section<T> = { visible: boolean } & T

export type LandingContent = {
  nav: Section<{
    links: { label: string; href: string }[]
    cta: { label: string; href: string }
  }>
  hero: Section<{
    eyebrow: string
    title: string
    subtitle: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string; target: string }
    bookingCta: string
    command: string
    scrollLabel: string
  }>
  installBanner: Section<{
    row1: string[]
    row2: string[]
  }>
  features: Section<{
    label: string
    heading: string
    cards: { num: string; name: string; desc: string }[]
  }>
  hotelShowcase: Section<{
    label: string
    heading: string
    body: string
    items: { title: string; description: string; image: string }[]
  }>
  whyBook: Section<{
    label: string
    heading: string
    body: string
    featureImage: string
    items: { title: string; desc: string; kicker: string }[]
  }>
  offers: Section<{
    label: string
    heading: string
    body: string
    items: { badge: string; title: string; desc: string; value: string; note: string; image: string }[]
  }>
  plans: Section<{
    label: string
    heading: string
    body: string
    featuredPlanId: string
    featuredBadge: string
    ctaLabel: string
    ctaHref: string
    inactiveFeatureLabel: string
  }>
  guestExperience: Section<{
    label: string
    heading: string
    body: string
    items: { title: string; desc: string; image: string }[]
  }>
  operationsPulse: Section<{
    label: string
    heading: string
    body: string
    mainBadge: string
    mainTitle: string
    mainBody: string
    cards: { eyebrow: string; title: string; desc: string }[]
  }>
  momentumWall: Section<{
    label: string
    heading: string
    body: string
    cards: { stat: string; title: string; desc: string }[]
    note: string
  }>
  codeDemo: Section<{
    label: string
    heading: string
    body: string
    panelTitle: string
    panelBadge: string
    bullets: string[]
    terminalLines: TerminalLine[]
  }>
  techStack: Section<{
    label: string
    heading: string
    subheading: string
    cards: { role: string; name: string; desc: string }[]
    callout: string
  }>
  whatYouGet: Section<{
    label: string
    heading: string
    body: string
    terminalLabel: string
    defaultExpandedIds: string[]
    fileTree: TreeNode[]
    includedItems: { title: string; desc: string }[]
  }>
  howItWorks: Section<{
    label: string
    heading: string
    body: string
    steps: { number: string; tag: string; title: string; desc: string; image: string; points: string[] }[]
  }>
  stats: Section<{
    items: { animateTo: number | null; suffix: string; display: string; label: string }[]
  }>
  faq: Section<{
    label: string
    heading: string
    items: { question: string; answer: string }[]
  }>
  cta: Section<{
    label: string
    heading: string
    body: string
    primaryBtn: { label: string; copiedLabel: string; command: string }
    secondaryBtn: { label: string; href: string }
  }>
  footer: Section<{
    brand: { name: string; desc: string }
    techBadges: string[]
    templateLinks: { label: string; href: string }[]
    resourceLinks: { label: string; href: string; external: boolean }[]
    getStarted: { heading: string; command: string; note: string }
    copyright: string
    builtWith: string
  }>
}

export const landingContent: LandingContent = {
  // ─── Nav ──────────────────────────────────────────────────────────────────
  nav: {
    visible: true,
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Offers', href: '#offers' },
      { label: 'Plans', href: '#plans' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Docs', href: 'https://shortcut-documentation.vercel.app/docs' }
    ],
    cta: { label: 'Get Started', href: '/login' }
  },

  // ─── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    visible: true,
    eyebrow: 'MULTI-AGENCY HOTEL PLATFORM',
    title: 'Run Your Agency & Hotels, or Book Your Dream Trip All in One Place',
    subtitle:
      'Operate multiple agencies, control hotel inventory, and enable seamless booking workflows from a single dashboard.',
    primaryCta: { label: 'Discover More', href: '#features' },
    secondaryCta: {
      label: 'Explore Hotels',
      href: 'https://shortcut-documentation.vercel.app/docs',
      target: '_blank'
    },
    bookingCta: 'Check Now',
    command: 'npx create-shortcut-next',
    scrollLabel: 'SCROLL'
  },

  // ─── Install Banner ────────────────────────────────────────────────────────
  installBanner: {
    visible: false,
    row1: [
      'Next.js 15',
      'App Router',
      'MUI v7',
      'TypeScript',
      'CASL RBAC',
      'TanStack Query',
      'React Hook Form',
      'JWT Auth',
      'Axios Client'
    ],
    row2: [
      'Dark Mode',
      'i18n + RTL',
      'Protected Routes',
      'Role-based Access',
      'Dashboard Layout',
      'Tailwind v4',
      'Auto Logout',
      'Token Refresh',
      'LocalStorage Sync'
    ]
  },

  // ─── Features ─────────────────────────────────────────────────────────────
  features: {
    visible: true,
    label: 'OUR SERVICES',
    heading: 'Everything your agency needs to run hotel operations smoothly',
    cards: [
      {
        num: '01',
        name: 'Multi-Agency Management',
        desc: 'Manage multiple agencies from one platform with separated workspaces, team roles, and full control over each business unit.'
      },
      {
        num: '02',
        name: 'Hotel & Property Operations',
        desc: 'Add hotels, organize branches, and keep property information centralized so your teams move faster with less operational confusion.'
      },
      {
        num: '03',
        name: 'Room Inventory Control',
        desc: 'Track room types, availability, and status in real time to reduce errors and keep inventory ready for booking teams.'
      },
      {
        num: '04',
        name: 'Smart Booking Workflows',
        desc: 'Handle booking requests from creation to confirmation with a streamlined flow that improves conversion and customer experience.'
      },
      {
        num: '05',
        name: 'Role-Based Team Access',
        desc: 'Give each user the right level of access, so agencies, managers, and staff can collaborate securely without permission conflicts.'
      },
      {
        num: '06',
        name: 'Actionable Performance Insights',
        desc: 'Monitor booking activity, property performance, and agency productivity with clear insights that support faster decisions.'
      }
    ]
  },

  hotelShowcase: {
    visible: true,
    label: 'HOTELS YOU CAN SCALE',
    heading: 'Present premium properties that build instant trust',
    body: 'Showcase your network of hotels with a polished experience that helps agencies convert more customers into confirmed bookings.',
    items: [
      {
        title: 'Luxury City Properties',
        description: 'Highlight high-demand city hotels with full room details, dynamic pricing, and fast booking actions.',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80'
      },
      {
        title: 'Resort & Leisure Destinations',
        description: 'Promote leisure stays with rich visuals and structured availability to increase booking confidence.',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80'
      },
      {
        title: 'Executive Business Hotels',
        description: 'Serve corporate and agency clients with reliable booking workflows and professional property presentation.',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },

  whyBook: {
    visible: true,
    label: 'WHY BOOK WITH US',
    heading: 'Remove doubt fast and give guests a clear reason to book now',
    body:
      'When a guest compares properties, they want clarity, trust, and confidence. This section brings the strongest booking arguments forward before hesitation starts.',
    featureImage:
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=1400&q=80',
    items: [
      {
        kicker: 'DIRECT RATE',
        title: 'Best value when booking directly',
        desc: 'Show guests that direct booking unlocks the strongest room value, cleaner pricing, and fewer surprises at checkout.'
      },
      {
        kicker: 'INSTANT CONFIRMATION',
        title: 'No waiting for manual follow-up',
        desc: 'Make the next step feel immediate and reassuring with instant confirmation messaging that removes uncertainty after checkout.'
      },
      {
        kicker: 'FLEXIBLE STAY',
        title: 'Policies that feel safe to commit to',
        desc: 'Reassure hesitant guests with flexible changes, clear cancellation rules, and fewer reasons to postpone the reservation.'
      },
      {
        kicker: 'TRUST SIGNALS',
        title: 'Clear property details before payment',
        desc: 'Verified amenities, accurate room visuals, and transparent inclusions help the guest feel they know exactly what they are booking.'
      }
    ]
  },

  offers: {
    visible: true,
    label: 'SPECIAL OFFERS',
    heading: 'Put the most bookable packages in front of the user before they leave',
    body:
      'Strong offer framing gives the guest an easy reason to act now. Use simple, specific packages that feel relevant to real travel intent.',
    items: [
      {
        badge: 'EARLY BOOKING',
        title: 'Plan ahead and save on premium stays',
        desc: 'Reward guests who book earlier with a better rate on selected room categories and peak-season dates.',
        value: 'Save up to 12%',
        note: 'Ideal for guests comparing several stays before making a final choice.',
        image:
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
      },
      {
        badge: 'FAMILY PACKAGE',
        title: 'More value for longer family stays',
        desc: 'Bundle family-friendly benefits such as breakfast, extra bedding, or late checkout into one clear offer.',
        value: 'Breakfast + flexible checkout',
        note: 'Helps families feel the offer is practical, not just promotional.',
        image:
          'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      {
        badge: 'LONG STAY',
        title: 'A stronger rate when the stay gets longer',
        desc: 'Encourage extended bookings with a visible multi-night advantage that makes the total value feel obvious.',
        value: 'Better nightly rate after 3 nights',
        note: 'Works well for business trips, work-from-hotel stays, and mixed leisure plans.',
        image:
          'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },

  plans: {
    visible: true,
    label: 'SUBSCRIPTION PLANS',
    heading: 'Choose the right plan for the way your hotel business operates',
    body:
      'Start with a simple plan, grow into deeper reporting and multi-property control, or move to a custom enterprise setup when your operation needs full flexibility.',
    featuredPlanId: 'plan-pro',
    featuredBadge: 'Most selected',
    ctaLabel: 'Start with this plan',
    ctaHref: '/login',
    inactiveFeatureLabel: 'Not included'
  },

guestExperience: {
  visible: true,
  label: 'BOOK WITH CONFIDENCE',
  heading: 'Everything you need to book with confidence — no surprises, no stress',
  body:
    'We make sure every listing is accurate, every deal is fair, and every booking is protected — so you can focus on enjoying your trip.',
  items: [
    {
      title: 'Your booking is protected from the moment you confirm',
      desc: 'Every reservation is secured and documented. No cancellations without notice, no hidden changes — your plans stay exactly as you made them.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Prices you see are prices you pay',
      desc: 'No hidden fees added at checkout. The total shown includes everything — so you can budget your trip without any last-minute surprises.',
      image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Verified hotels and agencies — only the trusted ones',
      desc: 'Every hotel and agency on our platform goes through a verification process. You are only seeing listings from providers we have reviewed and approved.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Real reviews from real guests',
      desc: 'Ratings and feedback come from verified bookings only — not anonymous posts. What you read reflects what people actually experienced.',
      image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Support that responds before your trip, not after',
      desc: 'Have a question before you book or need to make a change? Our support team is here to help — fast, clear, and on your side.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Your rights as a guest are always respected',
      desc: 'Clear cancellation policies, fair refund terms, and transparent communication — because we believe every traveler deserves to be treated right.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80'
    }
  ]
},

  operationsPulse: {
    visible: true,
    label: 'OPERATIONS PULSE',
    heading: 'One control layer for every moving part of your hotel business',
    body:
      'Instead of switching between teams, spreadsheets, and property updates, your operation can move through one connected rhythm that keeps everyone aligned.',
    mainBadge: 'LIVE CONTROL',
    mainTitle: 'Hotel Agency Command Flow',
    mainBody:
      'Hotels, availability, booking requests, and agency actions stay visible in one operational view so decisions happen faster and with more confidence.',
    cards: [
      {
        eyebrow: 'REQUEST FLOW',
        title: 'Capture guest demand before it gets lost',
        desc: 'Keep every inquiry, stay detail, and follow-up in a structured path that helps your team respond without chaos.'
      },
      {
        eyebrow: 'ROOM SIGNALS',
        title: 'See inventory changes as they happen',
        desc: 'Track room availability, status, and hotel updates in a cleaner system that reduces booking mistakes and repeated checking.'
      },
      {
        eyebrow: 'AGENCY VIEW',
        title: 'Give every agency a clearer operating lane',
        desc: 'Separate workspaces and organized visibility let teams focus on their own pipeline while leadership still sees the bigger picture.'
      },
      {
        eyebrow: 'TEAM ACCESS',
        title: 'Keep people fast without losing control',
        desc: 'Role-based access makes sure the right people can move quickly while the system keeps actions structured and secure.'
      }
    ]
  },

  momentumWall: {
    visible: true,
    label: 'WHY IT FEELS BETTER',
    heading: 'Built to make hotel operations feel lighter, faster, and more premium',
    body:
      'This is not just a dashboard that stores data. It is a system designed to reduce friction, improve team confidence, and make every booking interaction feel more organized.',
    cards: [
      {
        stat: '01',
        title: 'Less back-and-forth between teams',
        desc: 'One shared workflow means agencies, reservation staff, and management stop chasing updates across separate tools.'
      },
      {
        stat: '02',
        title: 'Faster answers for the guest',
        desc: 'When room status, hotel details, and request history are visible, your team can quote and confirm with less delay.'
      },
      {
        stat: '03',
        title: 'A cleaner premium impression',
        desc: 'Better structure behind the scenes creates a smoother experience in front of the customer and builds stronger trust.'
      },
      {
        stat: '04',
        title: 'More confidence at every step',
        desc: 'From first inquiry to final confirmation, the system helps teams work with clarity instead of guessing what happens next.'
      }
    ],
    note: 'Organized systems do more than save time. They make the whole hospitality experience feel more trustworthy.'
  },

  // ─── Code Demo ────────────────────────────────────────────────────────────
  codeDemo: {
    visible: false,
    label: 'SYSTEM OVERVIEW',
    heading: 'Run hotel operations from one clear control center',
    body:
      'Your team can monitor hotels, room inventory, booking requests, and agency activity from a single workflow built for fast decisions and cleaner coordination.',
    panelTitle: 'operations-feed.hotel',
    panelBadge: 'LIVE SYSTEM',
    bullets: [
      'Track hotel inventory, room availability, and booking status in one place',
      'Give each agency and staff member the right role with controlled access',
      'Move requests from inquiry to confirmation with a cleaner booking workflow'
    ],
    terminalLines: [
      { tokens: [{ text: '# Morning operations snapshot', color: 'muted' }] },
      {
        tokens: [
          { text: 'agency', color: 'primary' },
          { text: '.active', color: 'text' },
          { text: ' = ', color: 'muted' },
          { text: '12', color: 'secondary' }
        ]
      },
      {
        tokens: [
          { text: 'hotels', color: 'primary' },
          { text: '.listed', color: 'text' },
          { text: ' = ', color: 'muted' },
          { text: '48', color: 'secondary' }
        ]
      },
      {
        tokens: [
          { text: 'bookings', color: 'primary' },
          { text: '.today', color: 'text' },
          { text: ' = ', color: 'muted' },
          { text: '126', color: 'secondary' }
        ]
      },
      {
        tokens: [
          { text: 'pending', color: 'primary' },
          { text: '.confirmation', color: 'text' },
          { text: ' = ', color: 'muted' },
          { text: '14', color: 'secondary' }
        ]
      },
      { blank: true, tokens: [] },
      { tokens: [{ text: '# Live property activity', color: 'muted' }] },
      {
        tokens: [
          { text: 'hotel', color: 'primary' },
          { text: '.name', color: 'text' },
          { text: ' = ', color: 'muted' },
          { text: 'Grand Horizon / Amman', color: 'secondary' }
        ]
      },
      {
        tokens: [
          { text: 'room', color: 'primary' },
          { text: '.deluxe.available', color: 'text' },
          { text: ' = ', color: 'muted' },
          { text: '08', color: 'secondary' }
        ]
      },
      {
        tokens: [
          { text: 'room', color: 'primary' },
          { text: '.suite.available', color: 'text' },
          { text: ' = ', color: 'muted' },
          { text: '03', color: 'secondary' }
        ]
      },
      {
        tokens: [
          { text: 'housekeeping', color: 'primary' },
          { text: '.in_service', color: 'text' },
          { text: ' = ', color: 'muted' },
          { text: '02 rooms', color: 'secondary' }
        ]
      },
      { blank: true, tokens: [] },
      { tokens: [{ text: '# Guest request pipeline', color: 'muted' }] },
      {
        tokens: [
          { text: 'request', color: 'primary' },
          { text: '.guest', color: 'text' },
          { text: ' = ', color: 'muted' },
          { text: 'Family stay / 3 nights', color: 'secondary' }
        ]
      },
      {
        tokens: [
          { text: 'quote', color: 'primary' },
          { text: '.status', color: 'text' },
          { text: ' = ', color: 'muted' },
          { text: 'Sent to customer', color: 'secondary' }
        ]
      },
      {
        tokens: [
          { text: 'payment', color: 'primary' },
          { text: '.status', color: 'text' },
          { text: ' = ', color: 'muted' },
          { text: 'Awaiting confirmation', color: 'secondary' }
        ]
      }
    ]
  },

  // ─── Tech Stack ───────────────────────────────────────────────────────────
  techStack: {
    visible: true,
    label: 'TECH STACK',
    heading: 'Eight libraries. One command.',
    subheading:
      "Every dependency in the generated project is chosen for real production use. Here's what you get and why it's there.",
    cards: [
      {
        role: 'FRAMEWORK',
        name: 'Next.js 15',
        desc: 'App Router, Server Components, Layouts, and middleware — the full feature set, not a pages-directory fallback.'
      },
      {
        role: 'COMPONENT LIBRARY',
        name: 'Material UI v7',
        desc: 'Theming, dark mode, RTL layout, and per-component overrides all pre-configured. Use the design system immediately.'
      },
      {
        role: 'AUTHORIZATION',
        name: 'CASL',
        desc: 'Attribute-based access control with a four-role hierarchy. Middleware enforces it. Client hooks expose it.'
      },
      {
        role: 'SERVER STATE',
        name: 'TanStack Query v5',
        desc: 'Caching, background refetch, and loading states configured with sensible defaults. No manual fetch boilerplate.'
      },
      {
        role: 'FORMS',
        name: 'React Hook Form',
        desc: 'Strongly-typed, performant forms. Used on the login and signup pages out of the box with full validation wiring.'
      },
      {
        role: 'INTERNATIONALIZATION',
        name: 'i18next',
        desc: 'English and Arabic with automatic RTL detection. Language preference is persisted to localStorage.'
      },
      {
        role: 'HTTP CLIENT',
        name: 'Axios',
        desc: 'Interceptors handle JWT injection, 401 token refresh, and auto-logout. One Axios instance, fully configured.'
      },
      {
        role: 'TYPE SAFETY',
        name: 'TypeScript',
        desc: 'Full coverage: CASL ability types, role enums, API response shapes, and Next.js 15 server component props.'
      }
    ],
    callout: 'Tailwind CSS v4 — zero-config utility classes, added at scaffold time'
  },

  // ─── What You Get ─────────────────────────────────────────────────────────
  whatYouGet: {
    visible: true,
    label: 'WHAT YOU GET',
    heading: 'A working app, not a starting point.',
    body: 'Open your editor to a project that already does something. Every file below is scaffolded and wired on the first run.',
    terminalLabel: 'project structure',
    defaultExpandedIds: ['app', 'dashboard-group', 'lib-abilities', 'core', 'core-context', 'providers'],
    fileTree: [
      {
        id: 'app',
        name: 'app/',
        type: 'dir',
        comment: 'Next.js App Router root',
        children: [
          {
            id: 'dashboard-group',
            name: '(dashboard)/',
            type: 'dir',
            comment: 'protected route group',
            children: [
              {
                id: 'dashboard-dir',
                name: 'dashboard/',
                type: 'dir',
                children: [
                  {
                    id: 'dashboard-page',
                    name: 'page.tsx',
                    type: 'file',
                    comment: '→ Dashboard home'
                  }
                ]
              },
              {
                id: 'dashboard-layout',
                name: 'layout.tsx',
                type: 'file',
                comment: '→ Protected sidebar layout'
              }
            ]
          },
          {
            id: 'home-dir',
            name: 'home/',
            type: 'dir',
            children: [{ id: 'home-page', name: 'page.tsx', type: 'file', comment: '→ Home / landing page' }]
          },
          {
            id: 'login-dir',
            name: 'login/',
            type: 'dir',
            children: [
              {
                id: 'login-page',
                name: 'page.tsx',
                type: 'file',
                comment: '→ Login with React Hook Form'
              }
            ]
          },
          {
            id: 'unauthorized-dir',
            name: 'unauthorized/',
            type: 'dir',
            children: [
              {
                id: 'unauthorized-page',
                name: 'page.tsx',
                type: 'file',
                comment: '→ CASL redirect target'
              }
            ]
          },
          {
            id: 'root-layout',
            name: 'layout.tsx',
            type: 'file',
            comment: '→ Root layout + all providers'
          }
        ]
      },
      {
        id: 'lib-abilities',
        name: 'lib/abilities/',
        type: 'dir',
        comment: 'CASL authorization',
        children: [
          { id: 'roles', name: 'roles.ts', type: 'file', comment: '→ Role → ability definitions' },
          {
            id: 'routeMap',
            name: 'routeMap.ts',
            type: 'file',
            comment: '→ Route → permission mapping'
          },
          {
            id: 'routeMatcher',
            name: 'routeMatcher.ts',
            type: 'file',
            comment: '→ Pattern matching logic'
          },
          {
            id: 'checkAuth',
            name: 'checkAuthorization.ts',
            type: 'file',
            comment: '→ Auth orchestration'
          }
        ]
      },
      {
        id: 'core',
        name: 'core/',
        type: 'dir',
        comment: 'infrastructure layer',
        children: [
          {
            id: 'core-clients',
            name: 'clients/',
            type: 'dir',
            children: [
              {
                id: 'apiClient',
                name: 'apiClient.ts',
                type: 'file',
                comment: '→ Axios with token refresh'
              }
            ]
          },
          {
            id: 'core-context',
            name: 'context/',
            type: 'dir',
            children: [
              {
                id: 'authContext',
                name: 'AuthContext.tsx',
                type: 'file',
                comment: '→ login / logout / token state'
              },
              {
                id: 'settingsContext',
                name: 'SettingsContext.tsx',
                type: 'file',
                comment: '→ theme, language, direction'
              }
            ]
          },
          {
            id: 'core-theme',
            name: 'theme/overrides/',
            type: 'dir',
            comment: '→ per-component MUI overrides'
          }
        ]
      },
      {
        id: 'providers',
        name: 'providers/',
        type: 'dir',
        comment: 'React context composition',
        children: [
          {
            id: 'appProviders',
            name: 'AppProviders.tsx',
            type: 'file',
            comment: '→ Auth → Settings → Theme → Query'
          },
          {
            id: 'i18nProvider',
            name: 'I18nProvider.tsx',
            type: 'file',
            comment: '→ i18next initialization'
          }
        ]
      }
    ],
    includedItems: [
      {
        title: 'Login page',
        desc: 'React Hook Form with validation. JWT stored in localStorage and mirrored to cookies for SSR.'
      },
      {
        title: 'Protected dashboard layout',
        desc: 'Collapsible sidebar with nested routes and responsive design. Only accessible to authenticated users.'
      },
      {
        title: 'CASL authorization',
        desc: 'Route map + middleware check on every request. Add a protected route by editing one file.'
      },
      {
        title: 'Auth context',
        desc: 'login(), logout() with token storage, user state, and auto-redirect on session expiry.'
      },
      {
        title: 'Settings context',
        desc: 'Theme mode (dark/light), UI direction (LTR/RTL), and language — persisted to localStorage.'
      },
      {
        title: 'MUI theme system',
        desc: 'core/theme/overrides/ with one file per MUI component. Change global tokens without touching internals.'
      },
      {
        title: 'Axios API client',
        desc: 'Request interceptor injects the access token. Response interceptor handles 401 refresh and cascade logout.'
      },
      {
        title: 'MSW mock layer',
        desc: 'Mock Service Worker pre-configured for local development. Swap real endpoints in when ready.'
      }
    ]
  },

  // ─── How It Works ─────────────────────────────────────────────────────────
  howItWorks: {
    visible: true,
    label: 'HOW WE WORK',
    heading: 'A polished hotel booking flow, built to feel premium from the first click',
    body:
      'Guide every guest from inquiry to confirmation with a workflow that feels organized, fast, and worthy of the properties you represent.',
    steps: [
      {
        number: 'STEP 01',
        tag: 'Guest Discovery',
        title: 'Capture the stay request with clarity',
        desc:
          'Start with the guest brief, travel dates, room preferences, and budget so your team can respond with options that already feel tailored and premium.',
        image:
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        points: [
          'Collect dates, destination, room type, and guest count in one clean step.',
          'Keep requests organized so your team replies faster and with fewer follow-ups.'
        ]
      },
      {
        number: 'STEP 02',
        tag: 'Hotel Matching',
        title: 'Present hotel options that match the vibe',
        desc:
          'Show curated hotel choices with strong visuals, clear room details, and confident pricing so the customer quickly understands the value of each stay.',
        image:
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
        points: [
          'Highlight premium rooms, amenities, and property style in a polished format.',
          'Make comparisons easy so guests can decide without friction or confusion.'
        ]
      },
      {
        number: 'STEP 03',
        tag: 'Booking Confirmation',
        title: 'Close the booking with confidence',
        desc:
          'Move from selected property to confirmed reservation with a smooth confirmation step that keeps the experience professional and reassuring.',
        image:
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
        points: [
          'Confirm booking details, guest information, and payment status in one place.',
          'Deliver a reliable final step that feels clean, secure, and ready to trust.'
        ]
      }
    ]
  },

  // ─── Stats ────────────────────────────────────────────────────────────────
  stats: {
    visible: true,
    items: [
      { animateTo: 9, suffix: '+', display: '0+', label: 'INTEGRATED PACKAGES' },
      { animateTo: 4, suffix: '', display: '0', label: 'BUILT-IN RBAC ROLES' },
      { animateTo: null, suffix: '', display: '<30s', label: 'TO RUNNING DEV SERVER' }
    ]
  },

  // ─── FAQ ──────────────────────────────────────────────────────────────────
  faq: {
    visible: true,
    label: 'FAQ',
    heading: 'What agencies and hotel teams ask first',
    items: [
      {
        question: 'Can I manage more than one agency from the same system?',
        answer:
          'Yes. The platform is designed for multi-agency operations, so each agency can work inside a structured environment while management still keeps clear oversight across hotels, bookings, and team activity.'
      },
      {
        question: 'Can the system track hotels, rooms, and availability in one place?',
        answer:
          'Yes. You can organize hotels, manage room types, monitor room status, and follow availability from one dashboard so booking teams always work with updated inventory.'
      },
      {
        question: 'How does the booking workflow move from inquiry to confirmation?',
        answer:
          'The workflow is built to move clearly from guest request to hotel matching, quotation, follow-up, and final booking confirmation. This helps teams reduce confusion and respond faster with a more professional experience.'
      },
      {
        question: 'Can different team members have different access levels?',
        answer:
          'Yes. The system supports role-based access so admins, managers, agency staff, and other users can each work within the permissions that match their responsibility.'
      },
      {
        question: 'Does the platform support Arabic and English usage?',
        answer:
          'Yes. The interface is built to support both Arabic and English, which makes it easier for teams to work in the language and layout direction that fits their daily operations.'
      }
    ]
  },

  // ─── CTA ──────────────────────────────────────────────────────────────────
  cta: {
    visible: true,
    label: 'GET STARTED',
    heading: 'Your next project starts here',
    body: 'Auth, roles, theming, i18n, and data fetching — scaffolded in under 30 seconds. Open your editor to a working dashboard, not an empty folder.',
    primaryBtn: {
      label: 'Copy Install Command',
      copiedLabel: 'Copied!',
      command: 'npx create-shortcut-next'
    },
    secondaryBtn: {
      label: 'View Documentation',
      href: 'https://shortcut-documentation.vercel.app/docs'
    }
  },

  // ─── Footer ───────────────────────────────────────────────────────────────
  footer: {
    visible: true,
    brand: {
      name: '.Hotel Agency',
      desc: 'A premium platform for managing agencies, hotels, room inventory, and booking requests through one organized operational flow.'
    },
    techBadges: ['Multi-Agency', 'Hotel Inventory', 'Room Control', 'Bookings', 'Role Access', 'Arabic + English'],
    templateLinks: [
      { label: 'Features', href: '#features' },
      { label: 'Hotel Showcase', href: '#hotel-showcase' },
      { label: 'Why Book', href: '#why-book' },
      { label: 'Offers', href: '#offers' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Guest Experience', href: '#guest-experience' },
      { label: 'FAQ', href: '#faq' }
    ],
    resourceLinks: [
      {
        label: 'Login Dashboard',
        href: '/login',
        external: false
      },
      {
        label: 'Subscription Plans',
        href: '/subscription-plans',
        external: false
      },
      { label: 'Agencies', href: '/agencies', external: false },
      { label: 'Admin Dashboard', href: '/admin-dashboard', external: false },
      { label: 'Support Tickets', href: '/support-tickets', external: false },
      { label: 'Profile', href: '/profile', external: false }
    ],
    getStarted: {
      heading: 'Start managing hotels and bookings from one clean dashboard.',
      command: 'Access Dashboard',
      note: 'Sign in to monitor agencies, hotels, room availability, and booking activity in real time.'
    },
    copyright: 'Hotel Agency Platform',
    builtWith: 'Built for hospitality operations'
  }
}
