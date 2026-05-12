import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Footer } from '../components/footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Navigation } from '../components/navigation';
import { PremiumSponsorBanner } from '../components/premium-sponsor-banner';
import { useCMS } from '../data/cms-context';

type SponsorsPageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  section_eyebrow: string;
  section_title: string;
  section_description: string;
  cta_title: string;
  cta_description: string;
  cta_button_text: string;
  cta_button_link: string;
};

const defaultPageContent: SponsorsPageContent = {
  hero_eyebrow: 'Sponsors',
  hero_title: 'Sponsor Directory',
  hero_description: 'A full directory of club sponsors, with featured supporters highlighted across the wider site.',
  section_eyebrow: 'Our Sponsors',
  section_title: 'Every Sponsor In One Place',
  section_description: 'Please support the businesses and individuals who support Naomh Mairtin CPG.',
  cta_title: 'Become A Club Sponsor',
  cta_description: 'We offer sponsorship options for businesses at different levels while keeping visibility clear and structured.',
  cta_button_text: 'Get In Touch',
  cta_button_link: '/contact',
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  ?? (import.meta.env.DEV ? 'http://127.0.0.1:8000/api' : '/api');

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
  const { sponsors } = useCMS();
  const [pageContent, setPageContent] = useState<SponsorsPageContent>(defaultPageContent);

  useEffect(() => {
    let ignore = false;

    const loadPageContent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pages/sponsors`);
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as SponsorsPageContent;
        if (!ignore) {
          setPageContent(data);
        }
      } catch (error) {
        console.error('Failed to load sponsors page content:', error);
      }
    };

    void loadPageContent();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navigation />
      <PremiumSponsorBanner />

      <section className="club-hero-surface relative overflow-hidden px-4 py-20 text-white sm:py-28">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-400">
            {pageContent.hero_eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">
            {pageContent.hero_title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium text-blue-100">
            {pageContent.hero_description}
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/4 translate-x-20 skew-x-12 bg-amber-400/10" />
      </section>

      <main className="flex-grow bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-600">
              {pageContent.section_eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#1E3A8A]">
              {pageContent.section_title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              {pageContent.section_description}
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
                {pageContent.cta_title}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-blue-100">
                {pageContent.cta_description}
              </p>
              <Link
                to={pageContent.cta_button_link}
                className="mt-10 inline-block rounded-2xl bg-amber-400 px-12 py-4 text-base font-black uppercase tracking-[0.18em] text-[#1E3A8A] transition-all hover:-translate-y-1 hover:bg-amber-500"
              >
                {pageContent.cta_button_text}
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
