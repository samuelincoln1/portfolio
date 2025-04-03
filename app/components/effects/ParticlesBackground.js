"use client";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      className="absolute inset-0"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: {
          opacity: 0,
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            enable: false,
          },
          move: {
            direction: "top",
            enable: true,
            speed: 1.5,
            random: true,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.3,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
            },
          },
          size: {
            value: { min: 2, max: 5 },
          },
        },
      }}
    />
  );
}
