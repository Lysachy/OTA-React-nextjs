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
            'chip shrink-0 whitespace-nowrap',
            active === f && 'chip-active'
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
