"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import useSwitchTheme from "@/lib/hooks/theme";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Home",
    path: "/",
  },
  // {
  //   label: "Projects",
  //   path: "/projects",
  // },
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
  const { mode, toggleTheme } = useSwitchTheme();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (pathname !== "/" && href === "/") {
      return false;
    }
    return pathname.startsWith(href);
  };
  return (
    <nav className=" w-full z-50 flex justify-between bg-(background:--background) py-4 sticky top-0">
      <section className="flex gap-8 items-center ">
        <Link href="/" className=" font-bold text-orange-600">
          タウンン
        </Link>
        <div className="">
          <ul className=" flex gap-4">
            {routes.map((route) => (
              <li
                key={route.label}
                className={` ${isActive(route.path) ? "underline text-stone-900 opacity-100" : "hover:opacity-100"} opacity-60 transition-all duration-300`}
              >
                <Link href={route.path}>{route.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <button onClick={toggleTheme} className=" aspect-square p-1 w-fit grid place-items-center border rounded-full cursor-pointer ">
        {mode === "light" ? <Icon icon="solar:moon-stars-line-duotone" /> : <Icon icon={"solar:sun-line-duotone"} />}
      </button>
    </nav>
  );
}

export default Navbar;
