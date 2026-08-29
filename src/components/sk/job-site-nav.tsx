import Image from "next/image";
import Link from "next/link";

export function JobSiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07101f]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="M&J Elektro - pracovná ponuka" className="relative size-14 shrink-0 overflow-hidden bg-white">
          <Image src="/mj-elektro-logo-square.jpg" alt="M&J Elektro" fill priority sizes="56px" className="object-contain" />
        </Link>
        <nav aria-label="Navigácia inzerátu" className="hidden items-center gap-7 md:flex">
          <a href="#napln-prace" className="text-sm font-medium text-[#aebbd0] transition-colors hover:text-white">Náplň práce</a>
          <a href="#poziadavky" className="text-sm font-medium text-[#aebbd0] transition-colors hover:text-white">Požiadavky</a>
          <a href="#ponukame" className="text-sm font-medium text-[#aebbd0] transition-colors hover:text-white">Čo ponúkame</a>
        </nav>
        <a href="#ziadost" className="inline-flex min-h-11 items-center bg-[#2878f0] px-4 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#3d89fa] sm:px-5">
          Kontakt
        </a>
      </div>
    </header>
  );
}