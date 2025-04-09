"use client";

import Link from "next/link";
import { useMenu } from '../../context/MenuContext';
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "next-i18next";

export default function Navbar() {
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const { t } = useTranslation("common");

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects/infra-as-code", label: "Infra as Code" },
    { href: "/projects/serverless-logs-analyzer", label: "Log Analyzer" },
    { href: "/projects/codeflow", label: "CodeFlow" },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <nav className="p-6 z-50 fixed top-0 right-0 left-0 w-full bg-[#15181e] z-[103]">
    
     
      <button
        className={`xl:hidden absolute right-4 top-4 z-[203] text-white`}
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
        flex flex-col xl:flex-row
        xl:space-x-6 space-y-4 xl:space-y-0
        xl:relative absolute right-0 top-0
        xl:bg-transparent
        xl:p-0 p-8 pt-16
        xl:w-auto w-full
        h-screen justify-center items-center
        xl:h-auto 
        xl:flex ${isMenuOpen ? "flex" : "hidden"}
        transition-all duration-300
        xl:justify-end
        shadow-2xl xl:shadow-none
        bg-black/20 xl:bg-transparent
        backdrop-blur-sm xl:backdrop-blur-none
        z-[102]
      `}
      >
        <div className="xl:absolute xl:left-0 z-50">
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
