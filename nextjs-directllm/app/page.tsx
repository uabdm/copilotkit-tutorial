"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { useDemoActions } from "./hooks/useDemoActions";

export default function Home() {
  // Register all demo actions for generative UI
  useDemoActions();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="w-full h-[600px]">
          <CopilotChat
            instructions={`You are a helpful assistant with the ability to display rich UI components.

When the user asks about:
- Weather: Use the showWeather action to display a weather card
- Stocks or prices: Use the showStock action to display a stock card
- Tasks, todos, or reminders: Use the createTask action to display a task card

Always use these actions when relevant to provide a better visual experience.`}
            labels={{
              title: "Your Assistant",
              initial: "Hi! I can show you weather, stock prices, and help create tasks. Try asking me about any of these!",
            }}
          />
        </div>
      </main>
    </div>
  );
}
