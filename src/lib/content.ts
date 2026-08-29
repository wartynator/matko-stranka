/**
 * Shared content for all three design directions.
 * Copy is identical across directions so the comparison is about design, not words.
 *
 * NOTE: project figures, accreditations and testimonials below are sample data
 * written to be plausible for a commercial electrical contractor. Replace with
 * real project records, real certificate numbers and signed-off quotes before launch.
 */

export const company = {
  name: "Kestrel Power Systems",
  short: "Kestrel",
  descriptor: "Commercial and industrial electrical contractors",
  phone: "+44 161 496 0117",
  phoneHref: "tel:+441614960117",
  email: "projects@kestrelpower.co.uk",
  address: ["Unit 7, Ashworth Trading Estate", "Trafford Park, Manchester M17 1RH"],
};

export const hero = {
  headline: "Premium electrical solutions for businesses that cannot afford downtime",
  sub: "Reliable, safe, and expertly delivered electrical services for commercial, industrial, and enterprise environments.",
  primaryCta: { label: "Request Consultation", href: "#contact" },
  secondaryCta: { label: "Get a Quote", href: "#contact" },
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Why Kestrel", href: "#why" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export type Credential = {
  title: string;
  body: string;
  icon: "shield" | "buildings" | "clock" | "hardhat" | "certificate" | "timer";
};

export const credentials: Credential[] = [
  {
    title: "Licensed and insured",
    body: "Approved contractor status with £10m public liability, verified annually.",
    icon: "shield",
  },
  {
    title: "Commercial specialists",
    body: "No residential work. Every engineer is trained on commercial and industrial systems.",
    icon: "buildings",
  },
  {
    title: "24/7 response",
    body: "A duty engineer answers the phone at any hour. Four-hour attendance on contract sites.",
    icon: "clock",
  },
  {
    title: "Safety certified",
    body: "ISO 45001 safety management applied on every site we operate, without exception.",
    icon: "hardhat",
  },
  {
    title: "Fully compliant",
    body: "BS 7671 wiring regulations, documented, tested and certified at handover.",
    icon: "certificate",
  },
  {
    title: "27 years in service",
    body: "Trading continuously since 1998 under the same engineering leadership.",
    icon: "timer",
  },
];

export type Service = {
  title: string;
  body: string;
  points: string[];
  seed: string;
  icon: "plug" | "factory" | "wrench" | "siren" | "clipboard" | "leaf";
};

export const services: Service[] = [
  {
    title: "Commercial electrical services",
    body: "Distribution, lighting and small power for offices, retail units and multi-site estates.",
    points: ["Fit-out and refurbishment", "Distribution board upgrades", "Lighting design and control"],
    seed: "kestrel-commercial-office-riser",
    icon: "plug",
  },
  {
    title: "Industrial installations",
    body: "Three-phase power, motor control and machine connection inside live production plants.",
    points: ["LV switchgear", "Motor control centres", "Machine power and containment"],
    seed: "kestrel-industrial-switchgear-hall",
    icon: "factory",
  },
  {
    title: "Maintenance contracts",
    body: "Planned preventative maintenance backed by a live asset register and fixed response times.",
    points: ["Asset registers", "Scheduled inspection", "Fixed response windows"],
    seed: "kestrel-maintenance-panel-inspection",
    icon: "wrench",
  },
  {
    title: "Emergency response",
    body: "Fault finding, temporary supply and escalation straight to a senior engineer, day or night.",
    points: ["Duty engineer on call", "Temporary generation", "Root cause reporting"],
    seed: "kestrel-emergency-night-response",
    icon: "siren",
  },
  {
    title: "Compliance testing",
    body: "Fixed wire testing, thermographic surveys and EICR reporting with a remedial programme.",
    points: ["EICR and fixed wire", "Thermographic survey", "Remedial scheduling"],
    seed: "kestrel-compliance-thermal-survey",
    icon: "clipboard",
  },
  {
    title: "Energy optimisation",
    body: "Load analysis, LED retrofit and power factor correction, reported against measured payback.",
    points: ["Load profiling", "LED retrofit", "Power factor correction"],
    seed: "kestrel-energy-metering-room",
    icon: "leaf",
  },
];

export type Reason = { title: string; body: string };

export const reasons: Reason[] = [
  {
    title: "Reliability",
    body: "We work to your operating calendar. Shutdowns happen in the window you give us, and we hand the site back when we said we would.",
  },
  {
    title: "Safety",
    body: "Risk assessments and method statements are issued before a tool leaves the van. Every engineer carries current accreditation.",
  },
  {
    title: "Expertise",
    body: "Design, installation and certification are handled in house. There is no subcontract chain for you to manage or chase.",
  },
  {
    title: "Fast response",
    body: "One number, answered by an engineer rather than a call centre. Contract sites hold a four-hour attendance target.",
  },
  {
    title: "Long-term partnership",
    body: "Most of our clients have been with us for more than a decade. We are measured on the relationship, not the invoice.",
  },
  {
    title: "Transparent communication",
    body: "Fixed pricing, documented variations and a single named contact who knows your estate and answers directly.",
  },
];

export type CaseStudy = {
  sector: string;
  client: string;
  title: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  seed: string;
};

