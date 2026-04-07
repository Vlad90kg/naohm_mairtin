import { Handshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

/**
 * Secondary / mid-page sponsor placement.
 * Shows all commercial partners in an egalitarian banner-style grid.
 * Each card uses a 3:1 aspect ratio with a 70% safe-zone for logos.
 */
const partners = [
  { name: 'Clear Cut Marketing', logo: 'https://images.unsplash.com/photo-1669217541257-f46f1d24712a?w=400&q=80' },
  { name: 'GreenPower',          logo: 'https://images.unsplash.com/photo-1765263857986-271b4923632d?w=400&q=80' },
  { name: "O'Reilly's",          logo: 'https://images.unsplash.com/photo-1773585532856-62dc260b7b38?w=400&q=80' },
  { name: 'Global Financial',    logo: 'https://images.unsplash.com/photo-1643391448961-621e0b1bc5b1?w=400&q=80' },
  { name: 'Tech Corp',           logo: 'https://images.unsplash.com/photo-1762340274767-07fd7e1e5099?w=400&q=80' },
  { name: 'BuildIt',             logo: 'https://images.unsplash.com/photo-1563174761-62892315819b?w=400&q=80' },
  { name: 'HealthPlus',          logo: 'https://images.unsplash.com/photo-1638552903142-d4323d81eb8f?w=400&q=80' },
  { name: 'Local Bakery',        logo: 'https://images.unsplash.com/photo-1738533990006-0994f0d105be?w=400&q=80' },
  { name: 'The Pub',             logo: 'https://images.unsplash.com/photo-1651225987309-a32bac2d8e2b?w=400&q=80' },
  { name: 'Main St Motors',      logo: 'https://images.unsplash.com/photo-1770998681718-6704001fbfaf?w=400&q=80' },
  { name: 'Sillogue Services',   logo: 'https://images.unsplash.com/photo-1760138270903-d95903188730?w=400&q=80' },
  { name: 'Newtown News',        logo: 'https://images.unsplash.com/photo-1762340274767-07fd7e1e5099?w=400&q=80' },
];

export function SponsorsSection() {
  return (
    <section className="bg-[#f8fafc] py-24 px-4 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-[#1E3A8A] rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-gray-100">
            Our Commercial Network
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1E3A8A] uppercase tracking-tighter mb-4">
            Our Partners
          </h2>
          <div className="w-24 h-1.5 bg-amber-400 rounded-full" />
        </div>

        {/*
         * Banner-style partner grid
         * Each card: 3:1 aspect ratio, white bg, 70% safe-zone logo, grayscale→colour on hover
         * Cols: 2 (mobile) → 3 (sm) → 4 (lg) → 6 (xl)
         */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5 mb-20">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-amber-400/60 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Top accent stripe — amber on hover */}
              <span className="absolute top-0 left-0 right-0 h-[3px] bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

              {/* Logo area — 3:1 banner ratio, 70% safe-zone */}
              <div className="w-full aspect-[3/1] flex items-center justify-center p-[15%]">
                <ImageWithFallback
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 opacity-75 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>

              {/* Name bar */}
              <div className="border-t border-gray-50 px-3 py-2 text-center bg-gray-50/50 group-hover:bg-white transition-colors duration-300">
                <p className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-tight truncate">
                  {partner.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/sponsors"
            className="group relative inline-flex items-center gap-3 bg-[#1E3A8A] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl hover:shadow-blue-900/20 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Full Partner Directory
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#1E3A8A] px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all border-2 border-gray-100 shadow-sm active:scale-95"
          >
            <Handshake className="h-5 w-5 text-amber-500" />
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
