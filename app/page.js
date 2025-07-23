"use client";
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Navbar from "./components/util/Navbar";
import ParticlesBackground from "./components/effects/ParticlesBackground";

export default function Index() {
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
        className="bg-[url('/images/clouds.jpg')] bg-cover bg-center bg-no-repeat min-h-screen bg-sky-300"
        style={{ visibility: bgLoaded ? "visible" : "hidden" }}
      >
        <div className="absolute inset-0 bg-black/45" id="home"></div>
        <Navbar />
        <Hero />
      </div>
      <Projects />
      <ParticlesBackground />
    </div>
  );
}
