import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
} from "@react-email/components";
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
    <Html>
      <Head />
      <Body style={{ fontFamily: "sans-serif" }}>
        <Container>
          <Text>You have been invited to a Study Session!</Text>

          <Text>Click the link below to join:</Text>

          <Link href={link}>{link}</Link>
        </Container>
      </Body>
    </Html>
  );
};
