"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { useDemoActions } from "./hooks/useDemoActions";
import { useStudentLookup } from "./hooks/useStudentLookup";
import { useUserLookup } from "./hooks/useUserLookup";

export default function Home() {
  // Register all actions and readable context
  useDemoActions();

  // Register the student lookup renderer (backend tool with frontend rendering)
  useStudentLookup();

  // Register the user lookup renderer for fetchNameForUserId backend action
  useUserLookup();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="w-full h-[600px]">
          <CopilotChat
            instructions={`You are a helpful assistant with the ability to display rich UI components.

You have access to context about the user's colleagues and meetings.

When the user asks about:
- Colleagues or team members: Use showColleagues to display them (can filter by name)
- Meetings or schedule: Use showMeetings to display them (can filter by title or attendee)
- Weather: Use showWeather to display a weather card
- Stocks or prices: Use showStock to display a stock card
- Tasks, todos, or reminders: Use createTask to display a task card
- Scheduling new meetings: Use handleMeeting to confirm with the user
- Student information, GPA, or enrollment: Use lookupStudent to look up and display student records
- User name lookup by ID: Use fetchNameForUserId to look up a user's name

Always use the appropriate action to display visual cards when relevant.`}
            labels={{
              title: "Your Assistant",
              initial: "Hi! Ask me about colleagues, meetings, weather, stocks, tasks, or look up student records!",
            }}
          />
        </div>
      </main>
    </div>
  );
}
