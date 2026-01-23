"use client";

import { useState } from "react";

interface StudentEnrollmentDialogProps {
  name: string;
  email: string;
  major: string;
  enrollmentStatus: "full-time" | "part-time";
  onConfirm: (data: {
    name: string;
    email: string;
    major: string;
    enrollmentStatus: "full-time" | "part-time";
    gpa: number;
    creditsCompleted: number;
  }) => void;
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

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="my-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          🎓
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
            Student Enrollment Form
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            Please review and confirm the enrollment details
          </p>
        </div>
      </div>

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
          onClick={() => onConfirm({
            name: formData.name,
            email: formData.email,
            major: formData.major,
            enrollmentStatus: formData.enrollmentStatus,
            gpa: parseFloat(formData.gpa as string) || 0,
            creditsCompleted: parseInt(formData.creditsCompleted as string) || 0
          })}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          ✅ Confirm Enrollment
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