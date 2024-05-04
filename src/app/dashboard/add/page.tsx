"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

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

const Page = () => {
  const [autosend, setAutosend] = useState(false);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");

  return (
    <div className="flex flex-col gap-2 justify-center mx-auto items-center">
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-purple-800/30 transition-all shadow-inner">
        <h1 className="bric mb-4 text-3xl font-bold">Add Birthday Reminder</h1>
        <form className="space-y-5">
          <div>
            <label
              className="mb-2 block text-sm font-medium text-muted-foreground"
              htmlFor="name"
            >
              Name
            </label>
            <Input
              id="name"
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
              <Input id="day" max="31" min="1" placeholder="7" type="number" />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium text-muted-foreground"
                htmlFor="email"
              >
                Month
              </label>
              <Select autoComplete="december">
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
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
                id="year"
                max="2024"
                min="1900"
                placeholder="2003"
                type="number"
              />
            </div>
          </div>
          <Switch
            id="autosend"
            checked={autosend}
            onCheckedChange={setAutosend}
          />
          <div>
            <label
              className="mb-2 block text-sm font-medium text-muted-foreground"
              htmlFor="email"
            >
              Email
            </label>
            <Input id="email" placeholder="Their Email " type="email" />
            <p className="text-xs text-muted-foreground">
              This is the email where we will send the birthday wish. Make sure
              to fill it correctly.
            </p>
          </div>
          <Button>Add Reminder</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
