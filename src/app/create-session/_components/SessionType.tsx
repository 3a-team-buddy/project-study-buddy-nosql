"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { MockTutorType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type SelectedTutorsType = {
  mockTutorEmail: string;
};

export const SessionType = () => {
  const [selectedSessionType, setSelectedSessionType] = useState<string>("");
  const [mockTutors, setMockTutors] = useState<MockTutorType[]>([]);
  const [selectedTutors, setSelectedTutors] = useState<SelectedTutorsType[]>(
    []
  );
  const [tutorLedInputValue, setTutorLedinputValue] = useState<string>("");

  const handleChangeSessionType = (value: string) => {
    setSelectedSessionType(value);
    if (value === "tutor-led") console.log("Tutor-led Session");
    if (value === "self-led") console.log("Self-led Session");
  };

  const getMockTutors = async () => {
    const result = await fetch("api/mock-datas/create-mock-tutor");
    const responseData = await result.json();
    const { mockTutors } = responseData;
    console.log(mockTutors, "GET data");
    setMockTutors(mockTutors);
  };

  useEffect(() => {
    getMockTutors();
  }, []);

  const addSelectedTutors = () => {
    const newSelectedTutors = [
      ...selectedTutors,
      {
        mockTutorEmail: tutorLedInputValue,
      },
    ];
    if (newSelectedTutors) setSelectedTutors(newSelectedTutors);
    setTutorLedinputValue("");
  };
  console.log(selectedTutors);

  const deleteSelectedTutor = (tutor: any) => {
    console.log({ tutor });
    console.log(selectedTutors, "aaaaaaa");
    const remainSelectedTutors = selectedTutors.filter(
      (selectedTutor) => selectedTutor.mockTutorEmail !== tutor
    );
    // const newSelectedTutors = [
    //   ...selectedTutors,
    //   {
    //     mockTutorEmail: remainSelectedTutors,
    //   },
    // ];
    if (remainSelectedTutors) {
      setSelectedTutors(remainSelectedTutors);
    }
    console.log({ remainSelectedTutors });
    // setSelectedTutors(remainSelectedTutors);
    // alert(tutor);
  };

  return (
    <div className="flex flex-col gap-5">
      <h3>Session Type</h3>
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
          <Label htmlFor="tutor-led">Tutor-led Session</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="self-led" id="self-led" className="bg-white" />
          <Label htmlFor="self-led">Self-led Session</Label>
        </div>
      </RadioGroup>
      {selectedSessionType === "tutor-led" && (
        <div className="flex justify-between gap-5 ">
          <input
            list="tutors"
            placeholder="Type your tutors here..."
            className="flex h-9 w-full rounded-md border bg-none px-3 py-2 text-sm border-[#323743FF] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed
          disabled:opacity-50"
            value={tutorLedInputValue}
            onChange={(e) => setTutorLedinputValue(e.target.value)}
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
                    deleteSelectedTutor(tutor);
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
