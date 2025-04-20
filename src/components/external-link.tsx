import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex underline items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-1"
      aria-label={`${typeof children === "string" ? children : ""} (opens in new tab)`}
    >
      {children} <Icon className="rotate-45" icon={"stash:arrow-up-light"} aria-hidden="true" />
      <span className="sr-only">(opens in new tab)</span>
    </Link>
  );
}
