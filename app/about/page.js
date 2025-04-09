import React from "react";
import Navbar from "../components/util/Navbar";
import AboutHero from "../components/about/AboutHero";
import Resume from "../components/about/Resume";
import ParticlesBackground2 from "../components/effects/ParticlesBackground2";

export default function AboutPage() {
  return (
    <div className="relative">
      <div className="bg-[url('/images/clouds.jpg')] md:min-h-[400px] h-screen bg-cover bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-black/45"></div>
        <Navbar />
        <AboutHero /> 
      </div>
      <Resume />
      <ParticlesBackground2 />
    </div>
  );
} 