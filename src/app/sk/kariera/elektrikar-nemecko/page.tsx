import type { Metadata } from "next";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  CurrencyEurIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
  WrenchIcon,
} from "@phosphor-icons/react/ssr";
import { SkSiteFooter } from "@/components/sk/sk-site-footer";
import { JobSiteNav } from "@/components/sk/job-site-nav";
import { electricianJob, skCompany } from "@/lib/sk-content";

const SHELL = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12";

export const metadata: Metadata = {
  title: { absolute: "Elektrikár v Nemecku | Práca za 24-27 € na hodinu" },
  description:
    "Hľadáme skúseného elektrikára alebo dvojicu na projekty v Nemecku. Práca na živnosť, 24-27 € za hodinu a možnosť dlhodobej spolupráce.",
  alternates: {
    canonical: "/sk/kariera/elektrikar-nemecko",
    languages: { sk: "/sk/kariera/elektrikar-nemecko" },
  },
  openGraph: {
    locale: "sk_SK",
    type: "website",
    title: "Elektrikár v Nemecku | 24-27 € / hod.",
    description:
      "Stabilné projekty v Nemecku pre skúseného elektrikára alebo dvojicu. Nástup ihneď alebo podľa dohody.",
    url: "/sk/kariera/elektrikar-nemecko",
  },
};

const jobPosting = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: electricianJob.title,
  description: [
    electricianJob.intro,
    `Náplň práce: ${electricianJob.duties.join("; ")}.`,
    `Požiadavky: ${electricianJob.requirements.join("; ")}.`,
    `Ponúkame: ${electricianJob.offer.join("; ")}.`,
  ].join(" "),
  hiringOrganization: {
    "@type": "Organization",
    name: skCompany.name,
  },
  applicantLocationRequirements: {
    "@type": "Country",
    name: "Slovensko",
  },
  jobLocation: ["Nuremberg", "Leipzig", "Potsdam", "Munich", "Saarland"].map(
    (name) => ({
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: name, addressCountry: "DE" },
    }),
  ),
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: "EUR",
    value: {
      "@type": "QuantitativeValue",
      minValue: 24,
      maxValue: 27,
      unitText: "HOUR",
    },
  },
};

