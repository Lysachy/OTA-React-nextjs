'use client';

import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Destination } from '@/lib/firestore';
import DesktopDestinationCard from './DesktopDestinationCard';
import clsx from 'clsx';

const filters = ['Semua', 'Bunaken', 'Likupang', 'Lembeh', 'Terdekat'];

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-sand animate-pulse">
      <div className="h-36 rounded-t-2xl bg-sand-border" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-sand-border rounded w-3/4" />
        <div className="h-3 bg-sand-border rounded w-1/2" />
        <div className="h-3 bg-sand-border rounded w-2/3" />
      </div>
    </div>
  );
}

export default function DesktopDestinationGrid() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Semua');

  const fetchDestinations = useCallback(async (filter: string) => {
    if (!db) {
      setDestinations([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const ref = collection(db, 'destinations');
      const q =
        filter && filter !== 'Semua'
          ? query(ref, where('location', '==', filter))
          : ref;
      const snap = await getDocs(q);
      setDestinations(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as Destination))
      );
    } catch {
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations(activeFilter);
  }, [activeFilter, fetchDestinations]);

  return (
    <section className="bg-sand">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {/* Header + Filters */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dark">Destinasi Populer</h2>
          <button className="text-xs text-ocean-mid font-medium hover:text-ocean transition-colors">
            Lihat Semua
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={clsx(
                'px-4 py-2 rounded-xl text-xs font-medium border transition-all duration-200',
                activeFilter === f
                  ? 'bg-ocean text-white border-ocean shadow-sm'
                  : 'bg-white text-muted border-sand-border hover:border-ocean/30 hover:text-dark'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <span className="text-5xl">🐠</span>
            <p className="text-sm text-muted text-center">
              Tidak ada destinasi ditemukan
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {destinations.map((dest, i) => (
              <div
                key={dest.id}
                className="animate-fade-in-scale"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <DesktopDestinationCard {...dest} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
