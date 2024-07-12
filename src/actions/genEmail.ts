"use server";

import nodemailer from "nodemailer";
import BirthdayEmail from "./index";
import BirthdayWishEmail from "./emailtoUser";
import { renderAsync } from "@react-email/components";

export async function generateEmailBody(name: string, from: string) {
  const subject = "Happy Birthdayy " + name + "!";

  const body = renderAsync(
    BirthdayEmail({
      recipientName: name,
      senderName: from,
    }),
    {
      pretty: true,
    }
  );

  return { subject, body };
}

export async function generateEmailBodyForUser(name: string) {
  const subject = "Birthday email sent to " + name;
  const body = renderAsync(
    BirthdayWishEmail({
      name: name,
    }),
    {
      pretty: true,
    }
  );

  return { subject, body };
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: "hotmail",
  port: 2525,
  auth: {
    user: "xevenbiswas@outlook.com",
    pass: process.env.EMAIL_PW,
  },
  maxConnections: 1,
});

export const sendEmail = async (emailContent: EmailContent, sendTo: string) => {
  const mailOptions = {
    from: "xevenbiswas@outlook.com",
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };
  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};

type EmailContent = {
  subject: string;
  body: string;
};