function CheckList({ items }: Readonly<{ items: string[] }>) {
  return (
    <ul className="grid gap-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-[0.98rem] leading-7 text-[#bdc8d8]">
          <CheckIcon size={18} className="mt-1 shrink-0 text-[#4c91f7]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ElectricianGermanyJobPage() {
  return (
    <div className="theme-mj min-h-dvh overflow-x-clip bg-[#07101f] font-display text-white">
      <JobSiteNav />
      <main>
        <article>
          <section className="relative border-b border-white/10 pt-20">
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(100,140,196,.12)_1px,transparent_1px)] [background-size:96px_100%]" />
            <div className={`${SHELL} relative grid min-h-[calc(100dvh-5rem)] gap-12 py-14 md:min-h-0 md:grid-cols-12 md:items-end md:py-24 lg:py-28`}>
              <div className="md:col-span-8">
                <p className="font-mono text-sm text-[#73a7f8]">M&J ELEKTRO / NEMECKO</p>
                <h1 className="mt-8 max-w-[18ch] text-[clamp(2.35rem,6vw,5.4rem)] leading-[0.99] font-semibold tracking-[-0.04em] text-balance">
                  {electricianJob.title}
                </h1>
                <p className="mt-8 max-w-[66ch] text-base leading-7 text-[#b9c5d6] sm:text-lg sm:leading-8">
                  {electricianJob.intro}
                </p>
                <a href="#ziadost" className="group mt-10 inline-flex min-h-12 items-center gap-3 bg-[#2878f0] px-6 font-semibold whitespace-nowrap transition-[background-color,transform] hover:bg-[#3d89fa] active:translate-y-px">
                  Mám záujem <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              <div className="border-t border-white/15 pt-6 md:col-span-4 md:border-t-0 md:border-l md:pt-0 md:pl-8">
                <p className="text-sm leading-7 text-[#8fa0b7]">Stabilné projekty, jasné podmienky a priamy kontakt s M&J Elektro.</p>
                <p className="mt-8 font-mono text-sm text-[#73a7f8]">DE / ELEKTRO / 24-27</p>
              </div>
            </div>
          </section>

          <section aria-label="Základné informácie" className="border-b border-white/10 bg-[#0a1629]">
            <dl className={`${SHELL} grid sm:grid-cols-3`}>
              {[
                { label: "Miesto", value: electricianJob.location, icon: MapPinIcon },
                { label: "Sadzba", value: electricianJob.rate, icon: CurrencyEurIcon },
                { label: "Nástup", value: electricianJob.start, icon: ClockIcon },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex min-h-36 items-center gap-5 border-b border-white/10 py-7 last:border-b-0 sm:border-r sm:border-b-0 sm:px-7 sm:first:pl-0 sm:last:border-r-0">
                  <Icon size={25} className="shrink-0 text-[#4c91f7]" aria-hidden />
                  <div><dt className="text-xs text-[#7f90a8]">{label}</dt><dd className="mt-2 font-semibold text-white">{value}</dd></div>
                </div>
              ))}
            </dl>
          </section>

          <section id="napln-prace" className={`${SHELL} grid scroll-mt-20 gap-16 py-24 md:grid-cols-12 lg:py-32`}>
            <div className="md:col-span-4">
              <WrenchIcon size={31} className="text-[#4c91f7]" aria-hidden />
              <h2 className="mt-7 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.035em]">Náplň práce</h2>
            </div>
            <div className="md:col-span-7 md:col-start-6"><CheckList items={electricianJob.duties} /></div>
          </section>

          <section id="poziadavky" className="scroll-mt-20 border-y border-white/10 bg-[#091426]">
            <div className={`${SHELL} grid gap-14 py-24 md:grid-cols-12 lg:py-28`}>
              <div className="md:col-span-5">
                <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.035em]">Požiadavky</h2>
                <p className="mt-5 max-w-[42ch] text-sm leading-7 text-[#8495ad]">Hľadáme skúsenosť, spoľahlivosť a ochotu pracovať na rôznych typoch projektov.</p>
              </div>
              <div className="md:col-span-6 md:col-start-7"><CheckList items={electricianJob.requirements} /></div>
            </div>
          </section>

          <section id="ponukame" className={`${SHELL} scroll-mt-20 py-24 lg:py-32`}>
            <div className="grid overflow-hidden border border-[#2878f0]/50 md:grid-cols-12">
              <div className="bg-[#2878f0] p-8 md:col-span-4 lg:p-12">
                <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.035em]">Čo ponúkame</h2>
                <p className="mt-8 font-mono text-sm text-white/75">{electricianJob.rate}</p>
              </div>
              <div className="p-8 md:col-span-8 lg:p-12"><CheckList items={electricianJob.offer} /></div>
            </div>
          </section>

          <section className="border-y border-white/10 bg-[#0a1629]">
            <div className={`${SHELL} grid gap-12 py-24 md:grid-cols-12 lg:py-28`}>
              <div className="md:col-span-4">
                <MapPinIcon size={31} className="text-[#4c91f7]" aria-hidden />
                <h2 className="mt-7 text-3xl font-semibold tracking-[-0.03em]">Lokality a praktické informácie</h2>
              </div>
              <div className="md:col-span-7 md:col-start-6"><CheckList items={electricianJob.practical} /></div>
            </div>
          </section>

          <section id="ziadost" className="scroll-mt-20 bg-[#2878f0] text-white">
            <div className={`${SHELL} grid gap-12 py-20 md:grid-cols-12 md:items-end lg:py-28`}>
              <div className="md:col-span-7">
                <h2 className="max-w-[15ch] text-[clamp(2.15rem,5vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.04em]">Máte záujem? Ozvite sa priamo.</h2>
                <p className="mt-7 max-w-[60ch] text-base leading-7 text-white/80">{electricianJob.closing}</p>
                <p className="mt-5 font-semibold">Tešíme sa na spoluprácu.</p>
              </div>
              <div className="grid gap-3 md:col-span-5 md:justify-self-end">
                {skCompany.phones.map((phone) => (
                  <a key={phone.href} href={phone.href} aria-label={`Zavolať na ${phone.label} pre ponuku elektrikára v Nemecku`} className="inline-flex min-h-12 items-center gap-3 bg-white px-5 font-semibold text-[#0a1830] transition-transform active:translate-y-px">
                    <PhoneIcon size={19} aria-hidden /> {phone.label}
                  </a>
                ))}
                <a href={`mailto:${skCompany.emails[0]}?subject=${encodeURIComponent("Elektrikár v Nemecku - mám záujem")}`} className="inline-flex min-h-12 items-center gap-3 border border-white/50 px-5 font-semibold transition-colors hover:bg-white/10">
                  <EnvelopeSimpleIcon size={19} aria-hidden /> Poslať e-mail
                </a>
              </div>
            </div>
          </section>
        </article>
      </main>
      <SkSiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting).replaceAll("<", String.raw`\u003c`) }} />
    </div>
  );
}