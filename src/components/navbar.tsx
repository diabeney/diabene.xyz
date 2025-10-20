"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import DigitalClock from "@/components/clock";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const routes = [
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "Playground",
    path: "/playground",
  },
];

function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (pathname !== "/" && href === "/") {
      return false;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="w-full px-4 z-50 flex justify-between py-4 backdrop-blur-md sticky top-0"
      aria-label="Main Navigation"
    >
      <section className="flex gap-8 items-center">
        <Link
          href="/"
          className="font-bold text-amber-500 hover:text-amber-600 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Home"
        >
          タウンン
        </Link>
        <div className="">
          <ul className="flex gap-4" role="menubar">
            {routes.map((route) => (
              <li
                key={route.label}
                className={`${
                  isActive(route.path)
                    ? "underline text-stone-900 dark:text-stone-100 opacity-100"
                    : "hover:opacity-100"
                } opacity-60 dark:text-stone-200 transition-all duration-300`}
                role="none"
              >
                <Link
                  href={route.path}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 p-1 rounded"
                  role="menuitem"
                  aria-current={isActive(route.path) ? "page" : undefined}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="gap-2 items-center ">
        <DigitalClock />
      </section>
    </nav>
  );
}

export default Navbar;
