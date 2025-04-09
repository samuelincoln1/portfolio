import React from "react";
import Navbar from "../../components/util/ProjectsNavbar";
import Content from "../../components/projects/infra-as-code/Content";
import Sidebar from "../../components/projects/infra-as-code/Sidebar";
// import ParticlesBackground2 from "../../components/effects/ParticlesBackground2";
import ParticlesBackgroundNoInteraction from "../../components/effects/ParticlesBackgroundNoInteraction";
import Footer from "../../components/projects/infra-as-code/Footer";
import { MenuProvider } from "../../context/MenuContext";

export default function AboutPage() {
  return (
    <MenuProvider>
      <div className="relative">
        <Navbar />
        <div className="bg-[#0d0e12] min-h-screen w-full">
          <Sidebar />
          <div className="xl:ml-64">
            <Content />
            <Footer />
          </div>
        </div>
      </div>
    </MenuProvider>
  );
}
