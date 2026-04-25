import { goldSponsors } from '../data/sponsors';
import { ImageWithFallback } from './figma/ImageWithFallback';

function SponsorVisual({
  name,
  logo,
}: {
  name: string;
  logo?: string;
}) {
  if (logo) {
    return (
      <ImageWithFallback
        src={logo}
        alt={name}
        className="max-h-[96px] w-auto max-w-full object-contain"
      />
    );
  }

  return (
    <span className="text-lg font-black uppercase tracking-[0.1em] text-[#1E3A8A] text-center sm:text-xl">
      {name}
    </span>
  );
}

export function PremiumSponsorBanner() {
  if (!goldSponsors.length) {
    return null;
  }

  return (
    <section className="relative z-40 border-b border-amber-200 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_45%,#f3f6fb_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-4 text-center">
          <span className="text-[11px] font-black uppercase tracking-[0.32em] text-amber-700">
            {goldSponsors.length > 1 ? 'Main Club Sponsors' : 'Main Club Sponsor'}
          </span>
        </div>

        <div className={`grid gap-4 ${goldSponsors.length === 1 ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'}`}>
          {goldSponsors.map((featuredSponsor) => (
            <a
              key={featuredSponsor.id}
              href={featuredSponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${featuredSponsor.name}`}
              className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-[2rem] border border-amber-300/70 bg-white/90 p-8 text-center shadow-[0_12px_40px_rgba(30,58,138,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(30,58,138,0.12)]"
            >
              <div className="flex h-[112px] w-full items-center justify-center">
                <SponsorVisual name={featuredSponsor.name} logo={featuredSponsor.logo} />
              </div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">
                {featuredSponsor.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export { PremiumSponsorBanner as Tier1SponsorStrip };
