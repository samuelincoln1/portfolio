"use client";
import React, { useEffect, useState } from "react";
import AboutNavbar from "../components/util/AboutNavbar";
import AboutHero from "../components/about/AboutHero";
import Resume from "../components/about/Resume";
import ParticlesBackground2 from "../components/effects/ParticlesBackground2";

export default function AboutPage() {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/images/clouds.jpg";
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <div className="relative">
      {!bgLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div
        className="bg-[url('/images/clouds.jpg')] md:min-h-[400px] h-screen bg-cover bg-center bg-no-repeat relative bg-sky-300"
        style={{ visibility: bgLoaded ? "visible" : "hidden" }}
      >
        <div className="absolute inset-0 bg-black/45"></div>
        <AboutNavbar />
        <AboutHero />
      </div>
      <Resume />
      <ParticlesBackground2 />
    </div>
  );
}
