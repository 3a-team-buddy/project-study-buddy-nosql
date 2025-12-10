import { transporter } from "@/lib/mailer";

await transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: process.env.GMAIL_USER,
  subject: "Test",
  text: "Testing Gmail",
});
