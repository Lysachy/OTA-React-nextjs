'use client';

import { useRouter } from 'next/navigation';

interface Props {
  id: string;
  name: string;
  location: string;
  emoji: string;
  thumbColor: string;
  tags: string[];
  priceStart: number;
  isLive: boolean;
}

function PinIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const formatRp = (n: number) => `Rp ${(n / 1000).toFixed(0)}k`;

export default function DestinationCard({
  id,
  name,
  location,
  emoji,
  thumbColor,
  tags,
  priceStart,
  isLive,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex rounded-2xl border border-sand-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Thumbnail */}
      <div
        className="w-[86px] shrink-0 flex items-center justify-center"
        style={{ backgroundColor: thumbColor }}
      >
        <span className="text-3xl">{emoji}</span>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 flex flex-col gap-1.5">
        <h3 className="text-[13px] font-semibold text-dark leading-tight">
          {name}
        </h3>

        <div className="flex items-center gap-1">
          <PinIcon />
          <span className="text-[10px] text-muted">{location}</span>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1 flex-wrap">
          {isLive && (
            <span className="bg-teal-50 text-teal-700 text-[9px] font-medium px-1.5 py-0.5 rounded-full">
              LIVE
            </span>
          )}
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-sand text-muted text-[9px] px-1.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-[11px] text-dark font-semibold">
            {formatRp(priceStart)}
            <span className="text-muted font-normal">/pax</span>
          </span>
          <button
            onClick={() => router.push(`/destinations/${id}`)}
            className="bg-ocean text-white rounded-lg px-3 py-1 text-[10px] font-medium hover:bg-ocean-mid transition-colors duration-200"
          >
            Booking
          </button>
        </div>
      </div>
    </div>
  );
}
