import { Heebo } from "next/font/google";
import "./globals.css";
import I18nProvider from "./I18nProvider";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin"],
});

// The favicon comes from app/favicon.ico (Next.js file convention).
export const metadata = {
  title: "Samuel Lincoln - Portfolio",
  description: "Samuel Lincoln's portifolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${heebo.variable} antialiased `}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
