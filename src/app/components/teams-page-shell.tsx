import type { ReactNode } from 'react';
import { Footer } from './footer';
import { Navigation } from './navigation';
import { PremiumSponsorBanner } from './premium-sponsor-banner';

export function TeamsPageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <PremiumSponsorBanner />

      <main className="flex-grow">
        <section className="club-hero-surface relative overflow-hidden px-4 py-24 text-white sm:py-32">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-black uppercase tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
              {subtitle}
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">{children}</div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export function TeamsSectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      {eyebrow && (
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-black tracking-tight text-[#1E3A8A] sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
}
