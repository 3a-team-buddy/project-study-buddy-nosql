import { Separator } from "@/components/ui";
import React from "react";

export const CreateSessionHeading = () => {
  return (
    <div className="flex flex-col gap-7">
      <div className="text-2xl leading-7 font-semibold text-white">
        Давтлага үүсгэх
      </div>
      <div className="text-sm leading-5 text-muted-foreground">
        <Separator className="bg-gray-800" />
      </div>
    </div>
  );
};
