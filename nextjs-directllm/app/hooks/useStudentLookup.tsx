"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { StudentCard } from "../components/StudentCard";

// Simulated student database
const studentDatabase: Record<string, {
  name: string;
  studentId: string;
  major: string;
  gpa: number;
  enrollmentStatus: "full-time" | "part-time" | "graduated";
  creditsCompleted: number;
}> = {
  "john smith": {
    name: "John Smith",
    studentId: "STU-2024-001",
    major: "Computer Science",
    gpa: 3.75,
    enrollmentStatus: "full-time",
    creditsCompleted: 89,
  },
  "sarah johnson": {
    name: "Sarah Johnson",
    studentId: "STU-2023-042",
    major: "Data Science",
    gpa: 3.92,
    enrollmentStatus: "full-time",
    creditsCompleted: 112,
  },
  "mike chen": {
    name: "Mike Chen",
    studentId: "STU-2022-108",
    major: "Electrical Engineering",
    gpa: 3.45,
    enrollmentStatus: "part-time",
    creditsCompleted: 145,
  },
  "emily davis": {
    name: "Emily Davis",
    studentId: "STU-2021-033",
    major: "Business Administration",
    gpa: 3.88,
    enrollmentStatus: "graduated",
    creditsCompleted: 128,
  },
};

/**
 * Frontend action using useCopilotAction with render property.
 * This is the recommended pattern per GitHub issue #2622.
 */
export function useStudentLookup() {
  useCopilotAction({
    name: "lookupStudent",
    description: "Looks up student information by name. Available students: John Smith, Sarah Johnson, Mike Chen, Emily Davis.",
    parameters: [
      {
        name: "studentQuery",
        type: "string",
        description: "The student name to search for",
        required: true,
      },
    ],
    handler: async ({ studentQuery }) => {
      console.log("[lookupStudent] Called with studentQuery:", studentQuery);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const key = studentQuery.toLowerCase();
      const student = studentDatabase[key];

      if (student) {
        console.log("[lookupStudent] Found student:", student);
        return student;
      }

      console.log("[lookupStudent] Student not found");
      return { error: "Student not found", query: studentQuery };
    },
    render: ({ args, status, result }) => {
      if (status === "executing") {
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

      return <> </>;
    },
  });
}
