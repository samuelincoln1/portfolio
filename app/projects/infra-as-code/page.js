import React from "react";
import Navbar from "../../components/util/ProjectsNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { MenuProvider } from "../../context/MenuContext";
import Overview from "./Overview";
import ArchitectureDiagram from "./ArchitectureDiagram";
import CodeStructure from "./CodeStructure";
import BackendConfiguration from "./BackendConfiguration";
import VPCModule from "./VPCModule";
import ALBModule from "./ALBModule";
import ASGModule from "./ASGModule";
import RDSModule from "./RDSModule";
import Main from "./MainFile";
import Tests from "./Tests";
import Deployment from "./Deployment";
export default function AboutPage() {
  return (
    <MenuProvider>
      <div className="relative">
        <Navbar />
        <div className="bg-[#0d0e12] min-h-screen w-full">
          <Sidebar />
          <div className="xl:ml-64">
            <div
              className="mx-auto relative flex flex-col max-w-[824px] w-full text-[#d5d7db]"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
            >
              <div className="container mx-auto xl:px-4 px-8 relative mt-8 z-10 mb-[154px]">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-10 mt-[72px] ">
                    <Overview />
                    <ArchitectureDiagram />
                    <CodeStructure />
                    <BackendConfiguration />
                    <VPCModule />
                    <ALBModule />
                    <ASGModule />
                    <RDSModule />
                    <Main />
                    <Tests />
                    <Deployment />
                  </div>
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
