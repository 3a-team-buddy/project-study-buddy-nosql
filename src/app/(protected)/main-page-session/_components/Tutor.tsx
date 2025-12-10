"use client";

import React, { Dispatch, useState } from "react";
import { SelectedTutorType } from "@/lib/types";
import {
  Button,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import { useTeacher } from "@/app/_hooks/use-teacher";

export const Tutor = ({
  selectedSessionType,
  setSelectedSessionType,
  selectedTutors,
  setSelectedTutors,
}: {
  selectedSessionType: string;
  setSelectedSessionType: Dispatch<React.SetStateAction<string>>;
  selectedTutors: SelectedTutorType[];
  setSelectedTutors: Dispatch<React.SetStateAction<SelectedTutorType[]>>;
}) => {
  const [tutorLedInputValue, setTutorLedInputValue] = useState<string>("");

  const { teachers } = useTeacher();

  const reorderTutors = (list: SelectedTutorType[]) => {
    return list.map((tutor, idx) => ({
      ...tutor,
      order: idx + 1,
    }));
  };

  const handleChangeSessionType = (value: string) => {
    setSelectedSessionType(value);

    if (value === "SELF-LED") {
      setSelectedTutors([]);
    }
  };

  const addSelectedTutor = () => {
    if (!tutorLedInputValue) return;

    const existsInTeachers = teachers.some(
      (t) => t.mockUserEmail === tutorLedInputValue
    );

    if (!existsInTeachers) {
      alert("This tutor does not exist.");
      return;
    }

    const updated = reorderTutors([
      ...selectedTutors,
      { mockUserEmail: tutorLedInputValue, order: 1 },
    ]);

    setSelectedTutors(updated);
    setTutorLedInputValue("");
  };

  const deleteSelectedTutor = (email: string) => {
    const filtered = selectedTutors.filter(
      (tutor) => tutor.mockUserEmail !== email
    );

    setSelectedTutors(reorderTutors(filtered));
  };

  const selectedEmails = selectedTutors.map((t) => t.mockUserEmail);
  const availableTeachers = teachers.filter(
    (t) => !selectedEmails.includes(t.mockUserEmail)
  );

  return (
    <div className="flex flex-col gap-3">
      <Label>Session Type</Label>

      <RadioGroup
        value={selectedSessionType}
        onValueChange={handleChangeSessionType}
        className="flex justify-around text-white/80"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="tutor-led"
            id="tutor-led"
            className="bg-white"
          />
          <Label htmlFor="tutor-led">Tutor-led</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="self-led" id="self-led" className="bg-white" />
          <Label htmlFor="self-led">Self-led</Label>
        </div>
      </RadioGroup>

      {selectedSessionType === "tutor-led" && (
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between gap-3">
            <Input
              list="tutors"
              value={tutorLedInputValue}
              onChange={(e) => setTutorLedInputValue(e.target.value)}
              placeholder="Type your tutors here..."
              className="border-border/20 bg-black/50 py-2 text-sm text-white/80"
            />

            <datalist id="tutors">
              {availableTeachers.map((teacher) => (
                <option key={teacher._id} value={teacher.mockUserEmail} />
              ))}
            </datalist>

            <Button
              variant="outline"
              onClick={addSelectedTutor}
              disabled={selectedTutors.length >= 3 || !tutorLedInputValue}
              className="bg-transparent hover:bg-accent/50 border-border/20 text-white/80 hover:text-white"
            >
              Add
            </Button>
          </div>

          {selectedTutors.length >= 3 && (
            <div className="text-xs text-orange-500">* Max: 3 tutors</div>
          )}
        </div>
      )}

      {selectedTutors.length > 0 && (
        <div className="flex flex-col gap-1">
          {selectedTutors.map((tutor, index) => (
            <div
              key={index}
              className="flex justify-between items-center rounded-md px-2 py-1 bg-black/30 border border-white/10"
            >
              <Label className="text-white/80 font-normal">
                {tutor.order}. {tutor.mockUserEmail}
              </Label>

              <Button
                variant="ghost"
                onClick={() => deleteSelectedTutor(tutor.mockUserEmail)}
                className="hover:bg-accent/50 text-white/80"
              >
                x
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
