"use client";

interface Meeting {
  id: number;
  title: string;
  date: string;
  attendees: string[];
}

interface MeetingCardProps {
  meeting?: Meeting;
  meetings?: Meeting[];
}

export function MeetingCard({ meeting, meetings }: MeetingCardProps) {
  // Single meeting view
  if (meeting) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-lg border border-zinc-200 dark:border-zinc-700 max-w-xs">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-zinc-900 dark:text-white">{meeting.title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{meeting.date}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {meeting.attendees.map((attendee, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded"
                >
                  {attendee}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Multiple meetings view
  if (meetings && meetings.length > 0) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-lg border border-zinc-200 dark:border-zinc-700 max-w-sm">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
          <span>Upcoming Meetings</span>
          <span className="text-xs bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded-full">
            {meetings.length}
          </span>
        </h3>
        <ul className="space-y-3">
          {meetings.map((m) => (
            <li key={m.id} className="border-l-2 border-blue-500 pl-3">
              <p className="text-sm font-medium text-zinc-900 dark:text-white">{m.title}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{m.date}</p>
              <div className="flex items-center gap-1 mt-1">
                {m.attendees.map((attendee, idx) => (
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

  return null;
}
