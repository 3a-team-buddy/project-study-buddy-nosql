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

  const deleteSelectedTutor = (tutor: string) => {
    console.log({ tutor });
    console.log(selectedTutors, "aaaaaaa");
    const remainSelectedTutors = selectedTutors.filter(
      (selectedTutor: { mockTutorEmail: string }) =>
        selectedTutor.mockTutorEmail !== tutor
    );
    if (remainSelectedTutors) {
      setSelectedTutors(remainSelectedTutors);
    }
    console.log({ remainSelectedTutors });
  };

  return (
    <div className="flex flex-col gap-5">
      <Label>Session Type</Label>
      <RadioGroup
        value={selectedSessionType}
        onValueChange={handleChangeSessionType}
        className="flex justify-between mx-20"
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
        <div className="flex justify-between gap-3">
          <Input
            list="tutors"
            placeholder="Type your tutors here..."
            className="border bg-none px-3 py-2 text-sm border-[#323743FF] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed
          disabled:opacity-50"
            value={tutorLedInputValue}
            onChange={(e) => setTutorLedInputValue(e.target.value)}
          />
          <datalist id="tutors">
            {mockTutors.map((mockTutor) => (
              <option key={mockTutor._id} value={mockTutor.mockTutorEmail} />
            ))}
          </datalist>
          <Button
            variant={"outline"}
            className="bg-transparent border-[#323743FF] hover:bg-[#FFFFFF14] hover:text-primary-foreground"
            onClick={addSelectedTutors}
            disabled={selectedTutors.length > 2}
          >
            Add
          </Button>
        </div>
      )}
      {selectedTutors && (
        <div>
          {selectedTutors.map((tutor, index) => {
            return (
              <div key={index} className="flex justify-between">
                <div>{tutor.mockTutorEmail}</div>

                <Button
                  variant={"ghost"}
                  className="hover:bg-accent/50"
                  onClick={() => {
                    deleteSelectedTutor(tutor.mockTutorEmail);
                  }}
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
