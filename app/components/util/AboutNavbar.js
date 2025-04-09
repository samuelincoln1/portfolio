"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "next-i18next";

export default function AboutNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation("common");

  const links = [
    { href: "/", label: "Home" },
    { href: "/#projects", label: t("nav.projects") },
    { href: "/about", label: t("nav.about") },
  ];

  const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 400; 
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressRatio = Math.min(progress / duration, 1);
      const easeInOutQuad = progressRatio < 0.5
        ? 2 * progressRatio * progressRatio
        : -1 + (4 - 2 * progressRatio) * progressRatio;
      window.scrollTo(0, startPosition + distance * easeInOutQuad - 30);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const handleLinkClick = (href) => {
    if (href.startsWith("#")) {
      event.preventDefault();
      smoothScroll(href);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="py-6 px-5 z-50 fixed top-0 right-0 left-0 w-full md:bg-[#0d0e12] z-[100]"> 
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
        md:w-auto w-full
        h-screen justify-center items-center
        md:h-auto 
        md:flex ${isMenuOpen ? "flex" : "hidden"}
        transition-all duration-300
        md:justify-end
        shadow-2xl md:shadow-none
        bg-black/20 md:bg-transparent
         backdrop-blur-sm md:backdrop-blur-none z-50
       
      `}
      >
        <div className="md:absolute md:left-0 z-50">
          <LanguageSwitcher />
        </div>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-xl font-medium transition-colors hover:underline text-white`}
              onClick={() => handleLinkClick(link.href)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
