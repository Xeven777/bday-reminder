import Link from "next/link";
import {
  File,
  ListFilter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingTable from "@/components/UpcomingTable";
const dashboard = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 place-items-center max-w-screen-xl mx-auto ml-10">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 mx-auto">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Birthday</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Orders Dashboard for Seamless Management
                and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>Create New Order</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Add Birthday</CardDescription>
            </CardHeader>
            <CardContent className="font-semibold">
              Don&apos;t ever forget to wish again!
            </CardContent>
            <CardFooter>
              <Button asChild size="sm">
                <Link href={"/dashboard/add"}>Add Birthday!</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>boring wishes?!</CardDescription>
            </CardHeader>
            <CardContent className="font-semibold">
              Forget it, Create unique wishes now!
            </CardContent>
            <CardFooter>
              <Button asChild size="sm">
                <Link href={"/dashboard/aiwish"}>AI Wisher!</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Fulfilled
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>
          </div>
          <TabsContent value="week">
            <UpcomingTable />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default dashboard;
