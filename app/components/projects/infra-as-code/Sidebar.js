"use client";

import React from "react";

export default function Sidebar() {
  const handleLinkClick = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetPosition = targetElement.offsetTop - 76; // Ajuste de 76px
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-64 bg-[#0d0e12] border-r border-white text-white p-4 fixed h-full z-100 mt-[76px]">
      <h2 className="text-2xl font-bold mb-4">Index</h2>
      <ul className="space-y-2">
        <li>
          <a href="#overview" className="hover:underline" onClick={(e) => handleLinkClick(e, "overview")}>
            Overview
          </a>
        </li>
        <li>
          <a href="#architecture-diagram" className="hover:underline" onClick={(e) => handleLinkClick(e, "architecture-diagram")}>
            Architecture Diagram
          </a>
        </li>
        <li>
          <a href="#code-structure" className="hover:underline" onClick={(e) => handleLinkClick(e, "code-structure")}>
            Code Structure
          </a>
        </li>
        <li>
          <a href="#backend-configuration" className="hover:underline" onClick={(e) => handleLinkClick(e, "backend-configuration")}>
            Backend Configuration
          </a>
        </li>
        <li>
          <a href="#vpc-module" className="hover:underline" onClick={(e) => handleLinkClick(e, "vpc-module")}>
            VPC Module
          </a>
        </li>
      </ul>
    </div>
  );
}
