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
import { CircleCheckBig, CircleX } from "lucide-react";

const calculateDaysLeft = (birthdate: Date): number => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const nextBirthday = new Date(
    currentYear,
    birthdate.getMonth(),
    birthdate.getDate()
  );

  if (currentDate > nextBirthday) {
    nextBirthday.setFullYear(currentYear + 1);
  }
  const diffTime = nextBirthday.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const calculateCurrentAge = (birthdate: Date): string => {
  const currentDate = new Date();
  const birthYear = birthdate.getFullYear();
  let ageInYears = currentDate.getFullYear() - birthYear;

  const nextBirthday = new Date(
    currentDate.getFullYear(),
    birthdate.getMonth(),
    birthdate.getDate()
  );
  if (currentDate < nextBirthday) {
    ageInYears--;
  }

  const daysSinceLastBirthday =
    (currentDate.getTime() -
      new Date(
        currentDate.getFullYear(),
        birthdate.getMonth(),
        birthdate.getDate()
      ).getTime()) /
    (1000 * 60 * 60 * 24);
  const daysSince = Math.floor(daysSinceLastBirthday);

  return `${ageInYears} years and ${
    daysSince < 0 ? 365 + daysSince : daysSince
  } days`;
};

const UpcomingTable = async () => {
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

  const sortedData = allData.sort((a, b) => {
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Current Age</TableHead>
              <TableHead className="text-start">Days Left</TableHead>
              <TableHead className="hidden sm:table-cell">
                Relationship
              </TableHead>
              <TableHead className="hidden md:table-cell">Birth-Date</TableHead>
              <TableHead className="hidden sm:table-cell">Autosend</TableHead>
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
                  <TableCell>{currentAge}</TableCell>

                  <TableCell className="text-start ">{daysLeft}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {/* @ts-ignore  */}
                    <Badge className="text-sm" variant={data.tag}>
                      {data.tag}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(data.bdate).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {data.autosend === true ? (
                      <CircleCheckBig color="lime" className="ml-5" />
                    ) : (
                      <CircleX color="red" className="ml-5" />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UpcomingTable;