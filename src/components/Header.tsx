"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { href: "#accueil", label: "Accueil" },
  { href: "#APropos", label: "Á Propos" },
  { href: "#galerie", label: "Galerie" },
  { href: "#menu", label: "Menu" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#1F1E1D]/95 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="#accueil" className="group">
          <h1 className="text-2xl md:text-3xl font-bold text-[#F7F3ED] tracking-wider font-serif">
            MEXICAN
            <span className="text-[#D4A056]">&apos;</span>
            <span className="text-[#C45C3A]">O</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#F7F3ED] text-sm uppercase tracking-widest font-light hover:text-[#D4A056] transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4A056] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="https://www.instagram.com/mexicano_lyon_8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F7F3ED] hover:text-[#D4A056] transition-colors"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <Link
            href="#contact"
            className="btn-mexican px-6 py-2.5 bg-[#C45C3A] text-[#F7F3ED] text-sm uppercase tracking-wider rounded-full hover:bg-[#A34A2F] transition-colors duration-300"
          >
            Réserver
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden text-[#F7F3ED] p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#1F1E1D]/98 backdrop-blur-md transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 py-6" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#F7F3ED] text-sm uppercase tracking-widest font-light hover:text-[#D4A056] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/reservas"
            className="btn-mexican px-6 py-2.5 bg-[#C45C3A] text-[#F7F3ED] text-sm uppercase tracking-wider rounded-full hover:bg-[#A34A2F] transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Réserver
          </Link>
        </nav>
      </div>
    </header>
  );
}
