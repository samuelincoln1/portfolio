import { Heebo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/util/navbar";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${heebo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
