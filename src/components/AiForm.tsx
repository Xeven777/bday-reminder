"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

const AiForm = () => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tone, setTone] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");
  const [wish, setWish] = useState<string>("");

  const apikey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apikey}`;

  async function handleSubmit() {
    setLoading(true);
    const prompt = `Create a birthday wish for ${name}, who is my ${relationship}, in  ${tone} tone.use emojis too. should be atleast 3 or more lines. give only the wish , no other text.`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });
      const data = await response.json();
      setWish(data.candidates[0].content.parts[0].text);
      console.log(data);
      toast.success("Wish generated successfully");
    } catch (e) {
      toast.error("An error occurred. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="flex flex-col gap-2 border min-w-full max-w-md p-2 rounded-md">
        <Input
          type="text"
          name="name"
          required
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select onValueChange={(value) => setTone(value)} name="tone">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Casual">Casual</SelectItem>
            <SelectItem value="Funny">Funny</SelectItem>
            <SelectItem value="Formal">Formal</SelectItem>
            <SelectItem value="Professional">Professional</SelectItem>
            {/* <SelectItem value="in love">Love</SelectItem> */}
            <SelectItem value="Sarcastic">Sarcastic</SelectItem>
            <SelectItem value="Unique and Creative">
              Unique and Creative
            </SelectItem>
            <SelectItem value="Poetic">Poetic</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setRelationship(value)}
          name="relationship"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Friend">Friend</SelectItem>
            <SelectItem value="Colleague">Colleague</SelectItem>
            <SelectItem value="Mom">Mom</SelectItem>
            <SelectItem value="Dad">Dad</SelectItem>
            <SelectItem value="Homie">Homie</SelectItem>
            <SelectItem value="Girlfriend">Girlfriend</SelectItem>
            <SelectItem value="Boyfriend">Boyfriend</SelectItem>
          </SelectContent>
        </Select>

        <Button disabled={loading} type="submit" onClick={handleSubmit}>
          Generate
        </Button>
      </form>
      <div className="flex flex-col p-2 border rounded-md mt-6">
        <h2 className="p-2 font-semibold">Generated wish :</h2>
        <div className="py-2 min-h-32 mt-4 rounded-lg border-2 border-dashed border-purple-700/40 text-sm flex items-center justify-center">
          {loading ? (
            <div className="flex justify-center items-center h-20">
              <Skeleton className="w-full h-full rounded-md" />
            </div>
          ) : (
            <p>{wish}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AiForm;
