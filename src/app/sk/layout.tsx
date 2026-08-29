import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    absolute: "M&J Elektro | Elektroinštalácie a práca v Nemecku",
    template: "%s | M&J Elektro",
  },
  description:
    "M&J Elektro zabezpečuje odborné elektroinštalačné práce a ponúka stabilné pracovné príležitosti pre elektrikárov v Nemecku.",
  alternates: {
    canonical: "/sk",
    languages: { sk: "/sk", en: "/en" },
  },
  openGraph: {
    locale: "sk_SK",
    type: "website",
    siteName: "M&J Elektro",
    title: "M&J Elektro | Elektroinštalácie a práca v Nemecku",
    description:
      "Odborné elektroinštalačné práce a stabilné pracovné príležitosti pre elektrikárov v Nemecku.",
    url: "/sk",
  },
};

export default function SlovakLayout({ children }: LayoutProps<"/sk">) {
  return <div lang="sk">{children}</div>;
}