import { ImageWithFallback } from './figma/ImageWithFallback';

import logoXL from "figma:asset/f53629ddb107c4b3ee14a45135a4df4c1c062460.png";
import logoBeltec from "figma:asset/0d2864839ffd3906f94a2f3891988093fdd4583d.png";
import logoTrinity from "figma:asset/53c88e94157083d2c282cf63c7b59e3ea670b6f1.png";
import logoAssist from "figma:asset/874b8970ede3b31f3c2a7db9348b3e6d40fea3f4.png";
import logoBoylan from "figma:asset/da297634fb1eea9c76882865827d3413545a5d56.png";

/**
 * Premium Sponsor Data
 * Static display of top-tier partners.
 */
const tier1Sponsors = [
  { name: 'XL Tenure Stores', logo: logoXL, url: '#' },
  { name: 'Beltec Construction', logo: logoBeltec, url: '#' },
  { name: 'Trinity Finances', logo: logoTrinity, url: '#' },
  { name: 'Assist Electrical', logo: logoAssist, url: '#' },
  { name: 'Boylan Print Group', logo: logoBoylan, url: '#' },
];

export function PremiumSponsorBanner() {
  return (
    <section className="w-full bg-white border-b border-gray-100 relative z-40">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-black text-[#1E3A8A] uppercase tracking-[0.25em] text-center mb-5">
          Club Sponsors
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {tier1Sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${sponsor.name}`}
              className="flex items-center justify-center rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
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

export function HomeSponsorsSection({
  title = 'Club Sponsors',
  itemsLimit = 5,
}: {
  title?: string;
  itemsLimit?: number;
}) {
  return (
    <section className="w-full bg-white border-b border-gray-100 relative z-40">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-[11px] font-black text-[#1E3A8A] uppercase tracking-[0.25em] text-center mb-5">
          {title}
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {tier1Sponsors.slice(0, itemsLimit).map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${sponsor.name}`}
              className="flex items-center justify-center rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
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

// Backward-compat alias
export { PremiumSponsorBanner as Tier1SponsorStrip };
