import useSWR from 'swr';
import blacklist from '../pages/blacklist.json';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ROLES: Record<number, string> = {
  53054786: "Frontend / Backend",
  90912935: "Documentation"
};

export default function Contributors() {
  const { data: contributors, error, isLoading } = useSWR(
    'https://api.github.com/repos/rippedpiracy/docs/contributors',
    fetcher
  );

  if (error) return <div>Failed to load contributors</div>;
  if (isLoading || !contributors) return <div>Loading contributors...</div>;

  const filtered = Array.isArray(contributors) 
    ? contributors.filter((c: any) => !blacklist.includes(c.id))
    : [];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6">
      {filtered.map((user: any) => (
        <a
          key={user.id}
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 p-2 rounded-lg border border-black/5 bg-black/[0.02] hover:border-black/10 hover:bg-black/[0.05] dark:border-white/5 dark:bg-white/5 dark:hover:border-white/10 dark:hover:bg-white/10 hover:shadow-sm transition-all duration-300"
        >
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-8 h-8 rounded-full shadow-sm ring-1 ring-black/5 dark:ring-white/10 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-text-light dark:text-text-dark truncate">
              {user.login}
            </span>
            {ROLES[user.id] && (
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {ROLES[user.id]}
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
