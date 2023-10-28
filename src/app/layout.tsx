import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";
import { GeistSans } from "geist/font";
import { headers } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";

import { TRPCReactProvider } from "trpc/react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "HACKIBO",
  description: "Like Hackernews, but for AI generated project ideas",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`flex min-h-screen flex-col relative ${GeistSans.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider headers={headers()}>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
