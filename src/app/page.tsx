import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

export { default } from "./sk/kariera/elektrikar-nemecko/page";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { absolute: "Elektrikár v Nemecku | Práca za 24-27 € na hodinu" },
  description:
    "Hľadáme skúseného elektrikára alebo dvojicu na projekty v Nemecku. Práca na živnosť, 24-27 € za hodinu a možnosť dlhodobej spolupráce.",
  alternates: {
    canonical: "/",
    languages: { sk: "/" },
  },
  openGraph: {
    locale: "sk_SK",
    type: "website",
    siteName: "M&J Elektro",
    title: "Elektrikár v Nemecku | 24-27 € / hod.",
    description:
      "Stabilné projekty v Nemecku pre skúseného elektrikára alebo dvojicu. Nástup ihneď alebo podľa dohody.",
    url: "/",
  },
};
