import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { projects } from "@/lib/constants/data";
import ExternalLink from "@/components/external-link";

export default function Home() {
  const featuredProjects = projects.slice(0, 4);
  return (
    <div>
      <div>
        <h1 className=" text-4xl pb-1 font-bold mt-8 dark:text-stone-100">Diabene Yaw Addo</h1>
        <p className=" text-stone-600 dark:text-stone-500 flex items-center gap-1">
          {" "}
          <Icon icon={"circum:map-pin"} /> Software Engineer, Ghana.
        </p>
      </div>
      <div className=" mt-6">
        Focused on web development. I build elegant user interfaces, backend systems, and developer
        tools. I enjoy contributing to open-source projects. Aside programming, I am deeply
        interested in{" "}
        <ExternalLink href={"https://en.wikipedia.org/wiki/Thermodynamics"}>
          thermodynamics
        </ExternalLink>
      </div>
      <div className=" mt-6">
        I'm always looking for opportunities to learn and grow. Feel free to explore my portfolio
        and <ExternalLink href={"mailto:addodiabene69@gmail.com"}>reach out</ExternalLink> if you're
        ready to collaborate on your next project!
      </div>
      <section className="flex gap-4 py-6 justify-center text-black dark:text-stone-300 items-center">
        <a
          href="https://github.com/diabeney"
          target="_blank"
          rel="noopener noreferrer"
          className="  opacity-60 hover:opacity-100 transition-all duration-300"
        >
          <Icon icon={"line-md:github-loop"} className=" w-6 h-6" />
        </a>
        <a
          href="https://twitter.com/diabeneyy"
          target="_blank"
          rel="noopener noreferrer"
          className=" opacity-60 hover:opacity-100 transition-all duration-300"
        >
          <Icon icon={"hugeicons:new-twitter"} className=" w-6 h-6" />
        </a>

        <div className="w-full relative my-2">
          <hr className="w-full border-stone-200 dark:border-stone-700" />
          <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-stone-500 dark:via-stone-400 to-transparent animate-shootingStar"></div>
          </div>
        </div>
      </section>
      <section className=" mt-6">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <section className="grid sm:grid-cols-2 mt-3 gap-4">
          {featuredProjects.map((project) => {
            return (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.link}
                className=" group"
              >
                <span className=" flex mb-2 items-center gap-2">
                  <h3 className=" font-bold">{project.title}</h3>{" "}
                  <Icon
                    icon={"solar:link-round-angle-line-duotone"}
                    className=" w-4 h-4 opacity-0 group-hover:opacity-100  transition-all duration-300"
                  />
                </span>
                <p className=" mb-3">{project.description}</p>
              </Link>
            );
          })}
          <Link
            href={"/https://github.com/diabeney?tab=repositories"}
            className=" flex items-center gap-0 underline hover:gap-1 transition-all duration-300"
          >
            See archived projects <Icon className=" rotate-90" icon={"stash:arrow-up-light"} />
          </Link>
        </section>
      </section>
    </div>
  );
}
