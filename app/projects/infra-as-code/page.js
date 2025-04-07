import React from "react";
import Navbar from "../../components/util/ProjectsNavbar";
import Content from "../../components/projects/infra-as-code/Content";
import Sidebar from "../../components/projects/infra-as-code/Sidebar";
// import ParticlesBackground2 from "../../components/effects/ParticlesBackground2";
import ParticlesBackgroundNoInteraction from "../../components/effects/ParticlesBackgroundNoInteraction";
import Footer from "../../components/projects/infra-as-code/Footer";

export default function AboutPage() {
  return (
    <div className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="ml-64">
          <Content />
          <Footer />
          <ParticlesBackgroundNoInteraction />
        </div>
      </div>
    </div>
  );
}
