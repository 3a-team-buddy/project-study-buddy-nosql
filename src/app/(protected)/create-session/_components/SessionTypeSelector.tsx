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
import { useMockTutor } from "@/app/_hooks/use-mock-tutor";

export const SessionTypeSelector = ({
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
  const { mockTutors } = useMockTutor();
  const [tutorLedInputValue, setTutorLedInputValue] = useState<string>("");

  const handleChangeSessionType = (value: string) => {
    setSelectedSessionType(value);
  };

  const addSelectedTutors = () => {
    const newSelectedTutors = [
      ...selectedTutors,
      {
        mockTutorEmail: tutorLedInputValue,
      },
    ];
    if (newSelectedTutors) setSelectedTutors(newSelectedTutors);
    setTutorLedInputValue("");
  };

  const deleteSelectedTutor = (tutorEmail: string) => {
    const remainedSelectedTutors = selectedTutors.filter(
      (selectedTutor: { mockTutorEmail: string }) =>
        selectedTutor.mockTutorEmail !== tutorEmail
    );
    if (remainedSelectedTutors) {
      setSelectedTutors(remainedSelectedTutors);
    }
  };

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
              className="border-border/20 bg-black/50 py-2 text-sm text-white/80 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed
          disabled:opacity-50"
            />

            <datalist id="tutors">
              {mockTutors.map((mockTutor) => (
                <option key={mockTutor._id} value={mockTutor.mockTutorEmail} />
              ))}
            </datalist>
            <Button
              variant={"outline"}
              onClick={addSelectedTutors}
              disabled={selectedTutors.length > 2}
              className="bg-transparent border-border/20 text-white/80 hover:bg-accent/50 hover:text-white"
            >
              Add
            </Button>
          </div>
          {selectedTutors.length > 2 && (
            <div className="text-xs text-orange-500">
              * You can select up to 3 tutors only
            </div>
          )}
        </div>
      )}
      {selectedTutors && (
        <div>
          {selectedTutors.map((tutor, index) => {
            return (
              <div key={index} className="flex justify-between items-center">
                <Label className="text-white/80 font-normal">
                  {tutor.mockTutorEmail}
                </Label>

                <Button
                  variant={"ghost"}
                  onClick={() => {
                    deleteSelectedTutor(tutor.mockTutorEmail);
                  }}
                  className="hover:bg-accent/50 text-white/80"
                >
                  x
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
