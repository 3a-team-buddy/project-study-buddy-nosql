"use client";

import { useState } from "react";

export default function SessionCreationCard() {
  const [sessionTopicTitle, setSessionTopicTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minMember, setMinMember] = useState(2);
  const [maxMember, setMaxMember] = useState(10);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [selectedSessionType, setSelectedSessionType] = useState("study");
  const [selectedTutors, setSelectedTutors] = useState<string[]>([]);

  return (
    <div className="max-w-[480px] w-full flex flex-col gap-6 rounded-2xl px-8 py-6 bg-linear-to-b from-[#061e20]/95 to-[#0a2426]/95 shadow-xl">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Create Session</h2>
        <p className="text-sm text-gray-400">Set up a new study session</p>
      </div>

      {/* Title and Description */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Session Title
          </label>
          <input
            type="text"
            value={sessionTopicTitle}
            onChange={(e) => setSessionTopicTitle(e.target.value)}
            placeholder="Enter session topic"
            className="w-full px-4 py-2 bg-[#1a2738] text-white rounded-lg border border-gray-700 focus:border-[#31b8c6] focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your session"
            rows={3}
            className="w-full px-4 py-2 bg-[#1a2738] text-white rounded-lg border border-gray-700 focus:border-[#31b8c6] focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>

      {/* Member Limits */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Min Members
          </label>
          <input
            type="number"
            value={minMember}
            onChange={(e) => setMinMember(Number.parseInt(e.target.value))}
            min={1}
            className="w-full px-4 py-2 bg-[#1a2738] text-white rounded-lg border border-gray-700 focus:border-[#31b8c6] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Max Members
          </label>
          <input
            type="number"
            value={maxMember}
            onChange={(e) => setMaxMember(Number.parseInt(e.target.value))}
            min={minMember}
            className="w-full px-4 py-2 bg-[#1a2738] text-white rounded-lg border border-gray-700 focus:border-[#31b8c6] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Date and Time */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date
          </label>
          <input
            type="date"
            onChange={(e) => setDate(new Date(e.target.value))}
            className="w-full px-4 py-2 bg-[#1a2738] text-white rounded-lg border border-gray-700 focus:border-[#31b8c6] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 bg-[#1a2738] text-white rounded-lg border border-gray-700 focus:border-[#31b8c6] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Session Type */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Session Type
        </label>
        <select
          value={selectedSessionType}
          onChange={(e) => setSelectedSessionType(e.target.value)}
          className="w-full px-4 py-2 bg-[#1a2738] text-white rounded-lg border border-gray-700 focus:border-[#31b8c6] focus:outline-none transition-colors"
        >
          <option value="study">Study Session</option>
          <option value="tutoring">Tutoring Session</option>
          <option value="group">Group Discussion</option>
        </select>
      </div>

      <button
        type="button"
        className="w-full py-3 bg-[#2563EB] text-black font-semibold rounded-lg hover:opacity-80 transition-opacity"
      >
        Create Session
      </button>
    </div>
  );
}
