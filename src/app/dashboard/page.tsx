import NextMonthTable from "@/components/NextMonthTable";
import ThisMonthTable from "@/components/ThisMonthTable";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingTable from "@/components/UpcomingTable";
import { File, ListFilter } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
const dashboard = () => {
  return (
    <main className="z-10 flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 place-items-center max-w-(--breakpoint-xl) mx-auto">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 mx-auto">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card
            className="sm:col-span-2 overflow-hidden relative"
            x-chunk="dashboard-05-chunk-0"
          >
            <div className="absolute h-full w-full bg-[radial-gradient(#392d4c_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            <CardHeader className="pb-3">
              <CardTitle className="z-10">Add Birthday🎂</CardTitle>
              <CardDescription className="max-w-lg z-20 py-1 text-balance tracking-wider leading-relaxed">
                Add birthdays, auto send emails, get notified and
                <br /> never miss a birthday again!
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild size="sm">
                <Link href={"/dashboard/add"} className="z-30">
                  Add Birthday!
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="shadow-inner shadow-primary/40 hover:shadow-purple-700 hover:shadow-inner">
            <CardHeader className="pb-2">
              <CardDescription>boring wishes?!</CardDescription>
            </CardHeader>
            <CardContent className="font-semibold">
              Forget it, Create unique wishes now!🔥
            </CardContent>
            <CardFooter>
              <Button asChild size="sm">
                <Link href={"/dashboard/aiwish"}>AI Wisher!</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="bg-linear-to-br from-purple-800 to-indigo-800">
            <CardHeader className="pb-2">
              <CardDescription>Create Birthday Website</CardDescription>
            </CardHeader>
            <CardContent className="font-semibold">
              Wish them in a way they deserve!🎉
            </CardContent>
            <CardFooter>
              <Button asChild size="sm">
                <Link href={"https://wishbday.me/"}>Create website!</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Tabs defaultValue="All">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="nextMonth">Next Month</TabsTrigger>
            </TabsList>
            {/* <div className="ml-auto flex items-center gap-2">
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
            </div> */}
          </div>
          <TabsContent value="All">
            <Suspense
              fallback={<Skeleton className="w-full min-h-80 rounded-lg" />}
            >
              <UpcomingTable />
            </Suspense>
          </TabsContent>
          <TabsContent value="month">
            <Suspense
              fallback={<Skeleton className="w-full min-h-80 rounded-lg" />}
            >
              <ThisMonthTable />
            </Suspense>
          </TabsContent>
          <TabsContent value="nextMonth">
            <Suspense
              fallback={<Skeleton className="w-full min-h-80 rounded-lg" />}
            >
              <NextMonthTable />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default dashboard;
