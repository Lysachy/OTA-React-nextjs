import MobileHeader from '@/components/mobile/MobileHeader';
import DestinationList from '@/components/mobile/DestinationList';
import SensorScroll from '@/components/mobile/SensorScroll';
import BottomNav from '@/components/mobile/BottomNav';
import TopNav from '@/components/desktop/TopNav';
import HeroBanner from '@/components/desktop/HeroBanner';
import DesktopSensorStrip from '@/components/desktop/DesktopSensorStrip';
import DesktopDestinationGrid from '@/components/desktop/DesktopDestinationGrid';
import Footer from '@/components/desktop/Footer';

export default function Beranda() {
  return (
    <>
      {/* ========== MOBILE LAYOUT (< md) ========== */}
      <main className="md:hidden min-h-dvh bg-sand pb-20">
        <MobileHeader />
        <SensorScroll />
        <DestinationList />
        <BottomNav />
      </main>

      {/* ========== DESKTOP LAYOUT (>= md) ========== */}
      <main className="hidden md:block min-h-dvh bg-sand">
        <TopNav />
        <HeroBanner />
        <DesktopSensorStrip />
        <DesktopDestinationGrid />
        <Footer />
      </main>
    </>
  );
}
