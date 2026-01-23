"use client";

import { useState } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type StudentData = {
  name: string;
  email: string;
  major: string;
  enrollmentStatus: "full-time" | "part-time";
  gpa: number;
  creditsCompleted: number;
  studentId?: string;
};

interface StudentEnrollmentDialogProps {
  name: string;
  email: string;
  major: string;
  enrollmentStatus: "full-time" | "part-time";
  onConfirm: (data: StudentData) => Promise<{ success: boolean; student?: StudentData; error?: string }>;
  onCancel: () => void;
}

export function StudentEnrollmentDialog({
  name,
  email,
  major,
  enrollmentStatus,
  onConfirm,
  onCancel
}: StudentEnrollmentDialogProps) {
  const [formData, setFormData] = useState({
    name,
    email,
    major,
    enrollmentStatus,
    gpa: "",
    creditsCompleted: ""
  });

  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [enrolledStudent, setEnrolledStudent] = useState<StudentData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSubmissionState("submitting");
    setErrorMessage("");

    const studentData: StudentData = {
      name: formData.name,
      email: formData.email,
      major: formData.major,
      enrollmentStatus: formData.enrollmentStatus,
      gpa: parseFloat(formData.gpa as string) || 0,
      creditsCompleted: parseInt(formData.creditsCompleted as string) || 0
    };

    try {
      const result = await onConfirm(studentData);
      if (result.success) {
        setSubmissionState("success");
        setEnrolledStudent(result.student || studentData);
      } else {
        setSubmissionState("error");
        setErrorMessage(result.error || "Failed to enroll student");
      }
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  const resetForm = () => {
    setSubmissionState("idle");
    setEnrolledStudent(null);
    setErrorMessage("");
    setFormData({
      name: "",
      email: "",
      major: "",
      enrollmentStatus: "full-time",
      gpa: "",
      creditsCompleted: ""
    });
  };

  // Success Card Component
  if (submissionState === "success" && enrolledStudent) {
    return (
      <div className="my-4 p-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            ✅
          </div>
          <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
            Enrollment Successful!
          </h3>
          <p className="text-green-600 dark:text-green-300 mb-6">
            Welcome to the university, {enrolledStudent.name}!
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border border-green-200 dark:border-green-700">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Student Details</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Student ID:</span>
              <p className="font-mono font-semibold">{enrolledStudent.studentId}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Major:</span>
              <p className="font-semibold">{enrolledStudent.major}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Status:</span>
              <p className="font-semibold capitalize">{enrolledStudent.enrollmentStatus}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Starting GPA:</span>
              <p className="font-semibold">{enrolledStudent.gpa.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetForm}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            🎓 Enroll Another Student
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            📋 Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          {submissionState === "submitting" ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "🎓"
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
            {submissionState === "submitting" ? "Enrolling Student..." : "Student Enrollment Form"}
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            {submissionState === "submitting" 
              ? "Please wait while we process the enrollment"
              : "Please review and confirm the enrollment details"
            }
          </p>
        </div>
      </div>

      {submissionState === "error" && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">
            ❌ {errorMessage}
          </p>
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Major
            </label>
            <select
              value={formData.major}
              onChange={(e) => handleInputChange('major', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Select a major...</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Data Science">Data Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Psychology">Psychology</option>
              <option value="Biology">Biology</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enrollment Status
            </label>
            <select
              value={formData.enrollmentStatus}
              onChange={(e) => handleInputChange('enrollmentStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Starting GPA
            </label>
            <input
              type="number"
              min="0"
              max="4"
              step="0.01"
              value={formData.gpa}
              onChange={(e) => handleInputChange('gpa', e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Transfer Credits
            </label>
            <input
              type="number"
              min="0"
              max="200"
              value={formData.creditsCompleted}
              onChange={(e) => handleInputChange('creditsCompleted', e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-blue-200 dark:border-blue-700">
        <button
          onClick={handleSubmit}
          disabled={submissionState === "submitting"}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          {submissionState === "submitting" ? (
            <>
              <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Enrolling...
            </>
          ) : (
            "✅ Confirm Enrollment"
          )}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          ❌ Cancel
        </button>
      </div>
    </div>
  );
}