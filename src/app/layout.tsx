import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { dark } from "@clerk/themes";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Birthday Reminder",
  description:
    "Never forget a birthday again with our all-in-one reminder solution.",
  manifest: "/manifest.json",

  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#762CDF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
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
          <body className={poppins.className}>
            {children}
            <Toaster richColors theme="dark" closeButton />
          </body>
        </TooltipProvider>
      </html>
    </ClerkProvider>
  );
}
