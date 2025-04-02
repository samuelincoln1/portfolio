import { Heebo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/util/navbar";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin"],
});

export const metadata = {
  title: "Samuel Lincoln - Portifolio",
  description: "Portifolio de Samuel Lincoln, engenheiro de nuvem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className={`${heebo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
