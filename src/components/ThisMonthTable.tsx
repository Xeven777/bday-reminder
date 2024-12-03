import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db/prisma";
import { CircleCheckBig, CircleX, Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import Deletebtn from "./Deletebtn";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const calculateDaysLeft = (birthdate: Date): number => {
  const currentDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const birthdateInTimezone = new Date(
    birthdate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const currentYear = currentDate.getFullYear();
  const nextBirthday = new Date(
    currentYear,
    birthdateInTimezone.getMonth(),
    birthdateInTimezone.getDate()
  );

  if (
    currentDate.toDateString().slice(0, 10) ===
    nextBirthday.toDateString().slice(0, 10)
  ) {
    return 0;
  }

  if (currentDate > nextBirthday) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  nextBirthday.setHours(nextBirthday.getHours());
  nextBirthday.setMinutes(nextBirthday.getMinutes());

  const diffTime = nextBirthday.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const calculateCurrentAge = (birthdate: Date): string => {
  const currentDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const birthdateInTimezone = new Date(
    birthdate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const birthYear = birthdateInTimezone.getFullYear();
  let ageInYears = currentDate.getFullYear() - birthYear;

  const nextBirthday = new Date(
    currentDate.getFullYear(),
    birthdateInTimezone.getMonth(),
    birthdateInTimezone.getDate()
  );
  if (currentDate < nextBirthday) {
    ageInYears--;
  }

  const daysSinceLastBirthday =
    (currentDate.getTime() -
      new Date(
        currentDate.getFullYear(),
        birthdateInTimezone.getMonth(),
        birthdateInTimezone.getDate()
      ).getTime()) /
    (1000 * 60 * 60 * 24);
  const daysSince = Math.floor(daysSinceLastBirthday);

  return `${ageInYears} years and ${
    daysSince < 0 ? 365 + daysSince : daysSince
  } days`;
};

const ThisMonthTable = async () => {
  const { userId } = auth();

  if (userId === null) {
    return;
  }

  const allData = await prisma.bdateInfo.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const currentDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const currentMonth = currentDate.getMonth();

  const filteredData = allData.filter((data) => {
    const birthdate = new Date(data.bdate);
    return birthdate.getMonth() === currentMonth;
  });

  const sortedData = filteredData.sort((a, b) => {
    const daysLeftA = calculateDaysLeft(new Date(a.bdate));
    const daysLeftB = calculateDaysLeft(new Date(b.bdate));
    return daysLeftA - daysLeftB;
  });

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Birthdays</CardTitle>
        <CardDescription>Check out the upcoming Birthdays.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-w-[290px] whitespace-nowrap rounded-md sm:max-w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-start">Days Left</TableHead>
                <TableHead>Current Age</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Relationship
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Birth-Date
                </TableHead>
                <TableHead className="hidden sm:table-cell">Autosend</TableHead>
                <TableHead className="hidden sm:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((data) => {
                const daysLeft = calculateDaysLeft(new Date(data.bdate));
                const currentAge = calculateCurrentAge(new Date(data.bdate));
                return (
                  <TableRow key={data.id}>
                    <TableCell>
                      <div className="font-medium text-xl">{data.name}</div>
                      <div className="hidden text-xs text-muted-foreground md:inline">
                        {data.friendEmail}
                      </div>
                    </TableCell>
                    <TableCell className="text-start">
                      {daysLeft === 0
                        ? "Todayyyy🥳"
                        : daysLeft === 1
                        ? "Tomorroww🤩"
                        : `${daysLeft} days`}
                    </TableCell>
                    <TableCell>{currentAge}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {/* @ts-ignore */}
                      <Badge className="text-sm" variant={data.tag}>
                        {data.tag}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(data.bdate).toLocaleDateString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {data.autosend === true ? (
                        <CircleCheckBig color="lime" className="ml-5" />
                      ) : (
                        <CircleX color="red" className="ml-5" />
                      )}
                    </TableCell>
                    <TableCell className="table-cell">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"outline"} size={"icon"}>
                            <Settings2 size={20} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/edit?id=${data.id}`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="bg-destructive" asChild>
                            <Deletebtn bdayid={data.id} />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ThisMonthTable;
