'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserRole } from '@/lib/useAuth';
import DashboardSidebar, { type DashboardPage } from '@/components/dashboard/DashboardSidebar';
import StatistikPanel from '@/components/dashboard/StatistikPanel';
import DestinasiPanel from '@/components/dashboard/DestinasiPanel';
import PenggunaPanel from '@/components/dashboard/PenggunaPanel';

export default function Dashboard() {
  const { user, role } = useUserRole();
  const router = useRouter();
  const [page, setPage] = useState<DashboardPage>('statistik');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (user === null) {
      router.replace('/profile');
    } else if (role && role !== 'admin') {
      router.replace('/beranda');
    }
  }, [user, role, router]);

  if (!user || !role || role !== 'admin') {
    return null;
  }

  return (
    <div className="flex min-h-dvh bg-shore-50">
      <DashboardSidebar
        active={page}
        onNavigate={setPage}
        mobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen(!mobileOpen)}
      />
      <main className="flex-1 min-w-0 pt-14 md:pt-0">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
          {page === 'statistik' && <StatistikPanel />}
          {page === 'destinasi' && <DestinasiPanel />}
          {page === 'pengguna' && <PenggunaPanel />}
        </div>
      </main>
    </div>
  );
}
