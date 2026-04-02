import Discord from "../icons/Discord";
import Github from "../icons/Github";
import ThemeSwitcher from "../ThemeSwitcher";
import NavigationList from "./NavigationList";

export default function Navigation() {
  return (
    <nav className="mt-5 flex-1 self-stretch px-6">
      <div className="-mt-4 mb-8 flex items-center justify-center xl:mt-2 xl:justify-between">
        <a href="/">
          <img
            src="/img/rippedtransparent-cropped.svg"
            className="amoled:invert-0 h-10 invert xl:mt-1 dark:invert-0"
            alt="Ripped"
            width={813}
            height={620}
          />
        </a>
        <div className="hidden xl:flex xl:items-center xl:gap-2">
          <a
            aria-label="Discord"
            href="https://discord.ripped.guide/"
            target="_blank"
            rel="noreferrer"
            className="bg-sidebar-tertiary-light hover:bg-brand-blurple focus-visible:ring-brand-blurple/75 dark:bg-sidebar-secondary-dark dark:hover:bg-brand-blurple inline-flex justify-center rounded-md p-2 text-sm font-medium text-black transition duration-100 hover:text-white focus:outline-hidden focus-visible:ring-2 dark:text-white"
          >
            <Discord className="h-4 w-4 md:h-6 md:w-6" aria-hidden="true" />
          </a>
          <a
            aria-label="GitHub"
            href="https://github.com/rippedpiracy"
            target="_blank"
            rel="noreferrer"
            className="bg-sidebar-tertiary-light hover:bg-brand-blurple focus-visible:ring-brand-blurple/75 dark:bg-sidebar-secondary-dark dark:hover:bg-brand-blurple inline-flex justify-center rounded-md p-2 text-sm font-medium text-black transition duration-100 hover:text-white focus:outline-hidden focus-visible:ring-2 dark:text-white"
          >
            <Github className="h-4 w-4 md:h-6 md:w-6" aria-hidden="true" />
          </a>
          <ThemeSwitcher />
        </div>
      </div>

      <NavigationList />
    </nav>
  );
}
