"use client";

import React from "react";

type Tutor = {
  mockUserEmail: string;
  order: number;
};

export default function SelectedTutorList({
  tutors,
  setTutors,
}: {
  tutors: Tutor[];
  setTutors: (value: Tutor[]) => void;
}) {
  const removeTutor = (email: string) => {
    setTutors(tutors.filter((t) => t.mockUserEmail !== email));
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-base">Selected Tutors</h3>

      {tutors.length === 0 && (
        <p className="text-sm text-gray-500">No tutors selected</p>
      )}

      {tutors.map((t) => (
        <div
          key={t.mockUserEmail}
          className="flex items-center justify-between bg-gray-100 rounded p-2"
        >
          <span>{t.mockUserEmail}</span>
          <button
            onClick={() => removeTutor(t.mockUserEmail)}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
