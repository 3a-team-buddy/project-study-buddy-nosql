import React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate = ({ firstName }: EmailTemplateProps) => {
  return (
    <div>
      <div>Welcome, {firstName}</div>
    </div>
  );
};
