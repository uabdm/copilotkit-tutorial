"use client";

interface Colleague {
  id: number;
  name: string;
  role: string;
}

interface ColleagueCardProps {
  colleague?: Colleague;
  colleagues?: Colleague[];
}

export function ColleagueCard({ colleague, colleagues }: ColleagueCardProps) {
  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "developer": return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "designer": return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
      case "product manager": return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      default: return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  // Single colleague view
  if (colleague) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-lg border border-zinc-200 dark:border-zinc-700 max-w-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-semibold">
            {colleague.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white">{colleague.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor(colleague.role)}`}>
              {colleague.role}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Multiple colleagues view
  if (colleagues && colleagues.length > 0) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-lg border border-zinc-200 dark:border-zinc-700 max-w-sm">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
          <span>Team Members</span>
          <span className="text-xs bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded-full">
            {colleagues.length}
          </span>
        </h3>
        <ul className="space-y-2">
          {colleagues.map((c) => (
            <li key={c.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-400 dark:from-zinc-600 dark:to-zinc-700 flex items-center justify-center text-white text-sm font-medium">
                  {c.name.charAt(0)}
                </div>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{c.name}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor(c.role)}`}>
                {c.role}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
