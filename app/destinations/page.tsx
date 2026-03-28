import TopNav from '@/components/desktop/TopNav';
import BottomNav from '@/components/mobile/BottomNav';

export default function Destinations() {
  return (
    <>
      {/* Mobile */}
      <main className="md:hidden min-h-dvh bg-sand pb-20">
        <div className="bg-ocean px-4 pt-5 pb-6">
          <h1 className="font-serif text-xl text-white font-semibold">Destinasi</h1>
          <p className="text-xs text-white/50 mt-1">Jelajahi semua destinasi selam</p>
        </div>
        <div className="bg-sand h-5 rounded-t-[18px] -mt-1 relative z-10" />
        <div className="flex flex-col items-center justify-center py-20 gap-3 px-4">
          <span className="text-5xl">🗺️</span>
          <p className="text-sm text-muted text-center">Halaman destinasi akan segera hadir</p>
        </div>
        <BottomNav />
      </main>

      {/* Desktop */}
      <main className="hidden md:block min-h-dvh bg-sand">
        <TopNav />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 flex flex-col items-center gap-4">
          <span className="text-6xl">🗺️</span>
          <h1 className="font-serif text-2xl text-dark font-semibold">Destinasi</h1>
          <p className="text-sm text-muted">Halaman destinasi akan segera hadir</p>
        </div>
      </main>
    </>
  );
}
