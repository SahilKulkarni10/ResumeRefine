"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-500 hover:bg-blue-600',
          footerActionLink: 'text-blue-500 hover:text-blue-600'
        }
      }}
    >
      <html suppressHydrationWarning lang="en">
        {/*
          <head /> will contain the components returned by the nearest parent
          head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
        */}
        <head />

        <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}


