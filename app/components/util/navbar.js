'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/iac', label: 'Infra as Code' },
    { href: '/serverless-logs-analyzer', label: 'Log Analyzer' },
    { href: '/codeflow', label: 'CodeFlow' },
    { href: '/about', label: 'Sobre' },
  ]

  return (
    <nav className="p-4 z-50">
      {/* Menu Hambúrguer - visível apenas em telas pequenas */}
      <button 
        className="md:hidden absolute right-4 top-4 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Menu de navegação */}
      <ul className={`
        flex flex-col md:flex-row
        md:space-x-6 space-y-4 md:space-y-0
        md:relative absolute right-0 top-0
        md:bg-transparent bg-white/95
        md:p-0 p-8 pt-16
        md:w-auto w-64
        md:flex ${isMenuOpen ? 'flex' : 'hidden'}
        transition-all duration-300
        md:justify-end
        shadow-lg md:shadow-none
        backdrop-blur-sm
      `}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-xl font-medium transition-colors hover:text-[#77B2E9] ${
                pathname === link.href
                  ? 'text-[#77B2E9]'
                  : 'text-black'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
