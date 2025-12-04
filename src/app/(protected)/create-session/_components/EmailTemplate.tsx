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
export const EmailTemplateLink = ({ link }: { link: string }) => {
  return (
    <div>
      <h2>You are invited!</h2>
      <p>Join the session using the link below:</p>

      <a href={link}>{link}</a>
    </div>
  );
};
