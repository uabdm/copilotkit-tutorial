"use client";

interface Student {
  name: string;
  studentId: string;
  major: string;
  gpa: number;
  enrollmentStatus: "full-time" | "part-time" | "graduated";
  creditsCompleted: number;
}

interface StudentCardProps {
  student?: Student;
  students?: Student[];
  // Legacy props for single student (backwards compatibility)
  name?: string;
  studentId?: string;
  major?: string;
  gpa?: number;
  enrollmentStatus?: "full-time" | "part-time" | "graduated";
  creditsCompleted?: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "full-time":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "part-time":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    case "graduated":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
  }
};

const getGpaColor = (gpa: number) => {
  if (gpa >= 3.5) return "text-green-600 dark:text-green-400";
  if (gpa >= 3.0) return "text-blue-600 dark:text-blue-400";
  if (gpa >= 2.0) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
};

function SingleStudentCard({ student }: { student: Student }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-lg border border-zinc-200 dark:border-zinc-700 max-w-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-lg font-semibold">
          {student.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-zinc-900 dark:text-white">{student.name}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">ID: {student.studentId}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(student.enrollmentStatus)}`}>
            {student.enrollmentStatus}
          </span>
        </div>
      </div>

      <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-700 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Major</span>
          <span className="text-sm font-medium text-zinc-900 dark:text-white">{student.major}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">GPA</span>
          <span className={`text-sm font-bold ${getGpaColor(student.gpa)}`}>{student.gpa.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Credits</span>
          <span className="text-sm font-medium text-zinc-900 dark:text-white">{student.creditsCompleted}</span>
        </div>
      </div>
    </div>
  );
}

export function StudentCard(props: StudentCardProps) {
  const { student, students, name, studentId, major, gpa, enrollmentStatus, creditsCompleted } = props;

  // Handle single student via student prop
  if (student) {
    return <SingleStudentCard student={student} />;
  }

  // Handle multiple students
  if (students && students.length > 0) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-lg border border-zinc-200 dark:border-zinc-700 max-w-md">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
          <span>Students</span>
          <span className="text-xs bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded-full">
            {students.length}
          </span>
        </h3>
        <div className="space-y-3">
          {students.map((s) => (
            <div key={s.studentId} className="border-l-2 border-indigo-500 pl-3 py-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                  {s.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">{s.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.major}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${getGpaColor(s.gpa)}`}>{s.gpa.toFixed(2)}</span>
                  <p className={`text-xs px-1.5 py-0.5 rounded ${getStatusColor(s.enrollmentStatus)}`}>
                    {s.enrollmentStatus}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Legacy: handle direct props for backwards compatibility
  if (name && studentId && major && gpa !== undefined && enrollmentStatus && creditsCompleted !== undefined) {
    return (
      <SingleStudentCard
        student={{ name, studentId, major, gpa, enrollmentStatus, creditsCompleted }}
      />
    );
  }

  return null;
}
