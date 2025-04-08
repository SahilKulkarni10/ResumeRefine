"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { ResumeProvider } from "@/context/ResumeContext";
import { Toaster } from "react-hot-toast";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          socialButtonsPlacement: "bottom",
          termsPageUrl: "terms", 
          privacyPageUrl: "privacy",
        },
        elements: {
          formButtonPrimary: 'bg-blue-500 hover:bg-blue-600',
          footerActionLink: 'text-blue-500 hover:text-blue-600',
          card: 'max-w-full w-full sm:max-w-md mx-auto rounded-lg shadow-lg overflow-hidden',
          rootBox: 'w-full px-4 sm:px-0',
          formFieldLabel: 'text-sm font-medium',
          formFieldInput: 'w-full px-3 py-2 text-sm sm:text-base border focus:ring-primary focus:border-primary rounded-md',
          formField: 'mb-4',
          form: 'px-4 pt-6 pb-4 sm:p-6',
          main: 'p-0 sm:p-4 sm:py-6',
          header: 'p-4 sm:p-6 text-center',
          headerTitle: 'text-xl sm:text-2xl font-bold',
          headerSubtitle: 'text-sm',
          navbar: 'hidden',
          identityPreview: 'text-sm',
          socialButtons: 'gap-2 sm:gap-3 my-2',
          socialButtonsIconButton: 'flex-1',
          footer: 'p-4 sm:p-6 text-center',
          footerAction: 'text-sm sm:text-base',
          alert: 'text-xs',
          dividerText: 'text-xs',
          avatarBox: 'h-12 w-12 sm:h-16 sm:w-16',
          otpCodeFieldInput: 'w-8 h-10 sm:w-10 sm:h-12 text-center text-lg sm:text-xl',
        }
      }}
    >
      <html suppressHydrationWarning lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </head>

        <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ResumeProvider>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
              <ScrollToTop />
              <Toaster 
                position="bottom-center"
                toastOptions={{
                  className: 'text-sm p-2 sm:p-4',
                  duration: 3000
                }}
              />
            </ResumeProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}


