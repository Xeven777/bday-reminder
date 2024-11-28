import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { dark } from "@clerk/themes";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Birthday Reminder",
  description:
    "Never forget a birthday again with our all-in-one reminder solution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#8130F6",
        },
      }}
    >
      <html lang="en" className="dark">
        <TooltipProvider>
          <body className={manrope.className}>
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f1e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>
            {children}
            <Toaster richColors theme="dark" />
          </body>
        </TooltipProvider>
      </html>
    </ClerkProvider>
  );
}
