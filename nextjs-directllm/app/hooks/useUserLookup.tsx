"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { UserNameCard } from "../components/UserNameCard";

/**
 * Frontend action using useCopilotAction with render property.
 * This is the recommended pattern per GitHub issue #2622.
 */
export function useUserLookup() {
  useCopilotAction({
    name: "fetchNameForUserId",
    description: "Fetches user name from the database for a given ID.",
    parameters: [
      {
        name: "userId",
        type: "string",
        description: "The ID of the user to fetch data for.",
        required: true,
      },
    ],
    handler: async ({ userId }) => {
      console.log("[fetchNameForUserId] Called with userId:", userId);

      // Simulated database call (runs on frontend)
      const simulateDatabaseCall = async (userId: string) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { name: "Darth Doe", userId };
      };

      const result = await simulateDatabaseCall(userId);
      console.log("[fetchNameForUserId] Returning result:", result);

      return result;
    },
    render: ({ args, status, result }) => {
      if (status === "executing") {
        return (
          <div className="my-2 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Looking up user: {args.userId}...
              </span>
            </div>
          </div>
        );
      }

      if (status === "complete" && result?.name) {
        return (
          <div className="my-2">
            <UserNameCard name={result.name} userId={result.userId} />
          </div>
        );
      }

      return <> </>;
    },
  });
}
