"use client";

import { useState } from "react";

interface MeetingConfirmationDialogProps {
  meeting?: string;
  date?: string;
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function MeetingConfirmationDialog({
  meeting,
  date,
  title,
  onConfirm,
  onCancel,
}: MeetingConfirmationDialogProps) {
  const [responded, setResponded] = useState<"confirmed" | "canceled" | null>(null);

  const handleConfirm = () => {
    setResponded("confirmed");
    onConfirm();
  };

  const handleCancel = () => {
    setResponded("canceled");
    onCancel();
  };

  // Show completion state after user responds
  if (responded) {
    return (
      <div className={`rounded-xl p-5 shadow-lg max-w-sm border ${
        responded === "confirmed"
          ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
          : "bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700"
      }`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{responded === "confirmed" ? "✅" : "❌"}</span>
          <div>
            <p className="font-medium text-zinc-900 dark:text-white">
              {responded === "confirmed" ? "Meeting Confirmed" : "Meeting Canceled"}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{title}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-5 shadow-lg border border-zinc-200 dark:border-zinc-700 max-w-sm">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-zinc-900 dark:text-white">
            {title || "Meeting Request"}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Please confirm this meeting
          </p>
        </div>
      </div>

      {/* Meeting Details */}
      <div className="space-y-3 mb-5">
        {meeting && (
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-zinc-700 dark:text-zinc-300">{meeting}</span>
          </div>
        )}
        {date && (
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-zinc-700 dark:text-zinc-300">{date}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCancel}
          className="flex-1 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
