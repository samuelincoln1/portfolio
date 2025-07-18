"use client";

import React, { useState, useEffect } from "react";
import { useMenu } from '../../context/MenuContext';
import { useTranslation } from "react-i18next";
import Link from 'next/link';

export default function Sidebar() {
  const { isMenuOpen } = useMenu();
  const [activeSection, setActiveSection] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useTranslation("iac");

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
        "infra-code-structure",
        "s3-module",
        "iam-module",
        // "vpc-module",
        // "alb-module",
        // "asg-module",
        // "rds-module",
        // "main-file",
        // "tests",
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

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "architecture-diagram", label: "Architecture Diagram" },
    { id: "infra-code-structure", label: "Infra Code Structure" },
    { id: "s3-module", label: "S3 Module" },
    { id: "iam-module", label: "IAM Module" },
    // { id: "vpc-module", label: t("iac.sidebar.vpcModule") },
    // { id: "alb-module", label: t("iac.sidebar.albModule") },
    // { id: "asg-module", label: t("iac.sidebar.asgModule") },
    // { id: "rds-module", label: t("iac.sidebar.rdsModule") },
    // { id: "main-file", label: t("iac.sidebar.mainFile") },
    // { id: "tests", label: t("iac.sidebar.tests") },
  ];

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
              {t("iac.sidebar.goBack")}
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
