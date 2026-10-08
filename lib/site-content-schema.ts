/**
 * Everything the client can edit from Admin → Website content: brand, logo,
 * contact details, navigation and page copy. Kept free of server imports so
 * the admin editor (a Client Component) can render forms from it.
 *
 * Wrap a word in *asterisks* in a heading to show it in the accent italic.
 */

export const defaultSiteContent = {
  brand: {
    name: "Lynn Luxe Event Studio",
    shortName: "Lynn Luxe",
    subtitle: "Event Studio",
    tagline: "Celebrations, beautifully composed.",
    description:
      "Lynn Luxe Event Studio is a full-service event planning and styling studio in Arunachal Pradesh, creating weddings, birthdays, corporate events and private celebrations with care and polish.",
    logo: "",
    logoLight: "",
  },
  contact: {
    phone: "+917085262635",
    phoneDisplay: "+91 70852 62635",
    instagramUrl: "https://www.instagram.com/lynnluxeeventstudio/",
    instagramHandle: "@lynnluxeeventstudio",
    locality: "Jollang",
    region: "Arunachal Pradesh",
  },
  nav: {
    items: [
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    ctaLabel: "Plan your event",
  },
  home: {
    heroEyebrow: "Luxury event planning & styling in Arunachal Pradesh",
    heroTitle: "Celebrations, *beautifully* composed.",
    heroIntro:
      "Weddings, milestone birthdays and corporate occasions, designed with intention and run without a hitch. We look after every detail, so on the day all you have to do is enjoy it.",
    heroPrimaryCta: "Plan your event",
    heroSecondaryCta: "Explore our work",
    highlights: [
      { title: "One team", text: "From first idea to final guest" },
      { title: "Design-led", text: "Décor, styling & tablescapes" },
      { title: "Statewide", text: "Celebrations across Arunachal Pradesh" },
    ],
    occasions: [
      "Weddings",
      "Engagements",
      "Milestone birthdays",
      "Anniversaries",
      "Baby showers",
      "Product launches",
      "Corporate dinners",
      "Private soirées",
    ],
    introEyebrow: "The studio",
    introStatement:
      "We believe the best celebrations feel *effortless* to the people in them. Behind that ease is careful planning, a clear creative vision and a team that sweats the details, so you never have to.",
    introText1:
      "Lynn Luxe is a full-service event studio in Arunachal Pradesh. We plan, design and host occasions of every size, from intimate dinners to full-scale weddings.",
    introText2:
      "You get one point of contact and one cohesive look. Our team handles the vendors, timings and surprises so the experience feels considered from the first invitation to the last goodbye.",
    servicesEyebrow: "Services",
    servicesTitle: "Everything your occasion needs, under one roof.",
    servicesIntro:
      "Planning, design and hospitality from one dedicated team. One vision, one point of contact, nothing lost between vendors.",
    servicesPromptTitle: "Not sure where to begin?",
    servicesPromptText: "Tell us the occasion and we'll recommend the right level of support.",
    workEyebrow: "Portfolio",
    workTitle: "Recent celebrations.",
  },
  process: {
    eyebrow: "How we work",
    title: "A calm, clear process from first call to final toast.",
    intro:
      "Four simple stages and one dedicated planner. You always know what's happening next, and you never carry the logistics alone.",
    steps: [
      {
        title: "Consult",
        text: "A relaxed conversation about the occasion, your guests, your budget and the feeling you want the day to have.",
      },
      {
        title: "Design",
        text: "We shape a concept with mood, palette, décor and flow, and share a clear proposal for you to refine.",
      },
      {
        title: "Plan",
        text: "Venues, vendors, menus and timelines are booked and managed by us, with regular updates along the way.",
      },
      {
        title: "Host",
        text: "On the day our team sets up, runs the schedule and handles the unexpected. You simply arrive and enjoy.",
      },
    ],
  },
  faq: {
    eyebrow: "Good to know",
    title: "Questions, answered.",
    items: [
      {
        question: "How far in advance should we book?",
        answer:
          "As early as you can. For weddings and large events, a few months' notice gives us the most room to secure venues and vendors. Smaller celebrations can often come together in a few weeks, so it's always worth asking.",
      },
      {
        question: "Do you only offer full planning?",
        answer:
          "No. You can hand us the entire occasion or just the parts you need, such as décor and styling, catering or day-of coordination. We'll recommend the right level of support after our first conversation.",
      },
      {
        question: "Which areas do you cover?",
        answer:
          "We're based in Jollang and plan events across Arunachal Pradesh. If your celebration is further afield, get in touch and we'll talk through the logistics.",
      },
      {
        question: "Can you work within our budget?",
        answer:
          "Yes. Tell us your budget at the start and we'll design around it, putting the money where it makes the biggest difference to how the event looks and feels.",
      },
      {
        question: "What happens after I send an inquiry?",
        answer:
          "We'll reply on WhatsApp, usually within a day, to set up a short call. After that we'll send you a tailored concept and proposal. You're under no obligation until you're happy with the plan.",
      },
    ],
  },
  cta: {
    eyebrow: "Start planning",
    title: "Let's create something your guests will talk about for years.",
    text: "Share a few details and we'll reply on WhatsApp, usually within a day.",
    buttonLabel: "Plan your event",
  },
  about: {
    eyebrow: "About the studio",
    title: "We create moments that feel as good as they look.",
    intro:
      "Lynn Luxe is a design-led event studio based in Jollang, planning and styling celebrations of every scale across Arunachal Pradesh.",
    image: "",
    philosophyEyebrow: "Our philosophy",
    philosophyStatement:
      "Great events are part design, part logistics and part hospitality. We bring all three together in one studio.",
    philosophyText:
      "We believe hosts deserve to enjoy their own celebrations. So we take on the planning, coordination and the hundred small decisions behind every event, and give you back the joy of being a guest at your own occasion.",
    valuesEyebrow: "What we stand for",
    values: [
      {
        title: "Personal, never templated",
        text: "No two events we create look the same. We design around your people, your place and the feeling you want guests to leave with.",
      },
      {
        title: "Detail as a discipline",
        text: "Lighting, textures, tablescapes and timing. Guests remember the small decisions, so we give each one our full attention.",
      },
      {
        title: "One team, fully accountable",
        text: "Planning, styling and hospitality are run by one studio. You have a single point of contact from the first call to the final farewell.",
      },
    ],
  },
  servicesPage: {
    eyebrow: "Services",
    title: "Services shaped around your occasion.",
    intro:
      "Book a single service or let us handle the entire event. Either way, it starts with a conversation about what matters most to you.",
  },
  portfolioPage: {
    eyebrow: "Portfolio",
    title: "Our work, in moments.",
    intro:
      "A look at recent weddings, private celebrations and corporate occasions, each one designed from scratch around the people it was for.",
  },
  contactPage: {
    eyebrow: "Contact",
    title: "Let's start planning.",
    intro:
      "Whether you have a date, a venue and a vision or just the beginnings of an idea, we'd love to hear from you.",
  },
  inquirePage: {
    eyebrow: "Start a conversation",
    title: "Tell us about your celebration.",
    intro:
      "The more you share, the better we can prepare. Only your name, phone number and occasion are required; the rest can wait for our call.",
    steps: [
      "Share a few details about your occasion. It takes about two minutes.",
      "We reply on WhatsApp, usually within a day, to arrange a short call.",
      "We send a tailored concept and proposal for you to refine.",
    ],
  },
  footer: {
    text: "A full-service event planning and styling studio creating weddings, birthdays and corporate occasions across Arunachal Pradesh.",
  },
};

export type SiteContent = typeof defaultSiteContent;
export type SectionId = keyof SiteContent;

/** Pages the navigation menu can link to. */
export const navTargets = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/inquire", label: "Plan your event (inquiry form)" },
] as const;

