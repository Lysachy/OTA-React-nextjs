'use client';

import { useState } from 'react';
import clsx from 'clsx';

const filters = ['Semua', 'Bunaken', 'Likupang', 'Lembeh', 'Terdekat'];

interface Props {
  onFilterChange?: (filter: string) => void;
}

export default function FilterChips({ onFilterChange }: Props) {
  const [active, setActive] = useState('Semua');

  const handleClick = (f: string) => {
    setActive(f);
    onFilterChange?.(f);
  };

  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-0 scrollbar-hide">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => handleClick(f)}
          className={clsx(
            'px-3.5 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap border shrink-0 transition-all duration-200',
            active === f
              ? 'bg-ocean text-white border-ocean shadow-sm'
              : 'bg-white text-muted border-sand-border hover:border-ocean/30'
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
