"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "next-i18next";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation("common");

  const links = [
    { href: "/", label: "Home" },
    { href: "/iac", label: "Infra as Code" },
    { href: "/serverless-logs-analyzer", label: "Log Analyzer" },
    { href: "/codeflow", label: "CodeFlow" },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <nav className="p-4 z-50">
    
     
      <button
        className={`md:hidden absolute right-4 top-4 z-[101] text-white`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      <ul
        className={`
        flex flex-col md:flex-row
        md:space-x-6 space-y-4 md:space-y-0
        md:relative absolute right-0 top-0
        md:bg-transparent
        md:p-0 p-8 pt-16
        md:w-auto w-64
        md:flex ${isMenuOpen ? "flex" : "hidden"}
        transition-all duration-300
        md:justify-end
        shadow-lg md:shadow-none
        backdrop-blur-sm
        z-[100]
      `}
      >
        <div className="md:absolute md:left-0">
          <LanguageSwitcher />
        </div>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-xl font-medium transition-colors hover:underline text-white`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
