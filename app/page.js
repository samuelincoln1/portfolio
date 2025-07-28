"use client";
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Articles from "./components/Articles";
import Navbar from "./components/util/Navbar";
import ParticlesBackground from "./components/effects/ParticlesBackground";
import Footer from "./components/Footer";

export default function Index() {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
      const imagesToPreload = [
      "/images/clouds.jpg",
      "/images/terraform.jpg",
      "/images/lambda.png", 
      "/images/cicd.png",
      "/images/On-premise-to-Cloud.png",
      "/images/serverless.png",
      "/images/cicd2.png",
      "/images/profile.jpg",
      "/images/transition.png",
      "/images/mono.png",
      "/images/cicdarticle.png",
      "/images/aws-certified-solutions-architect-associate.png"
    ];

    let loadedCount = 0;
    let loadPromises = [];

    imagesToPreload.forEach((src) => {
      const promise = new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress((loadedCount / imagesToPreload.length) * 100);
          resolve();
        };
        img.onerror = () => {
           loadedCount++;
          resolve();
        };
      });
      loadPromises.push(promise);
    });

    Promise.all(loadPromises).then(() => {
      setAllImagesLoaded(true);
    });
  }, []);

  return (
    <div className="relative">
      {!allImagesLoaded && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div
        className="bg-[url('/images/clouds.jpg')] bg-cover bg-center bg-no-repeat min-h-screen bg-sky-300"
        style={{ visibility: allImagesLoaded ? "visible" : "hidden" }}
      >
        <div className="absolute inset-0 bg-black/45" id="home"></div>
        <Navbar />
        <Hero />
      </div>
      <div className="md:px-30 px-6 relative flex flex-col bg-gradient-to-b from-black to-purple-950 gap-10">
        <Projects />
        <Articles />
        <Footer />
      </div>
      <ParticlesBackground />
    </div>
  );
}
