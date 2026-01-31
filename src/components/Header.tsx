'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownItem {
  href: string;
  label: string;
}

interface NavItem {
  href?: string;
  label: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  {
    label: 'Our Work',
    dropdown: [
      { href: '/our-work', label: 'Programs' },
      { href: '/our-stories', label: 'Impact & Stories' },
      { href: '/events', label: 'Events' },
    ],
  },
  {
    label: 'Get Involved',
    dropdown: [
      { href: '/how-to-help#donate', label: 'Donate' },
      { href: '/how-to-help#volunteer', label: 'Volunteer' },
      { href: '/how-to-help#partnerships', label: 'Partnerships' },
    ],
  },
  {
    label: 'Resources',
    dropdown: [
      { href: '/reports', label: 'Reports' },
      { href: '/blogs', label: 'Blogs/News' },
      { href: '/legal', label: 'Legal' },
    ],
  },
  { href: '/contact', label: 'Contact Us' },
];

function DropdownMenu({ items, isOpen, onClose }: { items: DropdownItem[]; isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block px-4 py-2 text-sm text-[#222120] hover:bg-gray-50 hover:text-[#8D8B9C] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavItemWithDropdown({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (item.dropdown) {
    return (
      <div
        ref={ref}
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 text-[#222120] hover:text-[#8D8B9C] transition-colors duration-200 text-sm font-medium"
        >
          <span>{item.label}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <DropdownMenu items={item.dropdown} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  }

  return (
    <Link
      href={item.href || '/'}
      className="text-[#222120] hover:text-[#8D8B9C] transition-colors duration-200 text-sm font-medium"
    >
      {item.label}
    </Link>
  );
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.dropdown) {
    return (
      <div className="border-b border-gray-100 last:border-b-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-[#222120] hover:text-[#8D8B9C] transition-colors duration-200 text-base font-medium py-3"
        >
          <span>{item.label}</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="pl-4 pb-2 space-y-2"
            >
              {item.dropdown.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  onClick={onClose}
                  className="block text-[#222120]/80 hover:text-[#8D8B9C] transition-colors duration-200 text-sm py-2"
                >
                  {subItem.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <Link
        href={item.href || '/'}
        onClick={onClose}
        className="block text-[#222120] hover:text-[#8D8B9C] transition-colors duration-200 text-base font-medium py-3"
      >
        {item.label}
      </Link>
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="PTP Foundation" width={48} height={48} />
            <span className="text-xl font-semibold text-[#222120] hidden sm:block">
              PTP Foundation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <NavItemWithDropdown key={index} item={item} />
            ))}
            <Link
              href="/how-to-help"
              className="bg-[#222120] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#333] transition-colors duration-200"
            >
              Donate
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#222120]"
            aria-label="Toggle menu"
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
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4">
              {navItems.map((item, index) => (
                <MobileNavItem key={index} item={item} onClose={() => setIsMenuOpen(false)} />
              ))}
              <Link
                href="/how-to-help"
                onClick={() => setIsMenuOpen(false)}
                className="block bg-[#222120] text-white px-6 py-3 rounded-full text-center font-medium hover:bg-[#333] transition-colors duration-200 mt-4"
              >
                Donate
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
