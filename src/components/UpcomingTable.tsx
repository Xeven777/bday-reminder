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
              <TableHead className="hidden sm:table-cell">Autosend</TableHead>
              <TableHead className="hidden sm:table-cell">
                Relationship
              </TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Days Left</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>
                  <div className="font-medium">{data.name}</div>
                  <div className="hidden text-xs text-muted-foreground md:inline">
                    {data.friendEmail}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {data.autosend === true ? "On" : "Off"}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {data.tag}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {data.bdate.toLocaleDateString("en-In")}
                </TableCell>
                <TableCell className="text-right">
                  {(data.bdate.getDate() - new Date().getDate()).toLocaleString(
                    "en-In"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UpcomingTable;
