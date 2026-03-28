'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot, type DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import clsx from 'clsx';

const sensors = [
  {
    key: 'waveHeight',
    label: 'Gelombang',
    unit: 'm',
    iconBg: '#E0F7FD',
    iconColor: '#0891B2',
    icon: '🌊',
    getStatus: (v: number) => (v < 0.8 ? 'Aman' : 'Berbahaya'),
  },
  {
    key: 'waterTemp',
    label: 'Suhu Air',
    unit: '°C',
    iconBg: '#FFF0E5',
    iconColor: '#EA580C',
    icon: '🌡️',
    getStatus: (v: number) =>
      v >= 25 && v <= 30 ? 'Ideal' : 'Perhatian',
  },
  {
    key: 'visibility',
    label: 'Visibilitas',
    unit: 'm',
    iconBg: '#E0FAF5',
    iconColor: '#0D9488',
    icon: '👁️',
    getStatus: (v: number) => (v >= 15 ? 'Baik' : 'Perhatian'),
  },
  {
    key: 'ph',
    label: 'pH Air',
    unit: '',
    iconBg: '#F0E8FF',
    iconColor: '#7C3AED',
    icon: '🧪',
    getStatus: (v: number) =>
      v >= 7.5 && v <= 8.5 ? 'Normal' : 'Perhatian',
  },
  {
    key: 'windSpeed',
    label: 'Angin',
    unit: 'km/h',
    iconBg: '#FFF8E0',
    iconColor: '#D97706',
    icon: '💨',
    getStatus: (v: number) => (v < 20 ? 'Normal' : 'Kencang'),
  },
];

type StatusType = 'ok' | 'warn';

function getStatusType(status: string): StatusType {
  const okStatuses = ['Aman', 'Ideal', 'Baik', 'Normal'];
  return okStatuses.includes(status) ? 'ok' : 'warn';
}

export default function SensorScroll() {
  const [data, setData] = useState<DocumentData | undefined>();

  useEffect(() => {
    if (!db) return;
    const docRef = doc(db, 'monitoring_data', 'bunaken_latest');
    const unsub = onSnapshot(docRef, (snap) => setData(snap.data()));
    return () => unsub();
  }, []);

  return (
    <div className="bg-sand pb-2">
      {/* Section header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <h2 className="text-sm font-semibold text-dark">Kondisi Laut</h2>
        <span className="flex items-center gap-1 text-[9px] text-aqua-dim">
          <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse" />
          Real-time
        </span>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {sensors.map((s) => {
          const value = data?.[s.key];
          const numVal = typeof value === 'number' ? value : null;
          const status = numVal !== null ? s.getStatus(numVal) : '—';
          const statusType = getStatusType(status);

          return (
            <div
              key={s.key}
              className="min-w-[88px] shrink-0 rounded-[14px] border border-sand-border bg-white p-2.5 flex flex-col gap-1.5"
            >
              {/* Icon */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                style={{ backgroundColor: s.iconBg }}
              >
                {s.icon}
              </div>

              <span className="text-[9px] text-muted leading-tight">
                {s.label}
              </span>

              <div className="flex items-baseline gap-0.5">
                <span className="font-semibold text-[13px] text-dark">
                  {numVal !== null ? numVal.toFixed(1) : '—'}
                </span>
                {s.unit && (
                  <span className="text-[9px] text-muted">{s.unit}</span>
                )}
              </div>

              <span
                className={clsx(
                  'text-[8px] font-medium px-1.5 py-0.5 rounded-full w-fit',
                  statusType === 'ok'
                    ? 'bg-teal-50 text-teal-700'
                    : 'bg-amber-50 text-amber-800'
                )}
              >
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
