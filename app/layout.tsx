import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { CONFIG } from "@/lib/config"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap"
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#09090B" },
    { media: "(prefers-color-scheme: dark)", color: "#09090B" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover"
}

export const metadata: Metadata = {
  title: `${CONFIG.name} — Fresh Pizzas in Sanghipuram`,
  description: `Authentic home-style pizza kitchen in ${CONFIG.area}. Order hot vegetarian pizzas, garlic bread, and thick milkshakes on WhatsApp in 3 taps.`,
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon-192.png"
  },
  openGraph: {
    title: CONFIG.name,
    description: "The pizza you've been missing in Sanghipuram. Order in three taps on WhatsApp.",
    url: "https://hvdpizzas.in",
    siteName: CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-16x9.jpg",
        width: 1200,
        height: 675,
        alt: "HVD Pizzas - Fresh out of the oven"
      }
    ]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍕</text></svg>" />
      </head>
      <body className="font-sans bg-page text-ink selection:bg-tomato selection:text-white antialiased">
        {children}
      </body>
    </html>
  )
}