type Sub = { key: string; label: string; multiline?: boolean };

export type Field =
  | { key: string; label: string; type: "text" | "textarea"; help?: string; max?: number }
  | { key: string; label: string; type: "image"; help?: string }
  | { key: string; label: string; type: "list"; help?: string; max?: number }
  | { key: string; label: string; type: "items"; fields: Sub[]; help?: string; max?: number }
  | { key: string; label: string; type: "nav"; help?: string };

export type Section = { id: SectionId; title: string; description: string; group: string; fields: Field[] };

const heading = "Wrap a word in *asterisks* to show it in the accent italic.";

export const sections: Section[] = [
  {
    id: "brand",
    group: "Brand",
    title: "Brand & logo",
    description: "Your studio name, tagline and logo, used in the header, footer and search results.",
    fields: [
      { key: "name", label: "Full business name", type: "text", max: 80 },
      { key: "shortName", label: "Short name", type: "text", max: 40, help: "Shown in the logo when no logo image is uploaded." },
      { key: "subtitle", label: "Logo subtitle", type: "text", max: 40 },
      { key: "tagline", label: "Tagline", type: "text", max: 120 },
      {
        key: "description",
        label: "Search engine description",
        type: "textarea",
        max: 300,
        help: "Shown under your name in Google results. Aim for 120–160 characters.",
      },
      {
        key: "logo",
        label: "Logo image",
        type: "image",
        help: "Optional. A wide PNG with a transparent background works best. Leave empty to use the text logo.",
      },
      {
        key: "logoLight",
        label: "Logo for dark backgrounds",
        type: "image",
        help: "Optional light version used in the footer. Falls back to the main logo.",
      },
    ],
  },
  {
    id: "contact",
    group: "Brand",
    title: "Contact details",
    description: "Used for the call and WhatsApp buttons, the footer and the contact page.",
    fields: [
      {
        key: "phone",
        label: "Phone & WhatsApp number",
        type: "text",
        max: 20,
        help: "International format with no spaces, e.g. +917085262635.",
      },
      { key: "phoneDisplay", label: "Phone number as displayed", type: "text", max: 30 },
      { key: "instagramUrl", label: "Instagram link", type: "text", max: 200 },
      { key: "instagramHandle", label: "Instagram handle", type: "text", max: 60 },
      { key: "locality", label: "Town / city", type: "text", max: 60 },
      { key: "region", label: "State", type: "text", max: 60 },
    ],
  },
  {
    id: "nav",
    group: "Brand",
    title: "Navigation menu",
    description: "The links in the top menu and the button on the right.",
    fields: [
      { key: "items", label: "Menu links", type: "nav" },
      { key: "ctaLabel", label: "Header button text", type: "text", max: 30 },
    ],
  },
  {
    id: "home",
    group: "Pages",
    title: "Home page",
    description: "The hero, studio introduction and section headings on the home page.",
    fields: [
      { key: "heroEyebrow", label: "Hero small heading", type: "text", max: 100 },
      { key: "heroTitle", label: "Hero headline", type: "text", max: 100, help: heading },
      { key: "heroIntro", label: "Hero paragraph", type: "textarea", max: 400 },
      { key: "heroPrimaryCta", label: "Main button text", type: "text", max: 30 },
      { key: "heroSecondaryCta", label: "Second button text", type: "text", max: 30 },
      {
        key: "highlights",
        label: "Hero highlights",
        type: "items",
        max: 3,
        fields: [
          { key: "title", label: "Title" },
          { key: "text", label: "Detail" },
        ],
      },
      { key: "occasions", label: "Scrolling occasions band", type: "list", max: 16 },
      { key: "introEyebrow", label: "Introduction small heading", type: "text", max: 60 },
      { key: "introStatement", label: "Introduction statement", type: "textarea", max: 400, help: heading },
      { key: "introText1", label: "Introduction paragraph 1", type: "textarea", max: 500 },
      { key: "introText2", label: "Introduction paragraph 2", type: "textarea", max: 500 },
      { key: "servicesEyebrow", label: "Services small heading", type: "text", max: 60 },
      { key: "servicesTitle", label: "Services heading", type: "text", max: 120, help: heading },
      { key: "servicesIntro", label: "Services intro", type: "textarea", max: 300 },
      { key: "servicesPromptTitle", label: "Dark card heading", type: "text", max: 80 },
      { key: "servicesPromptText", label: "Dark card text", type: "textarea", max: 200 },
      { key: "workEyebrow", label: "Portfolio small heading", type: "text", max: 60 },
      { key: "workTitle", label: "Portfolio heading", type: "text", max: 120, help: heading },
    ],
  },
  {
    id: "process",
    group: "Pages",
    title: "How we work",
    description: "The four-step process on the home and about pages.",
    fields: [
      { key: "eyebrow", label: "Small heading", type: "text", max: 60 },
      { key: "title", label: "Heading", type: "text", max: 120, help: heading },
      { key: "intro", label: "Intro", type: "textarea", max: 300 },
      {
        key: "steps",
        label: "Steps",
        type: "items",
        max: 6,
        fields: [
          { key: "title", label: "Step name" },
          { key: "text", label: "Description", multiline: true },
        ],
      },
    ],
  },
  {
    id: "faq",
    group: "Pages",
    title: "FAQ",
    description: "Questions and answers on the home page. These can also appear in Google results.",
    fields: [
      { key: "eyebrow", label: "Small heading", type: "text", max: 60 },
      { key: "title", label: "Heading", type: "text", max: 120, help: heading },
      {
        key: "items",
        label: "Questions",
        type: "items",
        max: 12,
        fields: [
          { key: "question", label: "Question" },
          { key: "answer", label: "Answer", multiline: true },
        ],
      },
    ],
  },
  {
    id: "cta",
    group: "Pages",
    title: "Call-to-action banner",
    description: "The brown banner near the bottom of most pages.",
    fields: [
      { key: "eyebrow", label: "Small heading", type: "text", max: 60 },
      { key: "title", label: "Heading", type: "text", max: 120, help: heading },
      { key: "text", label: "Text", type: "textarea", max: 300, help: "The phone number is added automatically." },
      { key: "buttonLabel", label: "Button text", type: "text", max: 30 },
    ],
  },
  {
    id: "about",
    group: "Pages",
    title: "About page",
    description: "Your story, philosophy and values.",
    fields: [
      { key: "eyebrow", label: "Small heading", type: "text", max: 60 },
      { key: "title", label: "Heading", type: "text", max: 120, help: heading },
      { key: "intro", label: "Intro", type: "textarea", max: 300 },
      { key: "image", label: "Photo", type: "image", help: "Portrait photo shown next to the philosophy." },
      { key: "philosophyEyebrow", label: "Philosophy small heading", type: "text", max: 60 },
      { key: "philosophyStatement", label: "Philosophy statement", type: "textarea", max: 300, help: heading },
      { key: "philosophyText", label: "Philosophy paragraph", type: "textarea", max: 800 },
      { key: "valuesEyebrow", label: "Values small heading", type: "text", max: 60 },
      {
        key: "values",
        label: "Values",
        type: "items",
        max: 6,
        fields: [
          { key: "title", label: "Title" },
          { key: "text", label: "Description", multiline: true },
        ],
      },
    ],
  },
  ...(
    [
      ["servicesPage", "Services page", "The heading at the top of the services page. Individual services are edited under Services."],
      ["portfolioPage", "Portfolio page", "The heading at the top of the portfolio page. Events are edited under Portfolio."],
      ["contactPage", "Contact page", "The heading at the top of the contact page."],
    ] as const
  ).map(
    ([id, title, description]): Section => ({
      id,
      group: "Pages",
      title,
      description,
      fields: [
        { key: "eyebrow", label: "Small heading", type: "text", max: 60 },
        { key: "title", label: "Heading", type: "text", max: 120, help: heading },
        { key: "intro", label: "Intro", type: "textarea", max: 300 },
      ],
    }),
  ),
  {
    id: "inquirePage",
    group: "Pages",
    title: "Inquiry page",
    description: "The page with the inquiry form.",
    fields: [
      { key: "eyebrow", label: "Small heading", type: "text", max: 60 },
      { key: "title", label: "Heading", type: "text", max: 120, help: heading },
      { key: "intro", label: "Intro", type: "textarea", max: 300 },
      { key: "steps", label: "“What happens next” steps", type: "list", max: 5 },
    ],
  },
  {
    id: "footer",
    group: "Pages",
    title: "Footer",
    description: "The text under the logo at the bottom of every page.",
    fields: [{ key: "text", label: "Footer text", type: "textarea", max: 300 }],
  },
];
