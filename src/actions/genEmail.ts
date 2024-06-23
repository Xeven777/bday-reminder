"use server";

import nodemailer from "nodemailer";

export async function generateEmailBody(name: string, from: string) {
  const subject = "Bday Test";
  const url = "https://openme.vercel.app/b/" + btoa(name);
  const body = `
    <div style="font-family:sans;">
    <h1>Hello ${name} !</h1>
    <h2>You got a response</h3>
    <div style="border: 1px solid #ff4968; padding: 10px; background-color:rgb(56, 23, 29,0.7);border-radius:15px;color:white;">
      <h3>Your Bday Nigga?? : from - ${from}</h3>
      <a href="${url}">Click</a>

      <img src="https://gifdb.com/images/high/yay-milk-and-mocha-bears-cheering-confetti-9rjvz35rjxvj7oup.gif" alt="yay" style="width: 100%;height:auto;" />
    </div>
    <p>Have a great day !!!!</p>
  </div>
      `;

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
