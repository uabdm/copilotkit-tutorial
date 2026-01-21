"use client";

import { CopilotChat } from "@copilotkit/react-ui";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="w-full h-[600px]">
          <CopilotChat
            instructions="You are assisting the user as best as you can. Answer in the best way possible given the data you have."
            labels={{
              title: "Your Assistant",
              initial: "Hi! How can I assist you today?",
            }}
          />
        </div>
      </main>
    </div>
  );
}
