import React from "react";
import { Source_Serif_4 } from "next/font/google";
import Navbar from "../../components/util/ProjectsNavbar";
import Footer from "../implementing-ci-cd-pipelines-with-modern-tools/Footer";
import { MenuProvider } from "../../context/MenuContext";

import Content from "./Content";

// Serif used only for the pull quotes.
const serif = Source_Serif_4({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "600"],
  variable: "--font-article-serif",
});

const title = "Você não pode culpar o ChatGPT num post-mortem";
const description =
  "O papel da inteligência artificial na engenharia de infraestrutura e a importância do conhecimento técnico.";

export const metadata = {
  metadataBase: new URL("https://samuellincoln.com"),
  title: `${title} | Samuel Lincoln`,
  description,
  openGraph: {
    type: "article",
    title,
    description,
    url: "/articles/you-cant-blame-chatgpt-in-a-post-mortem",
    images: [{ url: "/images/ai-post-mortem.jpg", width: 1600, height: 893 }],
    authors: ["Samuel Lincoln"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/ai-post-mortem.jpg"],
  },
};

export default function AiPostMortemArticlePage() {
  return (
    <MenuProvider>
      <div className={`relative ${serif.variable}`}>
        <Navbar />
        <div className="bg-[#0d0e12] min-h-screen w-full">
          <div className="relative w-full text-[#d5d7db] px-6 md:px-8 pt-[120px] md:pt-[140px] pb-[200px]">
            <Content />
          </div>
        </div>
        <Footer />
      </div>
    </MenuProvider>
  );
}
