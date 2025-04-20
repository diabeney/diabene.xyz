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
      className=" inline-flex underline  items-center "
    >
      {children} <Icon className=" rotate-45" icon={"stash:arrow-up-light"} />
    </Link>
  );
}
