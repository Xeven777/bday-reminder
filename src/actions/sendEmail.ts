"use server";

export const runtime = "edge";

import { generateEmailBody, sendEmail } from "@/actions/genEmail";

async function send(name: string, email: string, from: string) {
  const emailbody = await generateEmailBody(name, from);
  await sendEmail(emailbody, email);
}

