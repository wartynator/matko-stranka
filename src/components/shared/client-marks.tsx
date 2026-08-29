import { clients } from "@/lib/content";

/**
 * Client marks. These are fictional companies, so each carries a simple geometric
 * monogram drawn in the page's own line weight rather than a text-only wordmark.
 * Swap for real supplied SVG logos when the client list is confirmed.
 */
const MARKS: Record<(typeof clients)[number], React.ReactNode> = {
  "Vantorra Foods": (
    <>
      <path d="M3 5.5 8.5 18 14 5.5" />
      <path d="M12 5.5 17.5 18 23 5.5" opacity=".55" />
    </>
  ),
  "Halloway Retail Group": (
    <>
      <path d="M3.5 3.5h17v17h-17z" />
      <path d="M12 12h8.5v8.5" opacity=".55" />
    </>
  ),
  "Northbay Data": (
    <>
      <path d="M3 6.5h13" />
      <path d="M6 12h15" opacity=".55" />
      <path d="M3 17.5h13" />
    </>
  ),
  "Ravensworth Estates": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" opacity=".55" />
    </>
  ),
  "Trenholm Logistics": (
    <>
      <path d="M12 3.5 21 20H3z" />
      <path d="M12 11.5 16 20H8z" opacity=".55" />
    </>
  ),
  "Kelsterbach Park": (
    <>
      <path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4z" />
      <path d="M12 8.4 16 10.7v4.6L12 17.6 8 15.3v-4.6z" opacity=".55" />
    </>
  ),
};

export function ClientMark({
  name,
  size = 22,
}: Readonly<{
  name: (typeof clients)[number];
  size?: number;
}>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      {MARKS[name]}
    </svg>
  );
}

export function ClientLogo({
  name,
  size = 22,
  className = "",
}: Readonly<{
  name: (typeof clients)[number];
  size?: number;
  className?: string;
}>) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} title={name}>
      <ClientMark name={name} size={size} />
      <span className="text-[0.95rem] font-medium tracking-[-0.01em] whitespace-nowrap">
        {name}
      </span>
    </span>
  );
}
