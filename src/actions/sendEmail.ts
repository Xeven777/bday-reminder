"use server";
import { clerkClient } from "@clerk/nextjs/server";
import {
  generateEmailBody,
  generateEmailBodyForUser,
  sendEmail,
} from "@/actions/genEmail";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkAndSendBirthdayEmails() {
  const today = new Date();
  const todayMonth = today.getUTCMonth() + 1;
  const todayDate = today.getUTCDate() + 1; // had to do for indian timezome ;") 

  console.log(`Checking birthdays for: ${todayMonth}-${todayDate}`);

  const allBirthdays = await prisma.bdateInfo.findMany({
    select: {
      userId: true,
      name: true,
      friendEmail: true,
      bdate: true,
    },
  });

  const birthdaysToday = allBirthdays.filter((birthdayPerson) => {
    const bdate = new Date(birthdayPerson.bdate);
    const bdateMonth = bdate.getUTCMonth() + 1;
    const bdateDate = bdate.getUTCDate() + 1; // had to do for indian timezome ;")
    console.log(
      `Checking ${birthdayPerson.name} for: ${bdateMonth}-${bdateDate}`
    );
    return bdateMonth === todayMonth && bdateDate === todayDate;
  });

  console.log("Birthdays today:", birthdaysToday);
  const sendPromises = birthdaysToday.map(async (birthdayPerson) => {
    console.log(`Sending birthday email to ${birthdayPerson.name}...`);

    if (birthdayPerson.friendEmail) {
      const userdetails = await logUsers(birthdayPerson.userId);
      if (!userdetails) {
        console.error("User not found");
        return;
      }
      const fullName = userdetails.fullName || "A Good Guy";
      const userEmail = userdetails.senderEmail;
      await send(birthdayPerson.name, birthdayPerson.friendEmail, fullName);
      await sendToUser(birthdayPerson.name, userEmail);
    }
  });
  await Promise.all(sendPromises);

  console.log("Birthday emails sent!");
}

async function logUsers(userId: string) {
  try {
    const users = await clerkClient().users.getUser(userId);
    const fullName = users.fullName || users.firstName;
    const senderEmail = users.emailAddresses[0].emailAddress;
    return { fullName, senderEmail };
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}

checkAndSendBirthdayEmails()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
    process.exit(0);
  });

async function send(name: string, email: string, from: string) {
  const emailbody = await generateEmailBody(name, from);
  await sendEmail({ ...emailbody, body: await emailbody.body }, email);
}

async function sendToUser(name: string, email: string) {
  const emailbody = await generateEmailBodyForUser(name);
  await sendEmail({ ...emailbody, body: await emailbody.body }, email);
}
