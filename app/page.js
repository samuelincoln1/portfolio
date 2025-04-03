import Hero from "./components/Hero";
import Navbar from "./components/util/navbar";
import Projects from "./components/projects/projects";
import ParticlesBackground from "./components/effects/ParticlesBackground";
export default function Index() {
  return (
    <div className="relative">
 
      <div className="bg-[url('/images/clouds.jpg')] bg-cover bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-black/45"></div>
        <Navbar />
        <Hero />
      </div>
      <Projects />
      <ParticlesBackground/>
    </div>
  );
}
