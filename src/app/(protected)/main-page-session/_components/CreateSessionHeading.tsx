import React from "react";

export const CreateSessionHeading = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-2xl leading-7 font-semibold text-white">
        Create New Study Session
      </div>
      <div className="text-sm leading-5 text-muted-foreground">
        Define the details for your next learning session.
      </div>
    </div>
  );
};
