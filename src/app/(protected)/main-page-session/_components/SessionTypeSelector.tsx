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
  const [tutorLedInputValue, setTutorLedInputValue] = useState<string>("");
  const { teachers } = useTeacher();

  const handleChangeSessionType = (value: string) => {
    setSelectedSessionType(value);
  };

  const addSelectedTutors = () => {
    const newSelectedTutors = [
      ...selectedTutors,
      {
        mockUserEmail: tutorLedInputValue,
      },
    ];

    const orderedSelectedTutors = newSelectedTutors?.map((tutor, index) => ({
      ...tutor,
      order: index + 1,
    }));

    if (orderedSelectedTutors) {
      setSelectedTutors(orderedSelectedTutors);
    }
    setTutorLedInputValue("");
  };

  const deleteSelectedTutor = (tutorEmail: string) => {
    const remainedSelectedTutors = selectedTutors.filter(
      (selectedTutor: { mockUserEmail: string }) =>
        selectedTutor.mockUserEmail !== tutorEmail
    );

    const orderedRemainedTutors = remainedSelectedTutors?.map(
      (tutor, index) => ({
        ...tutor,
        order: index + 1,
      })
    );

    if (orderedRemainedTutors) {
      setSelectedTutors(orderedRemainedTutors);
    }
  };

  const handleSelfLedMode = () => {
    setSelectedTutors([]);
  };

  const notChosenTutors = selectedTutors.map((tutor) => tutor.mockUserEmail);
  const avalaibleTeachers = teachers.filter(
    (teacher) => !notChosenTutors.includes(teacher.mockUserEmail)
  );

  return (
    <div className="flex flex-col gap-3">
      <Label>Давтлагын хэлбэр</Label>
      <RadioGroup
        value={selectedSessionType}
        onValueChange={handleChangeSessionType}
        className="flex justify-around text-white/80"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="tutor-led"
            id="tutor-led"
            className="bg-white rounded-full"
          />
          <Label htmlFor="tutor-led" className="text-white/70">
            Ментортой
          </Label>
        </div>
        <div
          className="flex items-center space-x-2"
          onClick={handleSelfLedMode}
        >
          <RadioGroupItem
            value="self-led"
            id="self-led"
            className="bg-white rounded-full"
          />
          <Label htmlFor="self-led" className="text-white/70">
            Бие даан
          </Label>
        </div>
      </RadioGroup>

      {selectedSessionType === "tutor-led" && (
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between gap-3">
            <Input
              list="tutors"
              value={tutorLedInputValue}
              onChange={(e) => setTutorLedInputValue(e.target.value)}
              placeholder="Менторын имэйл хаягийг бичнэ үү..."
              className="border-border/20 bg-black/50 py-2 text-sm text-white/80 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed
          disabled:opacity-50"
            />

            <datalist id="tutors">
              {avalaibleTeachers.map((teacher) => (
                <option key={teacher._id} value={teacher.mockUserEmail} />
              ))}
            </datalist>
            <Button
              variant={"outline"}
              onClick={addSelectedTutors}
              disabled={selectedTutors.length > 2 || !tutorLedInputValue}
              className="bg-transparent hover:bg-accent/50 border-border/20 text-white/80 hover:text-white"
            >
              Нэмэх
            </Button>
          </div>
          {selectedTutors.length > 2 && (
            <div className="text-xs text-orange-500">*Дээд тал нь 3 ментор</div>
          )}
        </div>
      )}
      {selectedTutors && (
        <div>
          {selectedTutors.map((tutor, index) => {
            return (
              <div key={index} className="flex justify-between items-center">
                <Label className="text-white/80 font-normal">
                  {tutor.mockUserEmail}
                </Label>

                <Button
                  variant={"ghost"}
                  onClick={() => {
                    deleteSelectedTutor(tutor.mockUserEmail);
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
