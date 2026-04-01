import Discord from "./icons/Discord";
import Github from "./icons/Github";

export const DISCORD_LINK = "https://discord.ripped.guide/";
export const GITHUB_LINK = "https://github.com/rippedpiracy";

export default function SocialLinks() {
  return (
    <>
      <a
        aria-label="Discord"
        href={DISCORD_LINK}
        target="_blank"
        rel="noreferrer"
        className="bg-sidebar-tertiary-light hover:bg-brand-blurple focus-visible:ring-brand-blurple/75 dark:bg-sidebar-secondary-dark dark:hover:bg-brand-blurple inline-flex justify-center rounded-md p-2 text-sm font-medium text-black transition duration-100 hover:text-white focus:outline-hidden focus-visible:ring-2 dark:text-white"
      >
        <Discord className="h-4 w-4 md:h-6 md:w-6" aria-hidden="true" />
      </a>
      <a
        aria-label="GitHub"
        href={GITHUB_LINK}
        target="_blank"
        rel="noreferrer"
        className="bg-sidebar-tertiary-light hover:bg-brand-blurple focus-visible:ring-brand-blurple/75 dark:bg-sidebar-secondary-dark dark:hover:bg-brand-blurple inline-flex justify-center rounded-md p-2 text-sm font-medium text-black transition duration-100 hover:text-white focus:outline-hidden focus-visible:ring-2 dark:text-white"
      >
        <Github className="h-4 w-4 md:h-6 md:w-6" aria-hidden="true" />
      </a>
    </>
  );
}
