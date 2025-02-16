import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { WrapperWithQuery } from "@/components/wrapper";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeevan Cure",
  description: "A one stop solution to track your health records",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <WrapperWithQuery>{children}</WrapperWithQuery>
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
