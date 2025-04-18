"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();
  return (
    <Link href="/blog" onClick={() => router.back()} className="flex items-center gap-2">
      <Icon icon={"material-symbols-light:arrow-back"} />
      Go back
    </Link>
  );
}
