"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import DigitalClock from "@/app/playground/_components/clock";
import { useTheme } from "next-themes";
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

  const isActive = (href: string) => {
    if (pathname !== "/" && href === "/") {
      return false;
    }
    return pathname.startsWith(href);
  };
  return (
    <nav className=" w-full z-50 flex justify-between bg-(background:--background) dark:bg-(background:--background-dark) py-4 sticky top-0">
      <section className="flex gap-8 items-center ">
        <Link
          href="/"
          className=" font-bold text-amber-500 hover:text-amber-600 transition-all duration-300"
        >
          タウンン
        </Link>
        <div className="">
          <ul className=" flex gap-4">
            {routes.map((route) => (
              <li
                key={route.label}
                className={` ${
                  isActive(route.path)
                    ? "underline text-stone-900 dark:text-stone-100 opacity-100"
                    : "hover:opacity-100"
                } opacity-60 dark:text-stone-200 transition-all duration-300`}
              >
                <Link href={route.path}>{route.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="flex gap-2 items-center">
        <DigitalClock />
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className=" aspect-square p-1 w-fit grid place-items-center border rounded-full cursor-pointer "
        >
          {theme === "light" ? (
            <Icon icon={`mingcute:sun-fill`} />
          ) : (
            <Icon icon={`mingcute:moon-fill`} />
          )}
        </button>
      </section>
    </nav>
  );
}

export default Navbar;
