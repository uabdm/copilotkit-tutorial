"use client";

interface UserNameCardProps {
  name: string;
  userId: string;
}

export function UserNameCard({ name, userId }: UserNameCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-lg border border-zinc-200 dark:border-zinc-700 max-w-xs">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-white text-lg font-semibold">
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-white">{name}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">ID: {userId}</p>
        </div>
      </div>
    </div>
  );
}
