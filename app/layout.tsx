import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dhyey Visodiya - App Developer & Software Engineer",
  description:
    "Portfolio of Dhyey Visodiya -  Passionate app developer and software engineer specializing in React Native, Flutter, and full-stack web development.",
  keywords:
    "Dhyey Visodiya, App Developer, Software Engineer, React Native, Flutter, Full Stack Developer, Mobile Development, Web Development",
  authors: [{ name: "Dhyey Visodiya" }],
  creator: "Dhyey Visodiya",
  publisher: "Dhyey Visodiya",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dhyeyvisodiya.com",
    title: "Dhyey Visodiya - App Developer & Software Engineer",
    description:
      "Portfolio of Dhyey Visodiya - Passionate app developer and software engineer specializing in React Native, Flutter, and full-stack web development.",
    siteName: "Dhyey Visodiya Portfolio",
    images: [
      {
        url: "/placeholder.svg?height=1200&width=630&text=Dhyey+Visodiya+Portfolio",
        width: 1200,
        height: 630,
        alt: "Dhyey Visodiya - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhyey Visodiya - App Developer & Software Engineer",
    description:
      "Portfolio of Dhyey Visodiya - Passionate app developer and software engineer specializing in React Native, Flutter, and full-stack web development.",
    creator: "@dhyeyvisodiya",
    images: ["/placeholder.svg?height=1200&width=630&text=Dhyey+Visodiya+Portfolio"],
  },
  icons: {
    icon: "/placeholder.svg?height=32&width=32&text=DV",
    shortcut: "/placeholder.svg?height=16&width=16&text=DV",
    apple: "/placeholder.svg?height=180&width=180&text=DV",
  },
  manifest: "/manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "theme-color": "#ef4444",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://dhyeyvisodiya.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dhyey Visodiya",
              jobTitle: "App Developer & Software Engineer",
              description:
                "Passionate app developer and software engineer specializing in React Native, Flutter, and full-stack web development.",
              url: "https://dhyeyvisodiya.com",
              sameAs: [
                "https://github.com/dhyeyvisodiya",
                "https://linkedin.com/in/dhyeyvisodiya",
                "https://twitter.com/dhyeyvisodiya",
              ],
              knowsAbout: [
                "React Native",
                "Flutter",
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Mobile Development",
                "Web Development",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
