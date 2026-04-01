import useSWR from "swr";
import blacklist from "../pages/blacklist.json";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ROLES: Record<number, string> = {
  53054786: "Frontend / Backend",
  90912935: "Documentation",
};

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export default function Contributors() {
  const {
    data: contributors,
    error,
    isLoading,
  } = useSWR<Contributor[]>("https://api.github.com/repos/rippedpiracy/docs/contributors", fetcher);

  if (error) return <div>Failed to load contributors</div>;
  if (isLoading || !contributors) return <div>Loading contributors...</div>;

  const filtered = Array.isArray(contributors) ? contributors.filter((c) => !blacklist.includes(c.id)) : [];

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {filtered.map((user) => (
        <a
          key={user.id}
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-lg border border-black/5 bg-black/[0.02] p-2 transition-all duration-300 hover:border-black/10 hover:bg-black/[0.05] hover:shadow-sm dark:border-white/5 dark:bg-white/5 dark:hover:border-white/10 dark:hover:bg-white/10"
        >
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="h-8 w-8 rounded-full shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 dark:ring-white/10"
            loading="lazy"
          />
          <div className="flex min-w-0 flex-col">
            <span className="text-text-light dark:text-text-dark truncate text-sm font-medium">{user.login}</span>
            {ROLES[user.id] && (
              <span className="truncate text-xs text-gray-500 dark:text-gray-400">{ROLES[user.id]}</span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
