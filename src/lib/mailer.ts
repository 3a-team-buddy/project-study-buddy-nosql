import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

// Helper function to send email
// export const sendEmail = async ({ to, subject, html }) => {
//   try {
//     return transporter.sendMail({
//       from: `"Study Buddy" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };
