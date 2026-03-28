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
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const formatRp = (n: number) => `Rp ${(n / 1000).toFixed(0)}k`;

export default function DesktopDestinationCard({
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
    <div
      className="group rounded-2xl border border-sand-border bg-white overflow-hidden hover:shadow-lg hover:border-ocean/15 transition-all duration-300 cursor-pointer"
      onClick={() => router.push(`/destinations/${id}`)}
    >
      {/* Thumbnail — vertical on desktop */}
      <div
        className="h-36 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: thumbColor }}
      >
        <span className="text-5xl group-hover:scale-110 transition-transform duration-500">
          {emoji}
        </span>
        {isLive && (
          <span className="absolute top-3 left-3 bg-teal-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-dark leading-tight group-hover:text-ocean transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-1.5">
          <PinIcon />
          <span className="text-[11px] text-muted">{location}</span>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-sand text-muted text-[10px] px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-sand-border">
          <div>
            <span className="text-base font-semibold text-dark">
              {formatRp(priceStart)}
            </span>
            <span className="text-xs text-muted font-normal">/pax</span>
          </div>
          <button className="bg-ocean text-white rounded-xl px-4 py-2 text-xs font-medium hover:bg-ocean-mid transition-colors duration-200 flex items-center gap-1.5 group/btn">
            Booking
            <span className="group-hover/btn:translate-x-0.5 transition-transform duration-200">
              <ArrowIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
