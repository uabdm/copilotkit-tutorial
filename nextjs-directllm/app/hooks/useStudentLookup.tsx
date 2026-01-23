"use client";

import { useRenderToolCall } from "@copilotkit/react-core";
import { StudentCard } from "../components/StudentCard";

/**
 * This hook demonstrates useRenderToolCall - which renders UI for a
 * tool that is defined and executed on the BACKEND.
 *
 * Key differences from useFrontendTool:
 * - useFrontendTool: defines AND executes a tool in the frontend (has both render + handler)
 * - useRenderToolCall: only provides a RENDERER for a backend tool (render only, no handler)
 *
 * The "lookupStudent" tool is defined in app/api/copilotkit/route.ts
 * This hook just provides the UI to display the results nicely.
 */
export function useStudentLookup() {
  useRenderToolCall({
    name: "lookupStudent", // Must match the backend action name
    render: ({ args, status, result }) => {
      // Show loading state while the backend is processing
      if (status === "inProgress") {
        return (
          <div className="my-2 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Looking up student: {args.studentQuery}...
              </span>
            </div>
          </div>
        );
      }

      // Once complete, render the StudentCard with the result
      if (status === "complete" && result) {
        return (
          <div className="my-2">
            <StudentCard
              name={result.name}
              studentId={result.studentId}
              major={result.major}
              gpa={result.gpa}
              enrollmentStatus={result.enrollmentStatus}
              creditsCompleted={result.creditsCompleted}
            />
          </div>
        );
      }

      return <></>;
    },
  });
}
