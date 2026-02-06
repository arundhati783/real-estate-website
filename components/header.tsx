"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState("Home")

  const navItems = [
    { name: "Home", href: "/", hasDropdown: true },
    { name: "About Us", href: "/about", hasDropdown: false },
    { name: "Projects", href: "/projects", hasDropdown: false },
    { name: "Properties", href: "/properties", hasDropdown: false },
    { name: "Agents", href: "/agents", hasDropdown: false },
    { name: "Contact Us", href: "/contact", hasDropdown: false },
  ]

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 py-2.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="h-4 w-4" />
              <span>0553986055</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="h-4 w-4" />
              <span>contact@remapp.ae</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-700">My Wishlist (0)</span>
            <div className="flex items-center gap-1 text-slate-700 cursor-pointer hover:text-slate-900">
              <span>AED</span>
              <ChevronDown className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 cursor-pointer hover:text-slate-900">
              <Image
                src="https://flagcdn.com/w20/us.png"
                alt="English"
                width={24}
                height={16}
                className="rounded-sm"
              />
              <span>English</span>
              <ChevronDown className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white py-4 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              {/* REM Logo - matching exact design */}
              <span className="text-slate-800 font-bold text-3xl tracking-tight">R</span>
              <div className="flex flex-col items-center mx-0.5 -mt-1">
                {/* Building icon */}
                <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="mb-0.5">
                  <rect x="4" y="0" width="12" height="24" fill="#1e3a5f" />
                  <rect x="6" y="3" width="3" height="3" fill="white" />
                  <rect x="11" y="3" width="3" height="3" fill="white" />
                  <rect x="6" y="8" width="3" height="3" fill="white" />
                  <rect x="11" y="8" width="3" height="3" fill="white" />
                  <rect x="6" y="13" width="3" height="3" fill="white" />
                  <rect x="11" y="13" width="3" height="3" fill="white" />
                  <rect x="8" y="18" width="4" height="6" fill="#dc2626" />
                </svg>
              </div>
              <span className="text-slate-800 font-bold text-3xl tracking-tight">M</span>
              <div className="ml-1.5 text-[6px] text-slate-400 leading-tight uppercase tracking-wider border-l border-slate-300 pl-1.5">
                <div>Real Estate</div>
                <div>Matchmaker</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - centered */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center gap-1 py-2 text-[15px] font-medium transition-colors ${
                  activeNav === item.name
                    ? "text-slate-800"
                    : "text-slate-600 hover:text-slate-800"
                }`}
                onClick={() => setActiveNav(item.name)}
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                {activeNav === item.name && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between ${
                    activeNav === item.name ? "text-slate-800 font-medium" : "text-slate-600"
                  }`}
                  onClick={() => {
                    setActiveNav(item.name)
                    setMobileMenuOpen(false)
                  }}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
