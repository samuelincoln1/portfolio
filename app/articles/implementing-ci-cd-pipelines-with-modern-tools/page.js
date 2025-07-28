import React from "react";
import Navbar from "../../components/util/ProjectsNavbar";
import Footer from "./Footer";
import { MenuProvider } from "../../context/MenuContext";

import Content from "./Content";

export default function ServerlessLogsAnalyzerPage() {
  return (
    <MenuProvider>
      <div className="relative">
        <Navbar />
        <div className="bg-[#0d0e12] min-h-screen w-full">
          <div
            className="mx-auto relative flex flex-col max-w-[1100px] w-full text-[#d5d7db]"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            <div className="container mx-autimage.pngo xl:px-4 px-8 relative mt-8 z-10 mb-[154px]">
              <div className="flex flex-col">
                <div className="flex flex-col gap-10 mt-[72px] ">
                  <Content />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </MenuProvider>
  );
}
