import { company, nav, services } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">
              {company.name}
            </p>
            <p className="mt-3 max-w-[34ch] text-[0.92rem] leading-relaxed text-ink-2">
              {company.descriptor}. Approved contractor, ISO 45001 safety management,
              BS 7671 certification on every handover.
            </p>
            <address className="mt-6 text-[0.88rem] leading-relaxed text-ink-3 not-italic">
              {company.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-[0.82rem] font-semibold text-ink">Services</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {services.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-[0.9rem] text-ink-2 transition-colors hover:text-ink"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-[0.82rem] font-semibold text-ink">Company</h2>
            <ul className="mt-4 grid gap-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[0.9rem] text-ink-2 transition-colors hover:text-ink"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-[0.82rem] font-semibold text-ink">Contact</h2>
            <ul className="mt-4 grid gap-2.5">
              <li>
                <a
                  href={company.phoneHref}
                  className="text-[0.9rem] text-ink-2 transition-colors hover:text-ink"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="text-[0.9rem] break-words text-ink-2 transition-colors hover:text-ink"
                >
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.82rem] text-ink-3">
            &copy; {new Date().getFullYear()} {company.name}. Registered in England
            and Wales.
          </p>
          <p className="text-[0.82rem] text-ink-3">
            Approved contractor. ISO 45001. ISO 9001. BS 7671.
          </p>
        </div>
      </div>
    </footer>
  );
}