export const caseStudies: CaseStudy[] = [
  {
    sector: "Cold chain logistics",
    client: "Vantorra Foods",
    title: "Main switchboard replaced without losing a degree of temperature",
    challenge:
      "A 1994 main distribution board was showing thermal faults under load, putting 14,000 chilled pallet spaces at risk in a facility that never closes.",
    solution:
      "Phased switchgear replacement across nine night shifts, with temporary generation, live load transfer and a witnessed commissioning record for each phase.",
    outcome:
      "The site ran normal despatch every single day of the programme. No stock was written off and insurers reduced the site loading at renewal.",
    metrics: [
      { value: "0 h", label: "Despatch downtime" },
      { value: "9", label: "Night shifts" },
      { value: "14,000", label: "Pallet spaces protected" },
    ],
    seed: "kestrel-cold-store-distribution",
  },
  {
    sector: "Retail estate",
    client: "Halloway Retail Group",
    title: "Forty-six inherited sites brought onto one compliance programme",
    challenge:
      "An estate assembled through four separate acquisitions had no consistent electrical records, and two insurers had flagged the gap ahead of renewal.",
    solution:
      "Estate-wide fixed wire testing, a single asset register keyed to store code, and a five-year remedial programme priced per site and per year.",
    outcome:
      "Every trading location now holds a current certificate, and the finance team can forecast electrical spend three years out.",
    metrics: [
      { value: "46", label: "Sites certified" },
      { value: "11 mo", label: "Programme duration" },
      { value: "1", label: "Asset register" },
    ],
    seed: "kestrel-retail-estate-interior",
  },
  {
    sector: "Data centre",
    client: "Northbay Data",
    title: "1.2 MW added to a live Tier III floor without touching A or B path",
    challenge:
      "A tenant handover required significant additional IT load, but the concurrent maintainability of the existing dual supply paths could not be compromised.",
    solution:
      "Parallel busway installation, dual-path commissioning and witnessed integrated systems testing carried out under a permit regime agreed with the operator.",
    outcome:
      "Capacity was energised two weeks ahead of the tenant handover date with both supply paths continuously available throughout.",
    metrics: [
      { value: "1.2 MW", label: "Capacity added" },
      { value: "0", label: "Path interruptions" },
      { value: "2 wk", label: "Ahead of handover" },
    ],
    seed: "kestrel-data-centre-white-space",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  org: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They replaced our main board over nine nights and we never lost a degree of temperature. That is the entire review.",
    name: "Marta Weisz",
    role: "Head of Facilities",
    org: "Vantorra Foods",
  },
  {
    quote:
      "We inherited forty-six sites with no compliance history. Kestrel gave us one register and a plan we could actually budget against.",
    name: "Dean Achterberg",
    role: "Operations Director",
    org: "Halloway Retail Group",
  },
  {
    quote:
      "When something fails at two in the morning, an engineer answers the phone. That is rarer than it should be.",
    name: "Priya Raghunathan",
    role: "Property Director",
    org: "Ravensworth Estates",
  },
];

export const clients = [
  "Vantorra Foods",
  "Halloway Retail Group",
  "Northbay Data",
  "Ravensworth Estates",
  "Trenholm Logistics",
  "Kelsterbach Park",
] as const;

export const emergency = {
  title: "Something is down. We are already moving.",
  body: "One number, answered by a duty engineer, every hour of every day. Contract sites hold a four-hour attendance target nationwide.",
  cta: "Call the duty engineer",
};

export const serviceTypes = [
  "Commercial electrical services",
  "Industrial installations",
  "Maintenance contract",
  "Emergency response",
  "Compliance testing",
  "Energy optimisation",
  "Something else",
];

export const directions = [
  {
    slug: "meridian",
    href: "/",
    name: "Meridian",
    tagline: "Graphite and gold consultancy",
    body: "Charcoal graphite with premium gold as the only accent, generous whitespace, cinematic full-bleed photography and soft 14px cards. Reads as senior advisory.",
    swatches: ["#0c1017", "#111827", "#d4af37", "#182131"],
    type: "Outfit and JetBrains Mono",
    dials: "Variance 7, Motion 7, Density 3",
    current: true,
  },
  {
    slug: "substation",
    href: "/substation",
    name: "Substation",
    tagline: "Navy-locked control room",
    body: "Deep navy throughout, electric blue as the single accent, duotone infrastructure photography and a hard 4px shape system. Reads as critical systems and night work.",
    swatches: ["#0b1220", "#0f172a", "#2563eb", "#60a5fa"],
    type: "Geist and Geist Mono",
    dials: "Variance 6, Motion 6, Density 4",
    current: false,
  },
  {
    slug: "blueprint",
    href: "/blueprint",
    name: "Blueprint",
    tagline: "Light Swiss engineering document",
    body: "Soft grey and white, navy ink, square corners and a visible technical grid that organises real content. Reads as a specification you can trust and audit.",
    swatches: ["#f8fafc", "#0f172a", "#2563eb", "#cbd5e1"],
    type: "Archivo and IBM Plex Mono",
    dials: "Variance 5, Motion 4, Density 5",
    current: false,
  },
] as const;
