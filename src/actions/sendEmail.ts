"use server";

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
      name: true,
      friendEmail: true,
      userName: true,
      bdate: true,
    },
  });

  // Filter records for today's month and day
  const birthdaysToday = allBirthdays.filter((birthdayPerson) => {
    const bdate = new Date(birthdayPerson.bdate);
    const bdateMonth = bdate.getUTCMonth() + 1;
    const bdateDate = bdate.getUTCDate()+1;
    return bdateMonth === todayMonth && bdateDate === todayDate;
  });

  console.log("Birthdays today:", birthdaysToday);

  for (const birthdayPerson of birthdaysToday) {
    console.log(`Sending birthday email to ${birthdayPerson.name}...`);
    if (birthdayPerson.friendEmail) {
      await send(
        birthdayPerson.name,
        birthdayPerson.friendEmail,
        birthdayPerson.userName || "Good Guy"
      );
    }
  }

  console.log("Birthday emails sent!");
}

checkAndSendBirthdayEmails()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function send(name: string, email: string, from: string) {
  const emailbody = await generateEmailBody(name, from);
  await sendEmail(emailbody, email);
}
