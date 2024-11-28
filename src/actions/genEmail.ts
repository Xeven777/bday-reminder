"use server";

import { Resend } from "resend";
import BirthdayEmail from "./index";
import BirthdayWishEmail from "./emailtoUser";
import { render } from "@react-email/components";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function generateEmailBody(name: string, from: string) {
  return {
    subject: `Happy Birthday ${name}!`,
    body: render(
      BirthdayEmail({
        recipientName: name,
        senderName: from,
      })
    ),
  };
}

export async function generateEmailBodyForUser(name: string) {
  return {
    subject: `Birthday email sent to ${name}`,
    body: render(
      BirthdayWishEmail({
        name: name,
      })
    ),
  };
}

export async function sendEmail(emailContent: EmailContent, sendTo: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Birthday Reminder <bdayreminder@anish7.me>",
      to: [sendTo],
      subject: emailContent.subject,
      html: emailContent.body,
      tags: [{ name: "category", value: "birthday" }],
    });

    if (error) {
      console.error("Email sending failed:", error);
      return { error: error.message, status: 500 };
    }

    return data;
  } catch (error) {
    console.error("Unexpected error: ", error);
    return null;
  }
}

type EmailContent = {
  subject: string;
  body: string;
};
