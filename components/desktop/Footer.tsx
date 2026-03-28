import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-white/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-aqua/20 flex items-center justify-center">
                <span className="text-aqua font-serif font-semibold text-sm">DN</span>
              </div>
              <span className="font-serif text-lg text-white font-semibold">
                DeepNorth
              </span>
            </div>
            <p className="text-xs leading-relaxed text-white/40">
              Platform OTA untuk destinasi selam terbaik di Indonesia Utara.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
              Destinasi
            </h4>
            <ul className="space-y-2">
              {['Bunaken', 'Likupang', 'Lembeh', 'Bangka'].map((d) => (
                <li key={d}>
                  <Link href="#" className="text-xs hover:text-white transition-colors">
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
              Layanan
            </h4>
            <ul className="space-y-2">
              {['Diving Trip', 'Snorkeling', 'Boat Charter', 'Photography'].map((s) => (
                <li key={s}>
                  <Link href="#" className="text-xs hover:text-white transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
              Perusahaan
            </h4>
            <ul className="space-y-2">
              {['Tentang Kami', 'Kontak', 'Kebijakan Privasi', 'Syarat & Ketentuan'].map((c) => (
                <li key={c}>
                  <Link href="#" className="text-xs hover:text-white transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-[11px] text-white/30">
            &copy; 2026 DeepNorth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
