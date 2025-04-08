"use client";

import React, { useState, useEffect } from "react";

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("");

  const handleLinkClick = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetPosition = targetElement.offsetTop - 76; 
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "overview",
        "architecture-diagram",
        "code-structure",
        "backend-configuration",
        "vpc-module",
        "alb-module",
        "asg-module",
      ];
      let currentSection = "";
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 126 && rect.bottom >= 76) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-64 bg-[#0d0e12] border-r border-white text-white p-4 fixed h-full z-100 mt-[76px]">
      <h2 className="text-2xl font-bold mb-4">Index</h2>
      <ul className="space-y-2">
        <li>
          <a
            href="#overview"
            className={`hover:underline ${activeSection === "overview" ? "font-bold underline" : ""}`}
            onClick={(e) => handleLinkClick(e, "overview")}
          >
            Overview
          </a>
        </li>
        <li>
          <a
            href="#architecture-diagram"
            className={`hover:underline ${activeSection === "architecture-diagram" ? "font-bold underline" : ""}`}
            onClick={(e) => handleLinkClick(e, "architecture-diagram")}
          >
            Architecture Diagram
          </a>
        </li>
        <li>
          <a
            href="#code-structure"
            className={`hover:underline ${activeSection === "code-structure" ? "font-bold underline" : ""}`}
            onClick={(e) => handleLinkClick(e, "code-structure")}
          >
            Code Structure
          </a>
        </li>
        <li>
          <a
            href="#backend-configuration"
            className={`hover:underline ${activeSection === "backend-configuration" ? "font-bold underline" : ""}`}
            onClick={(e) => handleLinkClick(e, "backend-configuration")}
          >
            Backend Configuration
          </a>
        </li>
        <li>
          <a
            href="#vpc-module"
            className={`hover:underline ${activeSection === "vpc-module" ? "font-bold underline" : ""}`}
            onClick={(e) => handleLinkClick(e, "vpc-module")}
          >
            VPC Module
          </a>
        </li>
        <li>
          <a
            href="#alb-module"
            className={`hover:underline ${activeSection === "alb-module" ? "font-bold underline" : ""}`}
            onClick={(e) => handleLinkClick(e, "alb-module")}
          >
            ALB Module
          </a>
        </li>
        <li>
          <a
            href="#asg-module"
            className={`hover:underline ${activeSection === "asg-module" ? "font-bold underline" : ""}`}
            onClick={(e) => handleLinkClick(e, "asg-module")}
          >
            ASG Module
          </a>
        </li>
      </ul>
    </div>
  );
}
