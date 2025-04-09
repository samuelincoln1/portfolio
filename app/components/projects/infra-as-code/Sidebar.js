"use client";

import React, { useState, useEffect } from "react";
import { useMenu } from '../../../context/MenuContext';

export default function Sidebar() {
  const { isMenuOpen } = useMenu();
  const [activeSection, setActiveSection] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
    };

    const handleTouchMove = (e) => {
      if (!isSidebarOpen) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;

      if (deltaX < -90) { 
        setIsSidebarOpen(false);
      }
    };

    let startX = 0;

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <button
        className={`fixed top-0 left-0 ${
          isMenuOpen ? "z-0" : "z-110"
        } text-white rounded-md xl:hidden px-4 py-3 flex items-center justify-center`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </button>
      <div
        className={`fixed h-full z-100 xl:mt-[76px] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out xl:translate-x-0 xl:w-80 bg-[#0d0e12] border-r border-gray-700 text-white p-4`}
       
      >
        <h2 className="text-2xl font-bold mb-4">Index</h2>
        <ul className="space-y-1">
          <li className="w-full">
            <a
              href="#overview"
              className={`hover:bg-[#2b303c] p-2 rounded-md block ${activeSection === "overview" ? "bg-[#2b303c]" : ""}`}
              onClick={(e) => handleLinkClick(e, "overview")}
            >
              Overview
            </a>
          </li>
          <li className="w-full">
            <a
              href="#architecture-diagram"
              className={`hover:bg-[#2b303c] p-2 rounded-md block ${activeSection === "architecture-diagram" ? "bg-[#2b303c]" : ""}`}
              onClick={(e) => handleLinkClick(e, "architecture-diagram")}
            >
              Architecture Diagram
            </a>
          </li>
          <li className="w-full">
            <a
              href="#code-structure"
              className={`hover:bg-[#2b303c] p-2 rounded-md block ${activeSection === "code-structure" ? "bg-[#2b303c]" : ""}`}
              onClick={(e) => handleLinkClick(e, "code-structure")}
            >
              Code Structure
            </a>
          </li>
          <li className="w-full">
            <a
              href="#backend-configuration"
              className={`hover:bg-[#2b303c] p-2 rounded-md block ${activeSection === "backend-configuration" ? "bg-[#2b303c]" : ""}`}
              onClick={(e) => handleLinkClick(e, "backend-configuration")}
            >
              Backend Configuration
            </a>
          </li>
          <li className="w-full">
            <a
              href="#vpc-module"
              className={`hover:bg-[#2b303c] p-2 rounded-md block ${activeSection === "vpc-module" ? "bg-[#2b303c]" : ""}`}
              onClick={(e) => handleLinkClick(e, "vpc-module")}
            >
              VPC Module
            </a>
          </li>
          <li className="w-full">
            <a
              href="#alb-module"
              className={`hover:bg-[#2b303c] p-2 rounded-md block ${activeSection === "alb-module" ? "bg-[#2b303c]" : ""}`}
              onClick={(e) => handleLinkClick(e, "alb-module")}
            >
              ALB Module
            </a>
          </li>
          <li className="w-full">
            <a
              href="#asg-module"
              className={`hover:bg-[#2b303c] p-2 rounded-md block ${activeSection === "asg-module" ? "bg-[#2b303c]" : ""}`}
              onClick={(e) => handleLinkClick(e, "asg-module")}
            >
              ASG Module
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
