import React from "react";
import AboutNavbar from "../components/util/AboutNavbar";
import AboutHero from "../components/about/AboutHero";
import Resume from "../components/about/Resume";
import ParticlesBackground2 from "../components/effects/ParticlesBackground2";

export default function AboutPage() {
  return (
    <div className="relative">
      <div className="bg-[url('/images/clouds.jpg')] md:min-h-[400px] h-screen bg-cover bg-center bg-no-repeat relative bg-sky-300">
        <div className="absolute inset-0 bg-black/45"></div>
        <AboutNavbar />
        <AboutHero />
      </div>
      <Resume />
      <ParticlesBackground2 />
    </div>
  );
}
