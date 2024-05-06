import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <section>
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </section>
    </main>
  );
}
