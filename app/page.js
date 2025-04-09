"use client";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Navbar from "./components/util/Navbar";
import ParticlesBackground from "./components/effects/ParticlesBackground";
export default function Index() {
  return (
    <div className="relative">
      <div className="bg-[url('/images/clouds.jpg')] bg-cover bg-center bg-no-repeat min-h-screen">
        <div className="absolute inset-0 bg-black/45" id="home"></div>
        <Navbar />
        <Hero />
      </div>
      <Projects />
      <ParticlesBackground />
    </div>
  );
}
