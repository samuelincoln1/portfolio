"use client";

import React, { useState, useEffect } from "react";
import { useMenu } from '../../context/MenuContext';
import { useTranslation } from "react-i18next";
import Link from 'next/link';

export default function Sidebar() {
  const { isMenuOpen } = useMenu();
  const [activeSection, setActiveSection] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useTranslation("platform");

  const sections = [
    { id: "overview", label: t("platform.sidebar.overview") },
    { id: "architecture-diagram", label: t("platform.sidebar.architectureDiagram") },
    { id: "code-structure", label: t("platform.sidebar.codeStructure") },
    { id: "backend-configuration", label: t("platform.sidebar.backendConfiguration") },
    { id: "vpc-module", label: t("platform.sidebar.vpcModule") },
    { id: "alb-module", label: t("platform.sidebar.albModule") },
    { id: "cdn-module", label: t("platform.sidebar.cdnModule") },
    { id: "waf-module", label: t("platform.sidebar.wafModule") },
    { id: "ecs-module", label: t("platform.sidebar.ecsModule") },
    { id: "rds-module", label: t("platform.sidebar.rdsModule") },
    { id: "supporting-modules", label: t("platform.sidebar.supportingModules") },
    { id: "main-file", label: t("platform.sidebar.mainFile") },
    { id: "cicd-pipeline", label: t("platform.sidebar.cicdPipeline") },
    { id: "application", label: t("platform.sidebar.application") },
    { id: "tests", label: t("platform.sidebar.tests") },
    { id: "deployment", label: t("platform.sidebar.deployment") },
    { id: "cost-analysis", label: t("platform.sidebar.cost") },
  ];


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
      let currentSection = "";
      // The last section is too short to reach the top of the viewport
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }
      for (let { id: section } of sections) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        } transition-transform duration-300 ease-in-out xl:translate-x-0 xl:w-80 bg-[#0d0e12] border-r border-gray-700 text-white p-4 pb-24 overflow-y-auto`}
       
      >
      
          <Link href="/" passHref>
            <div className="text-[#3799fe] flex items-center hover:underline hover:text-[#4fa7ff] py-6 mt-10 xl:mt-0 inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t("platform.sidebar.goBack")}
            </div>
          </Link>
       
        <h2 className="text-2xl font-bold mb-4">Index</h2>
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id} className="w-full">
              <a
                href={`#${section.id}`}
                className={`hover:bg-[#2b303c] p-2 rounded-md block ${
                  activeSection === section.id ? "bg-[#2b303c]" : ""
                }`}
                onClick={(e) => handleLinkClick(e, section.id)}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
