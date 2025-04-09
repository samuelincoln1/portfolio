"use client";
import { Heebo } from "next/font/google";
import "./globals.css";
import "./i18n";
import favicon from "../app/favicon.ico";
const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <head>
        <title>Samuel Lincoln - Portfolio</title>
        <meta name="description" content="Samuel Lincoln's portifolio" />
        <link rel="icon" href={favicon} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${heebo.variable} antialiased `}>{children}</body>
    </html>
  );
}
