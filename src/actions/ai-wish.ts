"use server";

import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { createStreamableValue } from "ai/rsc";

export async function generate(input: string) {
  try {
    const stream = createStreamableValue("");

    (async () => {
      const { textStream } = streamText({
        model: google("gemini-1.5-flash-8b"),
        prompt: input,
        system:
          "You are a Happy birthday wish generator. Create a birthday wish for someone, who is your friend, in a happy tone. Use emojis too. The wish should be at least 5 or more lines. Give only the wish, no other text. Write as much as you can.",
      });

      for await (const delta of textStream) {
        stream.update(delta);
      }

      stream.done();
    })();

    return { output: stream.value };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
