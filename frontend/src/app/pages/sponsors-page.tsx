import { Link } from 'react-router';
import { Footer } from '../components/footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { sponsors } from '../data/sponsors';

function BronzeSponsorCard({
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
      className="group flex min-h-[220px] items-center justify-center rounded-[2rem] border border-[#d7b48a] bg-[linear-gradient(180deg,#fff6ea_0%,#f3dfc4_100%)] p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A]/20 hover:shadow-xl"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <div className="flex h-[112px] w-full items-center justify-center">
          {logo ? (
            <ImageWithFallback
              src={logo}
              alt={name}
              className="max-h-[96px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-lg font-black uppercase tracking-[0.1em] text-[#1E3A8A]">
              {name}
            </span>
          )}
        </div>
        {logo && (
          <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">
            {name}
          </p>
        )}
      </div>
    </a>
  );
}

export function SponsorsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navigation />
      <PremiumSponsorBanner />

      <section className="club-hero-surface relative overflow-hidden px-4 py-20 text-white sm:py-28">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-400">
            Sponsors
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
            Sponsor Directory
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium text-blue-100">
            A full directory of club sponsors, with featured supporters highlighted across the wider site.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/4 translate-x-20 skew-x-12 bg-amber-400/10" />
      </section>

      <main className="flex-grow bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-600">
              Our Sponsors
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#1E3A8A]">
              Every Sponsor In One Place
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Please support the businesses and individuals who support Naomh Mairtin CPG.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {sponsors.map((sponsor) => (
              <BronzeSponsorCard
                key={sponsor.id}
                name={sponsor.name}
                logo={sponsor.logo}
                url={sponsor.url}
              />
            ))}
          </div>
        </div>
      </main>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[3rem] border-8 border-white bg-[#1E3A8A] p-12 text-center text-white shadow-2xl sm:p-16">
            <div className="relative z-10">
              <h2 className="text-4xl font-black uppercase tracking-tight">
                Become A Club Sponsor
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-blue-100">
                We offer sponsorship options for businesses at different levels while keeping visibility clear and structured.
              </p>
              <Link
                to="/contact"
                className="mt-10 inline-block rounded-2xl bg-amber-400 px-12 py-4 text-base font-black uppercase tracking-[0.18em] text-[#1E3A8A] transition-all hover:-translate-y-1 hover:bg-amber-500"
              >
                Get In Touch
              </Link>
            </div>
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
