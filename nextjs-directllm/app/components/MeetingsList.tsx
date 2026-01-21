"use client";

interface Meeting {
  id: number;
  title: string;
  date: string;
  attendees: string[];
}

interface MeetingsListProps {
  meetings: Meeting[];
}

export function MeetingsList({ meetings }: MeetingsListProps) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-sm border border-zinc-200 dark:border-zinc-700">
      <h3 className="font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
        <span>Upcoming Meetings</span>
        <span className="text-xs bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded-full">
          {meetings.length}
        </span>
      </h3>
      <ul className="space-y-3">
        {meetings.map((meeting) => (
          <li key={meeting.id} className="border-l-2 border-blue-500 pl-3">
            <p className="text-sm font-medium text-zinc-900 dark:text-white">
              {meeting.title}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {meeting.date}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {meeting.attendees.map((attendee, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.5 rounded"
                >
                  {attendee}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
