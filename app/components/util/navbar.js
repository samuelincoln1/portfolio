'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/infra-as-code', label: 'Infra as Code' },
    { href: '/serverless-logs-analyzer', label: 'Serverless Logs Analyzer' },
    { href: '/codeflow', label: 'CodeFlow' },
    { href: '/contato', label: 'Contato' },
  ]

  return (
    <nav className="flex justify-end p-4 z-50">
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-xl font-medium transition-colors hover:text-[#77B2E9] ${
                pathname === link.href
                  ? 'text-[#77B2E9]'
                  : 'text-black '
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
