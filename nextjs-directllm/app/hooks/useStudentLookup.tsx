"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { StudentCard } from "../components/StudentCard";

async function fetchStudents(query?: string) {
  const url = query ? `/api/students?query=${encodeURIComponent(query)}` : '/api/students';
  const response = await fetch(url);
  return response.json();
}

/**
 * Frontend action using useCopilotAction with render property.
 * This is the recommended pattern per GitHub issue #2622.
 */
export function useStudentLookup() {
  useCopilotAction({
    name: "lookupStudent",
    description: "Display student information. Use when the user asks about students, a specific student, or wants to see all students. Leave studentQuery empty to show all students.",
    parameters: [
      {
        name: "studentQuery",
        type: "string",
        description: "Optional: student name to search for. Leave empty to show all students.",
        required: false,
      },
    ],
    handler: async ({ studentQuery }) => {
      console.log("[lookupStudent] Called with studentQuery:", studentQuery);

      try {
        const result = await fetchStudents(studentQuery);
        console.log("[lookupStudent] API result:", result);
        return result;
      } catch (error) {
        console.error("[lookupStudent] API error:", error);
        return { error: "Failed to fetch student data" };
      }
    },
    render: ({ args, status, result }) => {
      if (status === "executing") {
        return (
          <div className="my-2 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {args.studentQuery
                  ? `Looking up student: ${args.studentQuery}...`
                  : "Loading all students..."}
              </span>
            </div>
          </div>
        );
      }

      if (status === "complete" && result) {
        // Handle not found case
        if (result.error) {
          return (
            <div className="my-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">
                Student "{result.query}" not found. Try: John Smith, Sarah Johnson, Mike Chen, or Emily Davis.
              </p>
            </div>
          );
        }

        // Handle multiple students
        if (result.students) {
          return (
            <div className="my-2">
              <StudentCard students={result.students} />
            </div>
          );
        }

        // Handle single student
        if (result.student) {
          return (
            <div className="my-2">
              <StudentCard student={result.student} />
            </div>
          );
        }
      }

      return null;
    },
  });
}
