"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { InfoIcon } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const BdayForm = (userinfo: { userId: string }) => {
  const router = useRouter();
  const user = useUser();

  const userId = userinfo.userId;
  const [autosend, setAutosend] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const birthdayString = `${month}/${day}/${year}`;
      const birthday = new Date(birthdayString).toISOString();
      console.log(birthday);
      const response = await fetch("/api/addbd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name,
          birthday,
          email,
          tag,
          autosend,
        }),
      });
      console.log(response);
      if (response.ok) {
        toast.success("Reminder added successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="z-20 w-full max-w-md rounded-lg bg-card p-6 shadow-purple-800/30 transition-all shadow-inner glow-card">
      <h1 className="bric mb-4 text-3xl font-bold glow-d">
        Add Birthday Reminder
      </h1>
      <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label
            className="mb-2 block text-sm font-medium text-muted-foreground"
            htmlFor="name"
          >
            Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the person's name"
            required
            type="text"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              className="mb-2 block text-sm font-medium text-muted-foreground"
              htmlFor="day"
            >
              Day
            </label>
            <Input
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
              id="day"
              max="31"
              min="1"
              placeholder="7"
              type="number"
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-muted-foreground"
              htmlFor="email"
            >
              Month
            </label>
            <Select required value={month} onValueChange={setMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                <SelectGroup>
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-muted-foreground"
              htmlFor="year"
            >
              Year
            </label>
            <Input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              id="year"
              max="2024"
              min="1900"
              placeholder="2003"
              type="number"
            />
          </div>
        </div>

        <Select required value={tag} onValueChange={setTag}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Friend">Friend</SelectItem>
              <SelectItem value="Family">Family</SelectItem>
              <SelectItem value="Colleague">Colleague</SelectItem>
              <SelectItem value="Love">Love</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="inline-flex gap-2">
          <Switch
            id="autosend"
            checked={autosend}
            onCheckedChange={setAutosend}
          />
          Auto-Send emails to them
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-muted-foreground"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Their Email "
            type="email"
            required={autosend}
          />
          <p className="text-xs text-muted-foreground pt-2 inline-flex">
            <InfoIcon size={14} className="mr-1 pt-0.5" /> This is the email
            where we will send the birthday wish to the person. Make sure to
            fill it correctly.
          </p>
        </div>
        <Button disabled={loading} type="submit">
          Add Reminder
        </Button>
      </form>
    </div>
  );
};

export default BdayForm;
