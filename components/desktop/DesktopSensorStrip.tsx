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
    icon: '🌊',
    getStatus: (v: number) => (v < 0.8 ? 'Aman' : 'Berbahaya'),
  },
  {
    key: 'waterTemp',
    label: 'Suhu Air',
    unit: '°C',
    iconBg: '#FFF0E5',
    icon: '🌡️',
    getStatus: (v: number) => (v >= 25 && v <= 30 ? 'Ideal' : 'Perhatian'),
  },
  {
    key: 'visibility',
    label: 'Visibilitas',
    unit: 'm',
    iconBg: '#E0FAF5',
    icon: '👁️',
    getStatus: (v: number) => (v >= 15 ? 'Baik' : 'Perhatian'),
  },
  {
    key: 'ph',
    label: 'pH Air',
    unit: '',
    iconBg: '#F0E8FF',
    icon: '🧪',
    getStatus: (v: number) => (v >= 7.5 && v <= 8.5 ? 'Normal' : 'Perhatian'),
  },
  {
    key: 'windSpeed',
    label: 'Angin',
    unit: 'km/h',
    iconBg: '#FFF8E0',
    icon: '💨',
    getStatus: (v: number) => (v < 20 ? 'Normal' : 'Kencang'),
  },
];

function getStatusType(status: string) {
  return ['Aman', 'Ideal', 'Baik', 'Normal'].includes(status) ? 'ok' : 'warn';
}

export default function DesktopSensorStrip() {
  const [data, setData] = useState<DocumentData | undefined>();

  useEffect(() => {
    if (!db) return;
    const docRef = doc(db, 'monitoring_data', 'bunaken_latest');
    const unsub = onSnapshot(docRef, (snap) => setData(snap.data()));
    return () => unsub();
  }, []);

  return (
    <section className="bg-sand">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-dark">Kondisi Laut</h2>
            <span className="flex items-center gap-1.5 text-[10px] text-aqua-dim bg-aqua/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse" />
              Real-time
            </span>
          </div>
          <button className="text-xs text-ocean-mid font-medium hover:text-ocean transition-colors">
            Lihat Detail
          </button>
        </div>

        {/* Sensor grid */}
        <div className="grid grid-cols-5 gap-3">
          {sensors.map((s, i) => {
            const value = data?.[s.key];
            const numVal = typeof value === 'number' ? value : null;
            const status = numVal !== null ? s.getStatus(numVal) : '—';
            const statusType = getStatusType(status);

            return (
              <div
                key={s.key}
                className="rounded-2xl border border-sand-border bg-white p-4 flex flex-col gap-2 hover:shadow-md hover:border-ocean/10 transition-all duration-300 cursor-default animate-fade-in-scale"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                    style={{ backgroundColor: s.iconBg }}
                  >
                    {s.icon}
                  </div>
                  <span
                    className={clsx(
                      'text-[9px] font-medium px-2 py-0.5 rounded-full',
                      statusType === 'ok'
                        ? 'bg-teal-50 text-teal-700'
                        : 'bg-amber-50 text-amber-800'
                    )}
                  >
                    {status}
                  </span>
                </div>

                <span className="text-[11px] text-muted mt-1">{s.label}</span>

                <div className="flex items-baseline gap-1">
                  <span className="font-semibold text-xl text-dark">
                    {numVal !== null ? numVal.toFixed(1) : '—'}
                  </span>
                  {s.unit && (
                    <span className="text-xs text-muted">{s.unit}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
