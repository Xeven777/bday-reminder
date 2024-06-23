"use server";

import { generateEmailBody, sendEmail } from "@/actions/genEmail";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkAndSendBirthdayEmails() {
  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find all birthdays that match today's date
  const birthdaysToday = await prisma.bdateInfo.findMany({
    where: {
      bdate: {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    },
    select: {
      name: true,
      friendEmail: true,
      userName: true,
    },
  });

  for (const birthdayPerson of birthdaysToday) {
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
