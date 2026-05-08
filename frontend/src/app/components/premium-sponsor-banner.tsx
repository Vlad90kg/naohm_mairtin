import { useCMS } from '../data/cms-context';
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
        className="max-h-[64px] w-auto max-w-full object-contain sm:max-h-[72px]"
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
  const { sponsors } = useCMS();
  const goldSponsors = sponsors.filter((sponsor) => sponsor.tier === 1);

  if (!goldSponsors.length) {
    return null;
  }

  return (
    <section className="relative z-40 border-b border-amber-200 bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_45%,#f3f6fb_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="mb-3 text-center">
          <span className="text-[11px] font-black uppercase tracking-[0.32em] text-amber-700">
            {goldSponsors.length > 1 ? 'Main Club Sponsors' : 'Main Club Sponsor'}
          </span>
        </div>

        <div className={`grid gap-3 sm:gap-4 ${goldSponsors.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'}`}>
          {goldSponsors.map((featuredSponsor) => (
            <a
              key={featuredSponsor.id}
              href={featuredSponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${featuredSponsor.name}`}
              className="mx-auto flex w-full max-w-[360px] min-h-[168px] flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-amber-300/70 bg-white/90 p-5 text-center shadow-[0_10px_28px_rgba(30,58,138,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(30,58,138,0.12)] sm:min-h-[176px] sm:p-6"
            >
              <div className="flex h-[74px] w-full items-center justify-center sm:h-[82px]">
                <SponsorVisual name={featuredSponsor.name} logo={featuredSponsor.logo} />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-500 sm:text-[13px]">
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
