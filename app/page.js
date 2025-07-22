"use client";
import Hero from "./components/Hero.js";
import Projects from "./components/Projects.js";
import Navbar from "./components/util/Navbar.js";
import ParticlesBackground from "./components/effects/ParticlesBackground.js";
export default function Index() {
  return (
    <div className="relative">
           <div className="bg-[url('/images/clouds.jpg')] bg-cover bg-center bg-no-repeat min-h-screen bg-sky-300">
        <div className="absolute inset-0 bg-black/45" id="home"></div>
        <Navbar />
        TESTING COMMIT!!
        <Hero />
      </div>
      <Projects />
      <ParticlesBackground />
    </div>
  );
}
