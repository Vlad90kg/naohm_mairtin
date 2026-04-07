import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import logoStirue from "figma:asset/92bd99e4a15ca20e57c6964cdc27e88788461d2a.png";
import logoDrogheda from "figma:asset/1710ea26cbece1ab6961c7d015a6977e2e6d4a47.png";
import logoTony from "figma:asset/08b5df057017e6d791a7b6673cd340457b4e871f.png";
import logoBelview from "figma:asset/3be250974f17bcfb90f6d8ff4668a77936a340a4.png";
import logoHomeInstead from "figma:asset/c981f3b3f69e9057f76ab3ba1e6cb0b3c6bebf51.png";

/**
 * Community Sponsors - Secondary Banner
 * Horizontal scrolling row of club supporters.
 */
const tier2Sponsors = [
  { name: 'Stirue Fencing', logo: logoStirue, url: '#' },
  { name: 'Drogheda Hire', logo: logoDrogheda, url: '#' },
  { name: 'Tony OBrien', logo: logoTony, url: '#' },
  { name: 'Belview Eggs', logo: logoBelview, url: '#' },
  { name: 'Home Instead', logo: logoHomeInstead, url: '#' },
];

export function Tier2SponsorCarousel() {
  return (
    <section className="bg-gray-50 py-16 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#1E3A8A] uppercase tracking-tight">
            Club Sponsors
          </h2>
          <p className="text-[11px] font-bold text-amber-500 uppercase tracking-[0.2em]">
            Invested in our community
          </p>
        </div>
        <Link
          to="/sponsors"
          className="inline-flex items-center gap-2 text-xs font-black text-[#1E3A8A] uppercase tracking-widest hover:text-amber-500 transition-colors"
        >
          View Directory <ArrowRight size={14} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4 overflow-x-auto pb-3">
          {tier2Sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${sponsor.name}`}
              className="flex min-w-[220px] flex-shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-[70px] w-full items-center justify-center">
                <ImageWithFallback
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-[70px] w-auto max-w-full object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
