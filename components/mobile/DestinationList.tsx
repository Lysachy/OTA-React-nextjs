'use client';

import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Destination } from '@/lib/firestore';
import DestinationCard from './DestinationCard';
import FilterChips from './FilterChips';

function SkeletonCard() {
  return <div className="h-24 rounded-2xl bg-shore-100 animate-pulse" />;
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

  return (
    <div className="bg-shore-50">
      {/* Section header */}
      <div className="flex items-center justify-between px-4 pt-1 pb-2.5">
        <h2 className="text-sm font-semibold text-navy">Destinasi Populer</h2>
        <button className="text-[11px] text-teal-600 font-medium">
          Lihat Semua
        </button>
      </div>

      <FilterChips onFilterChange={(f) => setActiveFilter(f)} />

      <div className="flex flex-col gap-3 px-4 pt-3.5 pb-4">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : destinations.length === 0 ? (
          <div className="flex flex-col items-center py-12 gap-3">
            <div className="w-12 h-12 rounded-xl bg-shore-100 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-navy-soft">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p className="text-xs text-navy-soft">
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
