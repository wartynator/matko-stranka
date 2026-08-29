import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Elektrikár v Nemecku | M&J Elektro",
    template: "%s | M&J Elektro",
  },
  description:
    "Pracovná ponuka pre skúseného elektrikára alebo dvojicu na stabilné projekty v Nemecku.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = (await headers()).get("x-site-locale") ?? "sk";

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
