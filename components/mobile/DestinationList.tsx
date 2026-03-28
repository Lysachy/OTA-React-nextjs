'use client';

import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Destination } from '@/lib/firestore';
import DestinationCard from './DestinationCard';
import FilterChips from './FilterChips';

function SkeletonCard() {
  return <div className="h-24 rounded-2xl bg-sand animate-pulse" />;
}

export default function DestinationList() {
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

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="bg-sand">
      {/* Section header */}
      <div className="flex items-center justify-between px-4 pt-1 pb-2">
        <h2 className="text-sm font-semibold text-dark">Destinasi Populer</h2>
        <button className="text-[11px] text-ocean-mid font-medium">
          Lihat Semua
        </button>
      </div>

      <FilterChips onFilterChange={handleFilterChange} />

      <div className="flex flex-col gap-2.5 px-4 pt-3 pb-4">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : destinations.length === 0 ? (
          <div className="flex flex-col items-center py-10 gap-2">
            <span className="text-4xl">🐠</span>
            <p className="text-xs text-muted text-center">
              Tidak ada destinasi ditemukan
            </p>
          </div>
        ) : (
          destinations.map((dest, i) => (
            <div
              key={dest.id}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <DestinationCard {...dest} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
