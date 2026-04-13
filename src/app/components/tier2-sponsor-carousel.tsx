import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { silverSponsors } from '../data/sponsors';
import { ImageWithFallback } from './figma/ImageWithFallback';

function SilverSponsorCard({
  name,
  logo,
  url,
}: {
  name: string;
  logo?: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${name}`}
      className="flex min-h-[220px] min-w-[320px] max-w-[320px] flex-shrink-0 items-center justify-center rounded-[2rem] border border-slate-300 bg-[linear-gradient(180deg,#f4f5f7_0%,#e6e9ee_100%)] p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-[#1E3A8A]/20 hover:shadow-lg"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        {logo ? (
          <>
            <div className="flex h-[112px] w-full items-center justify-center">
              <ImageWithFallback
                src={logo}
                alt={name}
                className="max-h-[96px] w-auto max-w-full object-contain"
              />
            </div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">
              {name}
            </p>
          </>
        ) : (
          <div className="flex h-[112px] w-full items-center justify-center">
            <span className="text-center text-lg font-black uppercase tracking-[0.1em] text-[#1E3A8A]">
              {name}
            </span>
          </div>
        )}
      </div>
    </a>
  );
}

export function Tier2SponsorCarousel() {
  const scrollingSponsors = [...silverSponsors, ...silverSponsors];

  return (
    <section className="border-y border-slate-300 bg-[linear-gradient(180deg,#eef1f4_0%,#d9dde3_100%)] py-16 overflow-hidden">
      <style>{`
        @keyframes sponsor-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 0.5rem)); }
        }
      `}</style>
      <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-500">
            Club Sponsors
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#1E3A8A]">
            Backing The Club All Season
          </h2>
        </div>
        <Link
          to="/sponsors"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#1E3A8A] transition-colors hover:text-amber-600"
        >
          View Sponsors <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <div
            className="flex w-max gap-4 pb-3 hover:[animation-play-state:paused]"
            style={{ animation: 'sponsor-marquee 36s linear infinite' }}
          >
            {scrollingSponsors.map((sponsor, index) => (
            <SilverSponsorCard
              key={`${sponsor.id}-${index}`}
              name={sponsor.name}
              logo={sponsor.logo}
              url={sponsor.url}
            />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
