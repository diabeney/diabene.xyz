import { playgrounds } from "@/lib/constants/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function Playground() {
  return (
    <div>
      <div>
        <h1 className="text-4xl  pb-1 font-bold mt-8">Astroworld!</h1>
        <p>
          Collection of interactive projects. These are my own minimalistic versions of tools I use
          frequently :{")"}
        </p>
      </div>
      <ul className="mt-10 flex flex-col gap-2">
        {playgrounds.map((item) => {
          return (
            <li
              key={item.name}
              className="pb-4 border-b border-dashed border-stone-300 dark:border-stone-700"
            >
              <Link href={item.path} className="group block">
                <span className="flex items-center">
                  <Icon
                    icon={"uiw:d-arrow-right"}
                    className="transition-all duration-300 w-0 overflow-hidden opacity-0 transform -translate-x-4 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-amber-500"
                  />
                  <h2 className="flex-1 font-semibold group-hover:!text-amber-500 transition-all duration-300 group-hover:translate-x-1 group-hover:dark:text-stone-200">
                    {item.name}
                  </h2>
                </span>

                <p className="group-hover:text-stone-800 dark:group-hover:text-stone-300 transition-colors duration-300">
                  {item.description}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
