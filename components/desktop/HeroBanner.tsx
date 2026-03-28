'use client';

import { useAuthState } from '@/lib/useAuth';

export default function HeroBanner() {
  const user = useAuthState();
  const firstName = user?.displayName?.split(' ')[0] ?? 'Explorer';

  return (
    <section className="relative bg-ocean overflow-hidden ocean-grain">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-aqua/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-ocean-mid/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-sm text-white/50 mb-1">Selamat datang 🌊</p>
          <h1 className="font-serif text-3xl lg:text-4xl text-white font-semibold leading-tight mb-3">
            Halo, {firstName}!
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-md">
            Jelajahi destinasi selam terbaik di Indonesia Utara. Bunaken, Likupang, Lembeh — semua dalam genggaman.
          </p>

          {/* Quick stats */}
          <div className="flex items-center gap-6 mt-8">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-white">12+</span>
              <span className="text-[11px] text-white/40">Dive Sites</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-aqua">28°C</span>
              <span className="text-[11px] text-white/40">Suhu Rata-rata</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-white">25m</span>
              <span className="text-[11px] text-white/40">Visibilitas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="bg-sand h-6 rounded-t-[24px] -mb-1 relative z-10" />
    </section>
  );
}
