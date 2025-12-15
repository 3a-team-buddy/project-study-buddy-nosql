"use client";

import React, { Dispatch } from "react";
import { Label, Slider } from "@/components/ui";

export const MemberLimitSelector = ({
  minMember,
  setMinMember,
  maxMember,
  setMaxMember,
}: {
  minMember: number;
  setMinMember: Dispatch<React.SetStateAction<number>>;
  maxMember: number;
  setMaxMember: Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Label>Сурагчдын тоо</Label>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <Label className="text-white/70">Доод лимит : {minMember}</Label>
          <Label className="text-white/70">Дээд лимит : {maxMember}</Label>
        </div>
        <Slider
          min={3}
          max={30}
          step={1}
          value={[minMember, maxMember]}
          onValueChange={([min, max]) => {
            setMinMember(min);
            setMaxMember(max);
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
