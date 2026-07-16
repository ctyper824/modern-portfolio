import type React from "react"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export const metadata: Metadata = {
  title: "Justin Boatman - Senior Software Engineer",
  description:
    "Results-driven software engineer with over 13 years of experience specializing in field service management and Click Software solutions.",
  keywords: [
    "Justin Boatman",
    "Senior Software Engineer",
    "Click Software",
    "ClickSchedule",
    "field service management",
  ],
  authors: [{ name: "Justin Boatman" }],
  openGraph: {
    title: "Justin Boatman - Senior Software Engineer",
    description:
      "Results-driven software engineer with over 13 years of experience specializing in field service management and Click Software solutions.",
    type: "website",
  },
  generator: "senotron",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
