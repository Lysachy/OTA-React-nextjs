import TopNav from '@/components/desktop/TopNav';
import BottomNav from '@/components/mobile/BottomNav';
import PageParallaxHero from '@/components/desktop/PageParallaxHero';

export default function Destinations() {
  return (
    <main className="min-h-dvh bg-shore-50 pb-24 md:pb-0">
      <TopNav />
      <PageParallaxHero
        badge="Explore Sites"
        title="Destinasi"
        description="Jelajahi spot selam, pantai, dan pengalaman laut terbaik di Sulawesi Utara."
        imageUrl="https://commons.wikimedia.org/wiki/Special:FilePath/Liang%20Beach%20Bunaken.JPG"
      />
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-10 lg:py-20">
        <div className="card w-full max-w-2xl px-8 py-12">
          <span className="section-label">Segera Hadir</span>
          <p className="mx-auto mt-4 max-w-lg text-sm text-navy-soft">
            Halaman destinasi lengkap akan segera hadir.
          </p>
        </div>
      </section>
      <BottomNav />
    </main>
  );
}
