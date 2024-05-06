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

const calculateDaysLeft = (birthdayDate: Date): number => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const isBirthdayPassedThisYear = currentDate > birthdayDate;
  const nextYearBirthdayDate = isBirthdayPassedThisYear
    ? new Date(currentYear, birthdayDate.getMonth(), birthdayDate.getDate())
    : birthdayDate;
  return Math.ceil(
    (nextYearBirthdayDate.getTime() - currentDate.getTime()) /
      (1000 * 60 * 60 * 24)
  );
};

const calculateCurrentAge = (birthdate: Date): string => {
  const currentDate = new Date();
  const ageInYears = currentDate.getFullYear() - birthdate.getFullYear();
  const birthdayThisYear = new Date(
    currentDate.getFullYear(),
    birthdate.getMonth(),
    birthdate.getDate()
  );
  if (currentDate < birthdayThisYear) {
    return `${ageInYears - 1} years and ${
      365 - calculateDaysLeft(birthdate)
    } days`;
  } else if (currentDate > birthdayThisYear) {
    return `${ageInYears} years and ${calculateDaysLeft(birthdate)} days`;
  } else {
    return `${ageInYears} years`;
  }
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
                    {data.bdate.toLocaleDateString("en-In")}
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
