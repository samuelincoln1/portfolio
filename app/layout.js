'use client'
import { Heebo } from "next/font/google"
import "./globals.css"
import "./i18n"
import Navbar from "./components/util/navbar"

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin"],
})

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <head>
        <title>Samuel Lincoln - Portifolio</title>
        <meta name="description" content="Portifolio de Samuel Lincoln, Engenheiro de Nuvem" />
      </head>
      <body className={`${heebo.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
