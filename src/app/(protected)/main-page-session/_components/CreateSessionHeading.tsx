import React from "react";

export const CreateSessionHeading = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-2xl leading-7 font-semibold text-white">
        Давтлага товлох
      </div>
      <div className="text-sm leading-5 text-muted-foreground">
        Мэдээлэлээ дэлгэрэнгүй оруулна уу.
      </div>
    </div>
  );
};
