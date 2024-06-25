"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { generateEmailBody, sendEmail } from "@/actions/genEmail";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkAndSendBirthdayEmails() {
  // Get today's date components
  const today = new Date();
  const todayMonth = today.getUTCMonth() + 1; // getUTCMonth is zero-based
  const todayDate = today.getUTCDate();

  console.log(`Checking birthdays for: ${todayMonth}-${todayDate}`);

  // Find all potential birthdays
  const allBirthdays = await prisma.bdateInfo.findMany({
    select: {
      userId: true,
      name: true,
      friendEmail: true,
      bdate: true,
    },
  });

  // Filter records for today's month and day
  const birthdaysToday = allBirthdays.filter((birthdayPerson) => {
    const bdate = new Date(birthdayPerson.bdate);
    const bdateMonth = bdate.getUTCMonth() + 1;
    const bdateDate = bdate.getUTCDate() + 1;
    return bdateMonth === todayMonth && bdateDate === todayDate;
  });

  console.log("Birthdays today:", birthdaysToday);

  for (const birthdayPerson of birthdaysToday) {
    console.log(`Sending birthday email to ${birthdayPerson.name}...`);

    if (birthdayPerson.friendEmail) {
      const userdetails = await logUsers(birthdayPerson.userId);
      if (!userdetails) {
        console.error("User not found");
        continue;
      }
      const fullName = userdetails.fullName;
      await send(
        birthdayPerson.name,
        birthdayPerson.friendEmail,
        fullName || "Good Guy"
      );
    }
  }

  console.log("Birthday emails sent!");
}

async function logUsers(userId: string) {
  try {
    const users = await clerkClient.users.getUser(userId);
    const fullName = users.fullName ? users.fullName : users.firstName;
    const senderEmail = users.emailAddresses[0].emailAddress;
    return { fullName, senderEmail };
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

logUsers("user_2fzdx2wbPGVETS43hGcBTjM3s5c");

// checkAndSendBirthdayEmails()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

async function send(name: string, email: string, from: string) {
  const emailbody = await generateEmailBody(name, from);
  await sendEmail(emailbody, email);
}
