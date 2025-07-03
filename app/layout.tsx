import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AnimatedBackground } from "@/components/animated-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dhyey Visodiya - Portfolio",
  description: "App Developer & Software Engineer - Crafting Digital Experiences",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%23ef4444;stop-opacity:1' /><stop offset='100%' style='stop-color:%233b82f6;stop-opacity:1' /></linearGradient></defs><rect width='100' height='100' rx='20' fill='%23000'/><text x='50' y='65' fontFamily='Arial,sans-serif' fontSize='40' fontWeight='bold' textAnchor='middle' fill='url(%23grad)'>DV</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatedBackground />
        {children}
      </body>
    </html>
  )
}
