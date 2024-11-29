"use client";

import { useEffect, useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, Loader, Share2 } from "lucide-react";
import { generate } from "@/actions/ai-wish";

export const maxDuration = 30;

const AiForm = () => {
  const [shareable, setShareable] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareable(navigator.share !== undefined);
    }
  }, []);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tone, setTone] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");
  const [wish, setWish] = useState<string>("");

  const prompt = `Create a birthday wish for ${name}, who is my ${relationship}, in  ${tone} tone.`;

  async function handleSubmit() {
    setLoading(true);
    try {
      const { output } = await generate(prompt);
      for await (const delta of readStreamableValue(output)) {
        setWish((currentWish) => `${currentWish}${delta}`);
      }
      toast.success("Wish generated successfully");
    } catch (e) {
      toast.error("An error occurred. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 mt-2 w-full md:grid-cols-2">
      <form className="flex pt-16 flex-col gap-2 border min-w-full max-w-md p-2 rounded-md">
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

      <div className="flex w-full flex-col p-2 relative border rounded-md">
        {wish && (
          <Button
            onClick={() => {
              if (!wish) return;
              navigator.clipboard.writeText(wish);
              toast.success("Copied to clipboard");
            }}
            className="absolute top-2 right-2"
            size={"icon"}
            variant={"outline"}
          >
            <Copy size={20} />
          </Button>
        )}

        {shareable ? (
          <Button
            className="absolute top-2 right-14"
            size={"icon"}
            variant={"secondary"}
            onClick={() => {
              if (wish === "")
                return toast.warning("Wish is empty. Generate the Wish first!");
              if (typeof window !== "undefined") {
                navigator.share({
                  title: "Happy Birthday!",
                  text: wish,
                });
              }
            }}
          >
            <Share2 size={20} />
          </Button>
        ) : null}
        <h2 className="p-2 font-semibold">Generated wish :</h2>
        <div className="py-2 w-full h-full mt-4 rounded-lg border-2 border-dashed border-purple-700/40 text-sm flex items-center justify-center min-h-40">
          <p className="p-4 text-lg">
            {wish} {loading && <Loader className="animate-spin" />}
          </p>
          {!wish && !loading && (
            <p className="text-muted-foreground text-sm">
              Your wish will appear here
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiForm;
