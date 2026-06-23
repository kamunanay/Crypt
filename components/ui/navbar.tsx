'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Beranda', href: '/' },
  { name: 'Forex', href: '/forex' },
  { name: 'Crypto', href: '/crypto' },
  { name: 'Emas', href: '/emas' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 h-[72px] flex items-center justify-between',
        scrolled
          ? 'bg-[#0b0d1a]/85 backdrop-blur-xl border-b border-white/5'
          : 'bg-[#0b0d1a]/40 backdrop-blur-lg'
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold text-[#f5c842]">CUKIMAI</span>
        <span className="text-white/20">✦</span>
      </Link>

      <ul className="flex items-center gap-6 md:gap-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-all relative py-1',
                  isActive ? 'text-white' : 'text-white/50 hover:text-white'
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#f5c842] to-[#d4a020] rounded-full" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
