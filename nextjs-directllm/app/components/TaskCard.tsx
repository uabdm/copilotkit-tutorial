"use client";

interface TaskCardProps {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  status?: "pending" | "in_progress" | "completed";
}

export function TaskCard({ title, description, priority = "medium", dueDate, status = "pending" }: TaskCardProps) {
  const priorityColors = {
    low: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  const statusIcons = {
    pending: "⏳",
    in_progress: "🔄",
    completed: "✅",
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-5 shadow-lg border border-zinc-200 dark:border-zinc-700 max-w-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
        <span className="text-xl">{statusIcons[status]}</span>
      </div>

      {description && (
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">{description}</p>
      )}

      <div className="flex items-center gap-2 mt-4">
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[priority]}`}>
          {priority.toUpperCase()}
        </span>
        {dueDate && (
          <span className="text-zinc-500 dark:text-zinc-400 text-xs">
            Due: {dueDate}
          </span>
        )}
      </div>
    </div>
  );
}
