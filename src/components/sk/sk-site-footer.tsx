import Link from "next/link";
import { EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import { skCompany } from "@/lib/sk-content";

export function SkSiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050b15] text-white">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:px-12 lg:py-20">
        <div className="lg:col-span-5">
          <Link href="/" className="text-xl font-semibold tracking-[0.08em]">
            {skCompany.name.toUpperCase()}
          </Link>
          <p className="mt-5 max-w-[42ch] text-sm leading-7 text-[#93a1b8]">
            {skCompany.descriptor}. Priama komunikácia, jasné podmienky a zodpovedný prístup ku každému projektu.
          </p>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold">Pracovná ponuka</h2>
          <p className="mt-5 text-sm leading-7 text-[#93a1b8]">Elektrikár alebo dvojica elektrikárov pre stabilné projekty v Nemecku.</p>
        </div>
        <div className="lg:col-span-4">
          <h2 className="text-sm font-semibold">Kontakt</h2>
          <ul className="mt-5 grid gap-3">
            {skCompany.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className="inline-flex items-center gap-3 text-sm text-[#b8c4d6] hover:text-white">
                  <PhoneIcon size={17} aria-hidden /> {phone.label}
                </a>
              </li>
            ))}
            {skCompany.emails.map((email) => (
              <li key={email}>
                <a href={`mailto:${email}`} className="inline-flex items-center gap-3 text-sm break-all text-[#b8c4d6] hover:text-white">
                  <EnvelopeSimpleIcon size={17} aria-hidden /> {email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-5 py-6 text-xs text-[#74839b] sm:flex-row sm:justify-between sm:px-8 lg:px-12">
          <p>&copy; {new Date().getFullYear()} {skCompany.name}. Všetky práva vyhradené.</p>
          <p>Elektroinštalačné práce a pracovné príležitosti v Nemecku.</p>
        </div>
      </div>
    </footer>
  );
}