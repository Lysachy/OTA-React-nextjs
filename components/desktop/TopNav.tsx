'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { useAuthState } from '@/lib/useAuth';

const navLinks = [
  { label: 'Beranda', href: '/beranda' },
  { label: 'Destinasi', href: '/destinations' },
  { label: 'Booking', href: '/booking' },
  { label: 'Monitoring', href: '/monitoring' },
];

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

export default function TopNav() {
  const pathname = usePathname();
  const user = useAuthState();
  const initials = user?.displayName
    ? user.displayName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : 'DN';

  return (
    <header className="bg-ocean sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-aqua/20 flex items-center justify-center">
              <span className="text-aqua font-serif font-semibold text-sm">DN</span>
            </div>
            <span className="font-serif text-lg text-white font-semibold tracking-tight">
              DeepNorth
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden lg:flex items-center bg-white/10 border border-white/10 rounded-xl px-3 py-2 gap-2 w-64 hover:bg-white/15 transition-colors duration-200">
              <SearchIcon />
              <input
                placeholder="Cari destinasi selam..."
                className="bg-transparent text-white placeholder:text-white/40 text-xs flex-1 outline-none"
              />
            </div>

            {/* Notification */}
            <button className="relative text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10" aria-label="Notifikasi">
              <BellIcon />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-aqua border border-ocean" />
            </button>

            {/* Avatar */}
            <Link
              href="/profile"
              className="w-9 h-9 rounded-full bg-ocean-mid flex items-center justify-center text-[11px] font-semibold text-white border-2 border-white/20 hover:border-aqua/40 transition-colors duration-200"
            >
              {initials}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
