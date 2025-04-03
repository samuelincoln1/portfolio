import React from "react";
import Navbar from "../util/navbar";
import AboutHero from "./AboutHero";
import Resume from "./Resume";
import ParticlesBackground2 from "../effects/ParticlesBackground2";

export default function About() {
  return (
    <div className="relative">
  
      <div className="bg-[url('/images/clouds.jpg')]  md:min-h-[400px] h-screen bg-cover bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-black/45"></div>
        <Navbar />
        <AboutHero />
      </div>
      <Resume />
      <ParticlesBackground2 />
    </div>
  );
}
